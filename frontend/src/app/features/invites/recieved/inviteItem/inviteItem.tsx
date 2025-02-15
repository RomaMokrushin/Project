"use client";
import type { PersonalInviteSent } from "@/core/types";
import {
  AcceptButton,
  ChevronWrapper,
  DeleteButton,
  InviteItemTitle,
  InviteItemWrapper,
  MessageSentDate,
  MessageWrapper,
  PlaceholderEdit,
  StyledUserName,
  TopBarWrapper,
} from "./inviteItem.styles";
import { useState } from "react";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import { convertDate } from "@/core/utils/date.utils";
import { toast } from "react-toastify";
import { handleDeleteInvites } from "@/core/actions/delete-invites";
import { handleAcceptGroupInvite } from "@/core/actions/accept-group-invite";

type Props = {
  invite: PersonalInviteSent;
};
export default function InviteItem({ invite }: Props) {
  const [isTempNotAcceptedOrDeleted, setIsTempNotAcceptedOrDeleted] =
    useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const handleDeleteInvite = async () => {
    try {
      const body = { ids: [invite.id] };
      const res = await handleDeleteInvites({ body });
      if (res.error) {
        toast.error("Ошибка при удалении запроса");
        console.error(res.error);
        return;
      } else {
        setIsTempNotAcceptedOrDeleted(false);
        toast.success("Запрос удален");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении запроса");
    }
  };

  const handleAcceptInviteLocally = async () => {
    try {
      const body = { group_id: invite.group.group_id, message: "" };
      const res = await handleAcceptGroupInvite({ body });
      if (res.error) {
        toast.error("Ошибка при принятии запроса");
        console.error(res.error);
        return;
      } else {
        setIsTempNotAcceptedOrDeleted(false);
        toast.success("Запрос принят");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при принятии запроса");
    }
  };

  const handleInviteClick = () => {
    if (isHidden) {
      setIsHidden(false);
    }
  };
  const handleChevronClick = () => {
    setIsHidden(!isHidden);
  };

  const convertedDate = convertDate(invite.created_at);
  return (
    <>
      {isTempNotAcceptedOrDeleted && (
        <InviteItemWrapper $isHidden={isHidden} onClick={handleInviteClick}>
          <TopBarWrapper>
            <PlaceholderEdit />
            <InviteItemTitle>
              Запрос на вступление в группу от{" "}
              <StyledUserName>{invite.group.name}</StyledUserName>
            </InviteItemTitle>
            <ChevronWrapper $isHidden={isHidden} onClick={handleChevronClick}>
              {IconHandler(Icon.ChevronDown)}
            </ChevronWrapper>
          </TopBarWrapper>
          <MessageWrapper>{invite.message}</MessageWrapper>
          <MessageSentDate>
            <span>Дата отправки сообщения</span>
            <span>{convertedDate}</span>
          </MessageSentDate>
          {!isHidden && (
            <AcceptButton onClick={handleAcceptInviteLocally}>
              {IconHandler(Icon.Tick)}
            </AcceptButton>
          )}
          {!isHidden && (
            <DeleteButton onClick={handleDeleteInvite}>
              {IconHandler(Icon.Cross)}
            </DeleteButton>
          )}
        </InviteItemWrapper>
      )}
    </>
  );
}
