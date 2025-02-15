from fastapi import APIRouter
from app.dao.daos import GroupDAO, UserGroupDAO, MessageDAO, InviteDAO, UserStatisticsDAO, UsersDAO, LogDAO, \
    UserLogDAO, TripsDAO, EventDAO
from sqlalchemy.ext.asyncio import AsyncSession
from app.dao.session_maker import SessionDep, TransactionSessionDep
from app.exceptions import IncorrectId, TooManyGroups, UserAlreadyExistsInGroup, ForbiddenException, NotFound, \
    UserAlreadyAdmin, CantDeleteOwner
from app.data.schemas import SGroupOwner, SGroupByOwnerInfo, SGroupBase, SGroupAddUser, SGroupsById, SGroupId, \
    SGroupChange, SGroupSetChanges, SGroupDeleteUser, SUserGroupDeleteUserFind, SGroupAddProxi, SGroupUpdateProxies, \
    SGroupDeleteProxy, SGroupsInfo, SMessageSend, SLogGroupId, SLogAdd, \
    SUserGroupDeleteGroupId, SInvitesCheckFromGroup, SInviteBase, SUserGroupFilter, SUserLogAdd, \
    SGroupFullInfo, SUserShortInfo, SUserFindByUserId, SUserStatisticsUpdateGroup, SUserStatisticsAdd, SGroupInvite, \
    SInvitesCheckFromUser, SGroupNewId, SGroupWithoutProxies
from app.dependencies.dependencies import get_current_user, Depends
from app.data.models import User
from datetime import datetime
from app.constants import default_image

group_router = APIRouter(prefix="/api/group", tags=["group"])


@group_router.put("/delete_group")
async def delete_group(delete_group_data: SGroupNewId, user_data: User = Depends(get_current_user),
                       session: AsyncSession = TransactionSessionDep) -> dict:
    check = await GroupDAO.find_one_or_none_by_id(session=session, data_id=delete_group_data.group_id)

    if check.owner != user_data.id:
        raise ForbiddenException

    members = await UserGroupDAO.find_all(session=session,
                                          filters=SUserGroupDeleteGroupId(group_id=delete_group_data.group_id))

    for member in members:
        if member.user_id != user_data.id:
            await MessageDAO.add(session=session, values=SMessageSend(user_id=member.user_id,
                                                                      message=f"Группа {check.name}, только что была "
                                                                              f"расформирована", checked=0,
                                                                      created_at=datetime.now()))

    await GroupDAO.delete(session=session, filters=SGroupId(id=delete_group_data.group_id))
    await UserGroupDAO.delete(session=session,
                              filters=SUserGroupDeleteGroupId(group_id=delete_group_data.group_id))

    await LogDAO.delete(session=session, filters=SLogGroupId(group_id=delete_group_data.group_id))

    return {
        "message": f"Группа {delete_group_data.group_id} пользователя {user_data.id} успешно удалена!", "ok": True}


