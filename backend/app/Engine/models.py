class Debter:
    def __init__(
            self,
            debter_id: int,
            lender_id: int,
            debt: float
    ):
        self.debter_id = debter_id
        self.lender_id = lender_id
        self.debt = debt


class Lender:
    def __init__(
            self,
            lender_id: int,
            debter_id: int,
            lend: float
    ):
        self.lender_id = lender_id
        self.debter_id = debter_id
        self.lend = lend


class User:
    def __init__(
            self,
            user_id: int,
            name: str,
            debters: list[Debter],
            lenders: list[Lender],
    ):
        self.user_id = user_id
        self.name = name
        self.debters = debters
        self.lenders = lenders


class Event:
    def __init__(
            self,
            name: str,
            main_persons: list[User],
            other_persons: list[User],
            info: list[dict],
            money: float
    ):

        self.name = name
        self.main_persons = main_persons
        self.other_persons = other_persons
        self.info = info
        self.money = money
