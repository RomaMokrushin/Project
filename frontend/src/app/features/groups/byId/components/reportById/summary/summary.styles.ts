import styled from "styled-components";

export const SummaryWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
  flex-direction: column;
`;

export const BlockTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const SummaryDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  padding: 16px 30px;
  border-radius: 24px;
  border: 2px solid #007aff;
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
export const ItemTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const ItemValue = styled(ItemTitle)`
  font-weight: 600;
`;
