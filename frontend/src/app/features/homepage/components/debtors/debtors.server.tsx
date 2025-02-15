import DebtorsService from "@/core/services/Debtors.service";
import DebtorsClient from "./debtors.client";
import GroupsService from "@/core/services/Groups.service";

export default async function DebtorsServer() {
  const { data: associates, error: errorAssociates } =
    await GroupsService.getAssociates();

  const { data: debts, error: errorDebts } = await DebtorsService.getAllDebts();
  const { data: debtsTotal, error: errorDebtsTotal } =
    await DebtorsService.getDebtsTotalData();
  if (
    !associates ||
    errorAssociates ||
    !debts ||
    errorDebts ||
    !debtsTotal ||
    errorDebtsTotal
  ) {
    // TODO: Handle error
    return null;
  }

  return (
    <DebtorsClient
      usersCut={associates}
      debts={debts}
      debtsTotal={debtsTotal}
    />
  );
}
