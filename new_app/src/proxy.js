import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)'])
const isAdminRoute = createRouteMatcher(['/dashboard/admin(.*)'])
const isCharityRoute = createRouteMatcher(['/dashboard/charity(.*)'])
const isDonorRoute = createRouteMatcher(['/dashboard/donor(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth()
  
  if (isDashboardRoute(req)) {
    await auth.protect()
  }

  if (isCharityRoute(req) && sessionClaims?.metadata?.role !== 'charity') {
    return NextResponse.redirect(new URL(`/dashboard/${sessionClaims?.metadata?.role}`, req.url))
  }

  if (isDonorRoute(req) && sessionClaims?.metadata?.role !== 'donor') {
    return NextResponse.redirect(new URL(`/dashboard/${sessionClaims?.metadata?.role}`, req.url))
  }

  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== 'admin') {
    return NextResponse.redirect(new URL(`/dashboard/${sessionClaims?.metadata?.role}`, req.url))
  }
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
