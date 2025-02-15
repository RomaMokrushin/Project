"use client";

import styled from "styled-components";

export const GroupByIdSentWrapper = styled.div`
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  flex-grow: 1;
  min-height: 100vh;
  position: relative;
`;

export const ContentWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const InvitesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

export const NoInvites = styled.h2`
  margin: 0 auto;
  color: #868282;
  text-align: center;
  font-family: Inter;
  font-size: 32px;
  line-height: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
