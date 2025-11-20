import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


// /dashboard/admin
// /dashboard/charity 
// /dashboard/donor

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)'])

const isAdminRoute = createRouteMatcher(['/dashboard/admin(.*)'])
const isCharityRoute = createRouteMatcher(['/dashboard/charity(.*)'])
const isDonorRoute = createRouteMatcher(['/dashboard/donor(.*)'])


export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth()
  
  if (isDashboardRoute(req)) {
    await auth.protect()
  }

  // Restrict access to charity routes
  if (isCharityRoute(req) && sessionClaims?.metadata?.role !== 'charity') {
    const url = new URL( `/dashboard/${sessionClaims?.metadata?.role}`, req.url)
    return NextResponse.redirect(url)
  }
  
  // Restrict access to donor routes
  if (isDonorRoute(req) && sessionClaims?.metadata?.role !== 'donor') {
    const url = new URL( `/dashboard/${sessionClaims?.metadata?.role}`, req.url)
    return NextResponse.redirect(url)
  }
  
  // Restrict access to admin routes
  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL( `/dashboard/${sessionClaims?.metadata?.role}`, req.url)
    return NextResponse.redirect(url)
  }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
