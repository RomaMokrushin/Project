from __future__ import annotations

from typing import Self, Optional
from pydantic import BaseModel, ConfigDict, Field, model_validator
from datetime import datetime


class SEmailModel(BaseModel):
    email: str = Field(description="Электронная почта")
    model_config = ConfigDict(from_attributes=True)


class SMessageUnread(BaseModel):
    user_id: int = Field(description="ID пользователя")
    checked: int = Field(description="Состояние сообщения")


class SUserUpdate(BaseModel):
    first_name: str = Field(description="Имя, от 1 до 100 символов")
    last_name: str = Field(description="Фамилия, от 1 до 100 символов")
    about: Optional[str] = Field(default=None, description="Дополнительная информация, не более 500 символов")
    is_private: int = Field(default=0, description="Приватный ли пользователь (для профиля)")
    is_closed: int = Field(default=0, description="Можно ли отправлять пользователю приглашения")


class SUserBase(SEmailModel):
    first_name: str = Field(description="Имя, от 1 до 100 символов")
    last_name: str = Field(description="Фамилия, от 1 до 100 символов")
    about: Optional[str] = Field(default=None, description="Дополнительная информация, не более 500 символов")
    is_private: int = Field(default=0, description="Приватный ли пользователь (для профиля)")
    is_closed: int = Field(default=1, description="Можно ли пользователю отправлять приглашения в группу")


class SUserRegister(SUserBase):
    password: str = Field(description="Пароль, от 5 до 50 символов")
    confirm_password: str = Field(description="Повторите пароль")


class SUserAddDB(SUserBase):
    avatar: str = Field(description="Аватар пользователя")
    password: str = Field(description="Пароль в формате HASH-строки")


class SUserAuth(SEmailModel):
    password: str = Field(description="Пароль, от 5 до 50 символов")


class SUserInfo(SUserBase):
    id: int = Field(description="ID пользователя")


class SUserChange(BaseModel):
    id: int = Field(description="ID пользователя")
    model_config = ConfigDict(from_attributes=True)


class SUserGroupID(BaseModel):
    user_id: int = Field(description="ID пользователя в группе")
    model_config = ConfigDict(from_attributes=True)


class SLenders(BaseModel):
    debter_id: int = Field(description="ID пользователя в ассоциативной таблице должники - кредиторы")
    model_config = ConfigDict(from_attributes=True)


class SDebters(BaseModel):
    lender_id: int = Field(description="ID пользователя в ассоциативной таблице должники - кредиторы")
    model_config = ConfigDict(from_attributes=True)


class SGroupOwner(BaseModel):
    owner: int = Field(description="ID владельца группы")


class SGroupBase(SGroupOwner):
    name: str = Field(description="Название группы")
    about: Optional[str] = Field(default=None, description="Дополнительная информация, не более 500 символов")
    proxies: str = Field(description="Список ID доверенных личностей")
    is_private: int = Field(description="Приватна ли группа")
    is_closed: int = Field(description="Закрыта ли группа")


class SGroupWithoutProxies(BaseModel):
    name: str = Field(description="Название группы")
    about: Optional[str] = Field(default=None, description="Дополнительная информация, не более 500 символов")
    is_private: int = Field(description="Приватна ли группа")
    is_closed: int = Field(description="Закрыта ли группа")


class SGroupInfo(SGroupBase):
    id: int = Field(description="ID группы")


class SGroupsByOwner(BaseModel):
    owner: int = Field(description="ID пользователя")


class SGroupsById(BaseModel):
    group_id: int = Field(description="ID группы")


class SGroupAddUser(BaseModel):
    user_id: int = Field(description="ID добавляемого пользователя")
    group_id: int = Field(description="ID группы")


class SGroupInvite(SGroupAddUser):
    message: str | None = Field(description="Сообщения приглашения", default="")


class SLendersById(BaseModel):
    debter_id: int = Field(description="ID должника")


class SDebtersById(BaseModel):
    lender_id: int = Field(description="ID кредитора")


