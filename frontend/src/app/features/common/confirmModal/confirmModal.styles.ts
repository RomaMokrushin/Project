"use client";
import styled from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  backdrop-filter: blur(10px);

  display: grid;
  place-items: center;
`;

export const ContentWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 24px;
  background-color: #fff;
  position: relative;
  border-radius: 8px;
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  top: -16px;
  right: -16px;
  background-color: #fff;
  border-radius: 50%;
  svg {
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: 0.3s;
  }
  &:hover {
    svg,
    path {
      fill: #007aff !important;
      stroke: #007aff !important;
    }
  }
`;

export const ModalTitle = styled.h2`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 8px;
  white-space: unset;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 34px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmButton = styled.button`
  cursor: pointer;
  margin: 0 auto;
  width: 223px;
  height: 40px;
  border-radius: 90px;
  border: 2px solid #007aff;
  background: #007aff;
  text-align: center;
  color: #fff;
  outline: none;
  transition: 0.3s;

  &:hover {
    background: #fff;
    color: #007aff;
  }
`;

export const CancelButton = styled.button`
  cursor: pointer;
  margin: 0 auto;
  width: 223px;
  height: 40px;
  border-radius: 90px;
  border: 2px solid rgb(255, 93, 93);
  background: #fff;
  text-align: center;
  color: rgb(255, 93, 93);
  outline: none;
  transition: 0.3s;

  &:hover {
    background: rgb(255, 93, 93);
    color: #fff;
  }
`;
