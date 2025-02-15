from fastapi import APIRouter
from app.dao.session_maker import SessionDep, TransactionSessionDep
from sqlalchemy.ext.asyncio import AsyncSession
from app.data.schemas import SCardDelete, SCardUpdateData, SCardFullInfo, \
    SCardFindByUserId, SCardShortInfo, SCardNewAddData, SCardFindByNumber, SMessageSend, SCardNewAdd
from app.data.models import User
from app.dao.daos import CardsDAO, MessageDAO
from app.dependencies.dependencies import get_current_user, Depends
from app.exceptions import ForbiddenException, CardAlreadyAdded, IncorrectId
from app.utils import luhn_algorithm, get_card_info, choose_bank_logo, choose_card_color, choose_payment_logo
from datetime import datetime

card_router = APIRouter(prefix="/api/card", tags=["card"])


@card_router.delete("/delete_card")
async def delete_card(delete_data: SCardDelete, user_data: User = Depends(get_current_user),
                      session: AsyncSession = TransactionSessionDep) -> dict:
    if (await CardsDAO.find_one_or_none_by_id(session=session, data_id=delete_data.id)).user_id != user_data.id:
        raise ForbiddenException

    await CardsDAO.delete(session=session, filters=SCardDelete(id=delete_data.id))
    return {"ok": True, "message": "Карта успешно удалена!"}


@card_router.put("/update_card")
async def update_card(update_data: SCardUpdateData, user_data: User = Depends(get_current_user),
                      session: AsyncSession = TransactionSessionDep) -> dict:
    if (await CardsDAO.find_one_or_none_by_id(session=session, data_id=update_data.id)).user_id != user_data.id:
        raise ForbiddenException

    if await CardsDAO.find_one_or_none(session=session,
                                       filters=SCardFindByNumber(number=update_data.number, user_id=user_data.id)):
        raise CardAlreadyAdded

    await MessageDAO.add(session=session,
                         values=SMessageSend(
                             message=f"Ваша карта отправлена на проверку для изменения данных",
                             user_id=user_data.id, checked=0, created_at=datetime.now()))

    if not luhn_algorithm(update_data.number):
        await MessageDAO.add(session=session,
                             values=SMessageSend(
                                 message=f"Новый введенный код {update_data.number} не корректен, попробуйте"
                                         f" перепроверить данные и отпавить изменения еще раз",
                                 user_id=user_data.id, checked=0, created_at=datetime.now()))

        return {"ok": False, "message": "Карта не валидна"}

    card_info = await get_card_info(update_data.number[:6])

    if card_info is None:
        await MessageDAO.add(session=session,
                             values=SMessageSend(
                                 message=f"Карта с с номером {update_data.number}"
                                         f" не обнаружена, перепроверьте данные"
                                         " и попробуйте еще раз.",
                                 user_id=user_data.id, checked=0, created_at=datetime.now()))

        return {"ok": False, "message": "Карта не валидна"}

    payment_logo = await choose_payment_logo(card_info["scheme"])

    if not payment_logo:
        await MessageDAO.add(session=session,
                             values=SMessageSend(
                                 message=f"Простите, но ({choose_payment_logo(card_info['scheme'])})"
                                         f" платежная система не поддерживается, попробуйте"
                                         " другую карту",
                                 user_id=user_data.id, checked=0, created_at=datetime.now()))

        colors = await choose_card_color(card_info["bank_name"])

        await CardsDAO.update(session=session, filters=SCardDelete(id=update_data.id),
                              values=SCardNewAdd(number=update_data.number, cvv=update_data.cvv,
                                                 date=update_data.date, user_id=user_data.id,
                                                 bank=card_info["bank_name"], name=update_data.name,
                                                 surname=update_data.surname,
                                                 card_type=card_info["type"], country=card_info["country"],
                                                 text_color=colors[1], card_color=colors[0],
                                                 bank_logo=await choose_bank_logo(card_info["bank_name"]),
                                                 payment_logo=payment_logo))

    return {"ok": True, "message": f"Карты с ID {update_data.id} успешно обновлена"}