class SGroupId(BaseModel):
    id: int = Field(description="ID группы")


class SGroupNewId(BaseModel):
    group_id: int = Field(description="ID группы")


class SGroupChange(SGroupId):
    name: str = Field(description="Название группы")
    about: Optional[str] = Field(default=None, description="Дополнительная информация, не более 500 символов")
    is_private: int = Field(default=0, description="Приватна ли группа")
    is_closed: int = Field(description="Закрыта ли группа")


class SGroupSetChanges(BaseModel):
    name: str = Field(description="Название группы")
    about: Optional[str] = Field(default=None, description="Дополнительная информация, не более 500 символов")
    is_private: int = Field(default=0, description="Приватна ли группа")
    is_closed: int = Field(description="Закрыта ли группа")


class SLenderDebterFind(BaseModel):
    lender_id: int = Field(description="ID кредитора")
    debter_id: int = Field(description="ID должника")
    model_config = ConfigDict(from_attributes=True)


class SInfoDict(BaseModel):
    id: int = Field(description="ID пользователя")
    money_for_pay: float = Field(description="деньги внесенные в общий банк")
    participates: bool = Field(description="Участвует ли пользователь в событии")


class SDataDebter(BaseModel):
    debter_id: int = Field(description="ID должника")
    lender_id: int = Field(description="ID кредитора")
    debt: float = Field(description="долг (debt)")

    @model_validator(mode="after")
    def check_debt(self) -> Self:
        if self.debt <= 0:
            raise ValueError("Долг должен быть больше 0")
        return self


class SLendersDebtersFilter(BaseModel):
    debter_id: int = Field(description="ID должника")
    lender_id: int = Field(description="ID кредитора")


class SDataLender(BaseModel):
    lender_id: int = Field(description="ID кредитора")
    debter_id: int = Field(description="ID должника")
    lend: float = Field(description="долг (lend)")

    @model_validator(mode="after")
    def check_lend(self) -> Self:
        if self.lend <= 0:
            raise ValueError("Кредит должен быть больше 0")
        return self


class SDataEvent(BaseModel):
    name: str = Field(description="Название события")
    main_persons: list[int]
    other_persons: list[int]
    info: list[SInfoDict]
    money: float = Field(description="сумма потраченная на событие")


class SDataTrip(BaseModel):
    id: int = Field(description="ID группы, где происходят события")
    name: str = Field(description="Название поездки")
    events: list[SDataEvent]
    trip_members: list[int]


class SLendersDebtersFind(BaseModel):
    debter_id: int = Field(description="ID должника")
    lender_id: int = Field(description="ID кредитора")


class SLendersDebtersUpdate(BaseModel):
    money: float = Field(description="сумма долга")


class SLendersDebtersAdd(SLendersDebtersFind, SLendersDebtersUpdate):
    pass


class SLendersDebtersUpdateMoney(SLendersDebtersUpdate):
    debter_id: int = Field(description="ID должника")


class SGroupDeleteUser(BaseModel):
    group_id: int = Field(description="ID группы")
    user_id: int = Field(description="ID пользователя")


class SUserGroupDeleteUserFind(BaseModel):
    group_id: int = Field(description="ID группы")
    user_id: int = Field(description="ID пользователя")


class SUserGroupDeleteGroupId(BaseModel):
    group_id: int = Field(description="ID группы")


class SGroupAddProxi(SGroupNewId):
    ids: list[int] = Field(description="Список ID пользователей для добавления в список доверенных участников группы")


class SGroupUpdateProxies(BaseModel):
    proxies: str = Field(description="Список ID пользователей для добавления в список доверенных участников группы")


class SGroupDeleteProxy(SGroupNewId):
    ids: list[int] = Field(description="Список ID пользователей для удаления из списка доверенных участников группы")


class SUserGroupFind(SUserGroupDeleteUserFind):
    pass


