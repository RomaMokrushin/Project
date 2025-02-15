from fastapi import status, HTTPException

UserAlreadyExistsException = HTTPException(status_code=status.HTTP_409_CONFLICT,
                                           detail="Пользователь уже существует")

IncorrectEmailOrPasswordException = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                                  detail="Неверная почта или пароль")

TokenExpiredException = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                      detail="Токен истек")

TokenNotFound = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                              detail="Токен не найден")

NoJwtException = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                               detail="Токен не валидный")

NoUserIdException = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                  detail="Не найден ID пользователя")

ForbiddenException = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Недостаточно прав")

IncorrectId = HTTPException(status_code=status.HTTP_409_CONFLICT, detail="ID пользователя некорректен")

NotFound = HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Такой записи не существует")

TooManyGroups = HTTPException(status_code=status.HTTP_409_CONFLICT,
                              detail="Слишком много создано групп, удалите их чтобы создавать новые")

UserAlreadyExistsInGroup = HTTPException(status_code=status.HTTP_409_CONFLICT,
                                         detail="Пользователь уже состоит в группе")

UserDoNotExistInGroup = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                      detail="Пользователя нет в группе")

UserDebtsExist = HTTPException(status_code=status.HTTP_409_CONFLICT,
                               detail="Пользователь не может быть удален до тех пор пока у него есть долги")

DebtRaised = HTTPException(status_code=status.HTTP_409_CONFLICT,
                           detail="Новый долг пользователя не может превышать старый")

IncorrectDebt = HTTPException(status_code=status.HTTP_409_CONFLICT,
                              detail="Новый долг должен быть больше 0, если вы хотите простить долг пользователю,"
                                     " то сделайте это с помощью delete")

IncorrectPassword = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный пароль")

UserAlreadyAdmin = HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь уже админ")

CantDeleteOwner = HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="Невозможно удалить владельца из доверенных личностей")

CardAlreadyAdded = HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Вы уже добавили карту с этими данными")

CardDoesNotExist = HTTPException(status_code=status.HTTP_409_CONFLICT,
                                 detail="У пользователя которому вы переводите нет карт")

NotEnoughMoney = HTTPException(status_code=status.HTTP_409_CONFLICT,
                               detail="Недостаточно средств для списания с личного счета")
