from fastapi import APIRouter, Depends, Response, File, Form
from typing_extensions import Annotated
from PIL import Image
from app.dependencies.dependencies import get_current_user
from app.data.models import User
from app.dao.daos import UsersDAO, UserGroupDAO, LendersDebtersDAO, GroupDAO, MessageDAO, InviteDAO, LogDAO, \
    UserLogDAO, TripsDAO, UserStatisticsDAO, PaymentsDAO, EventDAO
from app.data.schemas import SUserMyDebtersFullInfo, SUserGroupID, SLenders, SDebters, SUserChange, SUserUpdate, \
    SGroupsByOwner, SUserLendersInfo, SUserDebtersInfo, SUserAllUsersInfo, SUserGroupsByIdInfo, \
    SLendersById, SDebtersById, SLenderDebterFind, SLogAdd, SLogGroupId, SUserUpdateAvatar, SUserAvatarUpdate, \
    SUserMyLendersInfo, SGroupId, SUserGroupDeleteUserFind, SGroupUpdateProxyAndOwnerFilter, \
    SGroupUpdateProxyAndOwner, SUserGroupFilter, SLendersDebtersDeleteUser, SMessageSend, SUserJoinGroup, \
    SInvitesCheckFromUser, SGroupAddUser, SInviteBase, SUserMeFullInfo, SGroupsById, SUserGroupDeleteGroupId, \
    SUserLogAdd, SInviteCheck, SUserShortInfo, SUserFullInfo, SUserStatistic, SUserFindByUserId, SPaymentsFindByFrom, \
    SGroupView, SGroupShortInfoWithStatus, SGroupShortInfo
from sqlalchemy.ext.asyncio import AsyncSession
from app.dao.session_maker import SessionDep, TransactionSessionDep
from app.exceptions import IncorrectId, NotFound, UserDebtsExist, UserAlreadyExistsInGroup
from datetime import datetime, timedelta
from app.utils import generate_filename, get_validated_statistics
from app.constants import default_image

user_router = APIRouter(prefix="/api/user", tags=["user"])


@user_router.put("/delete_me")
async def delete_me(response: Response, user_data: User = Depends(get_current_user),
                    session: AsyncSession = TransactionSessionDep) -> dict:
    if sum([debts.money for debts in
            await LendersDebtersDAO.find_all(session=session, filters=SLenders(debter_id=user_data.id))]):
        raise UserDebtsExist

    groups = await GroupDAO.find_all(session=session, filters=SGroupsByOwner(owner=user_data.id))

    for group in groups:
        if len(group.proxies.split(";")) == 1:
            await GroupDAO.delete(session=session, filters=SGroupId(id=group.id))
            await UserGroupDAO.delete(session=session, filters=SGroupsById(group_id=group.id))
            await LogDAO.delete(session=session, filters=SLogGroupId(group_id=group.id))

            continue

        current_proxies = group.proxies.split(";")

        del current_proxies[current_proxies.index(str(group.owner))]

        new_owner = await UsersDAO.find_one_or_none_by_id(session=session, data_id=int(current_proxies[0]))

        await LogDAO.add(session=session, values=SLogAdd(group_id=group.id,
                                                         message=f"покинул группу",
                                                         type=3))

        log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group.id,
                                                                        message=f"покинул группу",
                                                                        type=3))

        await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

        await LogDAO.add(session=session, values=SLogAdd(group_id=group.id,
                                                         message=f" - новый владелец!",
                                                         type=2))

        log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group.id,
                                                                        message=f" - новый владелец!",
                                                                        type=2))

        await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=new_owner.id, log_id=log_id[-1].id))

        await GroupDAO.update(session=session, filters=SGroupUpdateProxyAndOwnerFilter(id=group.id),
                              values=SGroupUpdateProxyAndOwner(proxies=";".join(current_proxies),
                                                               owner=int(current_proxies[0])))

    debters = await LendersDebtersDAO.find_all(session=session, filters=SDebters(lender_id=user_data.id))

    for debter in debters:
        await MessageDAO.add(session=session, values=SMessageSend(user_id=debter.debter_id,
                                                                  message=f"Пользователь {user_data.last_name}"
                                                                          f" только что удалил"
                                                                          f" свой аккаунт и простил"
                                                                          f" вам все долги!", checked=0,
                                                                  created_at=datetime.now()))

    response.delete_cookie(key="users_access_token")

    await UsersDAO.delete(session=session, filters=SUserChange(id=user_data.id))
    await UserGroupDAO.delete(session=session, filters=SUserGroupFilter(user_id=user_data.id))
    await LendersDebtersDAO.delete(session=session, filters=SLendersDebtersDeleteUser(lender_id=user_data.id))
    await MessageDAO.delete(session=session, filters=SUserGroupID(user_id=user_data.id))

    return {
        "message": f"Пользователь {user_data.first_name} {user_data.last_name} по ID {user_data.id} успешно удален!",
        "ok": True}


