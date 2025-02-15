from fastapi import APIRouter
from app.dao.daos import UserGroupDAO, LogDAO, UserLogDAO, TripsLogDAO
from sqlalchemy.ext.asyncio import AsyncSession
from app.dao.session_maker import SessionDep
from app.exceptions import IncorrectId, ForbiddenException
from app.data.schemas import SGroupAddUser, SLogGroupId, SLogValidatedLogs, SUserLogById, SUserLog, SLogMessage
from app.dependencies.dependencies import get_current_user, Depends
from app.data.models import User

log_router = APIRouter(prefix="/api/log", tags=["log"])


@log_router.get("/group/{group_id}")
async def get_group_logs(group_id: str, user_data: User = Depends(get_current_user),
                         session: AsyncSession = SessionDep) -> list[SLogValidatedLogs]:
    try:
        group_id = int(group_id)

        check = await UserGroupDAO.find_one_or_none(session=session,
                                                    filters=SGroupAddUser(group_id=group_id, user_id=user_data.id))

        if not check:
            raise ForbiddenException

        validated_logs = []

        logs = await LogDAO.find_all(session=session, filters=SLogGroupId(group_id=group_id))

        for log in logs[-30:]:

            authors = await UserLogDAO.find_all(session=session, filters=SUserLogById(log_id=log.id))
            validated_authors = []

            for author in authors:
                validated_authors.append(SUserLog(id=author.user.id,
                                                  first_name=author.user.first_name, last_name=author.user.last_name,
                                                  avatar=author.user.avatar))

            message = await TripsLogDAO.find_one_or_none(session=session, filters=SUserLogById(log_id=log.id))

            if message:
                validated_logs.append(
                    SLogValidatedLogs(id=log.id, group_id=log.group_id, message=log.message, type=log.type,
                                      created_at=log.created_at, author=validated_authors,
                                      subMessage=SLogMessage(type=message.type, message=message.message,
                                                             link=message.link)))
            else:
                validated_logs.append(
                    SLogValidatedLogs(id=log.id, group_id=log.group_id, message=log.message, type=log.type,
                                      created_at=log.created_at, author=validated_authors,
                                      subMessage=None))

        return validated_logs
    except ValueError:
        raise IncorrectId
