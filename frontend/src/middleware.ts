// import { getContextParams } from "@/core/utils/cache.utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const cache = getContextParams();
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  // Exclude `/sign-in` from redirection logic
  if (pathname === "/sign-in") {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (access_token) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin));
  }
}

// Configure matcher to apply middleware only to specific routes
export const config = {
  matcher: ["/((?!_next|api/).*)"], // Applies to all routes except static files and API routes
};
