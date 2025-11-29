"use client"
import React, { useEffect, useState } from "react";
import DashboardCard from '../(components)/DashboardCard';

// --- DUMMY DATA FOR DONOR ---
// --- DONOR DASHBOARD COMPONENT ---
export default function DonorDashboardPage() {
    const [donorSummary, setSummary] = useState({
      totalDonations: 0,
      itemsDonated: 0,
      co2Saved: 0, 
    });
    const [donationHistory, setHistory] = useState([]);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await fetch("../../api/getDonorsInfo");
        if (!res.ok) throw new Error("Failed to fetch donor info");
        const data = await res.json();
        setSummary(data["donorsInfo"]);
        setHistory(data["donorsHistory"])
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
          <h1 className="text-3xl font-bold text-gray-800">Your Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's a summary of your contributions.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <DashboardCard title="Total Donations" value={donorSummary.totalDonations} />
          <DashboardCard title="Items Donated" value={donorSummary.itemsDonated} />
          <DashboardCard title="Sustainability Impact" value={`${donorSummary.co2Saved} kg of CO₂ Saved`} />
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Donation History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Date</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Branch</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Items</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Impact</th>
                  <th className="py-3 px-2 sm:px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donationHistory.map((donation) => (
                  <tr key={donation.id}>
                    <td className="py-3 px-2 sm:px-4 text-gray-600">{donation.Date_Donated}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-800 font-medium">{donation.charityName}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600">{donation.items}</td>
                    <td className="py-3 px-2 sm:px-4 text-gray-600">{donation.impact}</td>
                    <td className="py-3 px-2 sm:px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        donation.Status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {donation.Status}
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