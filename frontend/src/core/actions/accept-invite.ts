"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";
import { revalidateTag } from "next/cache";

type Props = {
  body: {
    user_id: number;
    group_id: number;
  };
};

export const handleAcceptInvites = async ({ body }: Props) => {
  const baseUrl = ApiService.getBaseUrl();
  try {
    const token = await CookiesService.getCookie("access_token");
    const response = await fetch(`${baseUrl}/group/add_user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    revalidateTag("invites-received");
    return { data: response, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
};
