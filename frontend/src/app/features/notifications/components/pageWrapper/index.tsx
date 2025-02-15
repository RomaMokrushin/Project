import NavBarServer from "@/app/features/common/navBar/navBarServer";
import {
  ContentWrapper,
  NotificationsWrapper,
  StyledNotificationsWrapper,
} from "../../styles/notifications.styles";
import DeleteAllButton from "../deleteAll/deleteAll";
import NotificationsService from "@/core/services/Notifications.service";
import NotificationItem from "../notification/notificationItem";

export default async function NotificationsServer() {
  const { data, error } = await NotificationsService.getMyNotifications();
  if (!data || error) {
    return null;
  }

  return (
    <StyledNotificationsWrapper>
      <NavBarServer />
      <ContentWrapper>
        <NotificationsWrapper>
          {data.map((notification) => (
            <NotificationItem key={Math.random()} {...notification} />
          ))}
        </NotificationsWrapper>
        <DeleteAllButton />
      </ContentWrapper>
    </StyledNotificationsWrapper>
  );
}
