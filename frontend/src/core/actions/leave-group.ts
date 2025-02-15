"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";
import { revalidateTag } from "next/cache";

type Props = {
  body: {
    group_id: number;
  };
};

export const handleLeaveGroup = async ({ body }: Props) => {
  const baseUrl = ApiService.getBaseUrl();
  try {
    const token = await CookiesService.getCookie("access_token");
    const response = await fetch(`${baseUrl}/user/leave_from_group`, {
      method: "DELETE",
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