class SUserMeInfo(BaseModel):
    id: int = Field(description="ID пользователя")
    email: str | None = Field(description="Почта пользователя")
    first_name: str = Field(description="Имя пользователя")
    last_name: str | None = Field(description="Фамилия пользователя")
    avatar: str = Field(description="Аватар пользователя")
    about: str | None = Field(description="Дополнительная информация о пользователе")
    is_private: int = Field(description="Приватный ли пользователь")
    is_closed: int = Field(description="Можно ли пользователю отправлять приглашения")


class SUserMeFullInfo(SUserMeInfo):
    statistics: dict | None = Field(description="Статистика пользователя по поездкам")
    groups: list[SGroupShortInfoWithStatus]
    amount_groups: int = Field(description="Количество групп в которых состоит пользователь")
    balance: float = Field(default=0, description="Баланс пользователя")
    created_at: datetime = Field(description="Создан пользователь")


class SUserFullInfo(SUserMeFullInfo):
    pass


class SUserMyGroupsInfo(BaseModel):
    id: int = Field(description="ID группы")
    name: str = Field(description="Название группы")
    about: str = Optional[Field(default=None, description="Дополнительная информация о пользователе")]
    owner: int = Field(description="ID владельца группы")
    proxies: str = Field(description="Список ID доверенных личностей в группе через делиметр ';'")
    is_private: bool = Field(description="Приватная ли группа")
    is_closed: bool = Field(description="Можно ли в группу отправлять приглашения")
    created_at: datetime = Field(description="дата создания группы")


class SUserMyGroupsParticipateInfo(SUserMyGroupsInfo):
    pass


class SUserMyLendersInfo(BaseModel):
    id: int = Field(description="ID")
    lender: SUserShortInfo
    money: float = Field(description="Сумма долга")
    created_at: str = Field(description="Дата создания долга")


class SUserMyDebtersInfo(BaseModel):
    id: int = Field(description="ID")
    debter: SUserShortInfo
    money: float = Field(description="Сумма долга")
    remind_time: str | None = Field(description="Время до напоминания")
    created_at: str = Field(description="Дата создания долга")


class SUserMyDebtersFullInfo(SUserMyDebtersInfo):
    remind_button: bool = Field(description="Показывать ли кнопку напоминания долга?")


class SUserAllUsersInfo(SUserMeInfo):
    created_at: datetime = Field(description="Дата создания пользователя")


class SUserUserByIdInfo(SUserMeInfo):
    pass


class SUserGroupsByIdInfo(SUserMyGroupsInfo):
    pass


class SUserLendersInfo(SUserMyLendersInfo):
    pass


class SUserDebtersInfo(SUserMyDebtersInfo):
    pass


class SGroupsInfo(SUserMyGroupsInfo):
    pass


class SGroupByIdInfo(SUserMyGroupsInfo):
    pass


class SGroupByOwnerInfo(SUserMyGroupsInfo):
    pass


class SUserParticipatesInGroupInfo(SUserAllUsersInfo):
    pass


class SGroupUpdateProxyAndOwnerFilter(BaseModel):
    id: int = Field(description="ID группы")


class SGroupUpdateProxyAndOwner(BaseModel):
    owner: int = Field(description="ID владельца группы")
    proxies: str = Field(description="Список всех доверенных лиц группы")


class SUserGroupFilter(BaseModel):
    user_id: int = Field(description="ID пользователя")


class SLendersDebtersDeleteUser(BaseModel):
    lender_id: int = Field(description="ID кредитора")


class SMessage(BaseModel):
    user_id: int = Field(description="ID адресата")


class SMessagesInfo(BaseModel):
    message: str = Field(default="something", description="Сообщение")
    checked: int = Field(default=0, description="Просмотрено")
    created_at: datetime = Field(description="Дата получения сообщения")


class SMessageTrip(SMessage):
    message: str = Field(default="something", description="Сообщение")
    checked: int = Field(default=0, description="Просмотрено")
    created_at: datetime = Field(description="Дата получения сообщения")


class SMessageSend(SMessage, SMessagesInfo):
    pass


class SMessageGroupId(BaseModel):
    group_id: int = Field(description="ID группы")


