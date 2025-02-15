"use client";

import type { UserStatistics } from "@/core/types";
import { ResponsiveBar } from "@nivo/bar";
import { GraphTitle, StyledBarChartWrapper } from "./barChart.styles";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";

type Props = {
  statistics?: UserStatistics;
};

export default function BarChartExpenses({ statistics }: Props) {
  if (!statistics) {
    return (
      <StyledBarChartWrapper>
        <GraphTitle>Данных пока нет</GraphTitle>
        {IconHandler(Icon.SadFace)}
      </StyledBarChartWrapper>
    );
  }
  const data = Object.entries(statistics).map(([month, траты]) => ({
    month,
    траты,
  }));

  return (
    <StyledBarChartWrapper>
      <GraphTitle>Расходы по месяцам</GraphTitle>
      <ResponsiveBar
        data={data}
        keys={["траты"]}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }}
        animate={false}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Месяц",
          legendPosition: "middle",
          legendOffset: 32,
          format: (value) => value.slice(0, 2),
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Траты",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        role="application"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in month: " + e.indexValue
        }
      />
    </StyledBarChartWrapper>
  );
}
