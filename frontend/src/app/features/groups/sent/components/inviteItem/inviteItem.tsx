"use client";
import type { Invite } from "@/core/types";
import {
  ChevronWrapper,
  CloseIconWrapper,
  CloseModalButton,
  DeleteButton,
  EditInviteWrapper,
  InviteItemTitle,
  InviteItemWrapper,
  MessageSentDate,
  MessageWrapper,
  Modal,
  ModalButton,
  ModalTitle,
  ModalWrapper,
  StyledUserName,
  TextareaMessage,
  TopBarWrapper,
  UserWrapper,
} from "./inviteItem.styles";
import Avatar, { genConfig } from "react-nice-avatar";
import { useRef, useState } from "react";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import { convertDate } from "@/core/utils/date.utils";
import { handleUpdateMessageInvite } from "@/core/actions/update-message-invite";
import { toast } from "react-toastify";
import useOutsideClick from "@/core/hooks/useOutsideClick";
import { handleDeleteInvites } from "@/core/actions/delete-invites";

type Props = {
  invite: Invite;
};
export default function InviteItem({ invite }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null!);
  const [isTempNotDeleted, setIsTempNotDeleted] = useState(true);
  const [tempMessage, setTempMessage] = useState(invite.message);
  const [tempTextareaValue, setTempTextareaValue] = useState(invite.message);
  const [isHidden, setIsHidden] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditTextarea = () => {
    if (textareaRef.current) {
      setTempTextareaValue(textareaRef.current.value);
    }
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteInvite = async () => {
    try {
      const body = { ids: [invite.id] };
      const res = await handleDeleteInvites({ body });
      if (res.error) {
        toast.error("Ошибка при удалении приглашения");
        console.error(res.error);
        return;
      } else {
        setIsTempNotDeleted(false);
        toast.success("Приглашение удалено");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении приглашения");
    }
    setIsDeleteModalOpen(false);
  };

  const handleInviteClick = () => {
    if (isHidden) {
      setIsHidden(false);
    }
  };
  const handleChevronClick = () => {
    setIsHidden(!isHidden);
  };
  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = async () => {
    if (isEditing) {
      const body = {
        id: invite.id,
        message: tempTextareaValue,
      };
      const res = await handleUpdateMessageInvite({ body });
      if (res.error) {
        toast.error("Ошибка при обновлении сообщения");
        console.error(res.error);
        return;
      } else {
        setTempMessage(tempTextareaValue);
        toast.success("Сообщение обновлено");
      }
    }
    if (!isEditing && isHidden) {
      setIsHidden(false);
    }
    setIsEditing(!isEditing);
  };
  const avatarConfig = genConfig(invite.user.avatar);
  const convertedDate = convertDate(invite.created_at);
  useOutsideClick(modalRef, handleCloseModal);
  return (
    <>
      {isDeleteModalOpen && (
        <ModalWrapper>
          <Modal ref={modalRef}>
            <CloseIconWrapper onClick={handleCloseModal}>
              {IconHandler(Icon.Close)}
            </CloseIconWrapper>
            <ModalTitle>Вы уверены, что хотите удалить приглашение?</ModalTitle>
            <ModalButton onClick={handleDeleteInvite}>Удалить</ModalButton>
            <CloseModalButton onClick={handleCloseModal}>
              Закрыть
            </CloseModalButton>
          </Modal>
        </ModalWrapper>
      )}
      {isTempNotDeleted && (
        <InviteItemWrapper
          $isHidden={isHidden}
          $isEditing={isEditing}
          onClick={handleInviteClick}
        >
          <TopBarWrapper>
            <EditInviteWrapper onClick={handleEditClick}>
              {isEditing
                ? IconHandler(Icon.Tick)
                : IconHandler(Icon.EditInvite)}
            </EditInviteWrapper>
            <InviteItemTitle>
              <div>Приглашение для </div>
              <UserWrapper href={`/user/${invite.user.user_id}`}>
                <Avatar
                  style={{
                    width: "32px",
                    height: "32px",
                    minHeight: "32px",
                    minWidth: "32px",
                  }}
                  {...avatarConfig}
                />
                <StyledUserName>{invite.user.name}</StyledUserName>
              </UserWrapper>
            </InviteItemTitle>
            <ChevronWrapper $isHidden={isHidden} onClick={handleChevronClick}>
              {IconHandler(Icon.ChevronDown)}
            </ChevronWrapper>
          </TopBarWrapper>
          {isEditing ? (
            <TextareaMessage
              value={tempTextareaValue}
              ref={textareaRef}
              onChange={handleEditTextarea}
            />
          ) : (
            <MessageWrapper>{tempMessage}</MessageWrapper>
          )}
          <MessageSentDate>
            <span>Дата отправки сообщения</span>
            <span>{convertedDate}</span>
          </MessageSentDate>
          {!isHidden && (
            <DeleteButton onClick={handleOpenDeleteModal}>
              {IconHandler(Icon.Cross)}
            </DeleteButton>
          )}
        </InviteItemWrapper>
      )}
    </>
  );
}
