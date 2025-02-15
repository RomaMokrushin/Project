"use client";

import { IconHandler } from "@/core/images/IconHandler";
import {
  ManageButtonWrapper,
  StyledButtonText,
  StyledGroupManageWrapper,
} from "./groupManage.styles";
import { Icon } from "@/core/enums/Icon.enum";
import ModalMessageWrapper from "./components/modalMessageWrapper";
import { useState } from "react";
import { handleDeleteGroup } from "@/core/actions/delete-group";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleLeaveGroup } from "@/core/actions/leave-group";
import CreateTripModalWrapper from "../createTripModalWrapper";
import { PartialUser } from "@/core/types";

type Props = Readonly<{
  isGroupOwner: boolean;
  isAllowedToEdit: boolean;
  groupId: number;
  allGroupMembers: PartialUser[];
}>;

export default function GroupManage({
  isAllowedToEdit,
  groupId,
  isGroupOwner,
  allGroupMembers,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const router = useRouter();

  const handleLeaveGroupLocal = async () => {
    try {
      const res = await handleLeaveGroup({ body: { group_id: groupId } });
      if (res.data && !res.error) {
        toast.success("Вы успешно покинули группу");
        router.push("/");
      } else {
        toast.error("Произошла ошибка при покидании группы");
      }
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при покидании группы");
    }
  };

  if (!isAllowedToEdit && !isGroupOwner) {
    return (
      <StyledGroupManageWrapper>
        <ManageButtonWrapper $isDelete onClick={handleLeaveGroupLocal}>
          <StyledButtonText>Выйти из группы</StyledButtonText>
        </ManageButtonWrapper>
      </StyledGroupManageWrapper>
    );
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.documentElement.style.overflow = "";
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
  };

  const handleOpenCreateTripModal = () => {
    setIsCreateTripModalOpen(true);
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
  };

  const handleCloseCreateTripModal = () => {
    setIsCreateTripModalOpen(false);
    document.documentElement.style.overflow = "";
  };

  const handleDeleteGroupLocal = async () => {
    try {
      const res = await handleDeleteGroup({ body: { group_id: groupId } });
      if (res.data && !res.error) {
        toast.success("Группа успешно удалена");
        router.push("/");
      } else {
        toast.error("Произошла ошибка при удалении группы");
      }
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при удалении группы");
    }
  };

  return (
    <>
      <ModalMessageWrapper
        isModalOpen={isModalOpen}
        handleModal={handleCloseModal}
        groupId={groupId}
      />
      <CreateTripModalWrapper
        groupId={groupId}
        isModalOpen={isCreateTripModalOpen}
        allGroupMembers={allGroupMembers}
        handleCloseModal={handleCloseCreateTripModal}
      />
      <StyledGroupManageWrapper>
        <ManageButtonWrapper>
          <StyledButtonText onClick={handleOpenModal}>
            Отправить сообщение
          </StyledButtonText>
          {IconHandler(Icon.Roupor)}
        </ManageButtonWrapper>
        <ManageButtonWrapper onClick={handleOpenCreateTripModal}>
          <StyledButtonText>Добавить поездку</StyledButtonText>
          {IconHandler(Icon.Track)}
        </ManageButtonWrapper>
        {isGroupOwner && (
          <ManageButtonWrapper $isDelete onClick={handleDeleteGroupLocal}>
            <StyledButtonText>Удалить группу</StyledButtonText>
          </ManageButtonWrapper>
        )}
        {!isGroupOwner && (
          <ManageButtonWrapper $isDelete onClick={handleLeaveGroupLocal}>
            <StyledButtonText>Выйти из группы</StyledButtonText>
          </ManageButtonWrapper>
        )}
      </StyledGroupManageWrapper>
    </>
  );
}
