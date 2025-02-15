import GroupsService from "@/core/services/Groups.service";
import {
  StyledGroupContainer,
  StyledGroupDescriptionAndEventsWrapper,
  StyledGroupsById,
  StyledUsersAndSettingsWrapper,
} from "../../styles/groupsById.styles";
import NavBarServer from "@/app/features/common/navBar/navBarServer";
import GroupEvents from "../groupEvents";
import GroupUsers from "../groupUsers";
import GroupManage from "../groupManage";
import UserService from "@/core/services/User.service";
import GroupReports from "../groupReports";
import GroupAbout from "../groupAbout";
import NotInGroup from "../notInGroup/notInGroup";
import CloseGroup from "../closeGroup/closeGroup";

type Props = {
  id: string;
};

export default async function GroupsByIdServer({ id }: Props) {
  const { data: group, error: errorGroup } = await GroupsService.getGroupById(
    id
  );
  const { data: user, error: errorUser } = await UserService.getMe();
  const { data: logs, error: errorLogs } = await GroupsService.getGroupLogs(id);
  const { data: reports, error: errorReports } =
    await GroupsService.getTripReviews(id);

  if (
    !group ||
    errorGroup ||
    !user ||
    errorUser ||
    !logs ||
    errorLogs ||
    !reports ||
    errorReports
  ) {
    console.log("error", errorGroup, errorUser, errorLogs, errorReports);
    return null;
  }

  const isOwner = group.owner.user_id === user.id;
  const isAdmin = group?.proxies?.some((proxy) => proxy.user_id === user.id);
  let meInGroup = false;
  const participantsIds = group?.participants?.map(
    (participant) => participant.user_id
  );

  const allUniqueGroupUsers = [
    ...group?.participants,
    ...group?.proxies,
    group?.owner,
  ].filter((user, index, self) => {
    return index === self.findIndex((t) => t.user_id === user.user_id);
  });
  const proxiesIds = group?.proxies?.map((proxy) => proxy.user_id);
  meInGroup = participantsIds?.includes(user.id);
  if (!meInGroup) meInGroup = proxiesIds?.includes(user.id);
  if (!meInGroup) meInGroup = group?.owner?.user_id === user.id;
  const isPrivate = group.is_private;
  const links = [
    {
      name: "Группа",
      url: `/groups/${id}`,
      active: true,
    },
    {
      name: "Отправленные",
      url: `/groups/${id}/sent`,
      active: false,
    },
    {
      name: "Полученные",
      url: `/groups/${id}/received`,
      active: false,
    },
  ];

  return (
    <StyledGroupsById>
      <NavBarServer links={isOwner || isAdmin ? links : []} />
      <GroupAbout group={group} isOwner={isOwner} />
      {isPrivate && !meInGroup ? (
        <CloseGroup group={group} />
      ) : (
        <>
          {!meInGroup ? (
            <NotInGroup group={group} />
          ) : (
            <StyledGroupContainer>
              <StyledGroupDescriptionAndEventsWrapper>
                <GroupEvents events={logs} />
              </StyledGroupDescriptionAndEventsWrapper>
              <StyledGroupDescriptionAndEventsWrapper>
                <GroupReports reports={reports} groupId={group.id} />
              </StyledGroupDescriptionAndEventsWrapper>
              <StyledUsersAndSettingsWrapper>
                <GroupUsers
                  users={group?.proxies}
                  groupId={group.id}
                  groupTitle="Администраторы"
                  notAdmins={group?.participants.filter(
                    (user) =>
                      !group.proxies.some(
                        (proxy) => proxy.user_id === user.user_id
                      )
                  )}
                  isAllowedToAddUsers={isOwner}
                  variant="admins"
                  inGroup
                />
                <GroupUsers
                  users={group?.participants}
                  groupId={group.id}
                  groupTitle="Участники"
                  isAllowedToAddUsers={isAdmin || isOwner}
                  variant="users"
                  inGroup
                />
                <GroupManage
                  isGroupOwner={isOwner}
                  isAllowedToEdit={isAdmin || isOwner}
                  allGroupMembers={allUniqueGroupUsers}
                  groupId={group.id}
                />
              </StyledUsersAndSettingsWrapper>
            </StyledGroupContainer>
          )}
        </>
      )}
    </StyledGroupsById>
  );
}
