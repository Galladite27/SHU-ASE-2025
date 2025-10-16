// src/middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // By listing the sign-in and sign-up routes as public,
  // Clerk will automatically protect all other routes.
  publicRoutes: ["/", "/sign-up"],
});

export const config = {
  // This matcher ensures the middleware runs on all routes
  // except for static files (like images or CSS) and Next.js internals.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};