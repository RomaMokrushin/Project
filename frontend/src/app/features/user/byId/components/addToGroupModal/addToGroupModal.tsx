"use client";

import { Icon } from "@/core/enums/Icon.enum";
import { IconHandler } from "@/core/images/IconHandler";
import {
  AddButton,
  AddToGroupModalWrapper,
  CloseIconWrapper,
  DropDownContent,
  DropDownItem,
  GroupSearchWrapper,
  InnerLoadingText,
  InnerModalWrapper,
  Input,
  InputWrapper,
  InviteTitle,
  LoadingDropDownItem,
  ModalInviteLetter,
  NoGroupsFound,
  SelectGroupWarning,
} from "./addToGroupModal.styles";
import { useActionState, useRef, useState, useTransition } from "react";
import useOutsideClick from "@/core/hooks/useOutsideClick";
import type { GroupSearch } from "@/core/types";
import { handleSearchGroups } from "@/core/actions/group-search";
import useDebounce from "@/core/hooks/useDebounce";
import { toast } from "react-toastify";
import { handleSendGroupInvite } from "@/core/actions/send-group-invite";

type Props = {
  closeModal: () => void;
  userId: number;
};

export default function AddToGroupModal({ closeModal, userId }: Props) {
  const modalRef = useRef<HTMLDivElement>(null!);
  const inputSearchRef = useRef<HTMLInputElement>(null!);
  const inputWrapperRef = useRef<HTMLDivElement>(null!);
  const textareaRef = useRef<HTMLTextAreaElement>(null!);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [state, formAction, pending] = useActionState(
    (_state: unknown, payload: { search: string; id: number }) =>
      handleSearchGroups({ query: payload.search || "", userId: payload.id }),
    { data: [], error: undefined }
  );
  const [isGroupNotSelected, setIsGroupNotSelected] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  const handleClickOutsideInput = () => {
    setIsDropdownOpen(false);
  };

  useOutsideClick(modalRef, closeModal);
  useOutsideClick(inputWrapperRef, handleClickOutsideInput);

  const debouncedSearch = useDebounce((search: string) => {
    startTransition(() => {
      formAction({ search, id: userId });
    });
  }, 300);

  const handleChangeSearch = () => {
    const search = inputSearchRef.current?.value || "";
    setSelectedGroup(null);

    if (search.length >= 3) {
      setIsDropdownOpen(true);
      setInputSearch(search);
      debouncedSearch(search);
    } else {
      setIsDropdownOpen(false);
      setInputSearch(search);
    }
  };

  const data = state.data as GroupSearch[];

  const handleSelectGroup = (id: number, name: string, isInvited: boolean) => {
    if (!isInvited) {
      setIsGroupNotSelected(false);
      setSelectedGroup(id);
      setInputSearch(name);
      setIsDropdownOpen(false);
    }
  };

  const handleFocusInput = () => {
    if (inputSearch.length >= 3 && data.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleChangeTextarea = () => {
    const text = textareaRef.current?.value || "";
    setTextAreaValue(text);
  };

  const handleSendInvite = async () => {
    if (selectedGroup) {
      const body = {
        user_id: userId,
        group_id: selectedGroup,
        message: textAreaValue,
      };
      const res = await handleSendGroupInvite({
        body: body,
      });
      if (res.error) {
        toast.error("Ошибка при отправке приглашения");
        return;
      } else {
        toast.success("Приглашение отправлено");
        closeModal();
      }
    } else {
      setIsGroupNotSelected(true);
    }
  };

  return (
    <AddToGroupModalWrapper>
      <InnerModalWrapper ref={modalRef}>
        <CloseIconWrapper onClick={() => closeModal()}>
          {IconHandler(Icon.Close)}
        </CloseIconWrapper>
        <InviteTitle>Добавление пользователя в группу</InviteTitle>
        <GroupSearchWrapper ref={inputWrapperRef}>
          <InputWrapper>
            {IconHandler(Icon.Spyglass)}
            <Input
              placeholder="найти группу"
              onChange={handleChangeSearch}
              onFocus={handleFocusInput}
              value={inputSearch}
              ref={inputSearchRef}
              $isDropdownOpen={isDropdownOpen}
            />
          </InputWrapper>
          {isDropdownOpen && (
            <DropDownContent>
              {data && !pending ? (
                data.length > 0 ? (
                  data?.map((group) => (
                    <DropDownItem
                      key={group.id}
                      $isInvited={group.isInvited}
                      onClick={() =>
                        handleSelectGroup(group.id, group.name, group.isInvited)
                      }
                    >
                      {group.name}
                    </DropDownItem>
                  ))
                ) : (
                  <NoGroupsFound>
                    Не найдено групп с таким названием
                  </NoGroupsFound>
                )
              ) : (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <LoadingDropDownItem key={"loading-group" + index}>
                      <InnerLoadingText $instance={index + 1} />
                    </LoadingDropDownItem>
                  ))}
                </>
              )}
            </DropDownContent>
          )}
        </GroupSearchWrapper>
        {isGroupNotSelected && (
          <SelectGroupWarning>
            пожалуйста, выберите группу из списка
          </SelectGroupWarning>
        )}
        <ModalInviteLetter
          placeholder="Текст приглашения в группу"
          value={textAreaValue}
          onChange={handleChangeTextarea}
          ref={textareaRef}
        />
        <AddButton onClick={handleSendInvite}>Добавить</AddButton>
      </InnerModalWrapper>
    </AddToGroupModalWrapper>
  );
}
