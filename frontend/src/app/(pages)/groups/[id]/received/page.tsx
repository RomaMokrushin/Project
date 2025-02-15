
import GroupsByIdRecievedServer from "@/app/features/groups/recieved/components/pageWrapper/groupsByIdRecievedServer";
import type { GroupsSlug } from "@/app/features/groups/types/groups.types";
import { Container } from "@/core/styles/global-styles.styles";

export default async function GroupsByIdRecievedPage({ params }: GroupsSlug) {
  const { id } = await params;

  return (
    <Container>
      <GroupsByIdRecievedServer id={id} />
    </Container>
  );
}
