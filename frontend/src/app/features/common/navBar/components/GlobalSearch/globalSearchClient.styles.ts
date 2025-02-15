import { darkSkeletonAnimation } from "@/core/styles/global-styles.styles";
import styled from "styled-components";

export const InputSearchWrapper = styled.div`
  position: relative;
  width: fit-content;
  z-index: 999;
`;

export const InputWrapper = styled.div<{ $isDropdownOpen: boolean }>`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  input:focus + svg,
  input:not(:placeholder-shown) + svg {
    path {
      fill: #007aff !important;
    }
  }

  ${({ $isDropdownOpen }) =>
    $isDropdownOpen &&
    `
       svg, path {
        fill: #007aff !important;
       }
    `}
`;

export const Input = styled.input<{ $isDropdownOpen: boolean }>`
  width: 391px;
  height: 48px;
  padding: 16px 40px;
  align-items: center;
  gap: 30px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  background: #fff;
  text-align: center;

  /* Shadows/Gray/1 Level */
  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-size: 16px;
  line-height: 20px;
  font-family: Inter;
  caret-color: transparent;

  transition: border 0.3s ease;
  &:focus {
    outline: none;
    border: 1px solid #007aff;
  }

  &::placeholder,
  &:-moz-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder,
  &::-webkit-input-placeholder {
    text-align: center;
    color: #98a2b2;
    font-feature-settings: "liga" off, "clig" off;

    /* Bold/12 */
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  &:not(:placeholder-shown) {
    text-align: left;
    caret-color: black;
  }

  ${({ $isDropdownOpen }) =>
    $isDropdownOpen &&
    `
    border-radius: 8px 8px 0 0;
    border-color: #007aff;
  `}
`;

export const DropDownContent = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #fff;
  border: 1px solid #007aff;
  border-top: none;
  height: fit-content;
  max-height: 110px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px #007aff;
    background-color: #555;
  }
`;

export const DropDownItem = styled.a`
  padding: 8px 16px;
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const LoadingDropDownItem = styled.div`
  height: 36px;
  padding: 8px 16px;
`;

export const InnerLoadingText = styled.div<{ $instance: number }>`
  ${darkSkeletonAnimation}
  border-radius: 8px;
  height: 20px;
  width: ${({ $instance }) => 20 + ($instance % 5) * 15}%;
`;

export const NothingFound = styled.div`
  color: #000;
  font-family: Inter;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 16px;
  cursor: pointer;
`;