@user_router.put("/delete_debter")
async def delete_my_debter(delete_debter_data: SLendersById, user_data: User = Depends(get_current_user),
                           session: AsyncSession = TransactionSessionDep) -> dict:
    check = await LendersDebtersDAO.find_one_or_none_by_id(session=session,
                                                           data_id=delete_debter_data.debter_id)

    await MessageDAO.add(session=session, values=SMessageSend(user_id=check.debter_id,
                                                              message=f"Пользователь {user_data.last_name}"
                                                                      f" {user_data.first_name} простил вам долг!",
                                                              checked=0, created_at=datetime.now()))

    await LendersDebtersDAO.delete(session=session,
                                   filters=SLenderDebterFind(lender_id=user_data.id,
                                                             debter_id=check.debter_id))

    return {"message": f"Пользователь {user_data.first_name} {user_data.last_name} по ID {user_data.id}"
                       f" успешно удалил должника по ID {check.debter_id}!", "ok": True}


@user_router.put("/leave_from_group")
async def leave_from_group(group_id: SGroupsById, user_data: User = Depends(get_current_user),
                           session: AsyncSession = TransactionSessionDep) -> dict:
    group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id.group_id)

    check = await UserGroupDAO.find_one_or_none(session=session,
                                                filters=SGroupAddUser(user_id=user_data.id, group_id=group_id.group_id))

    if not check:
        raise NotFound

    if group.owner == user_data.id:
        if len(group.proxies.split(";")) == 1:
            members = await UserGroupDAO.find_all(session=session,
                                                  filters=SUserGroupDeleteGroupId(group_id=group_id.group_id))

            for member in members:
                if member.user_id != user_data.id:
                    await MessageDAO.add(session=session, values=SMessageSend(user_id=member.user_id,
                                                                              message=f"Группа {check.name},"
                                                                                      f" только что была "
                                                                                      f"расформирована", checked=0,
                                                                              created_at=datetime.now()))

            await GroupDAO.delete(session=session, filters=SGroupId(id=group_id.group_id))

            await UserGroupDAO.delete(session=session,
                                      filters=SUserGroupDeleteGroupId(group_id=group_id.group_id))

            await LogDAO.delete(session=session, filters=SLogGroupId(group_id=group_id.group_id))

        else:
            new_proxies = list(filter(lambda x: int(x) != user_data.id, group.proxies.split(";")))

            await GroupDAO.update(session=session, filters=SGroupId(id=group_id.group_id),
                                  values=SGroupUpdateProxyAndOwner(
                                      owner=int(new_proxies[0]), proxies=";".join(new_proxies)))

            await MessageDAO.add(session=session, values=SMessageSend(user_id=int(new_proxies[0]),
                                                                      message=f"Вы только что стали владельцем группы"
                                                                              f" {group.name}, так как предыдущий"
                                                                              f" владелец покинул группу",
                                                                      checked=0,
                                                                      created_at=datetime.now()))

            new_owner = await UsersDAO.find_one_or_none_by_id(session=session, data_id=int(new_proxies[0]))

            await LogDAO.add(session=session, values=SLogAdd(group_id=group_id.group_id,
                                                             message=f"покинул группу.",
                                                             type=3))

            log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group_id.group_id,
                                                                            message=f"покинул группу.",
                                                                            type=3))

            await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

            await LogDAO.add(session=session, values=SLogAdd(group_id=group_id.group_id,
                                                             message=f"- новый владелец",
                                                             type=2))

            log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group_id.group_id,
                                                                            message=f"- новый владелец",
                                                                            type=2))

            await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=new_owner.id, log_id=log_id[-1].id))

            await UserGroupDAO.delete(session=session, filters=SUserGroupDeleteUserFind(user_id=user_data.id,
                                                                                        group_id=group_id.group_id))

    elif str(user_data.id) in group.proxies.split(";"):
        await MessageDAO.add(session=session, values=SMessageSend(user_id=group.owner,
                                                                  message=f"Администратор группы {group.name}"
                                                                          f" {user_data.first_name}"
                                                                          f" {user_data.last_name}"
                                                                          " только что ее покинул",
                                                                  checked=0,
                                                                  created_at=datetime.now()))

        await GroupDAO.update(session=session, filters=SGroupsById(id=group_id.group_id),
                              values=SGroupUpdateProxyAndOwner(owner=group.owner, proxies=";".join(
                                  list(filter(lambda proxy: int(proxy) != user_data.id, group.proxies.split(";"))))))

        await LogDAO.add(session=session, values=SLogAdd(group_id=group_id.group_id,
                                                         message=f"покинул группу.",
                                                         type=3))

        log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group_id.group_id,
                                                                        message=f"покинул группу.",
                                                                        type=3))

        await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

        await UserGroupDAO.delete(session=session,
                                  filters=SUserGroupDeleteUserFind(user_id=user_data.id, group_id=group_id.group_id))

    else:
        await LogDAO.add(session=session, values=SLogAdd(group_id=group_id.group_id,
                                                         message=f"покинул группу.",
                                                         type=3))

        log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group_id.group_id,
                                                                        message=f"покинул группу.",
                                                                        type=3))

        await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

        await UserGroupDAO.delete(session=session,
                                  filters=SUserGroupDeleteUserFind(user_id=user_data.id, group_id=group_id.group_id))

    return {"message": "Удаление произошло успешно!", "ok": True}


