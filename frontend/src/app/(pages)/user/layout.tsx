import type { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main data-testid="user">{children}</main>;
}
