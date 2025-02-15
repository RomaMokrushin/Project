import TransactionsPageWrapper from "@/app/features/transactions/pageWrapper";
import { Container } from "@/core/styles/global-styles.styles";

export default async function TransactionsPage() {
  return (
    <Container>
      <TransactionsPageWrapper />
    </Container>
  );
}
