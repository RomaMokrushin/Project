"use client";

import type { Group, PartialUser } from "@/core/types";
import {
  ExtraUsers,
  ItemWrapper,
  NameBubble,
  StyledHeader,
  StyledHomepage,
  StyledInput,
  StyledInputWrapper,
  StyledNav,
  StyledNavWrapper,
  StyledPageTitle,
  StyledUsersWrapper,
  ViewBar,
  ViewSelector,
  ViewSelectorItem,
  ViewSelectorItemText,
} from "../../styles/homePage.styles";
import Avatar, { genConfig } from "react-nice-avatar";
import { useState } from "react";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import Card from "./components/card/card";
import { CardsWrapper, ListWrapper } from "./groups.styles";
import ListRow from "./components/list-row/list-row";
import EmptyCard from "./components/empty-card";

type Props = {
  groups: Group[];
  usersCut: PartialUser[];
};

export default function GroupsClient({ groups, usersCut }: Props) {
  const [groupsFiltered, setGroupsFiltered] = useState(groups);
  const [selectedView, setSelectedView] = useState("grid");

  const title = "Главная страница";
  const extraUsersCount = usersCut.length - 4;
  const menu = [
    {
      title: "Группы",
      isActive: true,
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
      isActive: false,
      link: "/recent-events",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredGroups = groups.filter((group) => {
      return group.name.toLowerCase().includes(value.toLowerCase());
    });

    setGroupsFiltered(filteredGroups);
  };

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
      <ViewBar>
        <ViewSelector>
          <ViewSelectorItem
            $isActive={selectedView === "grid"}
            onClick={() => setSelectedView("grid")}
          >
            {IconHandler(Icon.GridView)}
            <ViewSelectorItemText>Просмотреть таблицей</ViewSelectorItemText>
          </ViewSelectorItem>
          <ViewSelectorItem
            $isActive={selectedView === "list"}
            $isRight
            onClick={() => setSelectedView("list")}
          >
            {IconHandler(Icon.ListView)}
            <ViewSelectorItemText>Просмотреть списком</ViewSelectorItemText>
          </ViewSelectorItem>
        </ViewSelector>
        <StyledInputWrapper>
          <StyledInput placeholder="поиск" onChange={(e) => handleSearch(e)} />
          {IconHandler(Icon.Spyglass)}
        </StyledInputWrapper>
      </ViewBar>
      {selectedView === "grid" && (
        <CardsWrapper>
          {groupsFiltered.map((group) => (
            <Card
              key={group.id}
              title={group.name}
              link={`/groups/${group.id}`}
              owner={group.owner}
              admins={group.proxies}
              members={group.participants}
              description={group.about}
            />
          ))}
          <EmptyCard />
        </CardsWrapper>
      )}
      {selectedView === "list" && (
        <ListWrapper>
          {groupsFiltered.map((group) => (
            <ListRow
              key={group.id}
              link={`/groups/${group.id}`}
              title={group.name}
              members={group.participants}
              description={group.about}
            />
          ))}
        </ListWrapper>
      )}
    </StyledHomepage>
  );
}