@card_router.post("/new_card")
async def add_card(add_data: SCardNewAddData, user_data: User = Depends(get_current_user),
                   session: AsyncSession = TransactionSessionDep) -> dict:
    if await CardsDAO.find_one_or_none(session=session,
                                       filters=SCardFindByNumber(number=add_data.number, user_id=user_data.id)):
        raise CardAlreadyAdded

    await MessageDAO.add(session=session,
                         values=SMessageSend(
                             message="Ваша новая карта отправленна на проверку, подождите несколько минут"
                                     " до ее добавления.",
                             user_id=user_data.id, checked=0, created_at=datetime.now()))

    if not luhn_algorithm(add_data.number):
        await MessageDAO.add(session=session,
                             values=SMessageSend(
                                 message="Ваша карта не валидна. Перепроверьте данные и попробуйте еще раз.",
                                 user_id=user_data.id, checked=0, created_at=datetime.now()))

        return {"ok": False, "message": "Карта не валидна"}

    card_info = await get_card_info(add_data.number[:6])

    if card_info is None:
        await MessageDAO.add(session=session,
                             values=SMessageSend(
                                 message="Карта с такими данными не обнаружена, перепроверьте данные"
                                         " и попробуйте еще раз.",
                                 user_id=user_data.id, checked=0, created_at=datetime.now()))

        return {"ok": False, "message": "Карта не валидна"}

    payment_logo = await choose_payment_logo(card_info["scheme"])

    if not payment_logo:
        await MessageDAO.add(session=session,
                             values=SMessageSend(
                                 message=f"Простите, но ({choose_payment_logo(card_info['scheme'])})"
                                         f" платежная система не поддерживается, попробуйте"
                                         " другую карту",
                                 user_id=user_data.id, checked=0, created_at=datetime.now()))

    colors = await choose_card_color(card_info["bank_name"])

    await MessageDAO.add(session=session,
                         values=SMessageSend(
                             message=f"Карта с номером {add_data.number} успешно добавлена и"
                                     f" готова к использованию.",
                             user_id=user_data.id, checked=0, created_at=datetime.now()))

    await CardsDAO.add(session=session, values=SCardNewAdd(number=add_data.number, cvv=add_data.cvv,
                                                           date=add_data.date, user_id=user_data.id,
                                                           bank=card_info["bank_name"], name=add_data.name,
                                                           surname=add_data.surname,
                                                           card_type=card_info["type"], country=card_info["country"],
                                                           bank_logo=await choose_bank_logo(card_info["bank_name"]),
                                                           payment_logo=payment_logo,
                                                           card_color=colors[0], text_color=colors[1]))

    return {"ok": True, "message": "Карта успешно добавлена"}


@card_router.get("/my_cards")
async def get_my_cards(user_data: User = Depends(get_current_user),
                       session: AsyncSession = SessionDep) -> list[SCardFullInfo]:
    return [SCardFullInfo(cvv=card.cvv, date=card.date, number=card.number, bank=card.bank, id=card.id, name=card.name,
                          surname=card.surname, card_type=card.card_type,
                          country=card.country, bank_logo=card.bank_logo, payment_logo=card.payment_logo,
                          card_color="#" + card.card_color, text_color="#" + card.text_color) for card in
            await CardsDAO.find_all(session=session, filters=SCardFindByUserId(user_id=user_data.id))]


@card_router.get("/my_cards_short")
async def get_my_cards_short(user_data: User = Depends(get_current_user),
                             session: AsyncSession = SessionDep) -> list[SCardShortInfo]:
    return [SCardShortInfo(id=card.id, number=str(card.number)[-4:], bank=card.bank,
                           bank_logo=card.bank_logo, payment_logo=card.payment_logo, card_color="#" + card.card_color,
                           text_color="#" + card.text_color)
            for card in
            await CardsDAO.find_all(session=session, filters=SCardFindByUserId(user_id=user_data.id))]


@card_router.get("/card_exist")
async def is_card_exist(user_data: User = Depends(get_current_user),
                        session: AsyncSession = SessionDep) -> bool:
    return bool(await CardsDAO.find_one_or_none(session=session, filters=SCardFindByUserId(user_id=user_data.id)))


@card_router.get("/{card_id}")
async def get_card_by_id(card_id: str, user_data: User = Depends(get_current_user),
                         session: AsyncSession = SessionDep) -> SCardFullInfo:
    try:
        card_id = int(card_id)
    except ValueError:
        raise IncorrectId

    card = await CardsDAO.find_one_or_none_by_id(session=session, data_id=card_id)

    if user_data.id != card.user_id:
        raise ForbiddenException

    return SCardFullInfo(cvv=card.cvv, date=card.date, number=card.number, bank=card.bank, id=card.id, name=card.name,
                         surname=card.surname, card_type=card.card_type,
                         country=card.country, bank_logo=card.bank_logo, payment_logo=card.payment_logo,
                         card_color="#" + card.card_color, text_color="#" + card.text_color)
