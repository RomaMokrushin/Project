import GroupsClient from "./groupsClient";
import GroupsService from "@/core/services/Groups.service";

export default async function GroupsServer() {
  const { data: associates, error: errorAssociates } =
    await GroupsService.getAssociates();
  const { data: groups, error: errorGroups } =
    await GroupsService.getMyGroups();
  if (!groups || errorGroups || !associates || errorAssociates) {
    // TODO: Handle error
    return null;
  }

  return <GroupsClient groups={groups} usersCut={associates} />;
}
