"use client";
import type { Notification } from "@/core/types";
import {
  DeleteNotificationButtonWrapper,
  MessageSentDate,
  MessageWrapper,
  StyledNotificationWrapper,
} from "./notificationItem.styles";
import { useState } from "react";
import { convertDate } from "@/core/utils/date.utils";

type Props = Notification;

export default function NotificationItem(props: Props) {
  const [isRead, setIsRead] = useState<boolean>(props.checked === 1);
  const dateSent = convertDate(props.created_at);

  const handleReed = () => {
    setIsRead(true);
  };

  return (
    <StyledNotificationWrapper $isRead={isRead} onMouseOver={handleReed}>
      <MessageWrapper>{props.message}</MessageWrapper>
      <MessageSentDate>
        <span>Дата отправки сообщения</span>
        <span>{dateSent}</span>
      </MessageSentDate>
      <DeleteNotificationButtonWrapper></DeleteNotificationButtonWrapper>
    </StyledNotificationWrapper>
  );
}
