"use client";

import styled from "styled-components";

export const StyledHomepage = styled.div`
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledPageTitle = styled.h1`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;

  /* Bold/30 */
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 160% */
`;

export const StyledNavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const StyledNav = styled.a<{ $isActive: boolean }>`
  color: #7a8699;
  text-decoration: none;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  position: relative;
  line-height: 20px; /* 142.857% */

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

  ${({ $isActive }) =>
    $isActive &&
    `
    color: #007AFF;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */

    &:after {
    content: "";
    background: none repeat scroll 0 0 transparent;
    bottom: -6px;
    background: #007AFF;
    display: block;
    height: 2px;
    left: 0;
    position: absolute;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 100%;
  }
  `}
`;

export const StyledUsersWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: translateX(50px);
`;

export const NameBubble = styled.div`
  position: absolute;
  white-space: nowrap;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 10px;
  border-radius: 13px;
  color: #7a8699;
  text-decoration: none;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  background-color: #f3f4f6;
  border: 1px solid #7a8699;
  opacity: 0;
`;

export const ItemWrapper = styled.a<{ $n: number; $noHover?: boolean }>`
  position: relative;
  cursor: pointer;
  border: 2px solid #f3f4f6;
  border-radius: 50%;

  transition: transform 0.3s ease;
  &:hover {
    ${NameBubble} {
      opacity: 1;
    }
  }

  ${({ $n }) =>
    $n &&
    `
    transform: translateX(calc(-12px * (${$n} - 1)));
        &:hover {
        transform: translateX(calc(-12px * (${$n} - 1))) translateY(-6px);
        z-index: 2;
        }
    `}

  ${({ $noHover, $n }) =>
    $noHover &&
    `
       &:hover {
        transform: translateX(calc(-12px * (${$n} - 1)));
        }
    `}
`;

export const ExtraUsers = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  display: grid;
  place-content: center;
  color: #606c80;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;

  /* Extra Bold/12 */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px; /* 166.667% */
  border: 2px solid #606c80;
`;

export const ViewBar = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
`;

export const ViewSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ViewSelectorItem = styled.a<{
  $isActive?: boolean;
  $isRight?: boolean;
}>`
  cursor: pointer;
  display: flex;
  height: 40px;
  padding: 11px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px 0px 0px 8px;
  border: 1px solid #e7e7e7;
  background: #fafbfc;

  ${({ $isActive }) =>
    $isActive &&
    `
            box-shadow: inset 0px 0px 7px 3px rgb(23 23 23 / 5%);
        `}

  ${({ $isRight }) =>
    $isRight &&
    `
        border-radius: 0px 8px 8px 0px;
        transform: translateX(-1px);
    `}
`;

export const ViewSelectorItemText = styled.span`
  color: #606c80;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;

  /* Bold/12 */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  width: fit-content;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);
  background: #fff;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  outline: none;
  padding: 9px 16px;
  padding-left: 40px;
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;

  &:focus + svg,
  path {
    #Vector {
      fill: #007aff;
    }
  }
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
  }
`;
