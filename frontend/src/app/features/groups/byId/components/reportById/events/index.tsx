/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */

"use client";

import { Trip } from "@/core/types";
import {
  AllEventsWrapper,
  BlockTitle,
  Divider,
  EventData,
  EventsWrapper,
  IconWrapper,
  IsParticipantText,
  IsParticipantWrapper,
  ItemContent,
  ItemContentItem,
  ItemTitle,
  ItemWrapper,
  PaindText,
  ParticipantsWrapper,
  ParticipantWrapper,
  StyledEvent,
  StyledEventTitle,
  StyledTotal,
  TotalItem,
  TotalMoney,
  TotalTitle,
  UserName,
  UserWrapper,
} from "./events.styles";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import Avatar, { genConfig } from "react-nice-avatar";

type Props = {
  report: Trip;
};

export default function ReportEvents({ report }: Props) {
  const events = report.events;

  return (
    <EventsWrapper>
      <BlockTitle>События:</BlockTitle>
      <AllEventsWrapper>
        {events.map((event) => {
          return (
            <StyledEvent key={`event-${event.id}`}>
              <StyledEventTitle>Событие: {event.name}</StyledEventTitle>
              <EventData>
                <ItemWrapper>
                  <ItemTitle>Платившие:</ItemTitle>
                  <ItemContent>
                    {event.main_persons.map((person) => {
                      return (
                        <ItemContentItem key={`payers-${person.user.user_id}`}>
                          <UserWrapper href={`/user/${person.user.user_id}`}>
                            <Avatar
                              style={{
                                width: "24px",
                                height: "24px",
                                minHeight: "24px",
                                minWidth: "24px",
                              }}
                              {...genConfig(person.user.avatar)}
                            />
                            <UserName>{person.user.name}</UserName>
                          </UserWrapper>
                          <Divider />
                          <PaindText>{person.paid}₽</PaindText>
                          <Divider />
                          {person.is_participate ? (
                            <IsParticipantWrapper>
                              <IconWrapper>
                                {IconHandler(Icon.CheckMark)}
                              </IconWrapper>
                              <IsParticipantText>
                                Участoвал(-a)
                              </IsParticipantText>
                            </IsParticipantWrapper>
                          ) : (
                            <IsParticipantWrapper>
                              <IconWrapper>
                                {IconHandler(Icon.Crossmark)}
                              </IconWrapper>
                              <IsParticipantText>
                                Не Участoвал(-a)
                              </IsParticipantText>
                            </IsParticipantWrapper>
                          )}
                        </ItemContentItem>
                      );
                    })}
                  </ItemContent>
                </ItemWrapper>
                <ItemWrapper>
                  <ItemTitle>Итоги по учaстникам:</ItemTitle>
                  <ItemContent>
                    {event.results.map((person) => {
                      return (
                        <ItemContentItem key={`payers-${person.user.user_id}`}>
                          <UserWrapper href={`/user/${person.user.user_id}`}>
                            <Avatar
                              style={{
                                width: "24px",
                                height: "24px",
                                minHeight: "24px",
                                minWidth: "24px",
                              }}
                              {...genConfig(person.user.avatar)}
                            />
                            <UserName>{person.user.name}</UserName>
                          </UserWrapper>
                          <Divider />
                          <PaindText>
                            {+person.money >= 0 && "+"}
                            {+person.money.toFixed(2)}₽
                          </PaindText>
                        </ItemContentItem>
                      );
                    })}
                  </ItemContent>
                </ItemWrapper>
                <ItemWrapper>
                  <ItemTitle>Участники:</ItemTitle>
                  <ParticipantsWrapper>
                    {event.other_persons.map((person) => {
                      return (
                        <ParticipantWrapper
                          key={`participant-${person.user_id}`}
                          href={`/user/${person.user_id}`}
                        >
                          <Avatar
                            style={{
                              width: "24px",
                              height: "24px",
                              minHeight: "24px",
                              minWidth: "24px",
                            }}
                            {...genConfig(person.avatar)}
                          />
                          <UserName>{person.name}</UserName>
                        </ParticipantWrapper>
                      );
                    })}
                  </ParticipantsWrapper>
                </ItemWrapper>
                <ItemWrapper>
                  <ItemTitle>Итоги события:</ItemTitle>
                  <StyledTotal>
                    <TotalItem>
                      <TotalTitle>Потраченная сумма:</TotalTitle>
                      <TotalMoney> {+event.payment.toFixed(2)}₽</TotalMoney>
                    </TotalItem>
                    <TotalItem>
                      <TotalTitle>Сумма денег на человека:</TotalTitle>
                      <TotalMoney> {+event.total_money.toFixed(2)}₽</TotalMoney>
                    </TotalItem>
                  </StyledTotal>
                </ItemWrapper>
              </EventData>
            </StyledEvent>
          );
        })}
      </AllEventsWrapper>
    </EventsWrapper>
  );
}
