from fastapi import APIRouter
from app.dao.session_maker import TransactionSessionDep, SessionDep
from sqlalchemy.ext.asyncio import AsyncSession
from app.data.schemas import SDataTrip, SLendersDebtersFind, SLendersDebtersUpdate, SLendersDebtersAdd, \
    SLendersDebtersUpdateMoney, SUserGroupFind, SLenderDebterFind, SMessageTrip, STripsAdd, STripsInfo, \
    STripsFindGroup, SUserGroupDeleteUserFind, SLogAdd, SEventAdd, SMainPersonAdd, SOtherPersonAdd, \
    SEventFindByTripId, SPersonFindByEventId, SEventFullInfo, STripsFullInfo, SMainPersonFullInfo, \
    STripStatisticFindByTripId, SUserLogAdd, STripsLogAdd, SGroupShortInfo, SUserShortInfo, SInviteCheckBase, \
    SLenders, SDebters, STripStatisticsAdd, STripStatisticFullInfo, SResultFullInfo, SUserFindByUserId, \
    SUserStatisticsAdd, SUserStatisticsUpdateTotalLent, SUserStatisticsUpdateTotalBorrowed, STripsShortInfoForGroup
from app.Engine.engine import engine
from app.dao.daos import LendersDebtersDAO, UsersDAO, GroupDAO, UserGroupDAO, MessageDAO, TripsDAO, LogDAO, EventDAO, \
    OtherPersonDAO, MainPersonDAO, UserLogDAO, TripsLogDAO, TripStatisticsDAO, UserStatisticsDAO
from app.dependencies.dependencies import Depends, get_current_user
from app.exceptions import ForbiddenException, UserDoNotExistInGroup, DebtRaised, IncorrectDebt, IncorrectId
from app.data.models import User
from datetime import datetime
from app.utils import encrypt_to_model

trip_router = APIRouter(prefix="/api/trip", tags=["trip"])


@trip_router.put("/update_debters")
async def update_debters(data: SLendersDebtersUpdateMoney, user_data: User = Depends(get_current_user),
                         session: AsyncSession = TransactionSessionDep) -> dict:

    lenderdebter = await LendersDebtersDAO.find_one_or_none_by_id(session=session,
                                                                  data_id=data.debter_id)

    if data.money > lenderdebter.money:
        raise DebtRaised

    if data.money <= 0:
        raise IncorrectDebt

    await MessageDAO.add(session=session, values=SMessageTrip(user_id=lenderdebter.debter_id,
                                                              message=f"Пользователь {user_data.last_name}"
                                                                      f" {user_data.first_name} уменьшил ваш долг,"
                                                                      f" теперь он составляет"
                                                                      f" {round(data.money, 2)} рублей", checked=0,
                                                              created_at=datetime.now()))

    await LendersDebtersDAO.update(session=session,
                                   filters=SLenderDebterFind(debter_id=lenderdebter.debter_id, lender_id=user_data.id),
                                   values=SLendersDebtersUpdate(money=data.money))

    return {"message": f"Должник {lenderdebter.debter_id} пользователя {user_data.id} успешно обновлен", "ok": True}


"""ВОЗМОЖНО УПРОСТИТЬ АЛГОРИТМ ( СЛИШКОМ МНОГО ЗАПРОСОВ )"""


