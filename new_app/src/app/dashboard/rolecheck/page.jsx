// app/redirect/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function RedirectPage() {
  const { sessionClaims } = await auth()

  // if no role exists -> assign role to them.
  
  // Get role from session claims
  const role = sessionClaims?.metadata?.role
  
  // Redirect based on role
  if (role === 'admin') {
    redirect('/dashboard/admin')
  }
  
  if (role === 'donor') {
    redirect('/dashboard/donor')
  }
  
  // Default redirect for regular users
  redirect('/dashboard/charity')
}