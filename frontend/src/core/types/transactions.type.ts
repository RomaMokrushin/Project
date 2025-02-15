import { PartialUser } from ".";

export type Transaction = {
  from_user: PartialUser;
  to_user: PartialUser;
  money: number;
  created_at: string;
  checked: number;
  card_to: string;
  card_from: string;
  id: number;
  direction: boolean;
};
