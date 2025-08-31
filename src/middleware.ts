// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public (unauthenticated) routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/shop",
  "/where-to-buy",
  "/creators",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/newsletter(.*)",
  "/api/checkout(.*)",
  "/api/(.*)",
  "/account", // account page does its own redirect if not signed in
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip public routes
  if (isPublicRoute(req)) return;

  // Works across Clerk versions
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    // Ensure we send people back to where they were going
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

// Run on app routes & API routes, but skip static assets/_next
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
