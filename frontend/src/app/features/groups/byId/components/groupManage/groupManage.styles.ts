"use client";

import styled from "styled-components";

export const StyledGroupManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;
export const StyledButtonText = styled.div`
  user-select: none;
  color: white;
  width: 70%;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
`;

export const ManageButtonWrapper = styled.div<{ $isDelete?: boolean }>`
  cursor: pointer;
  border: 2px solid #007aff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap: 16px;
  padding: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 50px;
  background-color: #007aff;
  transition: 0.3s;

  &:hover {
    background-color: #f2f2f7;
    ${StyledButtonText} {
      color: #007aff;
    }
    svg,
    path {
      fill: #007aff !important;
    }
  }

  ${({ $isDelete }) =>
    $isDelete &&
    `
    border: 2px solid rgb(255, 113, 106);
    background-color: rgb(255, 113, 106);
    &:hover {
      background-color: #f2f2f7;
      ${StyledButtonText} {
        color: rgb(255, 113, 106);
      }
      svg,
      path {
        fill: rgb(255, 113, 106) !important;
      }
    }
  `}

  svg {
    max-height: 20px;
  }
`;
