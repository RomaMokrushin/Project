"use server";

import ApiService from "@/core/services/Api.service";
import { cookies } from "next/headers";

export const handleSignUp = async ({
  email,
  password,
  surname,
  name,
  phone,
}: {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const baseUrl = ApiService.getBaseUrl();
  const body = {
    email,
    phone_number: phone,
    first_name: name,
    last_name: surname,
    about: "",
    is_private: 0,
    is_closed: 1,
    password,
    confirm_password: password,
  };
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    const cookieStore = await cookies();
    cookieStore.set("access_token", response.access_token, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return { data: response, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
};
