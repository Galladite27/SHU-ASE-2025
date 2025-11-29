"use client"
import React, { useEffect, useState } from "react";
import DashboardCard from '../(components)/DashboardCard';

// --- DUMMY DATA FOR A SPECIFIC CHARITY BRANCH ---

// --- CHARITY DASHBOARD COMPONENT ---
export default function CharityDashboardPage() {
    const [charitySummary, setSummary] = useState({pendingDonations: 0,itemsInStock: 0,donorsThisMonth: 0,});
    const [incomingDonations, setIncoming] = useState([]);
  
    useEffect(() => {
      async function loadMetrics() {
        try {
          const res = await fetch("/api/getCharityInfo");
          if (!res.ok) throw new Error("Failed to fetch charitys information");
          const data = await res.json();
          console.log(data)
          setSummary(data["charitySummary"]);
          setIncoming(data["incomingDonations"])
        } catch (err) {
          console.error(err);
        }
      }
      loadMetrics();
    }, []);
  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manchester Piccadilly Branch</h1>
          <p className="text-gray-600 mt-1">Monitor donations for this branch.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <DashboardCard title="Pending Donations" value={charitySummary.pendingDonations} />
          <DashboardCard title="Total Items in Stock" value={charitySummary.itemsInStock} />
          <DashboardCard title="Donors This Month" value={charitySummary.donorsThisMonth} />
        </div>

        {/* Donations Table */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Incoming Donations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Donor</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Items</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {incomingDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="py-3 px-2 sm:px-4 text-gray-800 font-medium">{donation.donorName}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600">{donation.items}</td>
                    <td className="py-3 px-2 sm:px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        donation.status === 'Processing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {donation.status}
                      </span>
                    </td>
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
/*
*/
