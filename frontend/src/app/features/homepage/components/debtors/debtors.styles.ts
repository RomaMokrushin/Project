import styled from "styled-components";

export const StyledDebtorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const TotalBlockWrapper = styled.div`
  margin-left: auto;
  max-width: 315px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #7a8699;
`;

export const TotalItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 64px;
  padding: 16px 32px;
`;

export const TotalTitle = styled.h3`
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  max-width: 50%;
`;

export const TotalValue = styled.div`
  max-width: 50%;
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
