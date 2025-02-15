"use client";

import Modal from "@/app/features/common/modal";
import { handleSendGroupMessage } from "@/core/actions/send-group-message";
import { toast } from "react-toastify";

type Props = {
  isModalOpen: boolean;
  groupId: number;
  handleModal: () => void;
};

export default function ModalMessageWrapper({
  isModalOpen,
  handleModal,
  groupId,
}: Props) {
  if (!isModalOpen) {
    return null;
  }

  const sendGroupMessage = async () => {
    const message = document.querySelector(
      '[name="textarea_group_message"]'
    ) as HTMLTextAreaElement;

    if (!message || !message.value) {
      return;
    }

    const body = {
      group_id: groupId,
      message: message.value,
    };
    try {
      const res = await handleSendGroupMessage({ body });
      if (res.data && !res.error) {
        toast.success("Сообщение отправлено");
      } else {
        toast.error("Ошибка при отправке сообщения");
      }
      handleModal();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при отправке сообщения");
    }
  };

  return (
    <Modal
      i18n={{
        title: "Введите сообщение, которое хотите отправить",
        btn: "Отправить сообщение",
      }}
      textarea={{
        label: "",
        placeholder: "Сообщение для участников группы",
        name: "textarea_group_message",
      }}
      btnAction={sendGroupMessage}
      closeAction={handleModal}
    />
  );
}
