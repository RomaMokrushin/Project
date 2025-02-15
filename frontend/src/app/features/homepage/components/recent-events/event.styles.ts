import styled from "styled-components";

export const StyledEvent = styled.div`
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

export const StyledLeftSideItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const StyledTitle = styled.h3`
  color: #000;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 83.333% */
`;

export const StyledUserNameWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #141515;
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

export const GroupTitle = styled.a`
  color: #000;
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

export const MainTile = styled.h3`
  margin-top: 32px;
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 83.333% */
  border-radius: 40px;
  border: 3px solid #e7e7e7;
  background: #fff;
  padding: 11px 32px;
`;

export const DataItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

export const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const DataItemTitle = styled.div`
  color: #000;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
`;

export const DataItemValue = styled.div`
  color: #000;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