@user_router.put("/update_me")
async def update_me(new_user_data: SUserUpdate, user_data: User = Depends(get_current_user),
                    session: AsyncSession = TransactionSessionDep) -> dict:
    new_user_data_dict = new_user_data.model_dump()

    await UsersDAO.update(session=session, filters=SUserChange(id=user_data.id),
                          values=SUserUpdate(**new_user_data_dict))
    return {
        "message": f"Пользователь {user_data.first_name} {user_data.last_name} по ID {user_data.id} успешно изменен!",
        "ok": True}


@user_router.post("/join_group")
async def join_group(join_group_data: SUserJoinGroup, user_data: User = Depends(get_current_user),
                     session: AsyncSession = TransactionSessionDep) -> dict:
    group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=join_group_data.group_id)

    check = await UserGroupDAO.find_one_or_none(session=session, filters=SGroupAddUser(
        user_id=user_data.id, group_id=join_group_data.group_id))

    if check:
        raise UserAlreadyExistsInGroup

    accept = await InviteDAO.find_one_or_none(session=session,
                                              filters=SInvitesCheckFromUser(user_id=user_data.id,
                                                                            group_id=join_group_data.group_id,
                                                                            direction=0))

    if not accept:
        user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=user_data.id)

        check = await InviteDAO.find_one_or_none(session=session, filters=SInviteCheck(
            user_id=user_data.id,
            group_id=join_group_data.group_id,
            direction=1))

        if check:
            return {"message": f"Просьба на вступление участника {user.first_name} {user.last_name} в группу"
                               f" {group.name} уже отправлена! Админы группы еще ни приняли ни отклонили заявку!",
                    "ok": False}

        if group.is_closed:
            return {"message": f"К сожалению не удалось отправить запрос на вступление в группу {group.name},"
                               f" так как эта группа закрыта", "ok": False}

        await InviteDAO.add(session=session, values=SInviteBase(user_id=user_data.id,
                                                                group_id=join_group_data.group_id,
                                                                checked=0,
                                                                message=join_group_data.message,
                                                                direction=1))

        return {"message": f"Просьба на вступление участника {user.first_name} {user.last_name} в группу"
                           f" {group.name} отправлена!", "ok": True}

    await UserGroupDAO.add(session=session,
                           values=SGroupAddUser(user_id=user_data.id, group_id=join_group_data.group_id))

    await InviteDAO.delete(session=session, filters=SInvitesCheckFromUser(user_id=user_data.id,
                                                                          group_id=join_group_data.group_id))

    await LogDAO.add(session=session, values=SLogAdd(group_id=group.id,
                                                     message=f"стал участником группы!",
                                                     type=1))

    log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group.id,
                                                                    message=f"стал участником группы!",
                                                                    type=1))

    await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

    return {"message": f"{user_data.id} присоединился к группе {join_group_data.group_id}!", "ok": True}


