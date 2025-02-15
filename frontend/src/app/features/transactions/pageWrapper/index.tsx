import TransactionsService from "@/core/services/Transactions.service";
import {
  StyledTransactionsWrapper,
  TransactionsContainer,
} from "../styles/pageWrapper.styles";
import NavBarServer from "../../common/navBar/navBarServer";
import Transaction from "../transaction";

export default async function TransactionsPageWrapper() {
  const { data: transactions, error } =
    await TransactionsService.getAllTransactions();

  if (!transactions || error) {
    return null;
  }

  return (
    <StyledTransactionsWrapper>
      <NavBarServer />
      <TransactionsContainer>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </TransactionsContainer>
    </StyledTransactionsWrapper>
  );
}
