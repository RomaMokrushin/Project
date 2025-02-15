import { darkSkeletonAnimation } from "@/core/styles/global-styles.styles";
import styled from "styled-components";

export const AddToGroupModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: -32px;
  width: calc(100% + 64px);
  height: calc(100% + 16px);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: grid;
  place-items: center;
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

export const InnerModalWrapper = styled.div`
  display: flex;
  position: relative;
  padding: 32px;
  gap: 24px;
  flex-direction: column;
  width: fit-content;
  background: #fff;
  border-radius: 8px;
`;

export const InviteTitle = styled.h2`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ModalInviteLetter = styled.textarea`
  width: 391px;
  height: 321px;
  padding: 16px;
  border: 1px solid #e7e7e7;
  background: #fff;
  border-radius: 8px;
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #007aff;
  }
`;

export const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
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

  /* Shadows/Gray/1 Level */
  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-size: 16px;
  line-height: 20px;
  font-family: Inter;

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
    color: #98a2b2;
    font-feature-settings: "liga" off, "clig" off;

    /* Bold/12 */
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }
  ${({ $isDropdownOpen }) =>
    $isDropdownOpen &&
    `
    border-radius: 8px 8px 0 0;
  `}
`;

export const AddButton = styled.button`
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

export const GroupSearchWrapper = styled.div`
  position: relative;
  width: fit-content;
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

export const DropDownItem = styled.div<{ $isInvited: boolean }>`
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
  &:hover {
    background: #f5f5f5;
  }

  ${({ $isInvited }) =>
    $isInvited &&
    `
    cursor: not-allowed;
    color: #98a2b2;
  `}
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

export const SelectGroupWarning = styled.div`
  color: rgb(253, 130, 130);
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  font-family: Inter;
`;

export const NoGroupsFound = styled.div`
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