@group_router.put("/delete_user_from_group")
async def delete_user_from_group(delete_user_data: SGroupDeleteUser, user_data: User = Depends(get_current_user),
                                 session: AsyncSession = TransactionSessionDep) -> dict:
    check = await GroupDAO.find_one_or_none_by_id(session=session, data_id=delete_user_data.group_id)

    if (str(user_data.id) not in check.proxies.split(";")) or (
            str(delete_user_data.user_id) in check.proxies.split(";") and user_data.id != check.owner):
        raise ForbiddenException

    check_1 = await UserGroupDAO.find_one_or_none(session=session,
                                                  filters=SUserGroupDeleteUserFind(group_id=delete_user_data.group_id,
                                                                                   user_id=delete_user_data.user_id))
    if not check_1:
        raise NotFound

    new_proxies = check.proxies.split(";")

    if str(delete_user_data.user_id) in new_proxies:
        del new_proxies[new_proxies.index(str(delete_user_data.user_id))]

    await MessageDAO.add(session=session, values=SMessageSend(user_id=check_1.user_id,
                                                              message=f"Вы только что были удалены из группы"
                                                                      f" {check.name}", checked=0,
                                                              created_at=datetime.now()))

    await UserGroupDAO.delete(session=session, filters=SUserGroupDeleteUserFind(group_id=delete_user_data.group_id,
                                                                                user_id=delete_user_data.user_id))

    await GroupDAO.update(session=session, filters=SGroupId(id=delete_user_data.group_id),
                          values=SGroupUpdateProxies(proxies=";".join(new_proxies)))

    await LogDAO.add(session=session, values=SLogAdd(group_id=delete_user_data.group_id,
                                                     message=f"исключен из группы!",
                                                     type=3))
    log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=delete_user_data.group_id,
                                                                    message=f"исключен из группы!",
                                                                    type=3))

    await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=delete_user_data.group_id, log_id=log_id[-1].id))

    return {"message": f"Пользователь группы {delete_user_data.group_id} под ID {delete_user_data.user_id}"
                       f" удален пользователем {user_data.id}", "ok": True}


@group_router.put("/update_group")
async def update_group(update_user_data: SGroupChange, user_data: User = Depends(get_current_user),
                       session: AsyncSession = TransactionSessionDep) -> dict:
    proxi = await GroupDAO.find_one_or_none_by_id(session=session, data_id=update_user_data.id)
    if str(user_data.id) not in proxi.proxies.split(";"):
        raise ForbiddenException

    update_user_data_dict = update_user_data.model_dump()
    group_id = update_user_data_dict["id"]
    del update_user_data_dict["id"]

    if user_data.id != proxi.owner:
        await MessageDAO.add(session=session, values=SMessageSend(user_id=proxi.owner,
                                                                  message=f"Данные о группе {proxi.name},"
                                                                          f" были только что изменены администратором"
                                                                          f" {user_data.last_name}"
                                                                          f" {user_data.first_name}",
                                                                  checked=0,
                                                                  created_at=datetime.now()))

    await GroupDAO.update(session=session, filters=SGroupId(id=group_id),
                          values=SGroupSetChanges(**update_user_data_dict))

    await LogDAO.add(session=session, values=SLogAdd(group_id=update_user_data.id,
                                                     message=f"изменил данные о группе!",
                                                     type=2))

    log_id = await LogDAO.find_all(session=session,
                                   filters=SLogAdd(group_id=update_user_data.id,
                                                   message=f"изменил данные о группе!",
                                                   type=2))

    await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

    return {"message": f"Группа {update_user_data.id} была изменена!", "ok": True}


@group_router.put("/add_proxi")
async def add_proxi_to_group(add_proxi_data: SGroupAddProxi, user_data: User = Depends(get_current_user),
                             session: AsyncSession = TransactionSessionDep) -> dict:
    check = await GroupDAO.find_one_or_none_by_id(session=session, data_id=add_proxi_data.group_id)

    if check.owner != user_data.id:
        raise ForbiddenException

    correct_ids = []

    for user_id in add_proxi_data.ids:
        check_1 = await UserGroupDAO.find_one_or_none(session=session,
                                                      filters=SUserGroupDeleteUserFind(user_id=user_id,
                                                                                       group_id=
                                                                                       add_proxi_data.group_id))
        if not check_1:
            raise NotFound

        if str(user_id) in check.proxies.split(";"):
            raise UserAlreadyAdmin

        await MessageDAO.add(session=session, values=SMessageSend(user_id=check_1.user_id,
                                                                  message=f"Вы только что стали администратором"
                                                                          f" в группе"
                                                                          f" {check.name}", checked=0,
                                                                  created_at=datetime.now()))
        correct_ids.append(user_id)

    if correct_ids:
        new_proxies = check.proxies + ";" + ";".join(map(str, correct_ids))

        await GroupDAO.update(session=session, filters=SGroupId(id=add_proxi_data.group_id),
                              values=SGroupUpdateProxies(proxies=new_proxies))

        new_proxies_data = []

        for new_proxy in correct_ids:
            new_proxies_data.append(await UsersDAO.find_one_or_none_by_id(session=session, data_id=new_proxy))

        for ids in add_proxi_data.ids:
            await LogDAO.add(session=session, values=SLogAdd(group_id=check.id,
                                                             message=f"стал новым"
                                                                     f" администратором", type=2))

            log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=check.id,
                                                                            message=f"стал новым"
                                                                                    f" администратором", type=2))

            await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=ids, log_id=log_id[-1].id))

        return {"message": f"Пользователи {add_proxi_data.ids}"
                           f" успешно стали доверяемыми личностями в группе {add_proxi_data.group_id}", "ok": True}
    return {"message": f"Пользователей для установки доверия нет", "ok": False}