@trip_router.post("/make_recalculations")
async def make_recalculations(data: SDataTrip, user_data: User = Depends(get_current_user),
                              session: AsyncSession = TransactionSessionDep) -> dict:
    proxi = await GroupDAO.find_one_or_none_by_id(session=session, data_id=data.id)

    for ev in data.events:
        if ev.money == 0:
            for main_per in ev.info:
                ev.money += main_per.money_for_pay
        else:
            sr = ev.money / len(ev.main_persons)

            for main_per in ev.info:
                main_per.money_for_pay += sr

    if str(user_data.id) not in proxi.proxies.split(";"):
        raise ForbiddenException

    for trip_member in data.trip_members:
        check = await UserGroupDAO.find_one_or_none(session=session,
                                                    filters=SUserGroupFind(group_id=data.id, user_id=trip_member))
        if not check:
            raise UserDoNotExistInGroup

    trip_members, events = await encrypt_to_model(data, session)

    await TripsDAO.add(session=session,
                       values=STripsAdd(name=data.name, participants=";".join(map(str, data.trip_members)),
                                        wasted_money=sum([event.money for event in events]), amount_events=len(events),
                                        group_id=data.id, creator_id=user_data.id))

    trip_id = await TripsDAO.find_all(session=session, filters=STripsAdd(name=data.name, participants=";".join(
        map(str, data.trip_members)),
                                                                         wasted_money=sum(
                                                                             [event.money for event in events]),
                                                                         amount_events=len(events),
                                                                         group_id=data.id, creator_id=user_data.id))

    trip_id = trip_id[-1].id

    await engine.recalc_db(trip_members=trip_members, events=events)

    for user_statistics in engine.statistics:
        engine.statistics[user_statistics]["lenders_before"] = await LendersDebtersDAO.amount(
            session=session,
            filters=SLenders(
                debter_id=int(
                    user_statistics)))

        engine.statistics[user_statistics]["debters_before"] = await LendersDebtersDAO.amount(
            session=session,
            filters=SDebters(
                lender_id=int(
                    user_statistics)))

        engine.statistics[user_statistics]["result"] = engine.statistics[
                                                           user_statistics][
                                                           "lended_money"] - engine.statistics[
                                                           user_statistics]["borrowed_money"]

    for event in engine.db_info:
        await EventDAO.add(session=session, values=SEventAdd(trip_id=trip_id, name=event["event"]["name"],
                                                             payment=event["event"]["payment"],
                                                             total_money=event["event"]["total_money"]))

        event_id = await EventDAO.find_all(session=session,
                                           filters=SEventAdd(trip_id=trip_id, name=event["event"]["name"],
                                                             payment=event["event"]["payment"],
                                                             total_money=event["event"]["total_money"]))

        event_id = event_id[-1].id

        for main_person in event["main_persons"]:
            await MainPersonDAO.add(session=session, values=SMainPersonAdd(main_person_id=main_person["main_person_id"],
                                                                           event_id=event_id, paid=main_person["paid"],
                                                                           is_participate=int(main_person[
                                                                                                  "is_participate"])))
            if not main_person["is_participate"]:
                stats = await UserStatisticsDAO.find_one_or_none(
                    session=session, filters=SUserFindByUserId(user_id=main_person["main_person_id"]))

                if stats:
                    await UserStatisticsDAO.update(
                        session=session, filters=SUserFindByUserId(user_id=main_person["main_person_id"]),
                        values=SUserStatisticsUpdateTotalLent(total_lent=stats.total_lent + main_person["paid"]))
                else:
                    await UserStatisticsDAO.add(session=session,
                                                values=SUserStatisticsAdd(user_id=main_person["main_person_id"],
                                                                          total_borrowed=0,
                                                                          total_lent=main_person["paid"],
                                                                          groups_created=0))
            else:
                stats = await UserStatisticsDAO.find_one_or_none(
                    session=session, filters=SUserFindByUserId(user_id=main_person["main_person_id"]))

                if stats:
                    if main_person["paid"] - event["event"]["payment"] >= 0:
                        await UserStatisticsDAO.update(
                            session=session, filters=SUserFindByUserId(user_id=main_person["main_person_id"]),
                            values=SUserStatisticsUpdateTotalLent(
                                total_lent=stats.total_lent + main_person["paid"] - event["event"]["payment"]))
                    else:
                        await UserStatisticsDAO.update(
                            session=session, filters=SUserFindByUserId(user_id=main_person["main_person_id"]),
                            values=SUserStatisticsUpdateTotalBorrowed(
                                total_borrowed=stats.total_borrowed + main_person["paid"] - event["event"]["payment"]))
                else:
                    if main_person["paid"] - event["event"]["payment"] >= 0:
                        await UserStatisticsDAO.add(session=session,
                                                    values=SUserStatisticsAdd(user_id=main_person["main_person_id"],
                                                                              total_borrowed=0,
                                                                              total_lent=main_person["paid"],
                                                                              groups_created=0))
                    else:
                        await UserStatisticsDAO.add(session=session,
                                                    values=SUserStatisticsAdd(user_id=main_person["main_person_id"],
                                                                              total_borrowed=abs(main_person[
                                                                                                     "paid"] -
                                                                                                 event["event"][
                                                                                                     "payment"]),
                                                                              total_lent=0,
                                                                              groups_created=0))

        for other_person in event["other_persons"]:
            await OtherPersonDAO.add(session=session,
                                     values=SOtherPersonAdd(other_person_id=other_person["other_person_id"],
                                                            event_id=event_id))

            stats = await UserStatisticsDAO.find_one_or_none(
                session=session, filters=SUserFindByUserId(user_id=other_person["other_person_id"]))

            if stats:
                await UserStatisticsDAO.update(
                    session=session, filters=SUserFindByUserId(user_id=other_person["other_person_id"]),
                    values=SUserStatisticsUpdateTotalBorrowed(
                        total_borrowed=stats.total_borrowed + event["event"]["payment"]))
            else:
                await UserStatisticsDAO.add(session=session,
                                            values=SUserStatisticsAdd(user_id=other_person["other_person_id"],
                                                                      total_borrowed=event["event"]["payment"],
                                                                      total_lent=0,
                                                                      groups_created=0))

    """Добавление / обновление должников в БД"""
    for trip_member in trip_members:
        my_debters = []
        my_lenders = []
        for debter in trip_member.debters:
            check = await LendersDebtersDAO.find_one_or_none(session=session,
                                                             filters=SLendersDebtersFind(debter_id=debter.debter_id,
                                                                                         lender_id=debter.lender_id))
            if check:
                if debter.debt == 0:
                    await LendersDebtersDAO.delete(session=session,
                                                   filters=SLendersDebtersFind(debter_id=debter.debter_id,
                                                                               lender_id=debter.lender_id))
                    continue

                await LendersDebtersDAO.update(session=session, filters=SLendersDebtersFind(debter_id=debter.debter_id,
                                                                                            lender_id=debter.lender_id),
                                               values=SLendersDebtersUpdate(money=debter.debt))
                continue

            if debter.debt == 0:
                continue

            await LendersDebtersDAO.add(session=session, values=SLendersDebtersAdd(debter_id=debter.debter_id,
                                                                                   lender_id=debter.lender_id,
                                                                                   money=debter.debt))
        for lender in trip_member.lenders:
            check = await LendersDebtersDAO.find_one_or_none(session=session,
                                                             filters=SLendersDebtersFind(debter_id=lender.debter_id,
                                                                                         lender_id=lender.lender_id))

            if check:
                if lender.lend == 0:
                    await LendersDebtersDAO.delete(session=session,
                                                   filters=SLendersDebtersFind(debter_id=lender.debter_id,
                                                                               lender_id=lender.lender_id))
                    continue
                await LendersDebtersDAO.update(session=session, filters=SLendersDebtersFind(debter_id=lender.debter_id,
                                                                                            lender_id=lender.lender_id),
                                               values=SLendersDebtersUpdate(money=lender.lend))
                continue
            if lender.lend == 0:
                continue
            await LendersDebtersDAO.add(session=session, values=SLendersDebtersAdd(debter_id=lender.debter_id,
                                                                                   lender_id=lender.lender_id,
                                                                                   money=lender.lend))

        for debter in trip_member.debters:
            deb = await UsersDAO.find_one_or_none_by_id(session=session, data_id=debter.debter_id)
            my_debters.append(deb.last_name + " " + deb.first_name)

        for lender in trip_member.lenders:
            lendr = await UsersDAO.find_one_or_none_by_id(session=session, data_id=lender.debter_id)
            my_lenders.append(lendr.last_name + " " + lendr.first_name)

        if len(my_lenders) == 0 and len(my_debters) == 0:
            await MessageDAO.add(session=session, values=SMessageTrip(
                user_id=trip_member.user_id,
                message=f"Итоги поездки, состоящей из {len(events)}"
                        f" событий, в группе {proxi.name}, только"
                        f" что подведены."
                        f" За более"
                        f" подробной информацией перейдите в"
                        f" соответсвующие разделы",
                checked=0,
                created_at=datetime.now()))

        elif len(my_lenders) == 0:
            await MessageDAO.add(session=session, values=SMessageTrip(
                user_id=trip_member.user_id,
                message=f"Итоги поездки, состоящей из {len(events)}"
                        f" событий, в группе {proxi.name}, только"
                        f" что подведены. У вас появились должники:"
                        f" {', '.join(list(set(my_debters)))}."
                        f" За более"
                        f" подробной информацией перейдите в"
                        f" соответсвующие разделы",
                checked=0,
                created_at=datetime.now()))

        elif len(my_debters) == 0:
            await MessageDAO.add(session=session, values=SMessageTrip(
                user_id=trip_member.user_id,
                message=f"Итоги поездки, состоящей из {len(events)}"
                        f" событий, в группе {proxi.name}, только"
                        f" что подведены. У вас появились кредиторы:"
                        f" {', '.join(list(set(my_lenders)))}."
                        f" За более"
                        f" подробной информацией перейдите в"
                        f" соответсвующие разделы",
                checked=0,
                created_at=datetime.now()))

        else:
            await MessageDAO.add(session=session, values=SMessageTrip(
                user_id=trip_member.user_id,
                message=f"Итоги поездки, состоящей из {len(events)}"
                        f" событий, в группе {proxi.name}, только"
                        f" что подведены. У вас появились должники:"
                        f" {', '.join(list(set(my_debters)))}"
                        f" и кредиторы:"
                        f" {', '.join(list(set(my_lenders)))}."
                        f" За более"
                        f" подробной информацией перейдите в"
                        f" соответсвующие разделы",
                checked=0,
                created_at=datetime.now()))

    await LogDAO.add(session=session, values=SLogAdd(group_id=data.id,
                                                     message=f"опубликовал итоги",
                                                     type=1))

    log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=data.id,
                                                                    message=f"опубликовал итоги",
                                                                    type=1))

    await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

    await TripsLogDAO.add(session=session,
                          values=STripsLogAdd(message=data.name, log_id=log_id[-1].id,
                                              link=f"/api/trip/get_trip_short/{trip_id}", type="string"))

    for statistic in engine.statistics:
        lenders = await LendersDebtersDAO.amount(
            session=session,
            filters=SLenders(
                debter_id=int(
                    statistic)))

        debters = await LendersDebtersDAO.amount(
            session=session,
            filters=SDebters(
                lender_id=int(
                    statistic)))
        await TripStatisticsDAO.add(session=session, values=STripStatisticsAdd(user_id=int(statistic), trip_id=trip_id,
                                                                               borrowed_money=
                                                                               engine.statistics[statistic][
                                                                                   "borrowed_money"], lended_money=
                                                                               engine.statistics[statistic][
                                                                                   "lended_money"],
                                                                               lender=0 if (lenders -
                                                                                            engine.statistics[
                                                                                                statistic][
                                                                                                "lenders_before"]) <= 0
                                                                               else lenders -
                                                                                    engine.statistics[
                                                                                        statistic][
                                                                                        "lenders_before"],
                                                                               debter=0 if (debters -
                                                                                            engine.statistics[
                                                                                                statistic][
                                                                                                "debters_before"]) <= 0
                                                                               else debters -
                                                                                    engine.statistics[
                                                                                        statistic][
                                                                                        "debters_before"],
                                                                               participate=engine.statistics[statistic][
                                                                                   "participate"],
                                                                               result=engine.statistics[statistic][
                                                                                   "result"]))

    return {"message": f"Данные успешно обновлены", "ok": True}


