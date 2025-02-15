from app.data.schemas import SDataTrip, SLendersById, SDebtersById
from app.Engine.models import User, Debter, Lender, Event
from app.dao.daos import LendersDebtersDAO, UsersDAO
from app.constants import filename_length, valid_chars, other_colors
from random import choice, randint
from app.config import settings
from transliterate import translit
from aiocache import cached
import aiohttp


def check_payments(
        trip_members: list[User],
        from_user_id: int,
        to_user_id: int,
        money: float
) -> list[User]:
    for trip_member in trip_members:
        for debter in trip_member.debters:
            if debter.debter_id == from_user_id and debter.lender_id == to_user_id:
                debter.debt -= money

                trip_member_indexes = [ind.user_id for ind in trip_members]
                lender = trip_members[trip_member_indexes.index(debter.lender_id)]
                debters_indexes = [deb_ind.debter_id for deb_ind in lender.debters]

                lender.debters[debters_indexes.index(debter.debter_id)].debt -= money
                break
    return trip_members


def change_exceptions(
        event: Event
):
    exceptions = []
    remainder = 0

    for main_person in event.main_persons:
        for info in event.info:
            if info["id"] == main_person.user_id:

                if info["money_for_pay"] == 0:
                    exceptions.append(main_person)
                else:
                    remainder += info["money_for_pay"]

    for main_person_exception in exceptions:
        for info in event.info:
            if info["id"] == main_person_exception.user_id:
                info["money_for_pay"] = round((event.money - remainder) / len(exceptions), 3)


def main_persons_participate(
        info: list[dict],
) -> int:
    return len(list(filter(lambda main_person: main_person["participates"], info)))


def get_money_for_pay(
        user_id: int,
        info: list[dict]
) -> float:
    return list(filter(lambda info: info["id"] == user_id, info))[0]["money_for_pay"]


def get_participates(
        user_id: int,
        info: list[dict]
) -> bool:
    return list(filter(lambda info: info["id"] == user_id, info))[0]["participates"]


async def encrypt_to_model(
        data: SDataTrip,
        session
) -> tuple:
    events = []
    trip_members = []

    for trip_member in data.trip_members:
        debters, lenders = [], []

        user = await UsersDAO.find_one_or_none_by_id(session=session, data_id=trip_member)

        user_data_lenders = await LendersDebtersDAO.find_all(session=session, filters=SLendersById(
            debter_id=user.id))
        user_data_debters = await LendersDebtersDAO.find_all(session=session, filters=SDebtersById(
            lender_id=user.id))

        if not user_data_lenders:
            user_data_lenders = []
        if not user_data_debters:
            user_data_debters = []

        for user_data_lender in user_data_lenders:
            lenders.append(Lender(lender_id=user_data_lender.lender_id, debter_id=user_data_lender.debter_id,
                                  lend=user_data_lender.money))

        for user_data_debter in user_data_debters:
            debters.append(Debter(debter_id=user_data_debter.debter_id, lender_id=user_data_debter.lender_id,
                                  debt=user_data_debter.money))

        trip_members.append(User(user_id=user.id, name=user.first_name, debters=debters, lenders=lenders))

    for event in data.events:
        main_persons, other_persons, info = [], [], []
        for main_person in event.main_persons:
            for trip_member in trip_members:
                if main_person == trip_member.user_id:
                    main_persons.append(trip_member)
                    break

        for other_person in event.other_persons:
            for trip_member in trip_members:
                if other_person == trip_member.user_id:
                    other_persons.append(trip_member)
                    break

        for information in event.info:
            info.append({"id": information.id, "money_for_pay": information.money_for_pay,
                         "participates": information.participates})
        events.append(
            Event(main_persons=main_persons, other_persons=other_persons, money=event.money,
                  info=info, name=event.name))

    return trip_members, events


def generate_filename():
    return "".join(choice(valid_chars) for _ in range(filename_length))


def generate_code():
    return randint(100000, 999999)


def get_validated_statistics(trips, user_id):
    validated_statistics = {"Январь": 0,
                            "Февраль": 0, "Март": 0, "Апрель": 0, "Май": 0, "Июнь": 0, "Июль": 0, "Август": 0,
                            "Сентябрь": 0, "Октябрь": 0, "Ноябрь": 0, "Декабрь": 0}

    for trip in trips:
        if str(user_id) in trip.participants.split(";"):
            if trip.created_at.month == 1:
                validated_statistics["Январь"] += 1
                continue
            if trip.created_at.month == 2:
                validated_statistics["Февраль"] += 1
                continue
            if trip.created_at.month == 3:
                validated_statistics["Март"] += 1
                continue
            if trip.created_at.month == 4:
                validated_statistics["Апрель"] += 1
                continue
            if trip.created_at.month == 5:
                validated_statistics["Май"] += 1
                continue
            if trip.created_at.month == 6:
                validated_statistics["Июнь"] += 1
                continue
            if trip.created_at.month == 7:
                validated_statistics["Июль"] += 1
                continue
            if trip.created_at.month == 8:
                validated_statistics["Август"] += 1
                continue
            if trip.created_at.month == 9:
                validated_statistics["Сентябрь"] += 1
                continue
            if trip.created_at.month == 10:
                validated_statistics["Октябрь"] += 1
                continue
            if trip.created_at.month == 11:
                validated_statistics["Ноябрь"] += 1
                continue
            if trip.created_at.month == 12:
                validated_statistics["Декабрь"] += 1
                continue

    return validated_statistics


