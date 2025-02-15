"use client";

import styled from "styled-components";

export const StyledStatisticsWrapper = styled.div`
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  flex-grow: 1;
  min-height: 100vh;
  position: relative;
`;

export const MainDataWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  /* center */
  place-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  row-gap: 48px;
`;

export const DataBlockWrapper = styled.div`
  /* display: grid;
  place-items: center; */
  width: 100%;
  height: 400px;
`;
