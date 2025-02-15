import { Icon } from "@/core/enums/Icon.enum";

import SideBarClient from "./sideBarClient";
import UserService from "@/core/services/User.service";
import NotificationsService from "@/core/services/Notifications.service";
import TransactionsService from "@/core/services/Transactions.service";

export default async function SideBarServer() {
  const { data: user, error: errorUser } = await UserService.getMe();
  if (!user || errorUser) {
    // TODO: Handle error
    return null;
  }

  const { data: notifications, error: errorNotification } =
    await NotificationsService.getNotificationUnread();

  const { data: transactions, error: errorTransactions } =
    await TransactionsService.getNumberOfUncheckedTransactions();

  if (errorNotification || errorTransactions) {
    return null;
  }
  // TODO: Fetch user data
  // TODO: Fetch User avatar config
  const userName = `${user.first_name} ${user.last_name}`;

  const logo = Icon.Logo;
  const avatarConfig = user.avatar;

  const menuItems = [
    {
      title: "Моя страница",
      icon: Icon.Home,
      link: "/",
      isActive: true,
    },
    {
      title: "Приглашения",
      icon: Icon.Invites,
      link: "/invites/sent",
      isActive: false,
      notifications: 4,
    },
    {
      title: "Уведомления",
      icon: Icon.Clock,
      link: "/notifications",
      notifications: notifications ? notifications : undefined,
      isActive: false,
    },
    {
      title: "Статистика",
      icon: Icon.Statistics,
      link: "/statistics",
      isActive: false,
    },
    {
      title: "Мои транзакции",
      icon: Icon.Transactions,
      link: "/transactions",
      notifications: transactions ? transactions : undefined,
      isActive: false,
    },
  ];

  return (
    <SideBarClient
      menuItems={menuItems}
      logo={logo}
      userId={user.id.toString()}
      userName={userName}
      avatarConfig={avatarConfig}
    />
  );
}
