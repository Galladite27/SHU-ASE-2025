"use client"
import React, { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  // This function must be the default export and must accept { children } as a prop.
  const [locationName, setName] = useState("");
      useEffect(() => {
        async function loadMetrics() {
          try {
            const res = await fetch("../../api/getStockLevel");
            if (!res.ok) throw new Error("Failed to fetch Name");;
            const data = await res.json();
            setName(data["locationName"]);
          } catch (err) {
            console.error(err);
          }
        }
        loadMetrics();
      }, []);
  return (
    <div className="w-full">

      <header className="bg-white border-b border-gray-200 p-4 sm:p-6 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">
          Charity Panel - {locationName.Name} Branch
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Donations and Inventory Management
        </p>
      </header>

      <main className="flex-grow p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