class SMessageSendInGroup(SMessageGroupId):
    message: str = Field(description="Сообщение")


class SMessageChangeChecked(BaseModel):
    checked: list[int] = Field(description="Список ID всех просмотренных сообщений")


class SMessageFindById(BaseModel):
    id: int = Field(description="ID сообщения")


class SMessageSetChecked(BaseModel):
    checked: Optional[int] = Field(default=1, description="Просмотрено ли сообщение")


class SMessagesDelete(BaseModel):
    ids: list[int] = Field(description="Список ID сообщений для удаления")


class SInvite(BaseModel):
    id: int = Field(description="ID приглашения")


class SInviteChange(SInvite):
    message: str = Field(description="Сообщение")


class SInviteChangeMessage(BaseModel):
    message: str = Field(description="Сообщение")


class SInviteUserId(BaseModel):
    user_id: int = Field(description="ID вступающего")


class SInviteFindByDirection(SInviteUserId):
    direction: int = Field(description="Направление приглашения")


class SInviteFindByDirectionForGroup(BaseModel):
    group_id: int = Field(description="ID группы")
    direction: int = Field(description="Направление приглашения")


class SInviteBase(SInviteUserId):
    group_id: int = Field(description="ID группы")
    checked: int = Field(default=0, description="Просмотрено ли")
    message: str = Field(description="Сообщение")
    direction: int = Field(default=0, description="Направление")


class SInviteCheck(BaseModel):
    group_id: int = Field(description="ID группы")
    checked: int = Field(default=0, description="Просмотрено ли")
    direction: int = Field(default=0, description="Направление")


class SGroupInviteInfo(BaseModel):
    group_id: int = Field(description="ID группы")
    name: str = Field(description="Название группы")


class SInvitesInfo(SInvite):
    group: SGroupInviteInfo
    checked: int = Field(default=0, description="Просмотрено ли")
    message: str = Field(description="Сообщение")
    created_at: datetime = Field(description="Дата создания")


class SInviteCheckBase(BaseModel):
    user_id: int = Field(description="ID вступающего")
    group_id: int = Field(description="ID группы")


class SInvitesCheckFromGroup(SInviteCheckBase):
    direction: int = Field(default=0, description="Направление")


class SInvitesCheckFromUser(SInviteCheckBase):
    direction: int = Field(default=1, description="Направление")


class SUserJoinGroup(BaseModel):
    group_id: int = Field(description="ID группы")
    message: str = Field(description="Сообщение о вступлении в группу")


class SDeleteChecked(BaseModel):
    user_id: int = Field(description="ID пользователя")
    checked: int = Field(default=1, description="Просмотрено ли сообщение")


class SDeleteCheckedInvites(SDeleteChecked):
    direction: int = Field(description="Направление приглашения")


class SUser(BaseModel):
    id: int = Field(description="ID пользователя")
    email: str = Field(description="Почта пользователя")
    first_name: str = Field(description="Имя пользователя")
    last_name: str = Field(description="Фамилия пользователя")
    avatar: str = Field(description="Аватар пользователя")
    about: str = Field(description="О пользователе")
    is_private: bool = Field(description="Приватен ли пользователь (видны ли другим людям"
                                         " его статистика, почта, номер телефона)")
    is_closed: bool = Field(description="Получает ли этот пользователь инвайты/сообщения")
    created_at: datetime = Field(description="Дата создания аккаунта пользователя")


class SGroupShortStatistic(BaseModel):
    amount_of_trips: int = Field(description="Количество поездок в этой группе")
    amount_of_events: int = Field(description="Количество событий в этой группе")
    amount_of_users: int = Field(description="Общее количество участников в группе")


class SGroupView(BaseModel):
    id: int = Field(description="ID группы")
    name: str = Field(description="Название группы")
    about: str | None = Field(description="Описание группы")
    owner: SUserShortInfo
    participants: None | list[SUserShortInfo]
    proxies: None | list[SUserShortInfo]


