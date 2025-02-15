"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";
import { revalidateTag } from "next/cache";

type Props = {
  filter: string;
  groupId: string;
};

export const handleSearchUser = async ({ filter, groupId }: Props) => {
  const baseUrl = ApiService.getBaseUrl();
  try {
    const token = await CookiesService.getCookie("access_token");
    const response = await fetch(
      `${baseUrl}/search/users_to_add?group_id=${groupId}&filter_by=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
    revalidateTag("invites-received");
    console.log('response', response)
    return { data: response, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
};
