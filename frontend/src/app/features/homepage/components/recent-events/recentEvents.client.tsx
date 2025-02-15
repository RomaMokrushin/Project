"use client";

import { PartialUser, RecentEvent } from "@/core/types";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  StyledHomepage,
  StyledHeader,
  StyledPageTitle,
  StyledNavWrapper,
  StyledNav,
  StyledUsersWrapper,
  ItemWrapper,
  NameBubble,
  ExtraUsers,
} from "../../styles/homePage.styles";
import { StyledRecentEventsWrapper } from "./recentEvents.styles";
import Event from "./event";

type Props = {
  recentEvents: RecentEvent[];
  usersCut: PartialUser[];
};

export default function RecentEventsClient({
  recentEvents,
  usersCut,
}: Readonly<Props>) {
  const title = "Недавние события";
  const extraUsersCount = usersCut.length - 4;
  const menu = [
    {
      title: "Группы",
      isActive: false,
      link: "/",
    },
    {
      title: "Должники",
      isActive: false,
      link: "/debtors",
    },
    {
      title: "Кредиторы",
      isActive: false,
      link: "/creditors",
    },
    {
      title: "Недавние события",
      isActive: true,
      link: "/recent-events",
    },
  ];
  return (
    <StyledHomepage>
      <StyledHeader>
        <StyledPageTitle>{title}</StyledPageTitle>
        <StyledNavWrapper>
          {menu.map((item) => (
            <StyledNav
              key={item.title}
              $isActive={item.isActive}
              href={item.link}
            >
              {item.title}
            </StyledNav>
          ))}
        </StyledNavWrapper>
        <StyledUsersWrapper>
          {usersCut.slice(0, 4).map((user, index) => (
            <ItemWrapper $n={index + 1} key={user.user_id}>
              <NameBubble>{user.name}</NameBubble>
              <Avatar
                key={user.user_id}
                style={{
                  width: "40px",
                  height: "40px",
                  minHeight: "40px",
                  minWidth: "40px",
                }}
                {...genConfig(user.avatar)}
              />
            </ItemWrapper>
          ))}
          <ItemWrapper $n={5} $noHover>
            <ExtraUsers>+{extraUsersCount}</ExtraUsers>
          </ItemWrapper>
        </StyledUsersWrapper>
      </StyledHeader>
      <StyledRecentEventsWrapper>
        {recentEvents.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </StyledRecentEventsWrapper>
    </StyledHomepage>
  );
}
