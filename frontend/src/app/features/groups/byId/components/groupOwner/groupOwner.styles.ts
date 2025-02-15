"use client";

import styled from "styled-components";

export const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f7f8f9;
  padding: 16px;
  flex-grow: 1;
  border-radius: 8px;
  border: 2px solid #007aff;
`;

export const AuthorDescription = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const AuthorDescriber = styled.h3`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  line-height: 24px;
  font-weight: 600;
`;

export const AuthorNameWrapper = styled.div`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

export const AuthorName = styled.div`
  text-align: left;
`;

export const AuthorSurname = styled.div`
  text-align: right;
`;

export const AuthorAvatarWrapper = styled.div`
  height: fit-content;
  background-color: #f2f2f7;
  padding: 4px;
  border-radius: 50%;
  border: 4px dashed #007aff;
`;

export const AuthorNominalWrapper = styled.div<{ $isSecond?: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  ${({ $isSecond }) => $isSecond && "justify-content: flex-end;"}
  svg {
    max-height: 22px;
  }
`;
