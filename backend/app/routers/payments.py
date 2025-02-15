from fastapi import APIRouter
from app.dao.session_maker import SessionDep, TransactionSessionDep
from sqlalchemy.ext.asyncio import AsyncSession
from app.data.schemas import SPaymentFullInfo, SPaymentsFindByFromUser, SPaymentsFindByToUser, SUserShortInfo, \
    SPaymentsAmountFromUser, SPaymentsAmountToUser, SPaymentsChangeChecked, SPaymentsById, SPaymentsCheckedFrom, \
    SPaymentsCheckedTo, SPaymentAddData, SMessageSend, SLendersDebtersUpdate, SPaymentAdd, \
    SCardFindByUserId, SLendersDebtersFilter, SPaymentsRemindDebtData, SPaymentsFromToDebt, SLendersDebtersReminded, \
    STopUpBalance, SBalanceUpdate, SUserByID
from app.data.models import User
from app.dao.daos import PaymentsDAO, UsersDAO, LendersDebtersDAO, MessageDAO, CardsDAO
from app.dependencies.dependencies import get_current_user, Depends
from app.exceptions import ForbiddenException, CardDoesNotExist, NotEnoughMoney
from datetime import datetime
from app.auth.auth_email import send_transaction_info, send_remind
from app.constants import address

payments_router = APIRouter(prefix="/api/payments", tags=["payments"])


@payments_router.put("/change_checked")
async def change_checked(update_data: SPaymentsChangeChecked, user_data: User = Depends(get_current_user),
                         session: AsyncSession = TransactionSessionDep) -> dict:
    for payment_id in update_data.ids:
        payment = await PaymentsDAO.find_one_or_none_by_id(session=session, data_id=payment_id)
        if user_data.id == payment.from_user:
            await PaymentsDAO.update(session=session, filters=SPaymentsById(id=payment_id),
                                     values=SPaymentsCheckedFrom(checked_from=1))
        elif user_data.id == payment.to_user:
            await PaymentsDAO.update(session=session, filters=SPaymentsById(id=payment_id),
                                     values=SPaymentsCheckedTo(checked_to=1))

    return {"ok": True, "message": "Состояния транзакций успешно изменены"}


