import CreditorsClient from "./creditors.client";
import GroupsService from "@/core/services/Groups.service";
import CreditorsService from "@/core/services/Creditors.service";

export default async function CreditorsServer() {
  const { data: associates, error: errorAssociates } =
    await GroupsService.getAssociates();

  const { data: credits, error: errorCredits } =
    await CreditorsService.getAllCredits();
  const { data: creditsTotal, error: errorCreditsTotal } =
    await CreditorsService.getCreditorsTotalData();
  if (
    !associates ||
    errorAssociates ||
    !credits ||
    errorCredits ||
    !creditsTotal ||
    errorCreditsTotal
  ) {
    // TODO: Handle error
    return null;
  }

  return (
    <CreditorsClient
      usersCut={associates}
      credits={credits}
      creditsTotal={creditsTotal}
    />
  );
}
