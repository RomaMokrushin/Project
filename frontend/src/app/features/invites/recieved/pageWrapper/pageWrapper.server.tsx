import NavBarServer from "@/app/features/common/navBar/navBarServer";
import { ContentWrapper, InvitesWrapper } from "../styles/pageWrapper.styles";
import InvitesService from "@/core/services/Invites.service";
import DeleteAllButton from "../deleteAll/deleteAll";
import InviteItem from "../inviteItem/inviteItem";
import { NoInvites } from "@/app/features/groups/recieved/styles/groupsByIdRecieved.styles";

export default async function InvitesRecievedServer() {
  const { data: invites, error: invitesError } =
    await InvitesService.personalInvitesRecieved();
  if (!invites || invitesError) {
    console.log("error", invitesError);
    return null;
  }

  const links = [
    {
      name: "Отправленные",
      url: "/invites/sent",
      active: false,
    },
    {
      name: "Полученные",
      url: "/invites/recieved",
      active: true,
    },
  ];
  return (
    <InvitesWrapper>
      <NavBarServer links={links} />
      <ContentWrapper>
        {invites.length > 0 ? (
          <>
            <InvitesWrapper>
              {invites.map((invite) => (
                <InviteItem key={invite.id} invite={invite} />
              ))}
            </InvitesWrapper>
            <DeleteAllButton ids={invites.map((invite) => invite.id)} />
          </>
        ) : (
          <NoInvites>Приглашений пока нет</NoInvites>
        )}
      </ContentWrapper>
    </InvitesWrapper>
  );
}
