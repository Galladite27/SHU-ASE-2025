import React from 'react';

export default function AdminLayout({ children }) {
  // This function must be the default export and must accept { children } as a prop.
  return (
    <div className="w-full">

      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">
          Admin Panel
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          System monitoring and user management
        </p>
      </header>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}