@trip_router.get("/get_my_trips_short")
async def get_my_trips_short(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) \
        -> list[STripsInfo]:
    trips = await TripsDAO.find_all(session=session, filters=None)

    validated_trips = []

    for trip in reversed(trips[-50:]):
        if str(user_data.id) in trip.participants.split(";"):
            creator = await UsersDAO.find_one_or_none_by_id(session=session, data_id=trip.creator_id)
            group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=trip.group_id)

            validated_trips.append(STripsInfo(id=trip.id,
                                              creator=SUserShortInfo(user_id=trip.creator_id, avatar=creator.avatar,
                                                                     name=f"{creator.first_name} {creator.last_name}"),
                                              group=SGroupShortInfo(id=trip.group_id, name=group.name),
                                              trip_name=trip.name, wasted_money=trip.wasted_money,
                                              amount_events=trip.amount_events,
                                              amount_of_participants=len(trip.participants.split(";")),
                                              created_at=trip.created_at, amount_of_events=trip.amount_events))

    return validated_trips


@trip_router.get("/get_trips_short/{group_id}")
async def get_trips_short(group_id: str, user_data: User = Depends(get_current_user),
                          session: AsyncSession = SessionDep) -> list[STripsShortInfoForGroup]:
    try:
        group_id = int(group_id)

        await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)

        if not await UserGroupDAO.find_one_or_none(session=session,
                                                   filters=SInviteCheckBase(user_id=user_data.id, group_id=group_id)):
            return ForbiddenException

        trips = await TripsDAO.find_all(session=session, filters=STripsFindGroup(group_id=group_id))

        validated_trips = []

        for trip in reversed(trips):
            creator = await UsersDAO.find_one_or_none_by_id(session=session, data_id=trip.creator_id)

            validated_trips.append(STripsShortInfoForGroup(id=trip.id,
                                                           creator=SUserShortInfo(user_id=trip.creator_id,
                                                                                  avatar=creator.avatar,
                                                                                  name=f"{creator.first_name}"
                                                                                       f" {creator.last_name}"),
                                                           trip_name=trip.name,
                                                           created_at=trip.created_at))

        return validated_trips
    except ValueError:
        raise IncorrectId


