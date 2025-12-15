"use client"
import React, { useEffect, useState } from "react";

import DashboardCard from "../../../(components)/DashboardCard";
import BarChart from "../../../(components)/BarChart";
import LineChart from "../../../(components)/LineChart";
import PieChart from "../../../(components)/PieChart";

// --- DUMMY DATA FOR DONOR ---

// --- DONOR DASHBOARD COMPONENT ---
export default function DonorDashboardPage() {
  const [DonationData, setDonations] = useState([
  { x: "Jan", y: 0 },
  { x: "Feb", y: 0 },
  { x: "Mar", y: 0 },
  { x: "Apr", y: 0 },
  { x: "May", y: 0 },
  { x: "Jun", y: 0 },
  { x: "Jul", y: 0 },
  { x: "Aug", y: 0 },
  { x: "Sept", y: 0 },
  { x: "Oct", y: 0 },
  { x: "Nov", y: 0 },
  { x: "Dec", y: 0 },
]);
  const [carbonSavingsData, setCarbon] = useState( [
  { x: "Jan", y: 0 },
  { x: "Feb", y: 0 },
  { x: "Mar", y: 0 },
  { x: "Apr", y: 0 },
  { x: "May", y: 0 },
  { x: "Jun", y: 0 },
  { x: "Jul", y: 0 },
  { x: "Aug", y: 0 },
  { x: "Sept", y: 0},
  { x: "Oct", y: 0 },
  { x: "Nov", y: 0 },
  { x: "Dec", y: 0 },
]);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await fetch("../../../api/getDonorImpactInfo");
        if (!res.ok) throw new Error("Failed to fetch summary metrics");
        const data = await res.json();
        setDonations(data["donationReport"])
        setCarbon(data["co2_report"])
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
          <h1 className="text-3xl font-bold">Your Impact</h1>
          <p className="text-gray-600 mt-1">Here's a summary of your impact. Thank you for contributing!</p>
        </div>
      </div>
      <p className="text-gray-700 mt-4 mb-4 max-w-7xl mx-auto text-sm sm:text-base">
        You've had a great year! Here are all your donations, month by month.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-4 md:px-8 mb-8">
        <BarChart data={DonationData} label="Your Donation History" />
      </div>
      <p className="text-gray-700 mt-4 mb-4 max-w-7xl mx-auto text-sm sm:text-base">
        You've had your ups and downs but each month you've saved lots of Co₂ emissions from being released into the environment!
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-4 md:px-8 mb-8">
        <LineChart data={carbonSavingsData} label="Your Monthly Carbon Savings (g)" />
      </div>
    </main>
  );
}