@payments_router.post("/make_transaction")
async def make_transaction(payment_data: SPaymentAddData, user_data: User = Depends(get_current_user),
                           session: AsyncSession = TransactionSessionDep) -> dict:
    if user_data.id != payment_data.from_user:
        raise ForbiddenException

    debt = await LendersDebtersDAO.find_one_or_none(session=session,
                                                    filters=SLendersDebtersFilter(debter_id=user_data.id,
                                                                                  lender_id=payment_data.to_user))

    if not await CardsDAO.find_one_or_none(session=session,
                                           filters=SCardFindByUserId(user_id=payment_data.to_user)):
        raise CardDoesNotExist

    if not payment_data.card_id_from:
        if payment_data.money > user_data.balance:
            raise NotEnoughMoney
        await UsersDAO.update(session=session, values=SBalanceUpdate(balance=(user_data.balance - payment_data.money)),
                              filters=SUserByID(id=user_data.id))

    if debt.money > payment_data.money:
        await MessageDAO.add(session=session,
                             values=SMessageSend(
                                 user_id=payment_data.to_user, checked=0, created_at=datetime.now(),
                                 message=f"Пользователь {user_data.first_name} {user_data.last_name}"
                                         f" вернул вам часть долга переводом "
                                         f"{'на карту ' + (await CardsDAO.find_one_or_none_by_id(session=session, data_id=payment_data.card_id_to)).number}."
                                         f" Сумма перевода составила {round(payment_data.money, 2)} ₽. "
                                         f"Перейдите в раздел 'Мои транзакции' за более подробной"
                                         f" информацией'"))

        await LendersDebtersDAO.update(session=session,
                                       filters=SLendersDebtersFilter(debter_id=user_data.id,
                                                                     lender_id=payment_data.to_user),
                                       values=SLendersDebtersUpdate(money=debt.money - payment_data.money))

        await PaymentsDAO.add(session=session, values=SPaymentAdd(from_user=user_data.id, to_user=payment_data.to_user,
                                                                  money=payment_data.money,
                                                                  checked_from=0, checked_to=0, debt_id=debt.id,
                                                                  card_id_to=payment_data.card_id_to,
                                                                  card_id_from=payment_data.card_id_from))

    elif debt.money == payment_data.money:
        await MessageDAO.add(
            session=session,
            values=SMessageSend(user_id=payment_data.to_user, checked=0, created_at=datetime.now(),
                                message=f"Пользователь {user_data.first_name} {user_data.last_name}"
                                        f" вернул вам долг переводом "
                                        f"{'на карту ' + (await CardsDAO.find_one_or_none_by_id(session=session, data_id=payment_data.card_id_to)).number}."
                                        f" Сумма перевода составила {round(payment_data.money, 2)} ₽. "
                                        f"Перейдите в раздел 'Мои транзакции' за более подробной"
                                        f" информацией'"))

        await LendersDebtersDAO.delete(session=session,
                                       filters=SLendersDebtersFilter(debter_id=user_data.id,
                                                                     lender_id=payment_data.to_user))

        await PaymentsDAO.add(session=session, values=SPaymentAdd(from_user=user_data.id, to_user=payment_data.to_user,
                                                                  money=payment_data.money,
                                                                  checked_from=0, checked_to=0, debt_id=debt.id,
                                                                  card_id_to=payment_data.card_id_to,
                                                                  card_id_from=payment_data.card_id_from))
    else:
        await MessageDAO.add(session=session,
                             values=SMessageSend(user_id=payment_data.to_user, checked=0, created_at=datetime.now(),
                                                 message=f"Пользователь {user_data.first_name} {user_data.last_name}"
                                                         f" вернул вам долг переводом "
                                                         f"{'на карту ' + (await CardsDAO.find_one_or_none_by_id(session=session, data_id=payment_data.card_id_to)).number},"
                                                         f" но отправил на {round(payment_data.money - debt.money, 2)}"
                                                         f" ₽ больше."
                                                         f" Сумма перевода составила {round(payment_data.money, 2)} ₽. "
                                                         f"Перейдите в раздел 'Мои транзакции' за более подробной"
                                                         f" информацией'"))

        await LendersDebtersDAO.delete(session=session,
                                       filters=SLendersDebtersFilter(debter_id=user_data.id,
                                                                     lender_id=payment_data.to_user))

        await PaymentsDAO.add(session=session, values=SPaymentAdd(from_user=user_data.id, to_user=payment_data.to_user,
                                                                  money=payment_data.money,
                                                                  checked_from=0, checked_to=0, debt_id=debt.id,
                                                                  card_id_to=payment_data.card_id_to,
                                                                  card_id_from=payment_data.card_id_from))

    await send_transaction_info(
        message={"money": payment_data.money, "first_name": user_data.first_name, "last_name": user_data.last_name,
                 "link": address + "/my_transactions",
                 "card": (await CardsDAO.find_one_or_none_by_id(session=session,
                                                                data_id=payment_data.card_id_from)).number if
                 payment_data.card_id_from else "с личного счета на сайте"},
        recipient=user_data.email)

    return {"ok": True, "message": "Транзакция успешна произведена"}


@payments_router.post("/top_up_your_balance")
async def top_up_your_balance(post_data: STopUpBalance, user_data: User = Depends(get_current_user),
                              session: AsyncSession = TransactionSessionDep) -> dict:
    card = await CardsDAO.find_one_or_none_by_id(session=session, data_id=post_data.card_id)
    if card.user_id != user_data.id:
        raise ForbiddenException

    await MessageDAO.add(session=session,
                         values=SMessageSend(user_id=user_data.id, checked=0, created_at=datetime.now(),
                                             message=f"Вы только что пополнинли свой личный счет картой"
                                                     f" {card.number} на сумму в {round(post_data.money, 2)} ₽"))

    await PaymentsDAO.add(session=session, values=SPaymentAdd(from_user=user_data.id, to_user=user_data.id,
                                                              money=post_data.money,
                                                              checked_from=0, checked_to=0,
                                                              card_id_from=post_data.card_id))

    await UsersDAO.update(session=session, values=SBalanceUpdate(balance=user_data.balance + post_data.money),
                          filters=SUserByID(id=user_data.id))

    return {"ok": True, "message": "Перевод успешно выполнен"}


