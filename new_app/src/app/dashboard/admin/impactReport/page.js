"use client";

import React, { useEffect, useState } from "react";

import BarChart from "../../(components)/BarChart";
import LineChart from "../../(components)/LineChart";
import PieChart from "../../(components)/PieChart";

// --- DUMMY DATA FOR DONOR ---

// --- DONOR DASHBOARD COMPONENT ---
export default function DonorDashboardPage() {
  const [donorSummary, setSummary] = useState({
    usersPerMonth: 0,
    donationsPerMonth: 0,
    totalCo2Saved: 0,
  });
  
    const [Co2data,setCo2] = useState([{ x: "MON", y: 12 },
    { x: "TUE", y: 16 },
    { x: "WED", y: 18 },
    { x: "THURS", y: 9 },
    { x: "FRI", y: 15 },
    { x: "SAT", y: 8 },
    { x: "SUN", y: 19 },])

    const [donationData,setDonation] = useState([
  { x: "MON", y: 33 },
  { x: "TUE", y: 38 },
  { x: "WED", y: 39 },
  { x: "THURS", y: 32 },
  { x: "FRI", y: 39 },
  { x: "SAT", y: 25 },
  { x: "SUN", y: 45 },
])
  
    useEffect(() => {
      async function loadMetrics() {
        try {
          const res = await fetch("../../api/getAdminImpactReport");
          if (!res.ok) throw new Error("Failed to fetch summary metrics");
          const data = await res.json();
          setSummary(data["weeklySummary"]);
          setCo2(data["co2Data"])
          setDonation(data["donationData"])
        } catch (err) {
          console.error(err);
        }
      }
      loadMetrics();
    }, []);
  return (
    <main className="p-6 sm:p-8 bg-gray-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Weekly Impact Statement</h1>
          <p className="text-gray-600 mt-1">
            Thanks for being an amazing part of our mission! Here's a friendly snapshot of the impact you've made this week.
          </p>
        </div>

        {/* --- WEEKLY HIGHLIGHTS BOX --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">New Users</h3>
            <p className="text-2xl font-bold">{donorSummary.usersPerMonth}</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Donations This Week</h3>
            <p className="text-2xl font-bold">{donorSummary.donationsPerMonth}</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Total Co2 Saved</h3>
            <p className="text-2xl font-bold">{donorSummary.totalCo2Saved} kg</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-4 md:px-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-1">Donations Per Day</h2>
          <p className="text-gray-600 mb-4">
            Here's your weekly breakdown of donations.
          </p>
          <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 max-w-full overflow-hidden">
            <BarChart data={donationData} label="Donations Per Day" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">Co2 Savings This Week</h2>
          <p className="text-gray-600 mb-4">
           The donations received help make a huge difference to the environment every single day!
          </p>
          <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 max-w-full overflow-hidden">
            <LineChart data={Co2data} label="Weekly Co₂ Savings" />
          </div>
        </div>
      </div>
    </main>
  );
}