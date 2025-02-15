"use client";

import styled from "styled-components";

export const StyledDataBlockWrapper = styled.div`
  margin: 0 auto;
  margin-top: 72px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 21px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  max-width: 720px;
`;

export const DataElement = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  /* second span child */
  &:nth-child(2) {
    text-align: center;
    min-width: 33%;
  }
`;
