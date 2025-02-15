import { RecentEvent } from "@/core/types";
import {
  DataItem,
  DataItemsWrapper,
  DataItemTitle,
  DataItemValue,
  GroupTitle,
  ItemsWrapper,
  MainTile,
  StyledEvent,
  StyledLeftSideItemWrapper,
  StyledTitle,
  StyledUserNameWrapper,
} from "./event.styles";
import Avatar, { genConfig } from "react-nice-avatar";

type Props = {
  event: RecentEvent;
};
export default function Event({ event }: Readonly<Props>) {
  const transformDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <StyledEvent>
      <ItemsWrapper>
        <StyledLeftSideItemWrapper>
          <StyledTitle>Создал поездку</StyledTitle>
          <StyledUserNameWrapper href={`/user/${event.creator.user_id}`}>
            <Avatar
              key={event.creator.user_id}
              style={{
                width: "40px",
                height: "40px",
                minHeight: "40px",
                minWidth: "40px",
              }}
              {...genConfig(event.creator.avatar)}
            />
            <span>{event.creator.name}</span>
          </StyledUserNameWrapper>
        </StyledLeftSideItemWrapper>
        <StyledLeftSideItemWrapper>
          <StyledTitle>В группе</StyledTitle>
          <GroupTitle href={`/groups/${event.group.id}`}>
            {event.group.name}
          </GroupTitle>
        </StyledLeftSideItemWrapper>
      </ItemsWrapper>
      <ItemsWrapper>
        <StyledTitle>Название</StyledTitle>
        <MainTile>{event.trip_name}</MainTile>
      </ItemsWrapper>
      <ItemsWrapper>
        <StyledTitle>Описание</StyledTitle>
        <DataItemsWrapper>
          <DataItem>
            <DataItemTitle>Дата создания поездки</DataItemTitle>
            <DataItemValue>{transformDate(event.created_at)}</DataItemValue>
          </DataItem>
          <DataItem>
            <DataItemTitle>Количество событий</DataItemTitle>
            <DataItemValue>{event.amount_of_events}</DataItemValue>
          </DataItem>
          <DataItem>
            <DataItemTitle>Количество участников</DataItemTitle>
            <DataItemValue>{event.amount_of_participants}</DataItemValue>
          </DataItem>
          <DataItem>
            <DataItemTitle>Потраченная сумма</DataItemTitle>
            <DataItemValue>{event.wasted_money.toFixed(2)}₽</DataItemValue>
          </DataItem>
        </DataItemsWrapper>
      </ItemsWrapper>
    </StyledEvent>
  );
}
