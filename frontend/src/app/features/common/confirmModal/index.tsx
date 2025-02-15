"use client";

import useOutsideClick from "@/core/hooks/useOutsideClick";
import { useRef } from "react";
import {
  ButtonsWrapper,
  CancelButton,
  CloseIconWrapper,
  ConfirmButton,
  ContentWrapper,
  ModalContainer,
  ModalTitle,
} from "./confirmModal.styles";
import { Icon } from "@/core/enums/Icon.enum";
import { IconHandler } from "@/core/images/IconHandler";

type Props = Readonly<{
  title: string;
  i18n: {
    confirm: string;
    cancel: string;
  };
  onConfirm: () => void;
  closeAction: () => void;
}>;

export default function ConfirmModal({
  title,
  i18n,
  onConfirm,
  closeAction,
}: Props) {
  const modalWrapperRef = useRef<HTMLDivElement>(null!);

  useOutsideClick(modalWrapperRef, closeAction);
  
  return (
    <ModalContainer>
      <ContentWrapper ref={modalWrapperRef}>
        <CloseIconWrapper onClick={closeAction}>
          {IconHandler(Icon.Close)}
        </CloseIconWrapper>
        <ModalTitle>{title}</ModalTitle>
        <ButtonsWrapper>
          <ConfirmButton onClick={onConfirm}>{i18n.confirm}</ConfirmButton>
          <CancelButton onClick={closeAction}>{i18n.cancel}</CancelButton>
        </ButtonsWrapper>
      </ContentWrapper>
    </ModalContainer>
  );
}
