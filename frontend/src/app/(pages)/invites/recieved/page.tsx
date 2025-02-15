import InvitesRecievedServer from "@/app/features/invites/recieved/pageWrapper/pageWrapper.server";
import { Container } from "@/core/styles/global-styles.styles";

export default async function InvitesRecievedPage() {
  return (
    <Container>
      <InvitesRecievedServer />
    </Container>
  );
}
