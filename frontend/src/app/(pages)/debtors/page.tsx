import DebtorsServer from "@/app/features/homepage/components/debtors/debtors.server";
import HomePageServer from "@/app/features/homepage/components/pageWrapper/homePageServer";
import { Container } from "@/core/styles/global-styles.styles";

export default async function DebtorsPage() {
  return (
    <Container>
      <HomePageServer />
      <DebtorsServer />
    </Container>
  );
}
