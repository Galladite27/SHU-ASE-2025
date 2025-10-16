// src/app/page.js

import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Page() {
  // 1. Check if the user is already logged in
  const { userId } = auth();

  // 2. If they are, redirect them to the dashboard
  if (userId) {
    redirect("/dashboard");
  }

  // 3. If they are not logged in, show the sign-in page
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn 
        afterSignInUrl="/dashboard" 
        signUpUrl="/sign-up" 
      />
    </main>
  );
}