async def get_bank_name(number: str) -> str:
    bank = ""

    if number[0] == "2":
        bank = "МИР"
    elif number[0] == "4":
        bank = "Visa"
    elif number[0] == "5":
        bank = "MasterCard"

    return bank


def double(number):
    result = number * 2
    if result > 9:
        result = result - 9
    return result


def luhn_algorithm(card):
    odd = map(lambda number: double(int(number)), card[::2])
    even = map(int, card[1::2])
    return (sum(odd) + sum(even)) % 10 == 0


@cached()
async def get_card_info(number):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.apilayer.com/bincheck/{number}",
                               headers={"apikey": settings.BIN_INFO_API_TOKEN}) as response:
            return await response.json() if response.status != 404 else None


async def choose_payment_logo(payment_system):
    payment_system = "".join(payment_system.lower().split(" "))
    payment_system_ru = translit(payment_system, "ru")

    if "mir" in payment_system or "мир" in payment_system_ru:
        return "static/links/mir.webp"

    if "master" in payment_system or "мастер" in payment_system_ru:
        return "static/links/mastercard.webp"

    if "visa" in payment_system or "виз" in payment_system_ru:
        return "static/links/visa.webp"

    return None


async def choose_bank_logo(bank_name):
    bank_name = "".join(bank_name.lower().split(" "))
    bank_name_ru = translit(bank_name, "ru")

    if "alfa" in bank_name or "альфа" in bank_name_ru:
        return "static/links/alfabank.webp"

    if "gazp" in bank_name or "газп" in bank_name_ru:
        return "static/links/mastercard.webp"

    if "otkr" in bank_name or "откр" in bank_name_ru:
        return "static/links/visa.webp"

    if "pochta" in bank_name or "почта" in bank_name_ru:
        return "static/links/pochtabank.webp"

    if "raif" in bank_name or "райф" in bank_name_ru:
        return "static/links/raifasen.webp"

    if "rosselh" in bank_name or "россел" in bank_name_ru:
        return "static/links/raifasen.webp"

    if "sber" in bank_name or "сбер" in bank_name_ru:
        return "static/links/sberbank.webp"

    if "tink" in bank_name or "тинь" in bank_name_ru:
        return "static/links/tbank.webp"

    if "toch" in bank_name or "точк" in bank_name_ru:
        return "static/links/tochka.webp"

    if "vtb" in bank_name or "втб" in bank_name_ru:
        return "static/links/vtb.webp"

    if "yand" in bank_name or "янд" in bank_name_ru:
        return "static/links/yandexmoney.webp"

    return "static/links/default_bank.webp"


async def choose_card_color(bank_name):
    bank_name = "".join(bank_name.lower().split(" "))
    bank_name_ru = translit(bank_name, "ru")

    if "alfa" in bank_name or "альфа" in bank_name_ru:
        return "e00e0e", "000000"

    if "gazp" in bank_name or "газп" in bank_name_ru:
        return "1c20fa", "FFFFFF"

    if "otkr" in bank_name or "откр" in bank_name_ru:
        return "1cb7fa", "FFFFFF"

    if "pochta" in bank_name or "почта" in bank_name_ru:
        return "fa315e", "FFFFFF"

    if "raif" in bank_name or "райф" in bank_name_ru:
        return "f1ff43", "000000"

    if "rosselh" in bank_name or "россел" in bank_name_ru:
        return "0fbd3c", "FFFFFF"

    if "sber" in bank_name or "сбер" in bank_name_ru:
        return "27f15b", "FFFFFF"

    if "tink" in bank_name or "тинь" in bank_name_ru:
        return "131613", "FFFFFF"

    if "toch" in bank_name or "точк" in bank_name_ru:
        return "8b0bf3", "FFFFFF"

    if "vtb" in bank_name or "втб" in bank_name_ru:
        return "149ae1", "FFFFFF"

    if "yand" in bank_name or "янд" in bank_name_ru:
        return "737c81", "FFFFFF"

    return choice(other_colors)
