import styled from "styled-components";

export const CardsWrapper = styled.div`
  margin-top: 32px;
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 32px;
  height: fit-content;
`;

export const ListWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
