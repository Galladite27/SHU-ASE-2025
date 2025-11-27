"use client"
import React, { useEffect, useState } from "react";
import DashboardCard from '../../(components)/DashboardCard';

// --- DUMMY DATA FOR A SPECIFIC CHARITY BRANCH ---

// --- CHARITY DASHBOARD COMPONENT ---
export default function CharityDashboardPage() {
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
      async function loadMetrics() {
        try {
          const res = await fetch("../../../api/getStockLevel");
          if (!res.ok) throw new Error("Failed to fetch summary metrics");
          const data = await res.json();
          console.log(data)
          setMetrics(data);
        } catch (err) {
          console.error(err);
        }
      }
      loadMetrics();
    }, []);
  const stockLevels = metrics 

  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manchester Piccadilly Branch</h1>
          <p className="text-gray-600 mt-1">Manage inventory for this branch.</p>
        </div>

        {/* Stock Table */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Stock Levels</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Item</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Category</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stockLevels.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-2 sm:px-4 text-gray-800 font-medium">{item.itemName}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600">{item.category}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-800 font-semibold">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