@group_router.put("/delete_proxi")
async def delete_proxy_from_group(delete_proxi_data: SGroupDeleteProxy, user_data: User = Depends(get_current_user),
                                  session: AsyncSession = TransactionSessionDep) -> dict:
    check = await GroupDAO.find_one_or_none_by_id(session=session, data_id=delete_proxi_data.group_id)

    if check.owner != user_data.id:
        raise ForbiddenException

    correct_ids = []

    for user_id in delete_proxi_data.ids:
        check_1 = await UserGroupDAO.find_one_or_none(session=session,
                                                      filters=SUserGroupDeleteUserFind(user_id=user_id,
                                                                                       group_id=
                                                                                       delete_proxi_data.group_id))
        if not check_1:
            raise NotFound

        correct_ids.append(user_id)

    new_proxies = check.proxies.split(";")

    for correct_id in correct_ids:
        if str(correct_id) not in new_proxies:
            raise NotFound

        if correct_id == check.owner:
            raise CantDeleteOwner

    for correct_id in correct_ids:
        await MessageDAO.add(session=session, values=SMessageSend(user_id=correct_id,
                                                                  message=f"К сожалению, вы только что перестали быть"
                                                                          f" администратором"
                                                                          f" в группе"
                                                                          f" {check.name}", checked=0,
                                                                  created_at=datetime.now()))
        del new_proxies[new_proxies.index(str(correct_id))]

    previous_proxies = []

    for correct_id in correct_ids:
        previous_proxies.append(await UsersDAO.find_one_or_none_by_id(session=session, data_id=correct_id))

    for ids in delete_proxi_data.ids:
        await LogDAO.add(session=session, values=SLogAdd(group_id=delete_proxi_data.group_id,
                                                         message=f"перестал быть администратором",
                                                         type=2))

        log_id = await LogDAO.find_all(session=session,
                                       filters=SLogAdd(group_id=delete_proxi_data.group_id,
                                                       message=f"перестал быть администратором",
                                                       type=2))

        await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=ids, log_id=log_id[-1].id))

    await GroupDAO.update(session=session, filters=SGroupId(id=delete_proxi_data.group_id),
                          values=SGroupUpdateProxies(proxies=";".join(map(str, new_proxies))))

    return {"message": f"Пользователи {delete_proxi_data.ids}"
                       f" успешно удалены из доверяемых личностей из группе {delete_proxi_data.group_id}", "ok": True}


