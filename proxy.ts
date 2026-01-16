import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { checkServer } from "./lib/api/serverApi";

const privateRoutes = ["/notes", "/profile"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (!isPrivateRoute && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const res = await checkServer();

    const setCookies = res.headers["set-cookie"];

    if (setCookies) {
      const cookieArr = Array.isArray(setCookies) ? setCookies : [setCookies];

      for (const cookie of cookieArr) {
        const parsedCookie = parse(cookie);

        const options = {
          expires: parsedCookie.Expires
            ? new Date(parsedCookie.Expires)
            : undefined,
          path: parsedCookie.Path,
          maxAge: Number(parsedCookie["Max-Age"]),
        };

        if (parsedCookie.accessToken) {
          cookieStore.set("accessToken", parsedCookie.accessToken, options);
        }

        if (parsedCookie.refreshToken) {
          cookieStore.set("refreshToken", parsedCookie.refreshToken, options);
        }
      }

      return NextResponse.next({
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
    }
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/notes", "/profile"],
};
