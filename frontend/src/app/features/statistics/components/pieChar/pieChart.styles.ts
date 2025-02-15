import styled from "styled-components";

export const StyledPieChartWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000 !important;
`;

export const GraphTitle = styled.h2`
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  height: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

export const TooltipWrapper = styled.div`
  padding: 4px;
  border: 1px solid #007aff;
  border-radius: 4px;
  background-color: #fff;
`;

export const TotalWrapper = styled.div`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
