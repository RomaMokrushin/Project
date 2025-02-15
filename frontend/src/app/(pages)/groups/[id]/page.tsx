import GroupsByIdServer from "@/app/features/groups/byId/components/pageWrapper/groupsByIdServer";
import type { GroupsSlug } from "@/app/features/groups/types/groups.types";
import { Container } from "@/core/styles/global-styles.styles";

export default async function GroupsByIdPage({ params }: GroupsSlug) {
  const { id } = await params;

  return (
    <Container>
      <GroupsByIdServer id={id} />
    </Container>
  );
}
