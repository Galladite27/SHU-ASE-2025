import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/sign-up"],
});

export const config = {

  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};