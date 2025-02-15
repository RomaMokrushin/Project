export type UserStatistics = {
  [key: string]: number; // Dynamic keys for months with numerical values
};

export type User = {
  id: number;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  avatar: string;
  about: string;
  is_private: number; // Assuming these are boolean-like integers
  is_closed: number; // Assuming these are boolean-like integers
  statistics: UserStatistics; // Nested statistics object
  created_at: string; // Assuming this is a date string
};

export type PartialUser = {
  user_id: number;
  avatar: string;
  name: string;
};

export type MyGroup = {
  id: number;
  name: string;
  about: string;
  owner: PartialUser;
  participants: PartialUser[];
  proxies: PartialUser[];
};
