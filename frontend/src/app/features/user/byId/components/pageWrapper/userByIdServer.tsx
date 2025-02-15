/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */

import UserService from "@/core/services/User.service";
import { StyledUserById } from "../../styles/groupsById.styles";
import NavBarServer from "@/app/features/common/navBar/navBarServer";
import type { MyGroup, User } from "@/core/types";
import UserByIdClient from "./userById.client";

type Props = {
  id: string;
};

export default async function UserByIdServer({ id }: Props) {
  const { data: dataMe, error: errorMe } = await UserService.getMe();
  if (errorMe || !dataMe) {
    return null;
  }

  let data: User = {
    id: -1,
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    avatar: "",
    about: "",
    is_private: 0,
    is_closed: 0,
    statistics: {},
    created_at: "",
  };
  let myGroups: MyGroup[] = [];

  if (id === dataMe?.id?.toString()) {
    data = dataMe;
    const { data: dataGroups, error: errorGroups } =
      await UserService.getMyGroups(id);
    if (errorGroups || !dataGroups) {
      myGroups = [];
    } else {
      myGroups = dataGroups;
    }
  } else {
    const { data: dataUser, error: errorUser } = await UserService.getUser(id);
    if (errorUser || !dataUser) {
      return null;
    }
    data = dataUser;
  }

  if (data.id === -1) return null;

  return (
    <StyledUserById>
      <NavBarServer />
      <UserByIdClient
        {...data}
        isMe={id === dataMe?.id?.toString()}
        myGroups={myGroups}
      />
    </StyledUserById>
  );
}
