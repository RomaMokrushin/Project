"use client";

import { toast } from "react-toastify";
import {
  CloseModalButton,
  DeleteAllInvitesButton,
  Modal,
  ModalButton,
  ModalTitle,
  ModalWrapper,
} from "./deleteAll.styles";
import { handleDeleteInvites } from "@/core/actions/delete-invites";
import { useRef, useState } from "react";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import { CloseIconWrapper } from "../inviteItem/inviteItem.styles";
import useOutsideClick from "@/core/hooks/useOutsideClick";
import { useRouter } from "next/navigation";

type Props = {
  ids: number[];
};

export default function DeleteAllButton({ ids }: Props) {
  const modalRef = useRef<HTMLDivElement>(null!);
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleCloseModal = () => setIsDeleteModalOpen(false);
  const handleOpenModal = () => setIsDeleteModalOpen(true);
  const handleDeleteAll = async () => {
    try {
      const body = { ids };
      const res = await handleDeleteInvites({ body });
      if (res.error) {
        toast.error("Ошибка при удалении запросов");
        console.error(res.error);
        return;
      } else {
        toast.success("Запросы удалены");
        setTimeout(() => {
          router.refresh();
        }, 500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении запросов");
    }
  };

  useOutsideClick(modalRef, handleCloseModal);

  return (
    <>
      {isDeleteModalOpen && (
        <ModalWrapper>
          <Modal ref={modalRef}>
            <CloseIconWrapper onClick={handleCloseModal}>
              {IconHandler(Icon.Close)}
            </CloseIconWrapper>
            <ModalTitle>
              Вы уверены, что хотите удалить все запросы?
            </ModalTitle>
            <ModalButton onClick={handleDeleteAll}>Удалить</ModalButton>
            <CloseModalButton onClick={handleCloseModal}>
              Закрыть
            </CloseModalButton>
          </Modal>
        </ModalWrapper>
      )}
      <DeleteAllInvitesButton onClick={handleOpenModal}>
        Удалить все запросы
      </DeleteAllInvitesButton>
    </>
  );
}
