"use client";

import styled from "styled-components";

export const BoldedGroupDescription = styled.div`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-weight: 600;
`;

export const GroupDescription = styled.div`
  background-color: #f7f8f9;
  padding: 16px;
  flex-grow: 1;
  border-radius: 8px;
  border: 2px solid #007aff;
`;

export const StyledGroupTitle = styled.h1`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;

  /* Bold/30 */
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 160% */
`;

export const GroupDescriptionAndTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledGroupTitleWrapper = styled.div<{ $isOwner: boolean }>`
  display: flex;
  ${({ $isOwner }) => $isOwner && "cursor: pointer;"}
`;

export const StyledGroupDescription = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 20px;
  flex-grow: 1;
  grid-template-columns: 2fr 1fr;
  max-height: 300px;
`;
