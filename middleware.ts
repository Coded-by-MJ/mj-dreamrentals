import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPrivateRoute = createRouteMatcher([
  "/favorites",
  "/bookings",
  "/reviews",
  "/dashboard(.*)",
]);
const isOwnerRoute = createRouteMatcher([
  "/dashboard/rentals(.*)",
  "/dashboard/reservations",
  "/dashboard/messages",
]);

const isDashboardRoute = createRouteMatcher(["/dashboard"]);

const url = process.env.NEXT_PUBLIC_URL;

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (isPrivateRoute(req)) {
    await auth.protect();
  }

  if (isDashboardRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard/profile", req.url));
  }

  if (userId && isOwnerRoute(req)) {
    const urlWithParams = new URL(`${url}/api/checkUserType`);
    urlWithParams.searchParams.append("userId", userId);
    const res = await fetch(urlWithParams, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const { isUserAnOwner }: { isUserAnOwner: boolean } = await res.json();
    if (!isUserAnOwner) {
      return NextResponse.redirect(new URL("/dashboard/profile", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
