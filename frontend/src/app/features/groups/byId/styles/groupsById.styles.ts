"use client";

import styled from "styled-components";

export const StyledGroupsById = styled.div`
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  flex-grow: 1;
  min-height: 100vh;
  position: relative;
`;

export const StyledGroupContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  display: grid;
  gap: 20px;
  flex-grow: 1;
  grid-template-columns: 1.4fr 1.4fr 1fr;
`;

export const StyledGroupDescriptionAndEventsWrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const GroupDescriptionText = styled.div`
  margin-top: 20px;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const StyledGroupEvents = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f7f8f9;
  padding: 16px;
  border-radius: 8px;
  border: 2px solid #007aff;
`;

export const StyledUsersAndSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;