@user_router.post("/upload_avatar")
async def upload_avatar(file: Annotated[bytes, File()], extension: Annotated[str, Form()] = "png",
                        user_data: User = Depends(get_current_user),
                        session: AsyncSession = TransactionSessionDep) -> SUserUpdateAvatar:
    filename = generate_filename()

    with open(f"app/static/images/{filename}.{extension}", "wb") as new_file:
        new_file.write(file)

    image = Image.open(f"app/static/images/{filename}.{extension}")
    image = image.convert("RGB")

    image.save(f"app/static/links/{filename}.webp", "webp", optimize=True, quality=85)

    image_link = f"static/links/{filename}.webp"

    await UsersDAO.update(session=session, filters=SUserChange(id=user_data.id),
                          values=SUserAvatarUpdate(avatar=image_link))

    return SUserUpdateAvatar(file_name=f"{filename}.{extension}", image_link=image_link)


@user_router.get("/me")
async def get_me(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) -> SUserMeFullInfo:
    groups = await UserGroupDAO.find_all(session=session, filters=SUserGroupFilter(user_id=user_data.id))

    validated_groups = []
    for group in groups:
        group_info = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group.group_id)
        status = "Участник"

        if group_info.owner == user_data.id:
            status = "Владелец"
        elif str(user_data.id) in group_info.proxies.split(";"):
            status = "Администратор"

        validated_groups.append(
            SGroupShortInfoWithStatus(group=SGroupShortInfo(id=group_info.id, name=group_info.name), status=status,
                                      date_of_joining_group=group.created_at))

    return SUserMeFullInfo(id=user_data.id, email=user_data.email,
                           first_name=user_data.first_name, last_name=user_data.last_name, about=user_data.about,
                           is_private=user_data.is_private, is_closed=user_data.is_closed, avatar=user_data.avatar,
                           statistics=get_validated_statistics(
                               trips=await TripsDAO.find_all(session=session, filters=None), user_id=user_data.id),
                           created_at=user_data.created_at, groups=validated_groups,
                           amount_groups=len(validated_groups), balance=user_data.balance)