@payments_router.post("/remind_debt")
async def remind_debt(remind_data: SPaymentsRemindDebtData, user_data: User = Depends(get_current_user),
                      session: AsyncSession = TransactionSessionDep) -> dict:
    debt = await LendersDebtersDAO.find_one_or_none_by_id(session=session,
                                                          data_id=remind_data.debter_id)

    if (datetime.now() - debt.reminded_at).days < 3:
        return {"ok": False, "message": "Еще не прошло 3 дня с момента прошлого напоминания"}

    payment = await PaymentsDAO.find_one_or_none(session=session,
                                                 filters=SPaymentsFromToDebt(
                                                     from_user=debt.debter_id,
                                                     to_user=user_data.id,
                                                     debt_id=debt.id))

    await send_remind(message={"from": user_data.first_name + " " + user_data.last_name, "money": debt.money,
                               "last_paid": str(
                                   payment.updated_at) if payment and payment.created_at != payment.updated_at
                               else None,
                               "days": (datetime.now() - debt.created_at).days},
                      recipient=(
                          await UsersDAO.find_one_or_none_by_id(session=session,
                                                                data_id=debt.debter_id)).email)

    await LendersDebtersDAO.update(session=session, filters=SLendersDebtersFilter(debter_id=debt.debter_id,
                                                                                  lender_id=user_data.id),
                                   values=SLendersDebtersReminded(reminded_at=datetime.now()))

    return {"ok": True, "message": "Напоминание успешно отправлено!"}


@payments_router.get("/my_payments")
async def get_my_payments(user_data: User = Depends(get_current_user), session: AsyncSession = SessionDep) \
        -> list[SPaymentFullInfo]:
    validated_payments = []

    for payment in sorted((set(await PaymentsDAO.find_all(session=session, filters=SPaymentsFindByFromUser(
            from_user=user_data.id))) | set(await PaymentsDAO.find_all(session=session,
                                                                       filters=SPaymentsFindByToUser(
                                                                           to_user=user_data.id)))),
                          key=lambda x: x.id):
        user_from = await UsersDAO.find_one_or_none_by_id(session=session, data_id=payment.from_user)
        user_to = await UsersDAO.find_one_or_none_by_id(session=session, data_id=payment.to_user)

        validated_payments.append(SPaymentFullInfo(id=payment.id,
                                                   from_user=SUserShortInfo(avatar=user_from.avatar,
                                                                            user_id=user_from.id,
                                                                            name=f"{user_from.first_name}"
                                                                                 f" {user_from.last_name}")
                                                   if user_from.id == user_data.id else SUserShortInfo(
                                                       avatar=user_to.avatar, user_id=user_to.id,
                                                       name=f"{user_to.first_name}"
                                                            f" {user_to.last_name}"),

                                                   to_user=SUserShortInfo(avatar=user_to.avatar, user_id=user_to.id,
                                                                          name=f"{user_to.first_name}"
                                                                               f" {user_to.last_name}") if
                                                   user_from.id == user_data.id else SUserShortInfo(
                                                       avatar=user_from.avatar,
                                                       user_id=user_from.id,
                                                       name=f"{user_from.first_name}"
                                                            f" {user_from.last_name}"),
                                                   money=payment.money,
                                                   created_at=str(payment.created_at.month) + " дн.",
                                                   checked=1 if (
                                                                        payment.from_user == user_data.id
                                                                        and payment.checked_from == 1) or (
                                                                        payment.to_user == user_data.id and
                                                                        payment.checked_to == 1) else 0,
                                                   card_to=(await CardsDAO.find_one_or_none_by_id(session=session,
                                                                                                  data_id=
                                                                                                  payment.card_id_to)
                                                            ).number
                                                   if payment.card_id_to else "на личный счет",
                                                   card_from=(await
                                                              CardsDAO.find_one_or_none_by_id(session=session,
                                                                                              data_id=payment.
                                                                                              card_id_from)).number
                                                   if payment.card_id_from else "с личного счета",
                                                   direction=user_from.id == user_data.id))

    return validated_payments


@payments_router.get("/unchecked_payments")
async def get_unchecked_payments(user_data: User = Depends(get_current_user),
                                 session: AsyncSession = SessionDep) -> int:
    return (await PaymentsDAO.amount(session=session,
                                     filters=SPaymentsAmountFromUser(checked_from=0, from_user=user_data.id))) + (
        await PaymentsDAO.amount(session=session, filters=SPaymentsAmountToUser(checked_to=0, to_user=user_data.id)))


@payments_router.get("/my_balance")
async def get_my_balance(user_data: User = Depends(get_current_user)) -> float:
    return user_data.balance
