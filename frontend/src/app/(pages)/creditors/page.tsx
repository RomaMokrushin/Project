import CreditorsServer from "@/app/features/homepage/components/creditors/creditors.server";
import HomePageServer from "@/app/features/homepage/components/pageWrapper/homePageServer";
import { Container } from "@/core/styles/global-styles.styles";

export default async function CreditorsPage() {
  return (
    <Container>
      <HomePageServer />
      <CreditorsServer />
    </Container>
  );
}
