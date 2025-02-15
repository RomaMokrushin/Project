"use server";

import ApiService from "@/core/services/Api.service";
import CookiesService from "../services/Cookies.service";

type Props = {
  query: string;
};

export const handleSearchGlobal = async ({ query }: Props) => {
  const baseUrl = ApiService.getBaseUrl();
  if (!query || query.length < 1) {
    return { data: [], error: undefined };
  }
  try {
    const token = await CookiesService.getCookie("access_token");
    const response = await fetch(`${baseUrl}/search?filter_by=${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [`global-search-${query}`],
        revalidate: 60,
      },
    }).then((res) => res.json());
    return { data: response, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
};
