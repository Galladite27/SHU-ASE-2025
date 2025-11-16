
import './globals.css'

import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <h1>My App</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}