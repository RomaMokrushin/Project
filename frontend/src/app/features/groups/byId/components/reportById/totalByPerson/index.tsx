"use client";

import { Trip } from "@/core/types";
import {
  AllTotalsWrapper,
  BlockTitle,
  CardUserWrapper,
  Item,
  ItemsWrapper,
  ItemTitle,
  ItemValue,
  TotalByPersonWrapper,
  TotalCard,
  UserName,
} from "./totalByPerson.styles";
import Avatar, { genConfig } from "react-nice-avatar";

type Props = {
  report: Trip;
};
export default function ReportTotalByPerson({ report }: Props) {
  return (
    <TotalByPersonWrapper>
      <BlockTitle>
        Итоги за поездку для каждого человека индивидуально:
      </BlockTitle>
      <AllTotalsWrapper>
        {report.statistics.map((person) => {
          return (
            <TotalCard key={`person-${person.user.user_id}`}>
              <CardUserWrapper href={`/user/${person.user.user_id}`}>
                <Avatar
                  style={{
                    width: "48px",
                    height: "48px",
                    minHeight: "48px",
                    minWidth: "48px",
                  }}
                  {...genConfig(person.user.avatar)}
                />
                <UserName>{person.user.name}</UserName>
              </CardUserWrapper>
              <ItemsWrapper>
                <Item>
                  <ItemTitle>Занял денег</ItemTitle>
                  <ItemValue>{person.borrowed_money.toFixed(2)}₽</ItemValue>
                </Item>
                <Item>
                  <ItemTitle>Взял в взаймы</ItemTitle>
                  <ItemValue>{person.lended_money.toFixed(2)}₽</ItemValue>
                </Item>
                <Item>
                  <ItemTitle>Стал кредитором</ItemTitle>
                  <ItemValue>{person.lender}</ItemValue>
                </Item>
                <Item>
                  <ItemTitle>Стал должником</ItemTitle>
                  <ItemValue>{person.debter}</ItemValue>
                </Item>
                <Item>
                  <ItemTitle>Поучаствовал в событиях</ItemTitle>
                  <ItemValue>{person.participate}</ItemValue>
                </Item>
                <Item>
                  <ItemTitle>Итог</ItemTitle>
                  <ItemValue>{person.result.toFixed(2)}₽</ItemValue>
                </Item>
              </ItemsWrapper>
            </TotalCard>
          );
        })}
      </AllTotalsWrapper>
    </TotalByPersonWrapper>
  );
}
