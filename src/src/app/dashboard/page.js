'use server'

import { auth } from "@clerk/nextjs/server";

export default async function DashboardLayout({ children }) {
  const session = auth()
  return (
    <div>
      { JSON.stringify(session) }
    </div>

  );
}