import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select
export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    if (!request.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (
      pathname.startsWith("/dashboard") &&
      request.nextauth.token.role.name === "Usuario"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:patch*", "/profile/:patch*"],
};
