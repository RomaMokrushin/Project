from fastapi import APIRouter, Response
from app.exceptions import UserAlreadyExistsException, IncorrectEmailOrPasswordException
from app.auth.auth import authenticate_user, create_access_token
from app.dao.daos import UsersDAO
from app.data.schemas import SUserRegister, SUserAuth, SEmailModel, SUserAddDB
from sqlalchemy.ext.asyncio import AsyncSession
from app.dao.session_maker import TransactionSessionDep, SessionDep
from app.constants import default_image

auth_router = APIRouter(prefix="/api/auth", tags=["auth"])


@auth_router.post("/register")
async def register_user(user_data: SUserRegister, response: Response,
                        session: AsyncSession = TransactionSessionDep) -> dict:
    user = await UsersDAO.find_one_or_none(session=session, filters=SEmailModel(email=user_data.email))
    if user:
        raise UserAlreadyExistsException

    user_data_dict = user_data.model_dump()

    password = user_data_dict["confirm_password"]
    del user_data_dict["confirm_password"]

    user_data_dict["avatar"] = default_image
    user_data_dict["balance"] = 0

    await UsersDAO.add(session=session, values=SUserAddDB(**user_data_dict))

    check = await authenticate_user(session=session, email=user_data.email, password=password)
    access_token = create_access_token({"sub": str(check.id)})
    response.set_cookie(key="users_access_token", value=access_token, httponly=True)

    return {"message": f"Вы, {user_data.first_name} {user_data.last_name}, успешно зарегистрированы!", "ok": True,
            "access_token": access_token}


@auth_router.post("/login")
async def auth_user(response: Response, user_data: SUserAuth, session: AsyncSession = SessionDep) -> dict:
    check = await authenticate_user(session=session, email=user_data.email, password=user_data.password)
    if check is None:
        raise IncorrectEmailOrPasswordException
    access_token = create_access_token({"sub": str(check.id)})
    response.set_cookie(key="users_access_token", value=access_token, httponly=True)
    return {"ok": True, "access_token": access_token, "message": "Авторизация успешна!"}


@auth_router.post("/logout")
async def logout_user(response: Response) -> dict:
    response.delete_cookie(key="users_access_token")
    return {"ok": True, "message": "Пользователь успешно вышел из системы"}
