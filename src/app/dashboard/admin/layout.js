// src/app/dashboard/admin/layout.js

import React from 'react';

/**
 * This is the layout for the admin-specific section of the dashboard.
 * It will be nested inside the main dashboard layout.
 * The DashboardSidebar from the parent layout will still be visible.
 */
export default function AdminLayout({ children }) {
  // This function must be the default export and must accept { children } as a prop.
  return (
    <div className="w-full">
      {/*
        Optional: You can add a header or sub-navigation here that only
        appears on admin pages (/dashboard/admin, /dashboard/admin/users, etc.)
      */}
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">
          Admin Panel
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          System monitoring and user management
        </p>
      </header>
      
      {/*
        The {children} prop is required.
        This is where Next.js will render the content of your page.js file
        (e.g., the admin dashboard you created earlier).
      */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}