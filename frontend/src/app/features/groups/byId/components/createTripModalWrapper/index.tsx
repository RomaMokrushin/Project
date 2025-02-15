"use client";

import Modal from "@/app/features/common/modal";
import {
  AddEvent,
  DeleteEventWrapper,
  DeleteIconWrapper,
  DeleteParticipantOverlay,
  Divider,
  DropDownContent,
  DropDownItem,
  DropDownItemContainer,
  EventDividerAndDeleteWrapper,
  EventDividerText,
  EventSubtitle,
  EventTitleInput,
  EventWrapper,
  InnerCreateModalWrapper,
  InputSumPayer,
  InputTotalSum,
  ModalParticipantRadioLabel,
  ModalRadio,
  ModalRadioLabel,
  ModalRadioText,
  ParticipantsWrapper,
  ParticipantWrapper,
  PayerInput,
  PayersInputWrapper,
  PayerStatusWrapper,
  PayersWrapper,
  PayerWrapper,
  UserNameWrapper,
} from "./createTripModalWrapper.styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { IconHandler } from "@/core/images/IconHandler";
import { Icon } from "@/core/enums/Icon.enum";
import { PartialUser } from "@/core/types";
import { handleCreateTrip } from "@/core/actions/create-trip";
import { toast } from "react-toastify";

type Props = Readonly<{
  isModalOpen: boolean;
  groupId: number;
  handleCloseModal: () => void;
  allGroupMembers: PartialUser[];
}>;

type Event = {
  id: number;
  title: string;
  payEqually: boolean;
  payers: {
    user: PartialUser;
    sum: number | string;
    isParticipant: boolean;
  }[];
  payersFilter: string;
  participantsFilter: string;
  isPayersDropdownOpen: boolean;
  isParticipantsDropdownOpen: boolean;
  participants: PartialUser[];
  totalSum: number | string;
};