@user_router.get("/my_statistic")
async def get_my_statistic(user: User = Depends(get_current_user),
                           session: AsyncSession = SessionDep) -> SUserStatistic:
    expenses_by_month = {"Январь": 0,
                         "Февраль": 0, "Март": 0, "Апрель": 0, "Май": 0, "Июнь": 0, "Июль": 0, "Август": 0,
                         "Сентябрь": 0, "Октябрь": 0, "Ноябрь": 0, "Декабрь": 0}
    total_funds_transferred = 0

    for payment in await PaymentsDAO.find_all(session=session, filters=SPaymentsFindByFrom(from_user=user.id)):
        total_funds_transferred += payment.money

        if payment.created_at.month == 1:
            expenses_by_month["Январь"] += payment.money
            continue
        if payment.created_at.month == 2:
            expenses_by_month["Февраль"] += payment.money
            continue
        if payment.created_at.month == 3:
            expenses_by_month["Март"] += payment.money
            continue
        if payment.created_at.month == 4:
            expenses_by_month["Апрель"] += payment.money
            continue
        if payment.created_at.month == 5:
            expenses_by_month["Май"] += payment.money
            continue
        if payment.created_at.month == 6:
            expenses_by_month["Июнь"] += payment.money
            continue
        if payment.created_at.month == 7:
            expenses_by_month["Июль"] += payment.money
            continue
        if payment.created_at.month == 8:
            expenses_by_month["Август"] += payment.money
            continue
        if payment.created_at.month == 9:
            expenses_by_month["Сентябрь"] += payment.money
            continue
        if payment.created_at.month == 10:
            expenses_by_month["Октябрь"] += payment.money
            continue
        if payment.created_at.month == 11:
            expenses_by_month["Ноябрь"] += payment.money
            continue
        if payment.created_at.month == 12:
            expenses_by_month["Декабрь"] += payment.money
            continue

    recent_trips = get_validated_statistics(
        trips=await TripsDAO.find_all(session=session, filters=None), user_id=user.id)

    my_debts, my_lends = {}, {}
    total_debts, total_lends, trips_visited, events_visited = 0, 0, 0, 0

    for debter in await LendersDebtersDAO.find_all(session=session, filters=SDebters(lender_id=user.id)):
        user_debter = await UsersDAO.find_one_or_none_by_id(session=session, data_id=debter.debter_id)

        total_lends += debter.money
        my_lends[user_debter.first_name + " " + user_debter.last_name] = round(debter.money, 2)

    for lender in await LendersDebtersDAO.find_all(session=session, filters=SLenders(debter_id=user.id)):
        user_lender = await UsersDAO.find_one_or_none_by_id(session=session, data_id=lender.lender_id)

        total_debts += lender.money
        my_debts[user_lender.first_name + " " + user_lender.last_name] = round(lender.money, 2)

    just_for_check = []

    for trip in await TripsDAO.find_all(session=session, filters=None):
        if str(user.id) in trip.participants.split(";"):
            trips_visited += 1
            just_for_check.append(trip.id)

    for event in await EventDAO.find_all(session=session, filters=None):
        if event.trip_id in just_for_check:
            events_visited += 1

    user_statistic = await UserStatisticsDAO.find_one_or_none(session=session,
                                                              filters=SUserFindByUserId(user_id=user.id))

    return SUserStatistic(expenses_by_month=expenses_by_month,
                          recent_trips=recent_trips,
                          my_debts=my_debts,
                          my_lends=my_lends,
                          total_debts=round(total_debts, 2),
                          total_lends=round(total_lends, 2),
                          total_funds_transferred=round(total_funds_transferred, 2),
                          total_borrowed=round(user_statistic.total_borrowed, 2),
                          total_lent=round(user_statistic.total_lent, 2),
                          trips_visited=trips_visited,
                          events_visited=events_visited,
                          groups_created=user_statistic.groups_created,
                          account_age=(str((datetime.now() - user.created_at).days) + " дн."))


@user_router.get("/my_groups")
async def get_my_groups(user_data: User = Depends(get_current_user),
                        session: AsyncSession = SessionDep) -> list[SGroupView]:
    groups = await GroupDAO.find_all(session=session, filters=SGroupsByOwner(owner=user_data.id))

    validated_groups = []

    for group in groups:
        owner = await UsersDAO.find_one_or_none_by_id(session=session, data_id=group.owner)

        users = await UserGroupDAO.find_all(session=session, filters=SGroupsById(group_id=group.id))
        validated_participants = []

        for user in users:
            participant = await UsersDAO.find_one_or_none_by_id(session=session, data_id=user.user_id)

            if participant.id != owner.id:
                validated_participants.append(
                    SUserShortInfo(user_id=participant.id,
                                   name=f"{participant.first_name} {participant.last_name}",
                                   avatar=participant.avatar))

        validated_proxies = []

        for proxi in group.proxies.split(";"):
            validated_proxi = await UsersDAO.find_one_or_none_by_id(session=session, data_id=int(proxi))

            validated_proxies.append(SUserShortInfo(user_id=validated_proxi.id,
                                                    name=f"{validated_proxi.first_name} {validated_proxi.last_name}",
                                                    avatar=validated_proxi.avatar))

        validated_groups.append(
            SGroupView(id=group.id, name=group.name, about=group.about,
                       owner=SUserShortInfo(name=f"{owner.first_name} {owner.last_name}", avatar=owner.avatar,
                                            user_id=owner.id), participants=validated_participants,
                       proxies=validated_proxies))

    return validated_groups