class SGroup(SGroupView):
    is_closed: Optional[bool] | None = Field(default=None, description="Закрыта ли группа")
    is_private: Optional[bool] | None = Field(default=None, description="Приватна ли группа")


class SGroupFullInfo(SGroup):
    amount_of_trips: int | None = Field(description="Количество произошедших поездок")
    amount_of_events: int | None = Field(description="Количсество произошедших событий")
    possible_to_join: bool = Field(description="Есть ли возможность отправить приглашение на вступление в группу")
    access_level: int | None = Field(description="Уровень доступа в группе")


class STripsAdd(BaseModel):
    name: str = Field(description="Название группы")
    participants: str = Field(description="Список ID участников группы через ;")
    wasted_money: float = Field(description="Сумма потраченных денег")
    amount_events: int = Field(description="Количество произошедших событий в путешествии")
    group_id: int = Field(description="ID группы")
    creator_id: int = Field(description="ID создателя поездки")


class STripsFindGroup(BaseModel):
    group_id: int = Field(description="ID группы")


class SLogAdd(BaseModel):
    group_id: int = Field(description="ID группы в которой было произведено действие")
    message: str = Field(description="Сообщение")
    type: int = Field(description="Тип произведенного действия")


class SLogGroupId(BaseModel):
    group_id: int = Field(description="ID группы в которой было произвено действие")


class SUserUpdateAvatar(BaseModel):
    file_name: str = Field(description="Название файла")
    image_link: str = Field(description="Путь к изображению")


class SUserAvatarUpdate(BaseModel):
    avatar: str = Field(default="static/links/default.webp", description="Аватар пользователя")


class SFindByCreatedTime(BaseModel):
    created_at: datetime


class SEventAdd(BaseModel):
    trip_id: int = Field(description="ID поездки")
    name: str = Field(description="название события")
    payment: float = Field(description="Сумма скидывания")
    total_money: float = Field(description="Общая сумма потраченная за событие")


class SMainPersonAdd(BaseModel):
    main_person_id: int = Field(description="ID банкира")
    event_id: int = Field(description="ID события")
    paid: float = Field(description="Сумма внесенных денег эти человеком")
    is_participate: int = Field(description="Участвует ли пользователь в событии")


class SOtherPersonAdd(BaseModel):
    other_person_id: int = Field(description="ID участника")
    event_id: int = Field(description="ID события")


class SEventFindByTripId(BaseModel):
    trip_id: int = Field(description="ID поездки")


class SPersonFindByEventId(BaseModel):
    event_id: int = Field(description="ID события")


class SOtherPersonFullInfo(BaseModel):
    id: int = Field(description="ID пользователя")
    email: str = Field(description="Почта пользователя")
    first_name: str = Field(description="Имя пользователя")
    last_name: str = Field(description="Фамилия пользователя")
    avatar: str = Field(description="Аватар пользователя")
    about: str = Field(description="Дополнительная информация о пользователе")
    created_at: datetime = Field(description="Дата создания пользователя")
    is_private: int = Field(description="Приватный ли пользователь")
    is_closed: int = Field(description="Можно ли пользователю отправлять приглашения")


class SUserShortInfo(BaseModel):
    user_id: int = Field(description="ID пользователя")
    avatar: str = Field(description="Аватар пользователя")
    name: str = Field(description="Имя пользователя")


class SMainPersonFullInfo(BaseModel):
    user: SUserShortInfo
    paid: float = Field(description="Внес денег")
    is_participate: bool = Field(description="Участвовал ли в событии")


class SEventFullInfo(BaseModel):
    id: int = Field(description="ID события")
    name: str = Field(description="Название поездки")
    payment: float = Field(description="Денег к оплате от каждого")
    total_money: float = Field(description="Всего денег потрачено за событие")

    main_persons: list[SMainPersonFullInfo]
    other_persons: list[SUserShortInfo]
    results: list[SResultFullInfo]


class SResultFullInfo(BaseModel):
    user: SUserShortInfo
    money: float = Field(description="Сумма денег")


