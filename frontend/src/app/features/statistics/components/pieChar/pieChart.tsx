"use client";

import { Icon } from "@/core/enums/Icon.enum";
import { IconHandler } from "@/core/images/IconHandler";
import type { UserStatistics } from "@/core/types";
import { ResponsivePie } from "@nivo/pie";
import {
  StyledPieChartWrapper,
  GraphTitle,
  TooltipWrapper,
  TotalWrapper,
} from "./pieChart.styles";

type Props = {
  statistics?: UserStatistics;
  title: string;
  total: number;
};

export default function PieChart({ statistics, title, total }: Props) {
  if (!statistics) {
    return (
      <StyledPieChartWrapper>
        <GraphTitle>Данных пока нет</GraphTitle>
        {IconHandler(Icon.SadFace)}
      </StyledPieChartWrapper>
    );
  }

  const data = Object.entries(statistics).map(([user, value]) => ({
    id: user,
    label: user,
    value,
  }));
  return (
    <StyledPieChartWrapper>
      <GraphTitle>{title}</GraphTitle>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "set1" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLabel={(e) => `${e.value}₽`}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        tooltip={({ datum }) => (
          <TooltipWrapper>
            {datum.data.label}: {datum.data.value}₽
          </TooltipWrapper>
        )}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
      />
      <TotalWrapper>Всего: {total.toFixed(2)}₽</TotalWrapper>
    </StyledPieChartWrapper>
  );
}
