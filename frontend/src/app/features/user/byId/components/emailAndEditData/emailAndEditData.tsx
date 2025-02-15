"use client";
import { IconHandler } from "@/core/images/IconHandler";
import {
  CheckBoxWrapper,
  LeftBlocksWrapper,
  RightBlocksWrapper,
  StyledBlockTitle,
  StyledCheckboxDescription,
  StyledEmailAndEditDataWrapper,
  StyledEmailPhoneBlock,
  StyledEmailPhoneText,
  StyledEmailPhoneWrapperData,
  SvgWrapper,
} from "./emailAndEditData.styles";
import { Icon } from "@/core/enums/Icon.enum";
type Props = {
  email: string;
  phone: string;
  stopInvites: boolean;
  isProfileHidden: boolean;
  changeStopInvites: (stopInvites: boolean) => void;
  changeProfileHidden: (isProfileHidden: boolean) => void;
  isMe: boolean;
  isEditable: boolean;
};

export default function EmailAndEditData({
  email,
  stopInvites,
  isProfileHidden,
  changeStopInvites,
  changeProfileHidden,
  isMe,
  isEditable,
}: Props) {
  const handleStopInvitesChange = () => {
    if (!isMe || !isEditable) return;
    changeStopInvites(!stopInvites);
  };

  const handleProfileHiddenChange = () => {
    if (!isMe || !isEditable) return;
    changeProfileHidden(!isProfileHidden);
  };

  return (
    <StyledEmailAndEditDataWrapper>
      <LeftBlocksWrapper>
        <StyledEmailPhoneBlock>
          <StyledBlockTitle>Почта</StyledBlockTitle>
          <StyledEmailPhoneWrapperData href={email ? `mailto:${email}` : "#"}>
            <SvgWrapper>{IconHandler(Icon.Email)}</SvgWrapper>
            <StyledEmailPhoneText>
              {email ? email : "Скрыто"}
            </StyledEmailPhoneText>
          </StyledEmailPhoneWrapperData>
        </StyledEmailPhoneBlock>
        {/* <StyledEmailPhoneBlock>
          <StyledBlockTitle>Номер телефона</StyledBlockTitle>
          <StyledEmailPhoneWrapperData href={phone ? `tel:${phone}` : "#"}>
            <SvgWrapper>{IconHandler(Icon.Phone)}</SvgWrapper>
            <StyledEmailPhoneText>
              {phone ? phone : "Скрыто"}
            </StyledEmailPhoneText>
          </StyledEmailPhoneWrapperData>
        </StyledEmailPhoneBlock> */}
      </LeftBlocksWrapper>
      {isMe && (
        <RightBlocksWrapper>
          <CheckBoxWrapper $isEditable={isEditable}>
            <div className="btn btn-pill" id="button-1">
              <input
                type="checkbox"
                className="checkbox"
                name="checkbox-stopInvites"
                checked={stopInvites}
                onChange={handleStopInvitesChange}
              />
              <div className="knob"></div>
              <div className="btn-bg"></div>
            </div>
            <StyledCheckboxDescription>
              остановить прием заявок
            </StyledCheckboxDescription>
          </CheckBoxWrapper>
          <CheckBoxWrapper $isEditable={isEditable}>
            <div className="btn btn-pill" id="button-1">
              <input
                type="checkbox"
                className="checkbox"
                name="checkbox-isProfileHidden"
                checked={isProfileHidden}
                onChange={handleProfileHiddenChange}
              />
              <div className="knob"></div>
              <div className="btn-bg"></div>
            </div>
            <StyledCheckboxDescription>
              скрыть профиль
            </StyledCheckboxDescription>
          </CheckBoxWrapper>
        </RightBlocksWrapper>
      )}
    </StyledEmailAndEditDataWrapper>
  );
}