export default function CreateTripModalWrapper({
  groupId,
  isModalOpen,
  allGroupMembers,
  handleCloseModal,
}: Props) {
  const event = {
    id: 0,
    title: "",
    payEqually: false,
    payers: [],
    isPayersDropdownOpen: false,
    isParticipantsDropdownOpen: false,
    payersFilter: "",
    participantsFilter: "",
    participants: [],
    totalSum: 0,
  };
  const [events, setEvents] = useState<Event[]>([event]);
  const [tripName, setTripName] = useState("");
  const inputPayersWrapperRef = useRef<HTMLInputElement>(null!);
  const inputParticipantsWrapperRef = useRef<HTMLInputElement>(null!);
  const closeActionPayers = () => {
    setEvents((prev) =>
      prev.map((event) => ({ ...event, isPayersDropdownOpen: false }))
    );
  };
  const closeActionParticipants = () => {
    console.log("Close action participants");
    setEvents((prev) =>
      prev.map((event) => ({ ...event, isParticipantsDropdownOpen: false }))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputParticipantsWrapperRef.current &&
        !inputParticipantsWrapperRef.current.contains(event.target as Node) &&
        inputPayersWrapperRef.current &&
        !inputPayersWrapperRef.current.contains(event.target as Node)
      ) {
        closeActionParticipants();
        closeActionPayers();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    inputParticipantsWrapperRef,
    inputPayersWrapperRef,
    closeActionParticipants,
  ]);

  if (!isModalOpen) return null;

  const handleDeleteEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index));
    setEvents((prev) => prev.map((event, i) => ({ ...event, id: i })));
  };

  const handleAddEvent = () => {
    const lastIndex = events.length - 1;
    setEvents((prev) => [...prev, { ...event, id: lastIndex + 1 }]);
  };

  const handleUpdateTripName = (value: string) => {
    setTripName(value);
  };

  const handleSearchPayer = (
    e: ChangeEvent<HTMLInputElement>,
    eventId: number
  ) => {
    const value = e.target.value;
    const updatedEventWithFilter = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, payersFilter: value };
      }
      return event;
    });
    setEvents(updatedEventWithFilter);
  };

  const handleSearchParticipant = (
    e: ChangeEvent<HTMLInputElement>,
    eventId: number
  ) => {
    const value = e.target.value;
    const updatedEventWithFilter = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, participantsFilter: value };
      }
      return event;
    });
    setEvents(updatedEventWithFilter);
  };

  const handleOpenPayersDropdown = (eventId: number) => {
    const updatedEventWithDropdown = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, isPayersDropdownOpen: true };
      }
      return event;
    });
    setEvents(updatedEventWithDropdown);
  };

  const handleOpenParticipantsDropdown = (eventId: number) => {
    const updatedEventWithDropdown = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, isParticipantsDropdownOpen: true };
      }
      return event;
    });
    setEvents(updatedEventWithDropdown);
  };

  const handleAddPayer = (eventId: number, payer: PartialUser) => {
    const updatedEventWithPayer = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          payers: [
            ...event.payers,
            {
              user: payer,
              sum: 0.0,
              isParticipant: false,
            },
          ],
          payersFilter: "",
          isPayersDropdownOpen: false,
        };
      }
      return event;
    });
    setEvents(updatedEventWithPayer);
  };

  const handleRemovePayer = (eventId: number, payerId: number) => {
    const updatedEventWithPayer = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          payers: event.payers.filter(
            (payer) => payer.user.user_id !== payerId
          ),
        };
      }
      return event;
    });
    setEvents(updatedEventWithPayer);
  };

  const handleUpdatePayerSum = (
    eventId: number,
    payerId: number,
    value: string
  ) => {
    const updatedEventWithPayer = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          payers: event.payers.map((payer) => {
            if (payer.user.user_id === payerId) {
              return { ...payer, sum: value };
            }
            return payer;
          }),
        };
      }
      return event;
    });
    setEvents(updatedEventWithPayer);
  };

  const handleUpdatePayerParticipant = (
    eventId: number,
    payerId: number,
    value: boolean
  ) => {
    const updatedEventWithPayer = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          payers: event.payers.map((payer) => {
            if (payer.user.user_id === payerId) {
              return { ...payer, isParticipant: value };
            }
            return payer;
          }),
        };
      }
      return event;
    });
    setEvents(updatedEventWithPayer);
  };

  const handleDeleteParticipant = (eventId: number, participantId: number) => {
    const updatedEventWithParticipant = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          participants: event.participants.filter(
            (participant) => participant.user_id !== participantId
          ),
        };
      }
      return event;
    });
    setEvents(updatedEventWithParticipant);
  };

  const handleUpdatePayedEqually = (eventId: number) => {
    const updatedEventWithPayer = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          totalSum: 0,
          payEqually: !event.payEqually,
        };
      }
      return event;
    });
    setEvents(updatedEventWithPayer);
  };

  const handleUpdateEventTitle = (eventId: number, value: string) => {
    const updatedEventWithPayer = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          title: value,
        };
      }
      return event;
    });
    setEvents(updatedEventWithPayer);
  };

  const handleUpdateTotalSum = (eventId: number, value: string) => {
    const updatedEventWithPayer = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          totalSum: value,
        };
      }
      return event;
    });
    setEvents(updatedEventWithPayer);
  };

  const handleAddParticipant = (eventId: number, participant: PartialUser) => {
    const updatedEventWithParticipant = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          participants: [...event.participants, participant],
          participantsFilter: "",
          isParticipantsDropdownOpen: false,
        };
      }
      return event;
    });
    setEvents(updatedEventWithParticipant);
  };

  const handleSubmit = async () => {
    const convertStringToFloat = (value: string | number) => {
      if (typeof value === "number") {
        return value;
      }
      const updatedValue = value.replace(",", ".");
      const regex = /^[0-9]+(\.[0-9]+)?$/;
      const cleanedValue = updatedValue.replace(/[^0-9.]/g, "");
      const dotsCount = cleanedValue.split(".").length - 1;
      const valueWithOneDot = cleanedValue.replace(".", "");
      const finalValue = dotsCount > 1 ? valueWithOneDot : cleanedValue;
      if (regex.test(finalValue)) {
        return parseFloat(finalValue);
      }
      return 0;
    };

    if (events.length === 0) return;

    const users = events
      .map((event) => {
        const payers = event.payers.map((payer) => payer.user.user_id);
        const participants = event.participants.map(
          (participant) => participant.user_id
        );
        return [...payers, ...participants];
      })
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index);

    const body = {
      id: groupId,
      name: tripName,
      events: events.map((event) => ({
        name: event.title,
        main_persons: event.payers.map((payer) => payer.user.user_id),
        other_persons: event.participants.map(
          (participant) => participant.user_id
        ),
        info: event.payers.map((payer) => ({
          id: payer.user.user_id,
          money_for_pay: convertStringToFloat(payer.sum),
          participates: payer.isParticipant,
        })),
        money:
          convertStringToFloat(event.totalSum) > 0
            ? convertStringToFloat(event.totalSum)
            : event.payers.reduce(
                (acc, payer) => acc + convertStringToFloat(payer.sum),
                0
              ),
      })),
      trip_members: users,
    };

    try {
      const { data, error } = await handleCreateTrip({ body });
      if (!data || error) {
        console.log("Error", error);
        toast.error("Произошла ошибка при создании поездки");
      } else {
        toast.success("Поездка успешно создана");
        handleCloseModal();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Произошла ошибка при создании поездки");
    }
  };

  return (
    <Modal
      customWidth="600px"
      i18n={{ title: "Создание новой поездки", btn: "Создать" }}
      closeAction={handleCloseModal}
      inputs={[
        {
          label: "Название поездки",
          placeholder: "Введите название поездки",
          name: "tripName",
          value: tripName,
          callback: (e) => handleUpdateTripName(e),
        },
      ]}
      btnAction={handleSubmit}
    >
      <InnerCreateModalWrapper>
        {events.map((event, index) => (
          <span key={`event-temp-${index}`}>
            <EventDividerAndDeleteWrapper>
              <EventDividerText>Событие {index + 1}</EventDividerText>
              <DeleteEventWrapper onClick={() => handleDeleteEvent(index)}>
                {IconHandler(Icon.Crossmark)}
              </DeleteEventWrapper>
            </EventDividerAndDeleteWrapper>
            <EventWrapper key={`event-${index}`}>
              <EventTitleInput
                placeholder="Введите название события"
                value={event.title}
                onChange={(e) => {
                  handleUpdateEventTitle(event.id, e.target.value);
                }}
              />
              <ModalRadioLabel
                onClick={() => handleUpdatePayedEqually(event.id)}
              >
                <ModalRadioText>Платили поровну</ModalRadioText>
                <ModalRadio $isActive={event.payEqually} />
              </ModalRadioLabel>
              <Divider />
              <EventSubtitle>Платившие:</EventSubtitle>
              <PayersInputWrapper ref={inputPayersWrapperRef}>
                <PayerInput
                  placeholder="Поиск по имени"
                  onChange={(e) => handleSearchPayer(e, event.id)}
                  value={event.payersFilter}
                  onFocus={() => handleOpenPayersDropdown(event.id)}
                />
                {event.isPayersDropdownOpen && (
                  <DropDownContent>
                    {allGroupMembers
                      .filter((member) =>
                        event.payers.every(
                          (payer) => payer.user.user_id !== member.user_id
                        )
                      )
                      .filter((member) =>
                        member.name
                          .toLowerCase()
                          .includes(event.payersFilter?.toLowerCase())
                      )
                      .map((member) => (
                        <DropDownItemContainer
                          key={member.user_id}
                          onClick={() => handleAddPayer(event.id, member)}
                        >
                          <DropDownItem>{member.name}</DropDownItem>
                        </DropDownItemContainer>
                      ))}
                  </DropDownContent>
                )}
              </PayersInputWrapper>
              <PayersWrapper>
                {event.payers.map((payer) => (
                  <PayerWrapper key={payer.user.user_id}>
                    <DeleteIconWrapper
                      onClick={() =>
                        handleRemovePayer(event.id, payer.user.user_id)
                      }
                    >
                      {IconHandler(Icon.Crossmark)}
                    </DeleteIconWrapper>
                    <UserNameWrapper>
                      <Avatar
                        style={{
                          width: "32px",
                          height: "32px",
                          minHeight: "32px",
                          minWidth: "32px",
                        }}
                        {...genConfig(payer.user.avatar)}
                      />
                      <span>{payer.user.name}</span>
                    </UserNameWrapper>
                    <PayerStatusWrapper>
                      {!event.payEqually && (
                        <InputSumPayer
                          placeholder="Сумма"
                          value={payer.sum}
                          onChange={(e) =>
                            handleUpdatePayerSum(
                              event.id,
                              payer.user.user_id,
                              e.target.value
                            )
                          }
                        />
                      )}
                      <ModalParticipantRadioLabel
                        onClick={() =>
                          handleUpdatePayerParticipant(
                            event.id,
                            payer.user.user_id,
                            !payer.isParticipant
                          )
                        }
                      >
                        <ModalRadioText>Участвовал</ModalRadioText>
                        <ModalRadio $isActive={payer.isParticipant} />
                      </ModalParticipantRadioLabel>
                    </PayerStatusWrapper>
                  </PayerWrapper>
                ))}
              </PayersWrapper>
              <Divider />
              <EventSubtitle>Участники:</EventSubtitle>
              <PayersInputWrapper ref={inputParticipantsWrapperRef}>
                <PayerInput
                  placeholder="Поиск по имени"
                  value={event.participantsFilter}
                  onChange={(e) => handleSearchParticipant(e, event.id)}
                  onFocus={() => handleOpenParticipantsDropdown(event.id)}
                />
                {event.isParticipantsDropdownOpen && (
                  <DropDownContent>
                    {allGroupMembers
                      .filter((member) =>
                        event.participants.every(
                          (participant) =>
                            participant.user_id !== member.user_id
                        )
                      )
                      .filter((member) =>
                        member.name
                          .toLowerCase()
                          .includes(event.participantsFilter?.toLowerCase())
                      )
                      .map((member) => (
                        <DropDownItemContainer
                          key={member.user_id}
                          onClick={() => handleAddParticipant(event.id, member)}
                        >
                          <DropDownItem>{member.name}</DropDownItem>
                        </DropDownItemContainer>
                      ))}
                  </DropDownContent>
                )}
              </PayersInputWrapper>
              <ParticipantsWrapper>
                {event.participants.map((participant) => (
                  <ParticipantWrapper key={participant.user_id}>
                    <Avatar
                      style={{
                        width: "32px",
                        height: "32px",
                        minHeight: "32px",
                        minWidth: "32px",
                      }}
                      {...genConfig(participant.avatar)}
                    />
                    <span>{participant.name}</span>
                    <DeleteParticipantOverlay
                      onClick={() =>
                        handleDeleteParticipant(event.id, participant.user_id)
                      }
                    >
                      {IconHandler(Icon.Crossmark)}
                    </DeleteParticipantOverlay>
                  </ParticipantWrapper>
                ))}
              </ParticipantsWrapper>
              {event.payEqually && (
                <>
                  <Divider />
                  <InputTotalSum
                    placeholder="Общая сумма"
                    value={event.totalSum}
                    onChange={(e) =>
                      handleUpdateTotalSum(event.id, e.target.value)
                    }
                  />
                </>
              )}
            </EventWrapper>
          </span>
        ))}
        <AddEvent onClick={handleAddEvent}>
          {IconHandler(Icon.Plus)}
          <span>Добавить событие</span>
        </AddEvent>
      </InnerCreateModalWrapper>
    </Modal>
  );
}
