import styled from "styled-components";

export const EditInviteWrapper = styled.div`
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  cursor: pointer;
  svg {
    max-height: 32px;
    max-width: 32px;
  }

  path {
    transition: stroke 0.3s ease;
  }

  transition: all 0.3s ease;

  &:hover {
    path {
      stroke: #007aff;
    }
  }
`;

export const DeleteButton = styled.div`
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 45px;
  width: 60px;
  display: grid;
  place-items: center;
  background: rgba(237, 55, 58, 0.22);
  border-top-left-radius: 10px;
  border-left: 1px solid transparent;
  border-top: 1px solid transparent;
  transition: all 0.3s ease;
  svg {
    max-height: 32px;
    max-width: 32px;
    fill: #ff0004;
  }

  &:hover {
    border-left: 1px solid #ff0004;
    border-top: 1px solid #ff0004;
    background: #fff;
  }
`;

export const InviteItemWrapper = styled.div<{
  $isHidden: boolean;
  $isEditing: boolean;
}>`
  position: relative;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  background: #fff;
  transition: all 0.3s ease;
  max-height: 92px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);

  &:hover {
    box-shadow: 0px 4px 12px rgb(0 122 255 / 30%);

    ${EditInviteWrapper} {
      opacity: 1;
      pointer-events: all;
    }
    ${DeleteButton} {
      opacity: 1;
      pointer-events: all;
    }
  }

  ${({ $isHidden }) =>
    !$isHidden &&
    `
        cursor: default;
        max-height: 900px;
    `}
  ${({ $isEditing }) =>
    $isEditing &&
    `
       ${EditInviteWrapper} {
          opacity: 1;
          pointer-events: all;
        }
    `}
`;

export const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const InviteItemTitle = styled.h2`
  color: #141515;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledUserName = styled.span`
  color: #141515;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  transition: color 0.3s ease;
`;

export const UserWrapper = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    ${StyledUserName} {
      color: #007aff !important;
    }
  }
`;

export const ChevronWrapper = styled.div<{ $isHidden: boolean }>`
  cursor: pointer;
  svg {
    max-height: 48px;
  }

  path {
    transition: stroke 0.3s ease;
  }

  transition: all 0.3s ease;

  ${({ $isHidden }) =>
    !$isHidden &&
    `
        transform: rotate(-180deg);
    `}
  &:hover {
    path {
      stroke: #007aff;
    }
  }
`;

export const MessageWrapper = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  width: calc(100% - 40px);
`;

export const TextareaMessage = styled.textarea`
  resize: vertical;
  margin: 0 auto;
  margin-top: 20px;
  color: #000;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  width: calc(100% - 40px);
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px;
  outline: none;
`;

export const MessageSentDate = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  color: #868282;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
