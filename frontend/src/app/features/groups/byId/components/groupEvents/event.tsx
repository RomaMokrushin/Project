"use client";

import type { GroupLog } from "@/core/types";
import {
  AuthorName,
  AuthorWrapper,
  EventDot,
  LogAndEventDotWrapper,
  LogWrapper,
  StyledEventWrapper,
  SubMessageLink,
  SubMessageText,
  TimeWrapper,
} from "./event.styles";
import Avatar, { genConfig } from "react-nice-avatar";

type Props = {
  log: GroupLog;
};

export default function Event({ log }: Props) {
  const authors = log.author.map((author, index) => {
    return (
      <AuthorWrapper key={author.id} href={`/users/${author.id}`}>
        <Avatar
          style={{
            width: "16px",
            height: "16px",
            minHeight: "16px",
            minWidth: "16px",
          }}
          {...genConfig(author.avatar)}
        />
        <AuthorName>{`${author.first_name} ${author.last_name} ${
          index === log.author.length - 1 ? "" : ","
        }`}</AuthorName>
      </AuthorWrapper>
    );
  });

  const time = formatISODate(log.created_at);

  //   const eventDotType =

  const subMessage = log.subMessage?.message ? (
    log.subMessage.type === "link" ? (
      <SubMessageLink href={log.subMessage.link}>
        {log.subMessage.message}
      </SubMessageLink>
    ) : (
      <SubMessageText>{log.subMessage.message}</SubMessageText>
    )
  ) : (
    ""
  );

  return (
    <StyledEventWrapper>
      <LogAndEventDotWrapper>
        <EventDot $type={log.type} />
        <LogWrapper>
          {authors}&nbsp;{log.message}&nbsp;{subMessage}
        </LogWrapper>
      </LogAndEventDotWrapper>
      <TimeWrapper>{time}</TimeWrapper>
    </StyledEventWrapper>
  );
}

function formatISODate(isoDate: string): string {
  // Parse the ISO date string
  const date = new Date(isoDate);

  // Extract components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the output
  return `${day}/${month} ${hours}:${minutes}`;
}
