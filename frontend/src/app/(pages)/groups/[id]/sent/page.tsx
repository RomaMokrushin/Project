import GroupsByIdSentServer from "@/app/features/groups/sent/components/pageWrapper/groupsByIdSentServer";
import type { GroupsSlug } from "@/app/features/groups/types/groups.types";
import { Container } from "@/core/styles/global-styles.styles";

export default async function GroupsByIdSentPage({ params }: GroupsSlug) {
  const { id } = await params;

  return (
    <Container>
      <GroupsByIdSentServer id={id} />
    </Container>
  );
}