class STripsFullInfo(BaseModel):
    id: int = Field(description="ID поездки")
    group: SGroupShortInfo
    creator: SUserShortInfo
    trip_name: str = Field(description="Название поездки")
    wasted_money: float = Field(description="Потрачено всего денег за поездку")
    amount_events: int = Field(description="Количество событий в поездке")
    amount_users: int = Field(description="Количество пользователей в поездке")
    date: datetime = Field(description="Дата создания поездки")

    events: list[SEventFullInfo]

    statistics: list[STripStatisticFullInfo]


class SUserLogAdd(BaseModel):
    user_id: int = Field(description="ID пользователя")
    log_id: int = Field(description="ID лога")


class STripsLogAdd(BaseModel):
    message: str = Field(description="Сообщение")
    log_id: int = Field(description="ID лога")
    link: Optional[str] = Field(description="link")
    type: str = Field(description="Тип сообщения")


class SLogMessage(BaseModel):
    type: str = Field(description="вид")
    message: str = Field(description="сообщение")
    link: str = Field(description="Ссылка")


class SUserLog(BaseModel):
    id: int = Field(description="ID автора")
    first_name: str = Field(description="Имя автора")
    last_name: str = Field(description="Фамилия автора")
    avatar: str = Field(description="Аватар автора")


class SLogValidatedLogs(BaseModel):
    id: int = Field(description="ID лога")
    group_id: int = Field(description="ID группы")
    message: str = Field(description="Сообщение")
    type: int = Field(description="Тип сообщения (1 - создание; 2 - обновление; 3 - удаление)")
    created_at: datetime = Field(description="Дата создания")
    author: list[SUserLog]
    subMessage: SLogMessage | None


class SUserLogById(BaseModel):
    log_id: int = Field(description="ID лога")


class SSearchInfo(BaseModel):
    id: int = Field(description="ID")
    type: str = Field(description="Тип")
    name: str = Field(description="Имя")
    avatar: str | None = Field(description="Аватар при наличии", default=None)


class SInviteForGroupInfo(BaseModel):
    id: int = Field(description="ID приглашения")
    user: SUserShortInfo
    checked: int = Field(description="Просмотрено ли сообщение")
    message: str = Field(description="Сообщение")
    created_at: datetime = Field(description="Дата создания сообщения")


class SGroupShortInfo(BaseModel):
    id: int = Field(description="ID группы")
    name: str = Field(description="Название группы")


class SGroupShortInfoWithStatus(BaseModel):
    group: SGroupShortInfo
    status: str = Field(description="Уровень статуса пользователя в группе")
    date_of_joining_group: datetime = Field(description="Дата присоединения к группе")


class SGroupShortInfoForInvite(SGroupShortInfo):
    isInvited: bool = Field(description="приглашен ли уже пользователь в данную группу?")


class STripsShortInfoForGroup(BaseModel):
    id: int = Field(description="ID")
    creator: SUserShortInfo
    trip_name: str = Field(description="Имя поездки")
    created_at: datetime = Field(description="Дата создания поездки")


class STripsInfo(STripsShortInfoForGroup):
    group: SGroupShortInfo
    wasted_money: float = Field(description="Сумма потраченных средств")
    amount_of_participants: int = Field(description="Количество участников")
    amount_of_events: int = Field(description="Количество событий")
    created_at: datetime = Field(description="Дата создания поездки")


class STripStatisticsAdd(BaseModel):
    user_id: int = Field(description="ID пользователя")
    trip_id: int = Field(description="ID поездки")
    borrowed_money: float = Field(description="Взятые в долг деньги")
    lended_money: float = Field(description="Отданные в долг деньги")
    lender: int = Field(description="Количество новых одолжений")
    debter: int = Field(description="Количество новых долгов")
    participate: int = Field(description="Количество событий в которых пользователь принял участие")
    result: float = Field(description="Итог + или -")


class STripStatisticFullInfo(BaseModel):
    user: SUserShortInfo
    borrowed_money: float = Field(description="Взятые в долг деньги")
    lended_money: float = Field(description="Отданные в долг деньги")
    lender: int = Field(description="Количество новых одолжений")
    debter: int = Field(description="Количество новых долгов")
    participate: int = Field(description="Количество событий в которых пользователь принял участие")
    result: float = Field(description="Итог + или -")


