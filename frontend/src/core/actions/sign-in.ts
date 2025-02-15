"use server";

import ApiService from "@/core/services/Api.service";
import { cookies } from "next/headers";

export const handleSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const baseUrl = ApiService.getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
    if (!response.ok) {
      return { data: undefined, error: new Error("Error") };
    }
    const cookieStore = await cookies();
    cookieStore.set("access_token", response.access_token, {
      maxAge: 60 * 60 * 24 * 7,
    });
    return { data: response, error: undefined };
  } catch (error) {
    return { data: undefined, error }; 
  }
};