@trip_router.get("/get_trip_full/{trip_id}")
async def get_trip_full(trip_id: str, user_data: User = Depends(get_current_user),
                        session: AsyncSession = SessionDep) -> STripsFullInfo:
    try:
        trip_id = int(trip_id)

        trip = await TripsDAO.find_one_or_none_by_id(session=session, data_id=trip_id)

        if not await UserGroupDAO.find_one_or_none(session=session,
                                                   filters=SUserGroupDeleteUserFind(group_id=trip.group_id,
                                                                                    user_id=user_data.id)):
            raise ForbiddenException

        events = await EventDAO.find_all(session=session, filters=SEventFindByTripId(trip_id=trip.id))
        events_list = []

        for event in events:
            main_persons_list, other_persons_list, validated_results = [], [], []

            main_persons = await MainPersonDAO.find_all(session=session,
                                                        filters=SPersonFindByEventId(event_id=event.id))

            other_persons = await OtherPersonDAO.find_all(session=session,
                                                          filters=SPersonFindByEventId(event_id=event.id))

            for main_person in main_persons:
                main_persons_list.append(SMainPersonFullInfo(
                    user=SUserShortInfo(avatar=main_person.user.avatar,
                                        name=f"{main_person.user.first_name}"
                                             f" {main_person.user.last_name[0]}.",
                                        user_id=main_person.user.id),
                    paid=round(main_person.paid, 3),
                    is_participate=main_person.is_participate,
                ))
                validated_results.append(SResultFullInfo(user=SUserShortInfo(avatar=main_person.user.avatar,
                                                                             name=f"{main_person.user.first_name}"
                                                                                  f" {main_person.user.last_name[0]}.",
                                                                             user_id=main_person.user.id),
                                                         money=round(main_person.paid if not main_person.is_participate
                                                                     else main_person.paid - event.payment, 3)))

            for other_person in other_persons:
                other_persons_list.append(
                    SUserShortInfo(avatar=other_person.user.avatar,
                                   name=f"{other_person.user.first_name}"
                                        f" {other_person.user.last_name[0]}.",
                                   user_id=other_person.user.id))
                validated_results.append(SResultFullInfo(user=SUserShortInfo(avatar=other_person.user.avatar,
                                                                             name=f"{other_person.user.first_name}"
                                                                                  f" {other_person.user.last_name[0]}.",
                                                                             user_id=other_person.user.id),
                                                         money=round(-event.payment, 3)))

            events_list.append(
                SEventFullInfo(id=event.id, name=event.name, payment=round(event.payment, 3),
                               total_money=round(event.total_money, 3), main_persons=main_persons_list,
                               other_persons=other_persons_list,
                               results=sorted(validated_results, key=lambda x: x.money, reverse=True)))

        group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=trip.group_id)
        statistics = await TripStatisticsDAO.find_all(session=session,
                                                      filters=STripStatisticFindByTripId(trip_id=trip.id))

        validated_statistics = []

        for statistic in statistics:
            user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=statistic.user_id)

            validated_statistics.append(
                STripStatisticFullInfo(user=SUserShortInfo(user_id=statistic.user_id, avatar=user.avatar,
                                                           name=f"{user.first_name} {user.last_name[0]}."),
                                       borrowed_money=round(statistic.borrowed_money, 3),
                                       lended_money=round(statistic.lended_money, 3), lender=statistic.lender,
                                       debter=statistic.debter, participate=statistic.participate,
                                       result=round(statistic.result, 3)))

        creator = await UsersDAO.find_one_or_none_by_id(session=session, data_id=trip.creator_id)

        return STripsFullInfo(id=trip.id, group=SGroupShortInfo(id=group.id, name=group.name),
                              creator=SUserShortInfo(user_id=trip.creator_id,
                                                     name=f"{creator.first_name} {creator.last_name}",
                                                     avatar=creator.avatar),
                              trip_name=trip.name,
                              amount_users=len(trip.participants.split(";")),
                              wasted_money=round(trip.wasted_money, 3), amount_events=trip.amount_events,
                              events=events_list,
                              statistics=validated_statistics, date=trip.created_at)
    except ValueError:
        raise IncorrectId
