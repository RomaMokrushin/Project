"use client";

import styled from "styled-components";

export const StyledUserById = styled.div`
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  flex-grow: 1;
  min-height: 100vh;
`;

export const StyledUserDataWrapper = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;
  column-gap: 32px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  flex-grow: 1;
  position: relative;
`;

export const LeftSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AddEditButton = styled.button`
  cursor: pointer;
  border: 2px solid #007aff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-left: auto;
  max-width: 200px;
  gap: 16px;
  padding: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 50px;
  background-color: #007aff;
  transition: 0.3s;
  color: white;
  width: 70%;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  text-align: center;

  &:hover {
    background-color: #f2f2f7;
    color: #007aff !important;
    svg,
    path {
      fill: #007aff !important;
    }
  }

  svg {
    max-height: 20px;
  }
`;

export const UserGroupsWrapper = styled.div`
  margin-top: 32px;
  max-width: 700px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MyGroupsTitle = styled.h2`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
`;

export const MyGroupCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f7f8f9;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(3, 70, 227, 0.99);
    background-color: #007aff;
  }
`;

export const GroupCard = styled.a`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background-color: #f2f2f7;
  border: 2px solid #007aff;
`;

export const GroupCardTitle = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`;
