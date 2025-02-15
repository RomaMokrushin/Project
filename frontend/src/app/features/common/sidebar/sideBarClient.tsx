"use client";

import { Icon } from "@/core/enums/Icon.enum";
import {
  AppName,
  LogoWrapper,
  MenuItem,
  MenuWrapper,
  StyledNavWrapper,
  StyledSideBarWrapper,
  StyledUserName,
  UserWrapper,
  Notification,
  NavTextWrapper,
  StyledLogOut,
} from "./styles/sideBar.styles";
import Avatar, { genConfig } from "react-nice-avatar";
import { IconHandler } from "@/core/images/IconHandler";
import { handleLogoutAction } from "@/core/actions/logout";

type Props = {
  menuItems: {
    title: string;
    icon: Icon;
    link: string;
    isActive: boolean;
    notifications?: number;
  }[];
  userId: string;
  logo: Icon;
  userName: string;
  avatarConfig: string;
};

export default function SideBarClient({
  menuItems,
  logo,
  userName,
  userId,
  avatarConfig,
}: Props) {
  const config = genConfig(avatarConfig);

  const handleLogout = async () => {
    await handleLogoutAction();
  };

  return (
    <StyledSideBarWrapper>
      <LogoWrapper href="/">
        {IconHandler(logo)}
        <AppName>FinanceFlow</AppName>
      </LogoWrapper>
      <MenuWrapper>
        <UserWrapper href={`/user/${userId}`}>
          <Avatar
            style={{
              width: "48px",
              height: "48px",
              minHeight: "48px",
              minWidth: "48px",
            }}
            {...config}
          />
          <StyledUserName>{userName}</StyledUserName>
        </UserWrapper>
        <StyledNavWrapper>
          {menuItems.map((item, index) => (
            <MenuItem key={index} href={item.link} $isActive={item.isActive}>
              {IconHandler(item.icon)}
              <NavTextWrapper>{item.title}</NavTextWrapper>
              {item.notifications && (
                <Notification>{item.notifications}</Notification>
              )}
            </MenuItem>
          ))}
        </StyledNavWrapper>
      </MenuWrapper>
      <StyledLogOut onClick={handleLogout}>
        {IconHandler(Icon.Logout)}
        <NavTextWrapper>Выйти</NavTextWrapper>
      </StyledLogOut>
    </StyledSideBarWrapper>
  );
}
