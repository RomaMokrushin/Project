"use client";

import type { UserStatistics } from "@/core/types";
import { ResponsiveBar } from "@nivo/bar";
import { GraphTitle, StyledBarChartWrapper } from "./barChart.styles";

type Props = {
  statistics?: UserStatistics;
};

export default function BarChart({ statistics }: Props) {
  if (!statistics) {
    return (
      <StyledBarChartWrapper>
        <GraphTitle>Статистика скрыта пользователем</GraphTitle>
      </StyledBarChartWrapper>
    );
  }
  const data = Object.entries(statistics).map(([month, поездки]) => ({
    month,
    поездки,
  }));

  return (
    <StyledBarChartWrapper>
      <GraphTitle>Статистика по посещенным поездкам</GraphTitle>
      <ResponsiveBar
        data={data}
        keys={["поездки"]}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
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
          legend: "Поездки",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in month: " + e.indexValue
        }
      />
    </StyledBarChartWrapper>
  );
}
