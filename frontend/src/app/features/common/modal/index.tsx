"use client";

import { PropsWithChildren, useRef } from "react";
import {
  Button,
  CloseIconWrapper,
  ContentWrapper,
  DropDownContent,
  DropDownItem,
  DropDownItemContainer,
  InnerLoadingText,
  Input,
  InputContainer,
  InputLabel,
  InputsWrapper,
  InputWrapper,
  LoadingDropDownItem,
  ModalContainer,
  ModalTextarea,
  ModalTitle,
  NoGroupsFound,
  SearchIconWrapper,
  TextareaLabel,
} from "./modal.styles";
import { Icon } from "@/core/enums/Icon.enum";
import { IconHandler } from "@/core/images/IconHandler";
import Avatar, { genConfig } from "react-nice-avatar";
import useOutsideClick from "@/core/hooks/useOutsideClick";

type Props = {
  btnAction: () => void;
  closeAction: () => void;
  inputs?: {
    name: string;
    label: string;
    value: string;
    placeholder: string;
    isDropdownOpen?: boolean;
    dropdownOption?: {
      id: string;
      name: string;
      avatar?: string;
      isInvited?: boolean;
      callback: () => void;
    }[];
    onBlur?: () => void;
    onFocus?: () => void;
    isDropdownPending?: boolean;
    callback?: (value: string) => void;
    isSearch?: boolean;
  }[];
  textarea?: {
    name: string;
    label: string;
    placeholder: string;
  };
  i18n: {
    btn: string;
    title: string;
  };
  customWidth?: string;
} & PropsWithChildren;

export default function Modal({
  btnAction,
  inputs,
  textarea,
  i18n,
  children,
  closeAction,
  customWidth,
}: Props) {
  const modalWrapperRef = useRef<HTMLDivElement>(null!);

  useOutsideClick(modalWrapperRef, closeAction);

  return (
    <ModalContainer>
      <ContentWrapper ref={modalWrapperRef} $width={customWidth}>
        <CloseIconWrapper onClick={closeAction}>
          {IconHandler(Icon.Close)}
        </CloseIconWrapper>
        <ModalTitle>{i18n.title}</ModalTitle>
        <InputsWrapper>
          {inputs?.map((input, index) => (
            <InputWrapper key={`modal-input-${index}`}>
              <InputLabel>{input.label}</InputLabel>
              <InputContainer>
                {input.isSearch && (
                  <SearchIconWrapper>
                    {IconHandler(Icon.Spyglass)}
                  </SearchIconWrapper>
                )}
                <Input
                  name={input.name}
                  id={input.name}
                  value={input.value}
                  placeholder={input.placeholder}
                  onBlur={() => input.onBlur?.()}
                  onFocus={() => input.onFocus?.()}
                  onChange={(e) => input.callback?.(e.target.value)}
                  $isSearch={input.isSearch}
                  $isDropdownOpen={input?.isDropdownOpen}
                />
              </InputContainer>
              {input?.isDropdownOpen && input.dropdownOption && (
                <DropDownContent>
                  {input.isDropdownPending ? (
                    <>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <LoadingDropDownItem key={`loading-group-${index}`}>
                          <InnerLoadingText $instance={index + 1} />
                        </LoadingDropDownItem>
                      ))}
                    </>
                  ) : input.dropdownOption.length > 0 ? (
                    input.dropdownOption.map((option) => (
                      <DropDownItemContainer
                        key={option.id}
                        $isInvited={option.isInvited}
                      >
                        {option.avatar && (
                          <Avatar
                            style={{
                              width: "24px",
                              height: "24px",
                              minHeight: "24px",
                              minWidth: "24px",
                            }}
                            {...genConfig(option.avatar)}
                          />
                        )}
                        <DropDownItem onClick={() => option.callback?.()}>
                          {option.name}
                        </DropDownItem>
                      </DropDownItemContainer>
                    ))
                  ) : (
                    <NoGroupsFound>Ничего не найдено</NoGroupsFound>
                  )}
                </DropDownContent>
              )}
            </InputWrapper>
          ))}
        </InputsWrapper>
        {textarea && (
          <InputWrapper>
            <TextareaLabel>{textarea.label}</TextareaLabel>
            <ModalTextarea
              placeholder={textarea.placeholder}
              name={textarea.name}
              id={textarea.name}
            />
          </InputWrapper>
        )}
        {children}
        <Button onClick={btnAction}>{i18n.btn}</Button>
      </ContentWrapper>
    </ModalContainer>
  );
}
