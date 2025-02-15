"use client";

import { useRef } from "react";
import {
  StyledEditUserName,
  StyledEditUserSurname,
  StyledCreationDate,
  StyledInputsWrapper,
  StyledMainUserDataWrapper,
  StyledMainUserNameAndEmail,
  StyledName,
} from "./mainUserData.styles";
import Avatar, { genConfig } from "react-nice-avatar";

type Props = {
  avatar: string;
  name: string;
  surname: string;
  creationDate: string;
  updateSurname: (surname: string) => void;
  updateName: (name: string) => void;
  isEditable?: boolean;
};

export default function MainUserData({
  avatar,
  name,
  surname,
  updateName,
  updateSurname,
  creationDate,
  isEditable = false,
}: Props) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const userSurnameRef = useRef<HTMLInputElement>(null);

  const handleUserNameChange = () => {
    if (userNameRef.current) {
      updateName(userNameRef.current.value);
    }
  };

  const handleUserSurnameChange = () => {
    if (userSurnameRef.current) {
      updateSurname(userSurnameRef.current.value);
    }
  };

  const transformedCreationDate = new Date(creationDate).toLocaleDateString(
    "ru-RU",
    { day: "2-digit", month: "2-digit", year: "numeric" }
  );

  return (
    <StyledMainUserDataWrapper>
      <Avatar
        key={avatar}
        className="avatar"
        style={{
          width: "100px",
          height: "100px",
          minHeight: "100px",
          minWidth: "100px",
        }}
        {...genConfig(avatar)}
      />
      <StyledMainUserNameAndEmail>
        <StyledName>
          {!isEditable ? (
            `${surname ? surname : ""} ${name ? name : ""}`
          ) : (
            <StyledInputsWrapper>
              <StyledEditUserSurname
                id="userSurname"
                value={surname}
                ref={userSurnameRef}
                onChange={handleUserSurnameChange}
              />
              <StyledEditUserName
                id="userName"
                value={name}
                ref={userNameRef}
                onChange={handleUserNameChange}
              />
            </StyledInputsWrapper>
          )}
        </StyledName>
        <StyledCreationDate>
          Дата создания аккаунта - {transformedCreationDate}
        </StyledCreationDate>
      </StyledMainUserNameAndEmail>
    </StyledMainUserDataWrapper>
  );
}
