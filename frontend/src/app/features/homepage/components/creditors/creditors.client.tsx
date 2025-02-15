"use client";

import { Credit, CreditTotal, PartialUser } from "@/core/types";
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
} from "./creditors.styles";
import CreditorCard from "./creditorCard";

type Props = {
  credits: Credit[];
  creditsTotal: CreditTotal;
  usersCut: PartialUser[];
};
export default function CreditorsClient({
  usersCut,
  credits,
  creditsTotal,
}: Readonly<Props>) {
  const title = "Кредиторы";
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
      isActive: true,
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
        {credits.map((credit) => (
          <CreditorCard key={credit.id} credit={credit} />
        ))}
      </StyledDebtorsWrapper>
      <TotalBlockWrapper>
        <TotalItemBlock>
          <TotalTitle>Я всего должнен</TotalTitle>
          <TotalValue>{creditsTotal.debts.toFixed(2)}₽</TotalValue>
        </TotalItemBlock>
        <Divider />
        <TotalItemBlock>
          <TotalTitle>Должнен людям</TotalTitle>
          <TotalValue>{creditsTotal.amount_lenders}</TotalValue>
        </TotalItemBlock>
      </TotalBlockWrapper>
    </StyledHomepage>
  );
}