@user_router.get("/my_groups_participate")
async def get_my_groups_participate(user_data: User = Depends(get_current_user),
                                    session: AsyncSession = SessionDep) -> list[SGroupView]:
    groups_participate = await UserGroupDAO.find_all(session=session, filters=SUserGroupID(user_id=user_data.id))
    groups = []

    for group_participate in groups_participate:
        groups.append(await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_participate.group_id))

    validated_groups = []

    for group in groups:
        owner = await UsersDAO.find_one_or_none_by_id(session=session, data_id=group.owner)

        users = await UserGroupDAO.find_all(session=session, filters=SGroupsById(group_id=group.id))
        validated_participants = []

        for user in users:
            participant = await UsersDAO.find_one_or_none_by_id(session=session, data_id=user.user_id)

            if participant.id != owner.id:
                validated_participants.append(
                    SUserShortInfo(user_id=participant.id,
                                   name=f"{participant.first_name} {participant.last_name}",
                                   avatar=participant.avatar))

        validated_proxies = []

        for proxi in group.proxies.split(";"):
            validated_proxi = await UsersDAO.find_one_or_none_by_id(session=session, data_id=int(proxi))

            validated_proxies.append(SUserShortInfo(user_id=validated_proxi.id,
                                                    name=f"{validated_proxi.first_name} {validated_proxi.last_name}",
                                                    avatar=validated_proxi.avatar))

        validated_groups.append(
            SGroupView(id=group.id, name=group.name, about=group.about,
                       owner=SUserShortInfo(name=f"{owner.first_name} {owner.last_name}", avatar=owner.avatar,
                                            user_id=owner.id), participants=validated_participants,
                       proxies=validated_proxies))

    return validated_groups


@user_router.get("/my_debters")
async def get_my_debters(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) \
        -> list[SUserMyDebtersFullInfo]:

    debters = await LendersDebtersDAO.find_all(session=session, filters=SDebters(lender_id=user_data.id))
    validated_lenders = []

    for debter in debters:
        user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=debter.lender_id)

        time_diff = datetime.now() - debter.reminded_at
        new_time = debter.reminded_at + timedelta(days=3)

        if time_diff.days > 3:
            time_diff = None
        else:
            ans_time = (new_time - datetime.now()).total_seconds()
            time_diff = str(int(ans_time // 3600)) + " ч." + " " + str(int(ans_time % 60)) + " м."

        validated_lenders.append(
            SUserMyDebtersFullInfo(id=debter.id, debter=SUserShortInfo(user_id=debter.lender_id,
                                                                       name=f"{user.first_name} {user.last_name}",
                                                                       avatar=user.avatar),
                                   money=debter.money, remind_time=time_diff,
                                   remind_button=True if time_diff is None else False,
                                   created_at=str(debter.created_at.day) + " дн."))
    return validated_lenders


@user_router.get("/my_lenders")
async def get_my_lenders(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) \
        -> list[SUserMyLendersInfo]:
    debters = await LendersDebtersDAO.find_all(session=session, filters=SLenders(debter_id=user_data.id))

    validated_debters = []
    for debter in debters:
        user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=debter.lender_id)

        validated_debters.append(
            SUserMyLendersInfo(id=debter.id,
                               lender=SUserShortInfo(user_id=user.id, name=f"{user.first_name} {user.last_name}",
                                                     avatar=user.avatar),
                               money=debter.money,
                               created_at=str((datetime.now() - debter.created_at).days) + " д."))
    return validated_debters


@user_router.get("/my_lends")
async def get_my_lends(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) -> dict:
    debters = await LendersDebtersDAO.find_all(session=session,
                                               filters=SDebters(lender_id=user_data.id))

    return {"lends": sum([lends.money for lends in
                          debters]), "amount_debters": len(debters)}


@user_router.get("/my_debts")
async def get_my_debts(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) -> dict:
    lenders = await LendersDebtersDAO.find_all(session=session,
                                               filters=SLenders(debter_id=user_data.id))

    return {"debts": sum([debts.money for debts in
                          lenders]), "amount_lenders": len(lenders)}


@user_router.get("/all_users")
async def get_all_users(session: AsyncSession = SessionDep) -> list[SUserAllUsersInfo]:
    users = await UsersDAO.find_all(session=session, filters=None)
    validated_users = []
    for user in users:
        validated_users.append(
            SUserAllUsersInfo(id=user.id, email=user.email,
                              first_name=user.first_name,
                              last_name=user.last_name, about=user.about, is_private=user.is_private,
                              is_closed=user.is_closed, created_at=user.created_at, avatar=user.avatar))
    return validated_users


@user_router.get("/{user_id}")
async def get_user(user_id: str, user_data: User = Depends(get_current_user),
                   session: AsyncSession = SessionDep) -> SUserFullInfo:
    try:
        user_id = int(user_id)
        user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=user_id)

        print(user.is_private)
        if user.is_private and user_data.id != user_id:
            print(3213123123)
            return SUserFullInfo(id=user_data.id, email=None,
                                 first_name=user.first_name, last_name=None,
                                 about=None,
                                 is_private=user.is_private, is_closed=user.is_closed,
                                 avatar=default_image,
                                 statistics=None, created_at=user.created_at, groups=None)

        groups = await UserGroupDAO.find_all(session=session, filters=SUserGroupFilter(user_id=user_id))

        validated_groups = []
        for group in groups:
            group_info = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group.group_id)
            status = "Участник"

            if group_info.owner == user_id:
                status = "Владелец"
            elif str(user_id) in group_info.proxies.split(";"):
                status = "Администратор"

            validated_groups.append(
                SGroupShortInfoWithStatus(group=SGroupShortInfo(id=group_info.id, name=group_info.name), status=status,
                                          date_of_joining_group=group.created_at))

        return SUserFullInfo(id=user.id, email=user.email,
                             first_name=user.first_name, last_name=user.last_name, about=user.about,
                             is_private=user.is_private, is_closed=user.is_closed, avatar=user.avatar,
                             statistics=get_validated_statistics(
                                 trips=await TripsDAO.find_all(session=session, filters=None), user_id=user.id),
                             created_at=user.created_at, groups=validated_groups,
                             amount_groups=len(validated_groups))
    except ValueError:
        raise IncorrectId


