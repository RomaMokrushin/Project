"use client";

import styled from "styled-components";

export const StyledReportByIdPageWrapper = styled.div`
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  flex-grow: 1;
  min-height: 100vh;
  position: relative;
`;

export const GoBackButton = styled.a`
  display: flex;
  gap: 8px;
  align-items: center;
  width: fit-content;
  position: relative;
  font-size: 20px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  cursor: pointer;

  &:after {
    content: "";
    background: none repeat scroll 0 0 transparent;
    bottom: -6px;
    background: #7a8699;
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  &:hover:after {
    width: 100%;
    left: 0;
  }
`;
