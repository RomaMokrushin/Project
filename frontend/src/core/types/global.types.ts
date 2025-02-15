export type Dictionary<T = unknown> = { [key: string]: T };

export type GlobalSearchResponse = {
  id: number;
  type: "user" | "group";
  name: string;
  avatar?: string;
};
