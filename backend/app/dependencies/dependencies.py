from fastapi import Request, HTTPException, status, Depends
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import settings
from app.exceptions import TokenExpiredException, NoJwtException, NoUserIdException, TokenNotFound
from app.dao.daos import UsersDAO
from app.dao.session_maker import SessionDep
from app.data.schemas import SUserInfo
import jwt


def get_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise TokenNotFound
    token = auth_header.split(" ", 1)[1]
    return token


async def get_current_user(token: str = Depends(get_token), session: AsyncSession = SessionDep) -> SUserInfo:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
    except Exception:
        raise NoJwtException
    expire: str = payload.get("exp")
    expire_time = datetime.fromtimestamp(int(expire), tz=timezone.utc)
    if (not expire) or (expire_time < datetime.now(timezone.utc)):
        raise TokenExpiredException

    user_id: str = payload.get("sub")
    if not user_id:
        raise NoUserIdException

    user = await UsersDAO.find_one_or_none_by_id(data_id=int(user_id), session=session)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user
