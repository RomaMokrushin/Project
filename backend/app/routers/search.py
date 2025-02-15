from fastapi import APIRouter
from app.dao.session_maker import SessionDep
from sqlalchemy.ext.asyncio import AsyncSession
from app.data.schemas import SSearchInfo, SUserGroupDeleteUserFind, SUserShortInfo, \
    SUserFindUnclosed, SGroupShortInfoForInvite, SInvitesCheckFromGroup
from app.data.models import User
from app.dao.daos import UsersDAO, GroupDAO, UserGroupDAO, InviteDAO
from app.dependencies.dependencies import get_current_user, Depends
from app.exceptions import IncorrectId

search_router = APIRouter(prefix="/api/search", tags=["search"])


@search_router.get("/my_groups")
async def get_my_groups(user_id: str, filter_by: str = "", user_data: User = Depends(get_current_user),
                        session: AsyncSession = SessionDep) -> list[SGroupShortInfoForInvite]:
    try:
        user_id = int(user_id)
    except ValueError:
        raise IncorrectId

    return [SGroupShortInfoForInvite(id=group.id, name=group.name,
                                     isInvited=True if await InviteDAO.find_one_or_none(session=session,
                                                                                        filters=SInvitesCheckFromGroup(
                                                                                            user_id=user_id,
                                                                                            group_id=group.id,
                                                                                            direction=0)) else False)
            for group in
            await GroupDAO.find_all(session=session, filters=None) if
            (filter_by.lower() in group.name.lower()) and
            str(user_data.id) in group.proxies.split(
                ";") and not group.is_closed and not await UserGroupDAO.find_one_or_none(
                session=session,
                filters=SUserGroupDeleteUserFind(
                    user_id=user_id,
                    group_id=group.id))][:20]


@search_router.get("/users_to_add")
async def get_users_to_add(group_id: str, filter_by: str, user_data: User = Depends(get_current_user),
                           session: AsyncSession = SessionDep) -> list[SUserShortInfo]:
    try:
        group_id = int(group_id)
    except ValueError:
        raise IncorrectId

    group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)

    return [SUserShortInfo(user_id=user.id, avatar=user.avatar, name=f"{user.first_name} {user.last_name}") for user in
            await UsersDAO.find_all(session=session, filters=SUserFindUnclosed(is_closed=0)) if
            (((user.is_private and (filter_by.lower() in user.first_name.lower() or filter_by.lower()
                                    in user.last_name.lower())) or
              (not user.is_private and (filter_by.lower() in user.first_name.lower() or filter_by.lower()
                                        in user.email.lower() or filter_by.lower() in user.last_name.lower()))) and str(
                user_data.id) in group.proxies.split(";")) and not
            await UserGroupDAO.find_one_or_none(session=session,
                                                filters=SUserGroupDeleteUserFind(user_id=user.id,
                                                                                 group_id=group_id))
            and not await InviteDAO.find_one_or_none(
                session=session, filters=(SInvitesCheckFromGroup(
                    user_id=user.id,
                    group_id=group.id,
                    direction=0)))][:20]


@search_router.get("/")
async def get_founded(filter_by: str = "", user_data: User = Depends(get_current_user),
                      session: AsyncSession = SessionDep) -> list[SSearchInfo]:
    groups = await GroupDAO.find_all(session=session, filters=None)

    filter_groups = []

    for group in groups:
        if filter_by.lower() in group.name.lower():
            if not group.is_private or (group.is_private and bool(
                    await UserGroupDAO.find_one_or_none(session=session,
                                                        filters=SUserGroupDeleteUserFind(
                                                            user_id=user_data.id,
                                                            group_id=group.id)))):
                filter_groups.append(group)

    validated_groups = []

    for group in filter_groups:
        validated_groups.append(
            SSearchInfo(id=group.id, name=group.name, type="group", avatar=None))

    users = await UsersDAO.find_all(session=session, filters=None)

    filter_users = []

    for user in users:
        if filter_by.lower() in user.first_name.lower() or filter_by.lower() \
                in user.last_name.lower() or filter_by.lower() in user.email.lower():
            filter_users.append(user)

    validated_users = []
    for user in filter_users:
        validated_users.append(
            SSearchInfo(id=user.id, name=(user.first_name + " " + user.last_name), type="user", avatar=user.avatar))

    return (validated_groups + validated_users)[:30]
