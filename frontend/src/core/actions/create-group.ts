"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";
import { revalidateTag } from "next/cache";

type Props = {
  body: {
    name: string;
    about: string;
    is_private: number;
    is_closed: number;
  };
};

export const handleCreateGroup = async ({ body }: Props) => {
  const baseUrl = ApiService.getBaseUrl();
  try {
    const token = await CookiesService.getCookie("access_token");
    const response = await fetch(`${baseUrl}/group/new_group`, {
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