class STripStatisticFindByTripId(BaseModel):
    trip_id: int = Field(description="ID поездки")


class SDeleteMessages(BaseModel):
    user_id: int = Field(description="ID пользователя")
    direction: int = Field(description="Направление заявки")


class SUserStatistic(BaseModel):
    expenses_by_month: dict = Field(description="Траты по месяцам")
    recent_trips: dict = Field(description="Недавние поездки")
    my_debts: dict = Field(description="Мои кредиторы")
    my_lends: dict = Field(description="Мои задолженности")

    total_debts: float = Field(description="Общая сумма долга")
    total_lends: float = Field(description="Общая сумма кредитов")

    total_funds_transferred: float = Field(description="Всего переведено средств")
    total_borrowed: float = Field(description="Всего взято в долг")
    total_lent: float = Field(description="Всего отдано в долг")
    trips_visited: int = Field(description="Посещено поездок")
    events_visited: int = Field(description="Посещено событий")
    groups_created: int = Field(description="Создано пользователем групп")
    account_age: str = Field(description="Возраст аккаунта")


class SUserFindByUserId(BaseModel):
    user_id: int = Field(description="Id пользователя")


class SPaymentsFindByFrom(BaseModel):
    from_user: int = Field(description="ID от какого пользователя пришло оплата")


class SUserStatisticsUpdateGroup(BaseModel):
    groups_created: int = Field(description="Количество созданных групп пользователем")


class SUserStatisticsUpdateTotalLent(BaseModel):
    total_lent: float = Field(description="Общая занятая сумма")


class SUserStatisticsUpdateTotalBorrowed(BaseModel):
    total_borrowed: float = Field(description="Общая одолженная сумма")


class SUserStatisticsAdd(BaseModel):
    user_id: int = Field(description="ID пользователя")
    total_borrowed: float = Field(description="Сумма занятых денег")
    total_lent: float = Field(description="Сумма одолженных денег")
    groups_created: int = Field(description="Количесвто созданных групп")


class SCardDelete(BaseModel):
    id: int = Field(description="ID карты")


class SCardUpdate(BaseModel):
    number: str = Field(description="Номер карты")
    date: str = Field(description="Дата действия карты")
    cvv: int = Field(description="CVV код Карты")
    bank: str = Field(description="Название банка")


class SCardUpdateData(BaseModel):
    id: int = Field(description="ID карты")
    number: str = Field(description="Номер карты")
    date: str = Field(description="Дата действия карты")
    cvv: int = Field(description="CVV код Карты")


class SCardAddData(SCardUpdate):
    user_id: int = Field(description="ID пользователя")


class SCardNewAddData(BaseModel):
    number: str = Field(description="Номер карты")
    date: str = Field(description="Дата действия карты")
    cvv: int = Field(description="CVV код Карты")
    name: str = Field(description="Имя владельца карты")
    surname: str = Field(description="Фамилия владельца карты")


class SCardNewAdd(SCardUpdate):
    user_id: int = Field(description="ID пользователя")
    name: str = Field(description="Имя владельца карты")
    surname: str = Field(description="Фамилия владельца карты")
    card_type: str = Field(description="Тип карты")
    country: str = Field(description="Страна")
    bank_logo: str = Field(description="логотип банка")
    payment_logo: str = Field(description="Логотип платежной системы")
    card_color: str = Field(description="Цвет карты")
    text_color: str = Field(default="Цвет текста на карте")


class SCardFindByNumber(BaseModel):
    number: str = Field(description="Номер карты для поиска")
    user_id: int = Field(description="ID пользователя")