@group_router.post("/new_group")
async def new_group(group_data: SGroupWithoutProxies, user_data: User = Depends(get_current_user),
                    session: AsyncSession = TransactionSessionDep) -> dict:
    check = await GroupDAO.amount(session=session, filters=SGroupOwner(owner=user_data.id))
    if check >= 10:
        raise TooManyGroups

    group_data_dict = group_data.model_dump()
    group_data_dict["owner"] = user_data.id
    group_data_dict["proxies"] = str(user_data.id)

    await GroupDAO.add(session=session, values=SGroupBase(**group_data_dict))
    find_id = await GroupDAO.find_all(session=session, filters=SGroupBase(**group_data_dict))

    await UserGroupDAO.add(session=session, values=SGroupAddUser(user_id=user_data.id, group_id=find_id[-1].id))
    last_id = await GroupDAO.find_all(session=session, filters=SGroupBase(**group_data_dict))

    await LogDAO.add(session=session, values=SLogAdd(group_id=last_id[-1].id,
                                                     message=f"создал группу!",
                                                     type=1))

    log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=last_id[-1].id,
                                                                    message=f"создал группу!",
                                                                    type=1))

    await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

    stats = await UserStatisticsDAO.find_one_or_none(session=session, filters=SUserFindByUserId(user_id=user_data.id))
    if stats:
        await UserStatisticsDAO.update(session=session,
                                       values=SUserStatisticsUpdateGroup(groups_created=stats.groups_created + 1),
                                       filters=SUserFindByUserId(user_id=user_data.id))
    else:
        await UserStatisticsDAO.add(session=session,
                                    values=SUserStatisticsAdd(user_id=user_data.id, total_borrowed=0, total_lent=0,
                                                              groups_created=1))

    return {"message": f"Группа под ID {last_id[-1].id} успешно создана!", "ok": True}


@group_router.post("/add_user")
async def add_user_to_group(add_user_data: SGroupInvite, user_data: User = Depends(get_current_user),
                            session: AsyncSession = TransactionSessionDep) -> dict:
    check = await UserGroupDAO.find_one_or_none(session=session, filters=SGroupAddUser(
        user_id=add_user_data.user_id, group_id=add_user_data.group_id))

    if check:
        raise UserAlreadyExistsInGroup

    proxi = await GroupDAO.find_one_or_none_by_id(session=session, data_id=add_user_data.group_id)

    if str(user_data.id) not in proxi.proxies.split(";"):
        raise ForbiddenException

    accept = await InviteDAO.find_one_or_none(session=session,
                                              filters=SInvitesCheckFromGroup(user_id=add_user_data.user_id,
                                                                             group_id=add_user_data.group_id,
                                                                             direction=1))

    user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=add_user_data.user_id)

    if not accept:
        check = await InviteDAO.find_one_or_none(session=session,
                                                 filters=SInvitesCheckFromGroup(user_id=add_user_data.user_id,
                                                                                group_id=add_user_data.group_id,
                                                                                direction=0))

        if check:
            return {"message": f"Приглашение на вступление участника {user.first_name} {user.last_name} в группу"
                               f" {proxi.name} уже отправлено! Пользователь еще ни принял ни отклонил заявку!",
                    "ok": False}

        if proxi.is_closed:
            return {"message": f"Приглашение на вступление участника {user.first_name} {user.last_name} в группу"
                               f" {proxi.name} не отправлено так как данный пользователь запретил отправку приглашений",
                    "ok": False}

        await InviteDAO.add(session=session, values=SInviteBase(user_id=add_user_data.user_id,
                                                                group_id=add_user_data.group_id,
                                                                checked=0,
                                                                message=add_user_data.message,
                                                                direction=0))

        return {"message": f"Приглашение на вступление участника {user.first_name} {user.last_name} в группу"
                           f" {proxi.name} отправлено!", "ok": True}

    await UserGroupDAO.add(session=session,
                           values=SGroupAddUser(user_id=add_user_data.user_id, group_id=add_user_data.group_id))

    await InviteDAO.delete(session=session, filters=SInvitesCheckFromGroup(user_id=add_user_data.user_id,
                                                                           group_id=add_user_data.group_id))

    await LogDAO.add(session=session, values=SLogAdd(group_id=add_user_data.group_id,
                                                     message=f"стал участником группы!",
                                                     type=1))

    log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=add_user_data.group_id,
                                                                    message=f"стал участником группы!",
                                                                    type=1))

    await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=add_user_data.user_id, log_id=log_id[-1].id))

    return {"message": f"Участник {add_user_data.user_id} добавлен в группу {add_user_data.group_id}!", "ok": True}


