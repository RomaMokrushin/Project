import InvitesSentServer from "@/app/features/invites/sent/pageWrapper/pageWrapper.server";
import { Container } from "@/core/styles/global-styles.styles";

export default async function InvitesSentPage() {
  return (
    <Container>
      <InvitesSentServer />
    </Container>
  );
}
