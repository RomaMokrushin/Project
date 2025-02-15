"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";

type Props = {
  body: {
    group_id: number;
    message: string;
  };
};

export const handleSendGroupMessage = async ({ body }: Props) => {
  const baseUrl = ApiService.getBaseUrl();
  try {
    const token = await CookiesService.getCookie("access_token");
    const response = await fetch(`${baseUrl}/message/send_messages`, {
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
