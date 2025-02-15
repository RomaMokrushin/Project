"use client";

import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import type { Report } from "@/core/types";
import {
  ReportsWrapper,
  StyledGroupReportsWrapper,
  StyledNoReportsText,
  StyledTitle,
} from "./groupReports.styles";
import {
  AuthorWrapper,
  DateWrapper,
  StyledReportAuthor,
  StyledReportsWrapper,
  StyledReportTitle,
  StyledReportWrapper,
} from "./report.styles";
import Avatar, { genConfig } from "react-nice-avatar";
type Props = {
  reports: Report[];
  groupId: number;
};

export default function GroupReports({ reports, groupId }: Props) {
  const sortedReports = reports.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const transformDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const pickVariant = (index: number) => {
    return index % 4 === 0
      ? "1"
      : index % 4 === 1
      ? "2"
      : index % 4 === 2
      ? "3"
      : "4";
  };

  return (
    <StyledGroupReportsWrapper>
      <StyledTitle>Отчеты:</StyledTitle>
      <ReportsWrapper $noEvents={!sortedReports.length}>
        {!sortedReports.length ? (
          <>
            <StyledNoReportsText>
              К сожалению, отчетов пока нет
            </StyledNoReportsText>
            {IconHandler(Icon.SadFace)}
          </>
        ) : (
          <StyledReportsWrapper>
            {sortedReports.map((report, index) => (
              <StyledReportWrapper
                key={report.id}
                href={`${groupId}/reports/${report.id}`}
              >
                <StyledReportTitle>{report.trip_name}</StyledReportTitle>
                <AuthorWrapper>
                  <Avatar
                    style={{
                      width: "24px",
                      height: "24px",
                      minHeight: "24px",
                      minWidth: "24px",
                    }}
                    {...genConfig(report.creator.avatar)}
                  />
                  <StyledReportAuthor>{report.creator.name}</StyledReportAuthor>
                </AuthorWrapper>
                <DateWrapper $variant={pickVariant(index)}>
                  {transformDate(report.created_at)}
                </DateWrapper>
              </StyledReportWrapper>
            ))}
          </StyledReportsWrapper>
        )}
      </ReportsWrapper>
    </StyledGroupReportsWrapper>
  );
}
