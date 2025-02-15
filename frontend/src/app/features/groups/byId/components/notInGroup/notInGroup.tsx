"use client";

import type { Group } from "@/core/types";
import GroupUsers from "../groupUsers";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import {
  CloseIconWrapper,
  KnockAndAdminsWrapper,
  KnockButton,
  KnockButtonWrapper,
  KnockInviteLetter,
  KnockModal,
  KnockModalTitle,
  KnockModalWrapper,
  NotInGroupWrapper,
  StyledButtonText,
} from "./notInGroup.styles";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useOutsideClick from "@/core/hooks/useOutsideClick";
import { handleKnockToGroup } from "@/core/actions/knock-group";

type Props = {
  group: Group;
};

export default function NotInGroup({ group }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [possibleToJoin, setPossibleToJoin] = useState(group.possible_to_join);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKnock = async () => {
    if (!possibleToJoin) {
      toast.warning("Вы уже отправили запрос в эту группу");
    } else {
      const body = {
        group_id: group.id,
        message: adminMessage,
      };
      const res = await handleKnockToGroup({ body });
      console.log("res", res);
      if (res.data && !res.error) {
        setPossibleToJoin(false);
        toast.success("Запрос на вступление отправлен");
      } else {
        toast.error("Ошибка отправки запроса");
      }
      setIsModalOpen(false);
    }
  };

  const handleChangeTextarea = () => {
    const text = textareaRef.current?.value || "";
    setAdminMessage(text);
  };

  const handleOpenModal = () => {
    if (!possibleToJoin) {
      toast.warning("Вы уже отправили запрос в эту группу");
    } else {
      setIsModalOpen(true);
    }
  };

  useOutsideClick(modalRef, handleCloseModal);

  return (
    <>
      {isModalOpen && (
        <KnockModalWrapper>
          <KnockModal ref={modalRef}>
            <CloseIconWrapper onClick={handleCloseModal}>
              {IconHandler(Icon.Close)}
            </CloseIconWrapper>
            <KnockModalTitle>
              Запрос на вступление в группу &quot;{group.name}&quot;
            </KnockModalTitle>
            <KnockInviteLetter
              ref={textareaRef}
              onChange={handleChangeTextarea}
              placeholder="сообщение для администраторов"
              value={adminMessage}
            />
            <KnockButton onClick={handleKnock}>Отправить запрос</KnockButton>
          </KnockModal>
        </KnockModalWrapper>
      )}
      <NotInGroupWrapper>
        <GroupUsers
          users={group?.participants}
          groupTitle="Участники"
          groupId={group.id}
          variant="users"
          isAllowedToAddUsers={false}
        />
        <KnockAndAdminsWrapper>
          <GroupUsers
            groupId={group.id}
            variant="admins"
            users={group?.proxies}
            groupTitle="Администраторы"
            isAllowedToAddUsers={false}
          />
          <KnockButtonWrapper
            $isKnocked={!possibleToJoin}
            onClick={handleOpenModal}
          >
            {IconHandler(Icon.WavingHand)}
            <StyledButtonText>Присоединиться к группе</StyledButtonText>
          </KnockButtonWrapper>
        </KnockAndAdminsWrapper>
      </NotInGroupWrapper>
    </>
  );
}
