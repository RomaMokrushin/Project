"use client";

import styled from "styled-components";

export const StyledNotificationWrapper = styled.div<{ $isRead: boolean }>`
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  background: #fff;
  transition: all 0.3s ease;
  max-height: 92px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: fit-content;
  border: 2px solid transparent;

  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);

  ${({ $isRead }) =>
    !$isRead &&
    `
       border: 2px solid #007aff;
    `}
`;

export const DeleteNotificationButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export const MessageWrapper = styled.div`
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 111.111% */
`;

export const MessageSentDate = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  color: #868282;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
