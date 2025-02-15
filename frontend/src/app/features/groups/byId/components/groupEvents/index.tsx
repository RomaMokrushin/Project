import { IconHandler } from "@/core/images/IconHandler";
import {
  EventsWrapper,
  StyledGroupEventsWrapper,
  StyledNoEventsText,
  StyledTitle,
} from "./groupEvents.styles";
import { Icon } from "@/core/enums/Icon.enum";
import type { GroupLog } from "@/core/types";
import Event from "./event";

type Props = {
  events: GroupLog[];
};

export default function GroupEvents({ events }: Props) {
  const sortedEvents = events?.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return (
    <StyledGroupEventsWrapper>
      <StyledTitle>События:</StyledTitle>
      <EventsWrapper $noEvents={!sortedEvents.length}>
        {!sortedEvents.length ? (
          <>
            <StyledNoEventsText>
              К сожалению, событий пока нет
            </StyledNoEventsText>
            {IconHandler(Icon.SadFace)}
          </>
        ) : (
          <>
            {sortedEvents.map((event) => (
              <Event key={event.id} log={event} />
            ))}
          </>
        )}
      </EventsWrapper>
    </StyledGroupEventsWrapper>
  );
}
