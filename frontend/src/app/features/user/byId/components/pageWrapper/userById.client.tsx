"use client";
import type { MyGroup, User } from "@/core/types";
import {
  AddEditButton,
  GroupCard,
  GroupCardTitle,
  LeftSideWrapper,
  MyGroupCardsWrapper,
  MyGroupsTitle,
  RightSideWrapper,
  StyledUserDataWrapper,
  UserGroupsWrapper,
} from "../../styles/groupsById.styles";
import { useState } from "react";
import MainUserData from "../mainUserData/mainUserData";
import UserDescription from "../userDescription/userDescription";
import EmailAndEditData from "../emailAndEditData/emailAndEditData";
import BarChart from "../barChart/barChart";
import { handleUpdateMe } from "@/core/actions/update-me";
import AddToGroupModal from "../addToGroupModal/addToGroupModal";
import {
  StyledUsersWrapper,
  ItemWrapper,
  NameBubble,
  ExtraUsers,
} from "@/app/features/homepage/styles/homePage.styles";
import Avatar, { genConfig } from "react-nice-avatar";
type Props = User & {
  isMe: boolean;
  myGroups: MyGroup[];
};

export default function UserByIdClient(props: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [userName, setUserName] = useState(props.first_name);
  const [userSurname, setUserSurname] = useState(props.last_name);
  const [userDescription, setUserDescription] = useState(props.about);
  const [stopInvites, setStopInvites] = useState(props.is_closed === 0);
  const [isProfileHidden, setIsProfileHidden] = useState(
    props.is_private === 0
  );
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleUserNameChange = (name: string) => {
    setUserName(name);
  };

  const handleUserSurnameChange = (surname: string) => {
    setUserSurname(surname);
  };

  const handleUserDescriptionChange = (description: string) => {
    setUserDescription(description);
  };

  const handleStopInvitesChange = (stopInvites: boolean) => {
    setStopInvites(stopInvites);
  };

  const handleProfileHiddenChange = (isProfileHidden: boolean) => {
    setIsProfileHidden(isProfileHidden);
  };

  const handleInviteModal = () => {
    setIsInviteModalOpen(!isInviteModalOpen);
  };

  const handleCloseModal = () => {
    setIsInviteModalOpen(false);
  };

  const handleSave = async () => {
    if (isEditable && props.isMe) {
      const body = {
        first_name: userName,
        last_name: userSurname,
        about: userDescription,
        is_closed: stopInvites ? 0 : 1,
        is_private: isProfileHidden ? 0 : 1,
      };
      const res = await handleUpdateMe(body);
      if (res.error) {
        console.log(res.error);
        return;
      }
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  const getUsersCut = (group: MyGroup) => {
    const participants = group.participants.map((participant) => {
      return participant;
    });
    const proxies = group.proxies.map((proxy) => {
      return proxy;
    });
    // filter out duplicates
    return participants.concat(proxies).filter((item, index, self) => {
      return index === self.findIndex((t) => t.user_id === item.user_id);
    });
  };

  return (
    <StyledUserDataWrapper>
      {isInviteModalOpen && (
        <AddToGroupModal closeModal={handleCloseModal} userId={props.id} />
      )}
      <LeftSideWrapper>
        <MainUserData
          avatar={props.avatar}
          name={userName}
          surname={userSurname}
          updateName={handleUserNameChange}
          updateSurname={handleUserSurnameChange}
          creationDate={props.created_at}
          isEditable={isEditable}
        />
        <UserDescription
          description={userDescription}
          changeDescription={handleUserDescriptionChange}
          isEditable={isEditable}
        />
        {props.isMe && (
          <UserGroupsWrapper>
            <MyGroupsTitle>Мои группы:</MyGroupsTitle>
            <MyGroupCardsWrapper>
              {props.myGroups.map((group) => (
                <GroupCard key={group.id} href={`/groups/${group.id}`}>
                  <GroupCardTitle>{group.name}</GroupCardTitle>
                  <StyledUsersWrapper>
                    {getUsersCut(group)
                      .slice(0, 4)
                      .map((user, index) => (
                        <ItemWrapper $n={index + 1} key={user.user_id}>
                          <NameBubble>{user.name}</NameBubble>
                          <Avatar
                            key={user.user_id}
                            style={{
                              width: "40px",
                              height: "40px",
                              minHeight: "40px",
                              minWidth: "40px",
                            }}
                            {...genConfig(user.avatar)}
                          />
                        </ItemWrapper>
                      ))}
                    {getUsersCut(group).length > 4 && (
                      <ItemWrapper $n={5} $noHover>
                        <ExtraUsers>
                          +{getUsersCut(group).length - 4}
                        </ExtraUsers>
                      </ItemWrapper>
                    )}
                  </StyledUsersWrapper>
                </GroupCard>
              ))}
            </MyGroupCardsWrapper>
          </UserGroupsWrapper>
        )}
        <EmailAndEditData
          email={props.email}
          phone={props.phone_number}
          stopInvites={stopInvites}
          isProfileHidden={isProfileHidden}
          changeStopInvites={handleStopInvitesChange}
          changeProfileHidden={handleProfileHiddenChange}
          isMe={props.isMe}
          isEditable={isEditable}
        />
      </LeftSideWrapper>
      <RightSideWrapper>
        <BarChart statistics={props.statistics} />
        {props.isMe && (
          <AddEditButton onClick={handleSave}>
            {isEditable ? "Сохранить" : "Редактировать"}
          </AddEditButton>
        )}
        {!props.isMe && stopInvites && (
          <AddEditButton onClick={handleInviteModal}>
            Пригласить в группу
          </AddEditButton>
        )}
      </RightSideWrapper>
    </StyledUserDataWrapper>
  );
}
