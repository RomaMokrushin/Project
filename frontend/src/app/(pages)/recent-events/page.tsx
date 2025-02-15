import HomePageServer from "@/app/features/homepage/components/pageWrapper/homePageServer";
import RecentEventsServer from "@/app/features/homepage/components/recent-events/recentEvents.server";
import { Container } from "@/core/styles/global-styles.styles";

export default async function RecentEventsPage() {
  return (
    <Container>
      <HomePageServer />
      <RecentEventsServer />
    </Container>
  );
}
