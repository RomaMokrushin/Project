import RecentEventsService from "@/core/services/RecentEvents.service";
import RecentEventsClient from "./recentEvents.client";
import GroupsService from "@/core/services/Groups.service";

export default async function RecentEventsServer() {
  const { data: associates, error: errorAssociates } =
    await GroupsService.getAssociates();

  const { data: recentEvents, error: errorRecentEvents } =
    await RecentEventsService.getAllRecentEvents();

  if (!associates || errorAssociates || !recentEvents || errorRecentEvents) {
    // TODO: Handle error
    return null;
  }

  return (
    <RecentEventsClient usersCut={associates} recentEvents={recentEvents} />
  );
}
