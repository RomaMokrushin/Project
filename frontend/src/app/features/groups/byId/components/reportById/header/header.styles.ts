"use client";

import styled from "styled-components";

export const StyledReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 16px 30px;
  border-radius: 24px;
  border: 2px solid #007aff;
`;

export const StyledAuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const StyledSubTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const StyledAuthor = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
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

export const StyledAuthorName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;
export const ReportTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  padding: 16px 30px;
  border-radius: 24px;
  border: 2px solid #e0e0e0;
`;