class SCardFullInfo(BaseModel):
    id: int = Field(description="ID карты")
    number: str = Field(description="Номер карты")
    date: str = Field(description="Дата действия карты")
    cvv: int = Field(description="CVV код Карты")
    bank: str = Field(description="Название банка")
    name: str = Field(description="Имя владельца карты")
    surname: str = Field(description="Фамилия владельца карты")
    card_type: str = Field(description="Тип карты")
    country: str = Field(description="Страна")
    bank_logo: str = Field(description="логотип банка")
    payment_logo: str = Field(description="Логотип платежной системы")
    card_color: str = Field(description="Цвет карты")
    text_color: str = Field(default="Цвет текста на карте")


class SCardFindByUserId(BaseModel):
    user_id: int = Field(description="ID пользователя")


class SPaymentFullInfo(BaseModel):
    id: int = Field(description="ID транзакции")
    from_user: SUserShortInfo
    to_user: SUserShortInfo
    money: float = Field(description="Сумма перевода")
    created_at: str = Field(description="Дата произведения транзакции")
    checked: int = Field(description="Просмотрено ли")
    card_to: str = Field(description="Номер карты кому отправили")
    card_from: str | None = Field(description="Номер карты того кто отправил", default=None)
    direction: bool = Field(description="Направление стрелки")


class SPaymentsFindByFromUser(BaseModel):
    from_user: int = Field(description="ID пользователя от которого пришла оплата")


class SPaymentsFindByToUser(BaseModel):
    to_user: int = Field(description="ID пользователя которому пришла оплата")


class SPaymentsCheckedFrom(BaseModel):
    checked_from: int = Field(description="Просмотрено ли")


class SPaymentsAmountFromUser(SPaymentsCheckedFrom):
    from_user: int = Field(description="ID пользователя")


class SPaymentsCheckedTo(BaseModel):
    checked_to: int = Field(description="Просмотрено ли")


class SPaymentsAmountToUser(SPaymentsCheckedTo):
    to_user: int = Field(description="ID пользователя")


class SPaymentsChangeChecked(BaseModel):
    ids: list[int] = Field(description="ID сообщений для изменения состояния на просмотренные")


class SPaymentsById(BaseModel):
    id: int = Field(description="ID транзакции")


class SPaymentAddData(BaseModel):
    from_user: int = Field(description="ID отправившего пользователя")
    to_user: int = Field(description="ID получившего пользователя")
    money: float = Field(description="Сумма перевода")
    card_id_to: int | None = Field(description="ID карты отправителя", default=None)
    card_id_from: int | None = Field(description="ID карты получателя", default=None)


class SPaymentAdd(SPaymentAddData, SPaymentsCheckedFrom, SPaymentsCheckedTo):
    debt_id: int | None = Field(description="ID задолженности", default=None)


class SUserFindUnclosed(BaseModel):
    is_closed: int = Field(description="Закрыт ли у пользователя прием заявок")


class SPaymentsRemindDebtData(BaseModel):
    debter_id: int = Field(description="ID напоминающему")


class SPaymentsFromToDebt(BaseModel):
    from_user: int = Field(description="ID отправителя")
    to_user: int = Field(description="ID получателя")
    debt_id: int = Field(description="ID задолженности")


class SLendersDebtersReminded(BaseModel):
    reminded_at: datetime = Field(description="Напоминание долга")


class SUserMegaShortInfo(BaseModel):
    id: int = Field(description="ID пользователя")
    name: str = Field(description="Имя пользователя")


class SCardShortInfo(BaseModel):
    id: int = Field(description="ID карты")
    number: str = Field(description="Последние 4 цифры номера карты")
    bank: str = Field(description="Название банка")
    bank_logo: str = Field(description="логотип банка")
    payment_logo: str = Field(description="Логотип платежной системы")
    card_color: str = Field(description="Цвет карты")
    text_color: str = Field(default="Цвет текста на карте")


class STopUpBalance(BaseModel):
    card_id: int | None = Field(description="ID карты")
    money: float = Field(description="Сумма для перевода на счет")


class SBalanceUpdate(BaseModel):
    balance: float = Field(description="Новая сумма на счете")


class SUserByID(BaseModel):
    id: int = Field(description="ID пользователя")
