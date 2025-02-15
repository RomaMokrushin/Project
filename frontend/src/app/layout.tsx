import "../core/styles/globals.css";
import StyledJsxRegistry from "./registry";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";
import SideBarServer from "./features/common/sidebar/sideBarServer";

const inter = Inter({ subsets: ["latin", "cyrillic", "cyrillic-ext"] });


export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const showSidebar = pathname !== "/sign-in";
  const sideBarServerComponent = showSidebar
    ? ((await SideBarServer()) as ReactNode)
    : null;

  return (
    <html lang="en">
      <body className={inter.className} style={{ position: "relative" }}>
        <StyledJsxRegistry>
          {sideBarServerComponent}
          {children}
        </StyledJsxRegistry>
        <ToastContainer />
      </body>
    </html>
  );
}
