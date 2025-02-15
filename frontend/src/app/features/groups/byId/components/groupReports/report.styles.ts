import styled from "styled-components";

export const DateWrapper = styled.div<{ $variant: "1" | "2" | "3" | "4" }>`
  position: absolute;
  font-size: 14px;
  font-weight: 400;
  color: #141515;
  font-family: Inter;
  padding: 2px 14px;
  border-radius: 12px;
  border: 2px solid #007aff;
  background-color: white;

  ${({ $variant }) =>
    $variant === "1" &&
    `
        bottom: -23px;
        right: 10px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-top: none;
    `}
  ${({ $variant }) =>
    $variant === "2" &&
    `
        top: -23px;
        left: 10px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: none;
    `}
    ${({ $variant }) =>
    $variant === "3" &&
    `
        bottom: -23px;
        right: 10px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-top: none;
    `}
    ${({ $variant }) =>
    $variant === "4" &&
    `
        top: -23px;
        left: 10px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: none;
    `}
`;

export const StyledReportsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const AuthorWrapper = styled.div`
  margin-top: 8px;
  margin-left: auto;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledReportAuthor = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #141515;
  font-family: Inter;
  font-style: normal;
`;

export const StyledReportTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #141515;
  font-family: Inter;
  font-style: normal;
`;

export const StyledReportWrapper = styled.a`
  cursor: pointer;
  position: relative;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  border: 2px solid #007aff;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 4px 8px #007aff;
    ${DateWrapper} {
      
    }
  }
`;
