import styled from "styled-components";

export const StyledTransactionWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 32px 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 14px;
`;

export const UserWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  border-radius: 10px;
  padding: 12px 18px;
  border: 1px solid #e7e7e7;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const UserName = styled.div`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
`;

export const MiddleSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const SumText = styled.div`
  border-radius: 40px;
  border: 3px solid rgba(134, 130, 130, 0.8);
  padding: 10px 38px;
  background: #fff;
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 83.333% */
`;

export const TransactionTypeText = styled.div`
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
`;

export const ArrowTransaction = styled.div<{ $reverse?: boolean }>`
  width: 300px;
  height: 3px;
  background-color: #868282;
  border-radius: 545px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 3px;
    background-color: #868282;
    right: -2px;
    transform: rotate(45deg);
    top: -7px;
    border-radius: 545px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 3px;
    background-color: #868282;
    right: -2px;
    transform: rotate(-45deg);
    bottom: -7px;
    border-radius: 545px;
  }

  ${({ $reverse }) =>
    $reverse &&
    `
    transform: rotate(180deg);
  `}
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
