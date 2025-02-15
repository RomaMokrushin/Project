from datetime import datetime
from fastapi import APIRouter, Depends
from app.exceptions import ForbiddenException, IncorrectId
from app.data.models import User
from app.dependencies.dependencies import get_current_user
from app.dao.session_maker import AsyncSession, SessionDep, TransactionSessionDep
from app.dao.daos import GroupDAO, InviteDAO, UsersDAO, MessageDAO
from app.data.schemas import SMessageChangeChecked, SMessageFindById, SMessageSetChecked, SMessagesDelete, \
    SInvitesInfo, SInviteFindByDirection, SInviteFindByDirectionForGroup, \
    SGroupInviteInfo, SInviteForGroupInfo, SUserShortInfo, SInviteChange, SInvite, SInviteChangeMessage, \
    SDeleteCheckedInvites, SMessageSend

invite_router = APIRouter(prefix="/api/invite", tags=["invite"])


@invite_router.delete("/delete_checked_invites")
async def delete_checked_invites(user_data: User = Depends(get_current_user),
                                 session: AsyncSession = TransactionSessionDep) -> dict:
    await InviteDAO.delete(session=session, filters=SDeleteCheckedInvites(checked=1, user_id=user_data.id, direction=0))
    return {"message": f"Просмотренные приглашения были успешно удалены", "ok": True}


@invite_router.put("/delete_invites")
async def delete_invites(delete_message_data: SMessagesDelete, user_data: User = Depends(get_current_user),
                         session: AsyncSession = TransactionSessionDep) -> dict:
    for invite in delete_message_data.ids:

        deleting_invite = await InviteDAO.find_one_or_none_by_id(session=session, data_id=invite)

        if deleting_invite.direction == 1 and user_data.id != deleting_invite.user_id:
            group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=deleting_invite.group_id)

            await MessageDAO.add(session=session, values=SMessageSend(user_id=deleting_invite.user_id,
                                                                      message=f"Ваша заявка на вступление в группу"
                                                                              f" {group.name} была отклонена"
                                                                              f" администрацией группы", checked=0,
                                                                      created_at=datetime.now()))

        await InviteDAO.delete(session=session, filters=SMessageFindById(id=invite))

    return {"message": f"Приглашения {', '.join(map(str, delete_message_data.ids))} были успешно удалены", "ok": True}


@invite_router.put("/change_checked")
async def change_checked(change_checked_data: SMessageChangeChecked,
                         session: AsyncSession = TransactionSessionDep) -> dict:
    for message_id in change_checked_data.checked:
        await InviteDAO.update(session=session, filters=SMessageFindById(id=message_id),
                               values=SMessageSetChecked(checked=1))

    return {"message": "Состояния приглашений успешно обновлены", "ok": True}


@invite_router.put("/change_sent")
async def change_sent(change_data: SInviteChange, user_data: User = Depends(get_current_user),
                      session: AsyncSession = TransactionSessionDep) -> dict:
    invite = await InviteDAO.find_one_or_none_by_id(session=session, data_id=change_data.id)

    if user_data.id != invite.user_id or (user_data.id == invite.user_id and invite.direction == 0):
        group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=invite.group_id)

        if str(user_data.id) not in group.proxies.split(";"):
            raise ForbiddenException

    await InviteDAO.update(session=session, filters=SInvite(id=change_data.id),
                           values=SInviteChangeMessage(message=change_data.message))

    return {"message": "Состояния приглашений успешно обновлены", "ok": True}


@invite_router.get("/my_invites_sent")
async def get_my_invites_sent(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) \
        -> list[SInvitesInfo]:
    invites = await InviteDAO.find_all(session=session,
                                       filters=SInviteFindByDirection(user_id=user_data.id, direction=1))

    validated_invites = []

    for invite in reversed(invites):
        group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=invite.group_id)

        validated_invites.append(
            SInvitesInfo(id=invite.id, message=invite.message, checked=invite.checked,
                         group=SGroupInviteInfo(group_id=invite.group_id, name=group.name),
                         created_at=invite.created_at))

    return validated_invites


@invite_router.get("/my_invites_got")
async def get_my_invites_got(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) \
        -> list[SInvitesInfo]:
    invites = await InviteDAO.find_all(session=session,
                                       filters=SInviteFindByDirection(user_id=user_data.id, direction=0))

    validated_invites = []

    for invite in reversed(invites):
        group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=invite.group_id)

        validated_invites.append(
            SInvitesInfo(id=invite.id, message=invite.message, checked=invite.checked,
                         group=SGroupInviteInfo(group_id=invite.group_id, name=group.name),
                         created_at=invite.created_at))

    return validated_invites


@invite_router.get("/group_invites_got/{group_id}")
async def get_group_invites_got(group_id: str, user_data: User = Depends(get_current_user),
                                session: AsyncSession = SessionDep) \
        -> list[SInviteForGroupInfo]:
    try:
        group_id = int(group_id)

        check = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)

        if str(user_data.id) not in check.proxies.split(";"):
            raise ForbiddenException

        invites = await InviteDAO.find_all(session=session,
                                           filters=SInviteFindByDirectionForGroup(group_id=group_id, direction=1))

        validated_invites = []

        for invite in reversed(invites):
            user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=invite.user_id)

            validated_invites.append(
                SInviteForGroupInfo(id=invite.id, message=invite.message, checked=invite.checked,
                                    user=SUserShortInfo(user_id=invite.user_id, avatar=user.avatar,
                                                        name=(user.first_name + " " + user.last_name)),
                                    created_at=invite.updated_at))

        return validated_invites
    except ValueError:
        raise IncorrectId


@invite_router.get("/group_invites_sent/{group_id}")
async def get_group_invites_sent(group_id: str, user_data: User = Depends(get_current_user),
                                 session: AsyncSession = SessionDep) \
        -> list[SInviteForGroupInfo]:
    try:
        group_id = int(group_id)

        check = await GroupDAO.find_one_or_none_by_id(session=session, data_id=group_id)

        if str(user_data.id) not in check.proxies.split(";"):
            raise ForbiddenException

        invites = await InviteDAO.find_all(session=session,
                                           filters=SInviteFindByDirectionForGroup(group_id=group_id, direction=0))

        validated_invites = []

        for invite in invites[::-1]:
            user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=invite.user_id)

            validated_invites.append(
                SInviteForGroupInfo(id=invite.id, message=invite.message, checked=invite.checked,
                                    user=SUserShortInfo(user_id=invite.user_id, avatar=user.avatar,
                                                        name=(user.first_name + " " + user.last_name)),
                                    created_at=invite.updated_at))

        return validated_invites
    except ValueError:
        raise IncorrectId


@invite_router.get("/unread_invites")
async def get_unread_invites(user_data: User = Depends(get_current_user),
                             session: AsyncSession = SessionDep) -> int:
    return await InviteDAO.amount(session=session, filters=SInviteFindByDirection(user_id=user_data.id, direction=0))


@invite_router.get("/unread_invites_for_group/{group_id}")
async def get_unread_invites_for_group(group_id: str,
                                       session: AsyncSession = SessionDep) -> int:
    try:
        return await InviteDAO.amount(session=session,
                                      filters=SInviteFindByDirectionForGroup(group_id=int(group_id), direction=1))
    except ValueError:
        raise IncorrectId
