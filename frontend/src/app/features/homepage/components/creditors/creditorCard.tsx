"use client";

import { Credit } from "@/core/types";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  StyledCreditorCard,
  StyledItemWrapper,
  UserWrapper,
  StyledButton,
  CardTitle,
  Value,
  StyledDate,
} from "./creditorCard.styles";
type Props = {
  credit: Credit;
};

export default function CreditorCard({ credit }: Readonly<Props>) {
  return (
    <StyledCreditorCard key={credit.id}>
      <StyledItemWrapper $isLeft>
        <UserWrapper>
          <Avatar
            style={{
              width: "40px",
              height: "40px",
              minHeight: "40px",
              minWidth: "40px",
            }}
            {...genConfig(credit.lender.avatar)}
          />
          <span>{credit.lender.name}</span>
        </UserWrapper>
      </StyledItemWrapper>
      <StyledItemWrapper $isCenter>
        <CardTitle>Задолженность</CardTitle>
        <Value>{credit.money.toFixed(2)} ₽</Value>
      </StyledItemWrapper>
      <StyledItemWrapper>
        <StyledButton>Оплатить</StyledButton>
      </StyledItemWrapper>
      <StyledDate>{credit.created_at}</StyledDate>
    </StyledCreditorCard>
  );
}
