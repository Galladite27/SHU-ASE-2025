import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

export default async function PostSignInPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch the full user object to access the role tag
  const user = await currentUser();
  
  // Access the role from publicMetadata
  const userRole = user?.publicMetadata?.role; 

  let destination = "/dashboard/admin"; // Default fallback route

  switch (userRole) {
    case 'admin':
      destination = "/dashboard/admin";
      break;
    case 'charity':
      destination = "/dashboard/charity";
      break;
    case 'donor':
      destination = "/dashboard/donor";
      break;
    default:
      destination = "/dashboard";
      break;
  }

  // Perform the server-side redirect
  redirect(destination);
}
