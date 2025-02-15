"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";
import { revalidateTag } from "next/cache";

type Props = {
  body: {
    id: number;
    name: string;
    events: {
      name: string;
      main_persons: number[];
      other_persons: number[];
      info: {
        id: number;
        money_for_pay: number;
        participates: boolean;
      }[];
      money: number;
    }[];
    trip_members: number[];
  };
};

export const handleCreateTrip = async ({ body }: Props) => {
  const baseUrl = ApiService.getBaseUrl();
  try {
    const token = await CookiesService.getCookie("access_token");
    const response = await fetch(`${baseUrl}/trip/make_recalculations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    revalidateTag("invites-sent");
    return { data: response, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
};