@user_router.get("/is_private/{user_id}")
async def get_user_is_private(user_id: str, session: AsyncSession = SessionDep) -> bool:
    try:
        user_id = int(user_id)
        user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=int(user_id))
        return bool(user.is_private)
    except ValueError:
        raise IncorrectId


@user_router.get("/is_closed/{user_id}")
async def get_user_is_closed(user_id: str, session: AsyncSession = SessionDep) -> bool:
    try:
        user_id = int(user_id)
        user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=int(user_id))
        return bool(user.is_closed)
    except ValueError:
        raise IncorrectId


@user_router.get("/groups/{user_id}")
async def get_user_groups(user_id: str, session: AsyncSession = SessionDep) -> list[SUserGroupsByIdInfo]:
    try:
        user_id = int(user_id)
        await UsersDAO.find_one_or_none_by_id(session=session, data_id=user_id)
        groups = await UserGroupDAO.find_all(session=session, filters=SUserGroupID(user_id=user_id))

        validated_groups = []
        for group in groups:
            validated_groups.append(
                SUserGroupsByIdInfo(proxies=group.group.proxies, about=group.group.about,
                                    name=group.group.name,
                                    created_at=group.group.created_at, owner=group.group.owner,
                                    id=group.group.id, is_closed=bool(group.group.is_closed),
                                    is_private=bool(group.group.is_private)))
        return validated_groups
    except ValueError:
        raise IncorrectId


@user_router.get("/lenders/{user_id}")
async def get_user_lenders(user_id: str, session: AsyncSession = SessionDep) -> list[SUserLendersInfo]:
    try:
        user_id = int(user_id)
        await UsersDAO.find_one_or_none_by_id(session=session, data_id=user_id)
        lenders = await LendersDebtersDAO.find_all(session=session, filters=SLendersById(debter_id=user_id))

        validated_lenders = []
        for lender in lenders:
            validated_lenders.append(
                SUserLendersInfo(id=lender.id, debter_id=lender.debter_id, lender_id=lender.lender_id,
                                 money=lender.money,
                                 created_at=lender.created_at))
        return validated_lenders
    except ValueError:
        raise IncorrectId


@user_router.get("/debters/{user_id}")
async def get_user_debters(user_id: str, session: AsyncSession = SessionDep) -> list[SUserDebtersInfo]:
    try:
        user_id = int(user_id)
        await UsersDAO.find_one_or_none_by_id(session=session, data_id=user_id)
        debters = await LendersDebtersDAO.find_all(session=session, filters=SDebtersById(lender_id=user_id))

        validated_debters = []
        for debter in debters:
            validated_debters.append(
                SUserDebtersInfo(id=debter.id, debter_id=debter.debter_id, lender_id=debter.lender_id,
                                 money=debter.money,
                                 created_at=debter.created_at))
        return validated_debters
    except ValueError:
        raise IncorrectId
