import React from 'react';
import DashboardSidebar from './(components)/DashboardSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
}
