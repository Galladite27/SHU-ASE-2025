// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware({
//   publicRoutes: ["/", "/sign-up"],
// });

// export const config = {

//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

// middleware.js

// logic handle
// match route paths 
   // if path is /dashboardadmin/*
      // check user role
         // if role is not admin -> redirect to /dashboard


import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};