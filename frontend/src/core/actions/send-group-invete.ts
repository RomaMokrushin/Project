"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";

type Props = {
  body: {
    user_id: string;
    group_id: string;
    message: string;
  };
};

export const handleInviteUserToGroup = async ({ body }: Props) => {
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
    return { data: response, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
};