@group_router.get("/all_groups")
async def get_all_groups(session: AsyncSession = SessionDep) -> list[SGroupsInfo]:
    groups = await GroupDAO.find_all(session=session, filters=None)
    validated_groups = []

    for group in groups:
        validated_groups.append(
            SGroupsInfo(id=group.id, name=group.name, about=group.about, owner=group.owner, proxies=group.proxies,
                        created_at=group.created_at, is_private=group.is_private, is_closed=group.is_closed))
    return validated_groups


@group_router.get("/owns/{owner_id}")
async def get_groups_by_owner(owner_id: str, session: AsyncSession = SessionDep) -> list[SGroupByOwnerInfo]:
    try:
        owner_id = int(owner_id)
        groups = await GroupDAO.find_all(session=session, filters=SGroupOwner(owner=owner_id))
        validated_groups = []
        for group in groups:
            validated_groups.append(
                SGroupByOwnerInfo(id=group.id, name=group.name, about=group.about, owner=group.owner,
                                  proxies=group.proxies,
                                  created_at=group.created_at))

        return validated_groups
    except ValueError:
        raise IncorrectId


@group_router.get("/suitable_to_proxi/{group_id}")
async def get_suitable_to_proxi(group_id: str, user_data: User = Depends(get_current_user),
                                session: AsyncSession = SessionDep) -> list[SUserShortInfo]:
    try:
        group_id = int(group_id)

        group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)

        if str(user_data.id) not in group.proxies.split(";"):
            raise ForbiddenException

        users_in_group = await UserGroupDAO.find_all(session=session, filters=SGroupsById(group_id=group_id))

        validated_users = []

        for user in users_in_group:
            if str(user.user_id) not in group.proxies.split(";"):
                user_to_add = await UsersDAO.find_one_or_none_by_id(session=session, data_id=user.user_id)
                validated_users.append(SUserShortInfo(user_id=user_to_add.id, avatar=user_to_add.avatar,
                                                      name=f"{user_to_add.first_name} {user_to_add.last_name}"))

        return validated_users
    except ValueError:
        raise IncorrectId


@group_router.get("/homies")
async def get_homies(user_data: User = Depends(get_current_user),
                     session: AsyncSession = SessionDep) -> list[SUserShortInfo]:
    async def check_exists(user_id: int) -> bool:
        for homien in all_homies:
            if homien.id == user_id:
                return False
        return True

    groups = await UserGroupDAO.find_all(session=session, filters=SUserGroupFilter(user_id=user_data.id))

    all_homies, validated_homies = [], []

    for group in groups:
        users = await UserGroupDAO.find_all(session=session, filters=SGroupsById(group_id=int(group.group_id)))

        for user in users:
            if user.user_id != user_data.id and await check_exists(user.user_id):
                all_homies.append(user)

    for homie in all_homies:
        info = await UsersDAO.find_one_or_none_by_id(session=session, data_id=homie.user_id)

        validated_homies.append(
            SUserShortInfo(name=f"{info.first_name} {info.last_name}", avatar=info.avatar, user_id=info.id))

    return validated_homies


@group_router.get("/participates/{group_id}")
async def get_group_participates(group_id: str, user_data: User = Depends(get_current_user),
                                 session: AsyncSession = SessionDep) -> list[SUserShortInfo]:
    try:
        group_id = int(group_id)

        group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)

        if group.is_private and str(user_data.id) not in group.proxies.split(";"):
            raise ForbiddenException

        users = await UserGroupDAO.find_all(session=session, filters=SGroupsById(group_id=int(group_id)))
        validated_users = []

        for user in users:
            validated_users.append(
                SUserShortInfo(user_id=user.user.id, name=f"{user.user.first_name} {user.user.last_name}",
                               avatar=user.user.avatar))
        return validated_users

    except ValueError:
        raise IncorrectId


