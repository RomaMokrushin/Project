"use client";

import { Debt, DebtTotal, PartialUser } from "@/core/types";
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
import {
  Divider,
  StyledDebtorsWrapper,
  TotalBlockWrapper,
  TotalItemBlock,
  TotalTitle,
  TotalValue,
} from "./debtors.styles";
import DebtCard from "./debtCard";

type Props = {
  debts: Debt[];
  debtsTotal: DebtTotal;
  usersCut: PartialUser[];
};
export default function DebtorsClient({
  usersCut,
  debts,
  debtsTotal,
}: Readonly<Props>) {
  const title = "Должники";
  const extraUsersCount = usersCut.length - 4;
  const menu = [
    {
      title: "Группы",
      isActive: false,
      link: "/",
    },
    {
      title: "Должники",
      isActive: true,
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
      <StyledDebtorsWrapper>
        {debts.map((debt) => (
          <DebtCard key={debt.id} debt={debt} />
        ))}
      </StyledDebtorsWrapper>
      <TotalBlockWrapper>
        <TotalItemBlock>
          <TotalTitle>Мне всего должны</TotalTitle>
          <TotalValue>{debtsTotal.lends.toFixed(2)}₽</TotalValue>
        </TotalItemBlock>
        <Divider />
        <TotalItemBlock>
          <TotalTitle>Должно людей</TotalTitle>
          <TotalValue>{debtsTotal.amount_debters}</TotalValue>
        </TotalItemBlock>
      </TotalBlockWrapper>
    </StyledHomepage>
  );
}
