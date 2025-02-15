
import GroupsServer from "@/app/features/homepage/components/groups/groupsServer";
import HomePageServer from "@/app/features/homepage/components/pageWrapper/homePageServer";
import { Container } from "@/core/styles/global-styles.styles";

export default function HomePage() {
  return (
    <Container>
      <HomePageServer />
      <GroupsServer />
    </Container>
  );
}
