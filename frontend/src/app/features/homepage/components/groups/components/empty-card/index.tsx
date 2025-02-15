"use client";

import { useState } from "react";
import { CardWrapper } from "../card/card.styles";
import {
  ModalRadio,
  ModalRadioLabel,
  ModalRadioText,
  ModalRadioWrapper,
  StyledAddGroupText,
  StyledInnerEmptyCard,
} from "./empty-card.styles";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import Modal from "@/app/features/common/modal";
import { handleCreateGroup } from "@/core/actions/create-group";
import { toast } from "react-toastify";

export default function EmptyCard() {
  const [isClosedGroup, setIsClosedGroup] = useState(false);
  const [isHiddenGroup, setIsHiddenGroup] = useState(false);
  const [groupName, setGroupName] = useState<string>("");
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsCreateGroupModalOpen(false);
    document.documentElement.style.overflow = "";
  };

  const handleOpenModal = () => {
    setIsCreateGroupModalOpen(true);
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
  };

  const handleChangeGroupName = (value: string) => {
    setGroupName(value);
  };

  const handleCreateGroupLocal = async () => {
    const groupTitle = document.querySelector<HTMLInputElement>(
      'input[name="group_name"]'
    )?.value;
    const groupDescription = document.querySelector<HTMLTextAreaElement>(
      'textarea[name="group_description"]'
    )?.value;

    if (!groupTitle) {
      return;
    }

    const body = {
      name: groupTitle,
      about: groupDescription ?? "",
      is_closed: isClosedGroup ? 1 : 0,
      is_private: isHiddenGroup ? 1 : 0,
    };
    try {
      const { data, error } = await handleCreateGroup({ body });
      if (data && !error) {
        handleCloseModal();
        toast.success("Группа успешно создана");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error("Произошла ошибка при создании группы");
      }
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при создании группы");
    }
  };

  return (
    <>
      {isCreateGroupModalOpen && (
        <Modal
          i18n={{
            title: "Создание группы",
            btn: "Создать",
          }}
          inputs={[
            {
              name: "group_name",
              label: "Название группы",
              value: groupName,
              callback: handleChangeGroupName,
              placeholder: "Введите название группы",
            },
          ]}
          textarea={{
            name: "group_description",
            label: "Описание группы",
            placeholder: "Введите описание группы",
          }}
          btnAction={handleCreateGroupLocal}
          closeAction={handleCloseModal}
        >
          <ModalRadioWrapper>
            <ModalRadioLabel onClick={() => setIsClosedGroup(!isClosedGroup)}>
              <ModalRadio $isActive={isClosedGroup} />
              <ModalRadioText>Закрыть группу</ModalRadioText>
            </ModalRadioLabel>
            <ModalRadioLabel onClick={() => setIsHiddenGroup(!isHiddenGroup)}>
              <ModalRadio $isActive={isHiddenGroup} />
              <ModalRadioText>Скрыть группу</ModalRadioText>
            </ModalRadioLabel>
          </ModalRadioWrapper>
        </Modal>
      )}
      <CardWrapper onClick={handleOpenModal}>
        <StyledInnerEmptyCard>
          {IconHandler(Icon.AddGroup)}
          <StyledAddGroupText>
            Добавьте группу и начните управлять финансами вместе
          </StyledAddGroupText>
        </StyledInnerEmptyCard>
      </CardWrapper>
    </>
  );
}
