// src/app/layout.js

import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* The {children} prop is where Next.js will render 
              your other pages, like your login page or dashboard. */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}