@group_router.get("/is_me_in_proxi/{group_id}")
async def get_is_proxi_in_group(group_id: str, user_data: User = Depends(get_current_user),
                                session: AsyncSession = SessionDep) -> bool:
    try:
        group_id = int(group_id)
        result = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)

        return str(user_data.id) in result.proxies.split(";")
    except ValueError:
        raise IncorrectId


@group_router.get("/{group_id}")
async def get_group_by_id(group_id: str, user_data: User = Depends(get_current_user),
                          session: AsyncSession = SessionDep) -> SGroupFullInfo:
    try:
        group_id = int(group_id)
        group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)
        owner = await UsersDAO.find_one_or_none_by_id(session=session, data_id=group.owner)
        amount = await UserGroupDAO.amount(session=session, filters=SGroupsById(group_id=group.id))
        users = await UserGroupDAO.find_all(session=session, filters=SGroupsById(group_id=group.id))
        trips = await TripsDAO.find_all(session=session, filters=SGroupsById(group_id=group.id))

        validated_participants = []

        check = await UserGroupDAO.find_one_or_none(session=session,
                                                    filters=SGroupAddUser(user_id=user_data.id,
                                                                          group_id=group_id))

        if group.is_private and not check:
            return SGroupFullInfo(proxies=None, about=group.about, name=group.name,
                                  created_at=None,
                                  owner=SUserShortInfo(user_id=owner.id, name=f"{owner.first_name}",
                                                       avatar=default_image),
                                  id=group.id,
                                  is_private=bool(group.is_private),
                                  is_closed=bool(group.is_closed), amount_of_users=None,
                                  participants=None, amount_of_events=None,
                                  amount_of_trips=None, possible_to_join=False, access_level=None)

        trips_group_ids = [trip.group_id for trip in trips]
        amount_of_events = sum(
            1 for event in await EventDAO.find_all(session=session, filters=None) if event.trip_id in trips_group_ids)

        for user in users:
            participant = await UsersDAO.find_one_or_none_by_id(session=session, data_id=user.user_id)

            if participant.id != owner.id and str(user.user_id) not in group.proxies.split(";"):
                validated_participants.append(
                    SUserShortInfo(user_id=participant.id, avatar=participant.avatar,
                                   name=f"{participant.first_name} {participant.last_name}"))

        validated_proxies = []

        for proxi in group.proxies.split(";"):
            if int(proxi) != owner.id:
                validated_proxi = await UsersDAO.find_one_or_none_by_id(session=session, data_id=int(proxi))

                validated_proxies.append(SUserShortInfo(user_id=validated_proxi.id, avatar=validated_proxi.avatar,
                                                        name=f"{validated_proxi.first_name} "
                                                             f"{validated_proxi.last_name}"))

        if not check:
            access_level = None
        else:
            if user_data.id == group.owner:
                access_level = 2
            elif str(user_data.id) in group.proxies.split(";"):
                access_level = 1
            else:
                access_level = 0

        return SGroupFullInfo(proxies=validated_proxies, about=group.about, name=group.name,
                              created_at=group.created_at,
                              owner=SUserShortInfo(user_id=owner.id, name=f"{owner.first_name} {owner.last_name}",
                                                   avatar=owner.avatar),
                              id=group.id,
                              is_private=bool(group.is_private),
                              is_closed=bool(group.is_closed), amount_of_users=amount,
                              participants=validated_participants, amount_of_events=amount_of_events,
                              amount_of_trips=len(trips),
                              possible_to_join=False if check or group.is_closed or await InviteDAO.find_one_or_none(
                                  session=session,
                                  filters=SInvitesCheckFromUser(user_id=user_data.id, group_id=group_id,
                                                                direction=1)) else True, access_level=access_level)
    except ValueError:
        raise IncorrectId
