from fastapi import APIRouter, Depends
from app.exceptions import ForbiddenException
from app.data.models import User
from app.dependencies.dependencies import get_current_user
from app.dao.session_maker import AsyncSession, SessionDep, TransactionSessionDep
from app.dao.daos import MessageDAO, UserGroupDAO, GroupDAO, LogDAO, UserLogDAO
from app.data.schemas import SMessageSend, SMessage, SMessageSendInGroup, SMessageGroupId, SMessagesInfo, \
    SMessageChangeChecked, SMessageFindById, SMessageSetChecked, SMessagesDelete, SDeleteChecked, SLogAdd, \
    SUserLogAdd, SMessageUnread
from datetime import datetime

message_router = APIRouter(prefix="/api/message", tags=["message"])


@message_router.delete("/delete_checked_messages")
async def delete_checked_messages(user_data: User = Depends(get_current_user),
                                  session: AsyncSession = TransactionSessionDep) -> dict:
    await MessageDAO.delete(session=session, filters=SDeleteChecked(checked=1, user_id=user_data.id))

    return {"message": f"Просмотренные сообщения были успешно удалены", "ok": True}


@message_router.put("/delete_messages")
async def delete_message(delete_message_data: SMessagesDelete, session: AsyncSession = TransactionSessionDep) -> dict:
    for message in delete_message_data.ids:
        await MessageDAO.delete(session=session, filters=SMessageFindById(id=message))

    return {"message": f"Сообщения {', '.join(map(str, delete_message_data.ids))} были успешно удалены", "ok": True}


@message_router.put("/change_checked")
async def change_checked(change_checked_data: SMessageChangeChecked,
                         session: AsyncSession = TransactionSessionDep) -> dict:
    for message_id in change_checked_data.checked:
        await MessageDAO.update(session=session, filters=SMessageFindById(id=message_id),
                                values=SMessageSetChecked(checked=1))

    return {"message": "Состояния сообщений успешно обновлены", "ok": True}


@message_router.post("/send_messages")
async def send_messages(send_messages_data: SMessageSendInGroup, user_data: User = Depends(get_current_user),
                        session: AsyncSession = TransactionSessionDep) -> dict:
    group = await GroupDAO.find_one_or_none_by_id(session=session, data_id=send_messages_data.group_id)

    if str(user_data.id) not in group.proxies.split(";"):
        raise ForbiddenException

    users = await UserGroupDAO.find_all(session=session,
                                        filters=SMessageGroupId(group_id=send_messages_data.group_id))

    for user in users:
        if user.user_id != user_data.id:
            await MessageDAO.add(session=session,
                                 values=SMessageSend(user_id=user.user_id,
                                                     message=send_messages_data.message,
                                                     checked=0, created_at=datetime.now()))

    await LogDAO.add(session=session, values=SLogAdd(group_id=group.id,
                                                     message=f"разослал сообщения",
                                                     type=1))

    log_id = await LogDAO.find_all(session=session, filters=SLogAdd(group_id=group.id,
                                                                    message=f"разослал сообщения",
                                                                    type=1))

    await UserLogDAO.add(session=session, values=SUserLogAdd(user_id=user_data.id, log_id=log_id[-1].id))

    return {"message": "Сообщения успешно отправлены", "ok": True}


@message_router.get("/my_messages")
async def get_my_messages(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) \
        -> list[SMessagesInfo]:
    messages = await MessageDAO.find_all(session=session, filters=SMessage(user_id=user_data.id))

    validated_messages = []

    for message in messages[::-1]:
        if not message.checked:
            validated_messages.append(
                SMessagesInfo(id=message.id, message=message.message, checked=message.checked,
                              created_at=message.created_at))
            del messages[messages.index(message)]

    for message in messages[::-1]:
        validated_messages.append(
            SMessagesInfo(id=message.id, message=message.message, checked=message.checked,
                          created_at=message.created_at))

    return validated_messages


@message_router.get("/amount_unread_messages")
async def get_amount_unread_messages(user_data: User = Depends(get_current_user),
                                     session: AsyncSession = SessionDep) -> int:
    return await MessageDAO.amount(session=session, filters=SMessageUnread(user_id=user_data.id, checked=0))
