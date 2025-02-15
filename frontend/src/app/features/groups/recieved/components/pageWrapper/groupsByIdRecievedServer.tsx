import GroupsService from "@/core/services/Groups.service";

import NavBarServer from "@/app/features/common/navBar/navBarServer";
import UserService from "@/core/services/User.service";
import {
  ContentWrapper,
  GroupByIdRecievedWrapper,
  InvitesWrapper,
  NoInvites,
} from "../../styles/groupsByIdRecieved.styles";
import InvitesService from "@/core/services/Invites.service";
import InviteItem from "../inviteItem/inviteItem";
import DeleteAllButton from "../deleteAll/deleteAll";

type Props = {
  id: string;
};

export default async function GroupsByIdRecievedServer({ id }: Props) {
  const { data: group, error: errorGroup } = await GroupsService.getGroupById(
    id
  );
  const { data: user, error: errorUser } = await UserService.getMe();
  const { data: invites, error: invitesError } =
    await InvitesService.getGroupInvitesReceived({ id });

  if (!group || errorGroup || !user || errorUser || !invites || invitesError) {
    console.log("error", errorGroup, errorUser);
    return null;
  }

  const isOwner = group.owner.user_id === user.id;
  const isAdmin = group?.proxies?.some((proxy) => proxy.user_id === user.id);

  if (!isOwner && !isAdmin) {
    return null;
  }

  const links = [
    {
      name: "Группа",
      url: `/groups/${id}`,
      active: false,
    },
    {
      name: "Отправленные",
      url: `/groups/${id}/sent`,
      active: false,
    },
    {
      name: "Полученные",
      url: `/groups/${id}/received`,
      active: true,
    },
  ];

  return (
    <GroupByIdRecievedWrapper>
      <NavBarServer links={isOwner || isAdmin ? links : []} />
      <ContentWrapper>
        {invites.length > 0 ? (
          <>
            <InvitesWrapper>
              {invites.map((invite) => (
                <InviteItem key={invite.id} invite={invite} groupId={id} />
              ))}
            </InvitesWrapper>
            <DeleteAllButton ids={invites.map((invite) => invite.id)} />
          </>
        ) : (
          <NoInvites>Запросов пока нет</NoInvites>
        )}
      </ContentWrapper>
    </GroupByIdRecievedWrapper>
  );
}
