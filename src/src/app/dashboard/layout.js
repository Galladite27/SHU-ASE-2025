'use server'
import React from 'react';
import DashboardSidebar from './(components)/DashboardSidebar';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
// if no auth session found, redirect to sign-in page


export default async function DashboardLayout({ children }) {
  const { userId } = auth();
 
  console.log("User ID in DashboardLayout:", userId);
  
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
}
