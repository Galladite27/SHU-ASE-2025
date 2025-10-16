import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Page() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn 
        afterSignInUrl="/dashboard" 
        signUpUrl="/sign-up" 
      />
    </main>
  );
}