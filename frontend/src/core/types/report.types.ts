import { PartialUser } from "./user.types";

type Group = {
  id: number;
  name: string;
};

type Creator = {
  user_id: number;
  avatar: string;
  name: string;
};

type EventType = {
  id: number;
  name: string;
  payment: number;
  total_money: number;
  main_persons: {
    user: PartialUser;
    paid: number;
    is_participate: boolean;
  }[];
  other_persons: PartialUser[];
  results: unknown[];
};

type UserStatistics = {
  user: PartialUser;
  borrowed_money: number;
  lended_money: number;
  lender: number;
  debter: number;
  participate: number;
  result: number;
};

export type Trip = {
  id: number;
  group: Group;
  creator: Creator;
  trip_name: string;
  wasted_money: number;
  amount_events: number;
  amount_users: number;
  events: EventType[];
  statistics: UserStatistics[];
  date: string;
};
