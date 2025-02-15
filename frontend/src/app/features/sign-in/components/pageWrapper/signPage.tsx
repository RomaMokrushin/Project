"use client";

import React, { useState } from "react";
import SignUpContainer from "../signUp";
import SignInContainer from "../signIn";
import OverlayContainer from "../overlay";
import { Container } from "../../styles/signPage.styles";

const SignPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };


  return (
    <Container className={isRightPanelActive ? "right-panel-active" : ""}>
      <SignUpContainer />
      <SignInContainer />
      <OverlayContainer
        handleSignInClick={handleSignInClick}
        handleSignUpClick={handleSignUpClick}
      />
    </Container>
  );
};

export default SignPage;
