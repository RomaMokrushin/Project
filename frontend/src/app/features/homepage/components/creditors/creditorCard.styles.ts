import styled from "styled-components";

export const StyledCreditorCard = styled.div`
  width: 100%;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 42px 32px;
  position: relative;
`;

export const StyledItemWrapper = styled.div<{
  $isLeft?: boolean;
  $isCenter?: boolean;
}>`
  min-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 23px;
  ${({ $isLeft }) =>
    $isLeft &&
    `
    align-items: flex-start;
  `}

  ${({ $isCenter }) =>
    $isCenter &&
    `
    align-items: center;
  `}
`;

export const UserWrapper = styled.div`
  min-width: 30%;
  display: flex;
  align-items: center;
  gap: 16px;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
`;

export const StyledButton = styled.button<{ $isReminded?: boolean }>`
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 90px;
  border: 2px solid #007aff;
  background: #007aff;
  padding: 10px 32px;
  color: #fff;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
  display: grid;
  place-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #007aff;
  }

  ${({ $isReminded }) =>
    $isReminded &&
    `
    cursor: default;
    background: #E7E7E7;
    color: #9A9B9C;
    border: 2px solid #E7E7E7;
    &:hover {
      background: #E7E7E7;
      border: 2px solid #E7E7E7;
      color: #9A9B9C;
    }
  `}
`;

export const RemindBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const RemindText = styled.div`
  color: #9a9b9c;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
`;

export const CardTitle = styled.div`
  color: #000;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 62.5% */
`;

export const Value = styled.div`
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 83.333% */
  padding: 11px 32px;
  border-radius: 40px;
  border: 3px solid #e7e7e7;
  background: #fff;
`;

export const StyledDate = styled.div`
  position: absolute;
  right: 20px;
  top: 14px;
  color: #98a2b2;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
`;
