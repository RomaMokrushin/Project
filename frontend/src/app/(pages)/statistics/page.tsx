import StatisticsServer from "@/app/features/statistics/components/pageWrapper/statisticsServer";
import { Container } from "@/core/styles/global-styles.styles";

export default async function StatisticsPage() {
  return (
    <Container>
      <StatisticsServer />
    </Container>
  );
}
