import styled from "styled-components";

export const InnerCreateModalWrapper = styled.div`
  height: 500px;
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

export const EventDividerAndDeleteWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteEventWrapper = styled.div`
  cursor: pointer;
  margin-right: 16px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const EventDividerText = styled.p`
  color: #000;
  font-family: Inter;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  line-height: normal;
`;

export const EventWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  margin-top: 16px;
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
  width: 100%;
  padding: 22px 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #007aff;
`;

export const EventTitleInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px;
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
`;

export const ModalRadioLabel = styled.label`
  user-select: none;
  margin-top: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ModalRadioText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;

export const ModalRadio = styled.div<{ $isActive?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 8px solid #007aff;
  transition: border 0.3s;
  background: transparent;
  border-width: ${({ $isActive }) => ($isActive ? "8px" : "2px")};
`;

export const EventSubtitle = styled.p`
  color: #000;
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  line-height: normal;
  margin-top: 16px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #007aff;
  margin-top: 16px;
`;

export const PayersInputWrapper = styled.div`
  margin-top: 8px;
  position: relative;
`;

export const PayersWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PayerWrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const UserNameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #000;
  font-feature-settings: "liga" off, "clig" off;

  /* Bold/12 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
`;

export const DeleteIconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  right: 16px;
  top: 16px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const PayerStatusWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const InputSumPayer = styled.input`
  width: 200px;
  height: 48px;
  padding: 16px;
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
`;

export const InputTotalSum = styled.input`
  margin-top: 16px;
  width: 200px;
  height: 48px;
  padding: 16px;
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
`;

export const ModalParticipantRadioLabel = styled.label`
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ParticipantsWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
export const DeleteParticipantOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
  /* blur background */
  backdrop-filter: blur(4px);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s;
`;

export const ParticipantWrapper = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  background: #fff;
  color: #000;
  display: flex;
  gap: 10px;
  align-items: center;
  /* Bold/12 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  position: relative;
  &:hover ${DeleteParticipantOverlay} {
    opacity: 1;
  }
`;

export const AddEvent = styled.div`
  display: flex;
  height: 48px;
  padding: 16px;
  margin-top: 16px;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  background: #fff;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: black;

  transition: background 0.3s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const DropDownContent = styled.div`
  display: flex;
  z-index: 999;
  position: absolute;
  top: 100%;
  width: 100%;
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

export const DropDownItemContainer = styled.div<{ $isInvited?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  ${({ $isInvited }) =>
    $isInvited &&
    `
  cursor: not-allowed;
  color: #98a2b2;
`}
  &:hover {
    background: #f5f5f5;
  }
`;

export const DropDownItem = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PayerInput = styled.input<{
  $isDropdownOpen?: boolean;
  $isSearch?: boolean;
}>`
  width: 100%;
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
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    /* if focus dropdowncontent with + is display flex */
    /* & + ${DropDownContent} {
      display: flex;
    } */
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

  ${({ $isSearch }) =>
    !$isSearch &&
    `
        padding: 16px;
      `}
`;
