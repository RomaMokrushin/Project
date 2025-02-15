import styled from "styled-components";

export const TotalByPersonWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-direction: column;
`;

export const BlockTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const AllTotalsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  flex-wrap: wrap;
`;

export const TotalCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #007aff;
`;

export const CardUserWrapper = styled.a`
  display: flex;
  gap: 16px;
  align-items: center;
  width: fit-content;
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

export const UserName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const ItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Item = styled.li`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
`;

export const ItemValue = styled(ItemTitle)`
  font-weight: 600;
`;
