import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdmin = token?.role === 'admin';
    const isAuthPage = req.nextUrl.pathname.startsWith("/signin") || 
                      req.nextUrl.pathname.startsWith("/signup");
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    if (isAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isAuth && !isAuthPage) {
      const from = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/signin?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/signin",
    "/signup",
    "/checkout/:path*",
    "/orders/:path*"
  ],
};