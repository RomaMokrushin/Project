"use client";

import styled from "styled-components";

export const StyledGroupReportsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f7f8f9;
  padding: 16px;
  border-radius: 8px;
  border: 2px solid #007aff;
`;

export const StyledTitle = styled.h2`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  line-height: 24px;
  font-weight: 600;
`;

export const StyledNoReportsText = styled.p`
  color: #007aff;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  line-height: 24px;
  font-weight: 700;
`;

export const ReportsWrapper = styled.div<{ $noEvents: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  padding-right: 8px;

  gap: 16px;
  ${({ $noEvents }) =>
    $noEvents &&
    `
  display: flex;
  flex-direction: column;
  justify-content: center;
    align-items: center;
  flex-grow: 1;`}
  svg {
    max-height: 120px;
    max-width: 120px;
  }

  max-height: 840px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(3, 70, 227, 0.99);
    background-color: #007aff;
  }
`;
