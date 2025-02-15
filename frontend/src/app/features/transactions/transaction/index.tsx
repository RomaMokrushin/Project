"use client";

import { Transaction as TransactionType } from "@/core/types";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  StyledTransactionWrapper,
  UserWrapper,
  UserName,
  MiddleSectionWrapper,
  SumText,
  ArrowTransaction,
  TransactionTypeText,
  StyledDate,
  IconWrapper,
} from "./transaction.styles";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import { useState } from "react";
import { handleCheckTransaction } from "@/core/actions/check-transaction";
type Props = {
  transaction: TransactionType;
};
export default function Transaction({ transaction }: Props) {
  const [isTransactionChecked, setIsTransactionChecked] = useState(
    transaction.checked === 1
  );

  const handleCheckTransactionLocal = async () => {
    if (isTransactionChecked) return;
    setIsTransactionChecked(true);

    try {
      const res = await handleCheckTransaction({
        body: { ids: [transaction.id] },
      });
      if (res.error) {
        setIsTransactionChecked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledTransactionWrapper onMouseOver={handleCheckTransactionLocal}>
      {!isTransactionChecked && (
        <IconWrapper>{IconHandler(Icon.Eye)}</IconWrapper>
      )}
      <UserWrapper>
        <Avatar
          style={{
            width: "60px",
            height: "60px",
            minHeight: "60px",
            minWidth: "60px",
          }}
          {...genConfig(transaction.from_user.avatar)}
        />
        <UserName>{transaction.from_user.name}</UserName>
      </UserWrapper>
      <MiddleSectionWrapper>
        <SumText>{transaction.money.toFixed(2)}₽</SumText>
        <ArrowTransaction $reverse={!transaction.direction} />
        <TransactionTypeText>
          {transaction.card_to}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {transaction.card_from}
        </TransactionTypeText>
      </MiddleSectionWrapper>
      <UserWrapper>
        <Avatar
          style={{
            width: "60px",
            height: "60px",
            minHeight: "60px",
            minWidth: "60px",
          }}
          {...genConfig(transaction.to_user.avatar)}
        />
        <UserName>{transaction.to_user.name}</UserName>
      </UserWrapper>
      <StyledDate>{transaction.created_at}</StyledDate>
    </StyledTransactionWrapper>
  );
}
