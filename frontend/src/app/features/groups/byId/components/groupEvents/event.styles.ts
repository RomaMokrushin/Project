"use client";

import styled from "styled-components";

export const StyledEventWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  font-weight: 400;
`;

export const LogAndEventDotWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  max-width: 75%;
`;

export const LogWrapper = styled.div``;

export const TimeWrapper = styled.div`
  color: rgb(126, 126, 126);
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  line-height: 18px;
  font-weight: 400;
  width: fit-content;
`;

export const EventDot = styled.div<{ $type: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #007aff;
  ${({ $type }) =>
    $type === 1 &&
    `
        background-color:rgb(26, 165, 75);
    `}

  ${({ $type }) =>
    $type === 2 &&
    `
        background-color:rgb(255, 193, 7);
    `}

    ${({ $type }) =>
    $type === 3 &&
    `
        background-color:rgb(220, 53, 69);
    `}
`;

export const AuthorsWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AuthorWrapper = styled.a`
  display: flex;
  width: fit-content;
  align-items: center;
  white-space: nowrap;
  gap: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

export const AuthorName = styled.span``;

export const LogMessage = styled.div`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  font-weight: 400;
`;

export const SubMessageLink = styled.a``;

export const SubMessageText = styled.div``;
