// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware({
//   publicRoutes: ["/", "/sign-up"],
// });

// export const config = {

//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

// middleware.js

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Ensure the intermediate route is public
  publicRoutes: ["/", "/sign-up", "/post-sign-in"], 
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
