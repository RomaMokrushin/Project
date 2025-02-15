"use client";
import type { Invite } from "@/core/types";
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
  UserWrapper,
} from "./inviteItem.styles";
import Avatar, { genConfig } from "react-nice-avatar";
import { useState } from "react";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import { convertDate } from "@/core/utils/date.utils";
import { toast } from "react-toastify";
import { handleDeleteInvites } from "@/core/actions/delete-invites";
import { handleAcceptInvites } from "@/core/actions/accept-invite";

type Props = {
  invite: Invite;
  groupId: string;
};
export default function InviteItem({ invite, groupId }: Props) {
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
      const body = { user_id: invite.user.user_id, group_id: +groupId };
      const res = await handleAcceptInvites({ body });
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

  const avatarConfig = genConfig(invite.user.avatar);
  const convertedDate = convertDate(invite.created_at);
  return (
    <>
      {isTempNotAcceptedOrDeleted && (
        <InviteItemWrapper $isHidden={isHidden} onClick={handleInviteClick}>
          <TopBarWrapper>
            <PlaceholderEdit />
            <InviteItemTitle>
              <div>Запрос от </div>
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
