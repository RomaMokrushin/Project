"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  redirect("/sign-in");
};
