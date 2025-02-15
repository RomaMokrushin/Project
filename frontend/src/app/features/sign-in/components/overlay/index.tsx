"use client";

import {
  Overlay,
  OverlayPanel,
  H1,
  P,
  Button,
  OverlayContainer,
} from "../../styles/signPage.styles";

type Props = {
  handleSignUpClick: () => void;
  handleSignInClick: () => void;
};

export default function OverlayContainerElement({
  handleSignUpClick,
  handleSignInClick,
}: Props) {
  return (
    <OverlayContainer className="overlay-container">
      <Overlay className="overlay">
        <OverlayPanel className="overlay-left">
          <H1>Добро пожаловать!</H1>
          <P>
            Чтобы оставаться на связи с нами, пожалуйста, войдите в систему,
            указав свои персональные данные.
          </P>
          <Button className="ghost" onClick={handleSignInClick}>
            Войти
          </Button>
        </OverlayPanel>
        <OverlayPanel className="overlay-right">
          <H1>Привет, друг!</H1>
          <P>
            Введите свои персональные данные и начните свои путешествия вместе с
            нами
          </P>
          <Button className="ghost" onClick={handleSignUpClick}>
            Зарегистрироваться
          </Button>
        </OverlayPanel>
      </Overlay>
    </OverlayContainer>
  );
}
