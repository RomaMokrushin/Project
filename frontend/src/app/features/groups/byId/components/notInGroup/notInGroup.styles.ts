"use client";

import styled from "styled-components";
import { GroupUserWrapper } from "../groupUsers/groupUser.styles";

export const NotInGroupWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
  & > div {
    width: 50%;
  }
`;

export const KnockAndAdminsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  ${GroupUserWrapper} {
    height: fit-content !important;
    max-height: 50% !important;
  }
`;

export const StyledButtonText = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: white;
  white-space: nowrap;
`;

export const KnockButtonWrapper = styled.div<{ $isKnocked: boolean }>`
  margin-left: auto;
  cursor: pointer;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px 16px;
  width: fit-content;
  background-color: #007aff;
  border-radius: 16px;

  svg {
    max-width: 30px;
    max-height: 30px;
    transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  &:hover svg {
    animation: wave 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  ${({ $isKnocked }) =>
    $isKnocked &&
    `
        cursor: not-allowed;
        background-color:rgb(179, 179, 179);

        &:hover {
           svg {
            animation: none;
           }
        }
    `}
`;

export const KnockModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  backdrop-filter: blur(10px);

  display: grid;
  place-items: center;
`;

export const KnockModal = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 24px;
  background-color: #fff;
  position: relative;
  border-radius: 8px;
`;

export const KnockModalTitle = styled.h2`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 8px;
  white-space: unset;
`;

export const KnockInviteLetter = styled.textarea`
  width: 100%;
  height: 321px;
  padding: 16px;
  border: 1px solid #e7e7e7;
  background: #fff;
  border-radius: 8px;
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #007aff;
  }
`;

export const KnockButton = styled.button`
  cursor: pointer;
  margin: 0 auto;
  width: 223px;
  height: 40px;
  border-radius: 90px;
  border: 1px solid #007aff;
  background: #007aff;
  text-align: center;
  color: #fff;
  outline: none;
  transition: 0.3s;

  &:hover {
    background: #fff;
    color: #007aff;
  }
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  top: -16px;
  right: -16px;
  background-color: #fff;
  border-radius: 50%;
  svg {
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: 0.3s;
  }
  &:hover {
    svg,
    path {
      fill: #007aff !important;
      stroke: #007aff !important;
    }
  }
`;
