import { PartialUser } from "./user.types";

export type Group = {
  id: number;
  name: string;
  about: string;
  owner: PartialUser;
  participants: PartialUser[];
  proxies: PartialUser[];
  amount_of_users: number;
  is_private: boolean;
  is_closed: boolean;
  created_at: string;
  amount_of_trips: number;
  amount_of_events: number;
  possible_to_join: boolean;
};

export type GroupLog = {
  id: number;
  group_id: number;
  message: string;
  type: number;
  created_at: string;
  author: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
  subMessage: {
    type: "string" | "link";
    message: string;
    link: string;
  } | null;
};

export type GroupSearch = Pick<Group, "id" | "name"> & {
  isInvited: boolean;
};

export type Report = {
  id: number;
  creator: {
    user_id: number;
    avatar: string;
    name: string;
  };
  trip_name: string;
  created_at: string;
};

export type Debt = {
  id: number;
  debter: PartialUser;
  money: number;
  remind_time: string | null;
  created_at: string;
  remind_button: boolean;
};

export type DebtTotal = {
  lends: number;
  amount_debters: number;
};

export type Credit = {
  id: number;
  lender: PartialUser;
  money: number;
  created_at: string;
};

export type CreditTotal = {
  debts: number;
  amount_lenders: number;
};

export type RecentEvent = {
  id: number;
  creator: {
    user_id: number;
    avatar: string;
    name: string;
  };
  trip_name: string;
  created_at: string;
  group: {
    id: number;
    name: string;
  };
  wasted_money: number;
  amount_of_participants: number;
  amount_of_events: number;
};
