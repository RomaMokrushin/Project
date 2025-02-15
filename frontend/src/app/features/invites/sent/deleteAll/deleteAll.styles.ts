"use client";
import styled from "styled-components";

export const DeleteAllInvitesButton = styled.div`
  color: #fff;
  text-align: center;
  height: fit-content;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid rgba(237, 55, 58, 0.85);
  background: rgba(237, 55, 58, 0.85);
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: rgba(237, 55, 58, 0.85);
  }
`;

export const ModalWrapper = styled.div`
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

export const Modal = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 24px;
  background-color: #fff;
  position: relative;
  border-radius: 8px;
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

export const ModalButton = styled.button`
  cursor: pointer;
  margin: 0 auto;
  width: 223px;
  height: 40px;
  border-radius: 90px;
  border: 1px solid #007aff;
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

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const CloseModalButton = styled.button`
  cursor: pointer;
  margin: 0 auto;
  width: 223px;
  height: 40px;
  border-radius: 90px;
  border: 1px solid #007aff;
  background: #fff;
  text-align: center;
  color: #007aff;
  outline: none;
  transition: 0.3s;

  &:hover {
    background: rgba(0, 123, 255, 0.22);
    color: #007aff;
  }
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
