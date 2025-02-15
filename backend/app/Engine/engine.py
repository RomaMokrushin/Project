from app.Engine.models import User, Event, Lender, Debter
from app.utils import change_exceptions, main_persons_participate
from app.utils import get_participates, get_money_for_pay
from aiocache import cached


class Engine:
    async def recalc_db(
            self,
            trip_members: list[User],
            events: list[Event],
    ):
        self.trip_members = trip_members
        self.events = events

        self.db_info = []
        self.statistics = {}

        self.users = {}

        await self._recalc_trip(events)

        await self._recalc_debters_and_lenders()
        await self._save_all_to_trip_members()

    async def _recalc_trip(
            self,
            events: list[Event]
    ):
        for event in events:
            await self._recalc_event(event)

        await self.recalc_debts()

    async def _recalc_event(
            self,
            event: Event
    ):
        change_exceptions(event)

        amount_of_main_persons = main_persons_participate(event.info)
        discard_amount = round(event.money / (len(event.other_persons) + amount_of_main_persons), 3)
        sort_main = sorted([(get_money_for_pay(main_person.user_id, event.info),
                             main_person.name, main_person) for main_person in event.main_persons])

        for ind in range(len(event.main_persons)):
            event.main_persons[ind] = sort_main[ind][2]

        await self.collect_data(event, discard_amount)

        black_list = []

        for person in event.other_persons:
            for main_person in event.main_persons:
                lenders = [lender.lender_id for lender in person.lenders]
                debter = [debter.debter_id for debter in main_person.debters]

                if get_participates(main_person.user_id, event.info):
                    debt = round(((get_money_for_pay(main_person.user_id, event.info) - discard_amount) / len(
                        event.other_persons)), 3)
                else:
                    debt = round((get_money_for_pay(main_person.user_id, event.info) / len(event.other_persons)), 3)
                if debt < 0:
                    problem_person = main_person
                    black_list.append(problem_person)
                    bankers = [banker for banker in event.main_persons if
                               get_money_for_pay(banker.user_id, event.info) > discard_amount]
                    for main_person_for_problem in bankers:
                        problem_debters = [problem_debtor.debter_id for problem_debtor in
                                           main_person_for_problem.debters]
                        problem_lenders = [problem_lender.lender_id for problem_lender in problem_person.lenders]

                        problem_debt = round(
                            abs((get_money_for_pay(problem_person.user_id, event.info) - discard_amount)) / len(
                                bankers), 3)

                        if problem_person.user_id in problem_debters:
                            main_person_for_problem.debters[
                                problem_debters.index(problem_person.user_id)].debt += problem_debt
                            problem_person.lenders[
                                problem_lenders.index(main_person_for_problem.user_id)].lend += problem_debt
                        else:
                            main_person_for_problem.debters.append(
                                Debter(problem_person.user_id, main_person_for_problem.user_id, problem_debt))
                            problem_person.lenders.append(
                                Lender(main_person_for_problem.user_id, problem_person.user_id, problem_debt))
                        list(filter(lambda element: element["id"] == main_person_for_problem.user_id, event.info))[0][
                            "money_for_pay"] -= problem_debt

                elif main_person.user_id in lenders:
                    person.lenders[lenders.index(main_person.user_id)].lend += debt
                    main_person.debters[debter.index(person.user_id)].debt += debt
                else:

                    person.lenders.append(Lender(main_person.user_id, person.user_id, debt))
                    main_person.debters.append(Debter(person.user_id, main_person.user_id, debt))

            for ind in black_list:
                del event.main_persons[event.main_persons.index(ind)]
            black_list.clear()

    async def _recalc_debters_and_lenders(
            self
    ):

        for member in self.trip_members:
            for debter in member.debters:
                for lender in member.lenders:
                    member_debter = [debterman.debter_id for debterman in member.debters]
                    member_lender = [lenderman.lender_id for lenderman in member.lenders]

                    if debter.debter_id == lender.lender_id:
                        if debter.debt > lender.lend:
                            member.debters[member_debter.index(debter.debter_id)].debt -= lender.lend
                            member.lenders[member_lender.index(debter.debter_id)].lend = 0

                        elif debter.debt < lender.lend:
                            member.lenders[member_lender.index(debter.debter_id)].lend -= debter.debt
                            member.debters[member_debter.index(debter.debter_id)].debt = 0

                        elif debter.debt == lender.lend:
                            member.debters[member_debter.index(lender.lender_id)].debt = 0
                            member.lenders[member_lender.index(debter.debter_id)].lend = 0

    async def _save_all_to_trip_members(
            self
    ):
        idxs = [idx.user_id for idx in self.trip_members]
        for element in range(len(self.trip_members)):
            self.trip_members[idxs.index(self.trip_members[element].user_id)] = self.trip_members[element]

    async def collect_data(
            self,
            event,
            discard_amount
    ):
        event_db, main_persons_db, other_persons_db = {}, [], []

        event_db["name"] = event.name
        event_db["payment"] = discard_amount
        event_db["total_money"] = event.money

        for main_person in event.info:
            if main_person["id"] in self.statistics:
                self.statistics[main_person["id"]]["lended_money"] += await self.give_money(main_person, discard_amount)
                self.statistics[main_person["id"]]["participate"] += 1

            else:
                self.statistics[main_person["id"]] = {"user_id": main_person["id"],
                                                      "borrowed_money": 0,
                                                      "lended_money": await self.give_money(main_person,
                                                                                            discard_amount),
                                                      "lender": 0,
                                                      "debter": 0,
                                                      "closed_debts": 0,
                                                      "participate": 1,
                                                      "result": 0}

            main_persons_db.append({"main_person_id": main_person["id"], "paid": main_person["money_for_pay"],
                                    "is_participate": main_person["participates"]})

        for other_person in event.other_persons:
            if other_person.user_id in self.statistics:
                self.statistics[other_person.user_id]["borrowed_money"] += discard_amount
                self.statistics[other_person.user_id]["participate"] += 1

            else:
                self.statistics[other_person.user_id] = {"user_id": other_person.user_id,
                                                         "borrowed_money": discard_amount,
                                                         "lended_money": 0,
                                                         "lender": 0,
                                                         "debter": 0,
                                                         "closed_debts": 0,
                                                         "participate": 1,
                                                         "result": 0}

            other_persons_db.append({"other_person_id": other_person.user_id})

        self.db_info.append({"event": event_db, "main_persons": main_persons_db, "other_persons": other_persons_db})

    async def _check_statistic(
            self,
            new_user_id,
    ):
        return bool(1 for static in self.statistics if static["user_id"] == new_user_id)

    @staticmethod
    async def give_money(
            main_person,
            discard_amount
    ):
        if main_person["participates"]:
            return main_person["money_for_pay"] - discard_amount
        return main_person["money_for_pay"]

    @cached()
    async def recalc_debts(self):
        self.users = {user.user_id: user for user in self.trip_members}

        for user in self.trip_members:
            await self.destroy_debts(user, [], [], [])

    @cached()
    async def find_debter(self, lender_as_user, user_id):
        for debter in lender_as_user.debters:
            if debter.debter_id == user_id:
                return debter
        return None

    @staticmethod
    async def reduce(lender_memory: list[Lender], debter_memory: list[Debter]):
        to_reduce = min(lender.lend for lender in lender_memory)

        for lender in lender_memory:
            lender.lend -= to_reduce

        for debter in debter_memory:
            debter.debt -= to_reduce

    async def destroy_debts(self, user: User, memory: list[User], lender_memory: list[Lender],
                            debter_memory: list[Debter]):
        memory.append(user)

        for lender in user.lenders:
            if lender.lender_id not in self.users:
                continue

            lender_as_user = self.users[lender.lender_id]

            if lender.lend != 0:
                lender_memory.append(lender)

            debter = await self.find_debter(lender_as_user, user.user_id)

            if debter.debt != 0:
                debter_memory.append(debter)

            if lender.lender_id == memory[0].user_id and len(memory) != 1:
                return await self.reduce(debter_memory=debter_memory, lender_memory=lender_memory)

            if lender.lend == 0 or len(memory) > 10 or (
                    lender_as_user in memory and lender_as_user.user_id != memory[0].user_id):
                return

            return await self.destroy_debts(lender_as_user, memory, lender_memory, debter_memory)


engine = Engine()
