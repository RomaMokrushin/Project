import styled from "styled-components";

export const GroupUserWrapper = styled.div<{ $inGroup?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f7f8f9;
  padding: 16px;
  border-radius: 8px;
  border: 2px solid #007aff;
  height: fit-content !important;
  height: 30%;
  max-height: calc(100% / 3 - 32px);
  ${({ $inGroup }) =>
    $inGroup
      ? `
    height: 30% !important;
    max-height: unset;
  `
      : `
    height: 30% !important;
    max-height: unset;
  `};
`;

export const GroupUserTitle = styled.h2`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  line-height: 24px;
  font-weight: 600;
`;
export const AddUserWrapper = styled.div`
  cursor: pointer;
  gap: 16px;
  width: 90%;
  margin-bottom: 16px;
  align-items: center;
  border-radius: 8px;
  border: 2px solid transparent;
  padding: 8px 0;
  padding-left: 16px;
  display: flex;
  transition: border 0.3s;
  svg {
    max-height: 22px;
    max-width: 22px;
    color: #007aff;
    path {
      fill: #007aff !important;
    }
  }

  &:hover {
    border: 2px solid #007aff;
  }
`;

export const FadeAndUsersWrapper = styled.div`
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  margin-top: 16px;
  height: 100%;
`;

export const UsersWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  max-height: 700px;
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

  &:hover {
    ${AddUserWrapper} {
      display: flex;
    }
  }
`;

export const StyledFade = styled.div<{ $showFade: boolean; $isTop?: boolean }>`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  width: 100%;
  height: 40px;
  bottom: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  ${({ $isTop }) => ($isTop ? "top: -2px;" : "bottom: -1px;")}
  background: linear-gradient(
    ${({ $isTop }) =>
    $isTop
      ? `180deg, #f7f8f9 50%, rgba(0,0,0,0) 100%`
      : `0deg, #f7f8f9 50%, rgba(0,0,0,0) 100%`}
  );
  ${({ $showFade }) =>
    $showFade
      ? `
    opacity: 1;
  `
      : `
    opacity: 0;
  `};
`;

export const DeleteUserFromAdminIconWrapper = styled.div`
  opacity: 0;
  cursor: pointer;
  max-width: 24px;
  max-height: 24px;
  margin-right: 20px;
  margin-left: auto;
  transition: all 0.3s;
  &:hover {
    scale: 1.1;
  }

  &:active {
    scale: 0.9;
  }
`;

export const UserWrapper = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px 0;
  padding-left: 16px;
  gap: 16px;
  border-radius: 8px;
  &:hover {
    background-color: #f2f2f7;
    ${DeleteUserFromAdminIconWrapper} {
      opacity: 1;
    }
  }
`;

export const UserAvatarWrapper = styled.div`
  height: fit-content;
  background-color: #f2f2f7;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid #007aff;
`;

export const UserName = styled.div`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  font-weight: 400;
`;

export const AddUserSvgWrapper = styled.div`
  width: 36px;
  display: grid;
  aspect-ratio: 1/1;
  place-items: center;
  border-radius: 50%;
  background-color: #f2f2f7;
  padding: 2px;
  border: 2px dashed #007aff;
`;

export const AddUserText = styled.div`
  cursor: pointer;
  color: #007aff;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  font-weight: 400;
`;
