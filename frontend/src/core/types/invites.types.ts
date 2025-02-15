import type { PartialUser } from "./user.types";

export type Invite = {
  id: number;
  user: PartialUser;
  checked: number;
  message: string;
  created_at: string;
};

type Group = {
  group_id: number;
  name: string;
};

export type PersonalInviteSent = {
  id: number;
  group: Group;
  checked: number;
  message: string;
  created_at: string;
};
