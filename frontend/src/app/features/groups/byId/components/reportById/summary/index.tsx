"use client";

import { Trip } from "@/core/types";
import {
  BlockTitle,
  Item,
  ItemTitle,
  ItemValue,
  SummaryDataWrapper,
  SummaryWrapper,
} from "./summary.styles";

type Props = {
  report: Trip;
};

export default function ReportSummary({ report }: Props) {
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  };
  return (
    <SummaryWrapper>
      <BlockTitle>Общие итоги по поездке:</BlockTitle>
      <SummaryDataWrapper>
        <Item>
          <ItemTitle>Затраченно в сумме</ItemTitle>
          <ItemValue>{report.wasted_money.toFixed(2)}₽</ItemValue>
        </Item>
        <Item>
          <ItemTitle>Всего событий</ItemTitle>
          <ItemValue>{report.amount_events}</ItemValue>
        </Item>
        <Item>
          <ItemTitle>Всего участников</ItemTitle>
          <ItemValue>{report.amount_users}</ItemValue>
        </Item>
        <Item>
          <ItemTitle>Дата создания поездки</ItemTitle>
          <ItemValue>{formatDate(report.date)}</ItemValue>
        </Item>
      </SummaryDataWrapper>
    </SummaryWrapper>
  );
}
