import NotificationsServer from "@/app/features/notifications/components/pageWrapper";
import { Container } from "@/core/styles/global-styles.styles";

export default async function StatisticsPage() {
  return (
    <Container>
      <NotificationsServer />
    </Container>
  );
}
