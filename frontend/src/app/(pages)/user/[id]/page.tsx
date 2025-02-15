import UserByIdServer from "@/app/features/user/byId/components/pageWrapper/userByIdServer";
import type { GroupsSlug } from "@/app/features/groups/types/groups.types";
import { Container } from "@/core/styles/global-styles.styles";

export default async function UserByIdPage({ params }: GroupsSlug) {
  const { id } = await params;

  return (
    <Container>
      <UserByIdServer id={id} />
    </Container>
  );
}
