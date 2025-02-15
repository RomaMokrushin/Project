"use client";

import { Trip } from "@/core/types";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  StyledReportHeader,
  StyledAuthorWrapper,
  StyledSubTitle,
  StyledAuthor,
  StyledAuthorName,
  ReportTitle,
} from "./header.styles";

type Props = {
  report: Trip;
};
export default function ReportHeader({ report }: Props) {
  return (
    <StyledReportHeader>
      <StyledAuthorWrapper>
        <StyledSubTitle>Создатель поездки:</StyledSubTitle>
        <StyledAuthor href={`/user/${report.creator.user_id}`}>
          <Avatar
            style={{
              width: "24px",
              height: "24px",
              minHeight: "24px",
              minWidth: "24px",
            }}
            {...genConfig(report.creator.avatar)}
          />
          <StyledAuthorName>{report.creator.name}</StyledAuthorName>
        </StyledAuthor>
      </StyledAuthorWrapper>
      <ReportTitle>{report.trip_name}</ReportTitle>
      <StyledAuthorWrapper>
        <StyledSubTitle>В группе:</StyledSubTitle>
        <StyledAuthor href={`/groups/${report.group.id}`}>
          <StyledAuthorName>{report.group.name}</StyledAuthorName>
        </StyledAuthor>
      </StyledAuthorWrapper>
    </StyledReportHeader>
  );
}
