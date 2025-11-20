"use client"
import React from 'react';

import DashboardCard from "../../../(components)/DashboardCard";
import BarChart from "../../../(components)/BarChart";
import LineChart from "../../../(components)/LineChart";
import PieChart from "../../../(components)/PieChart";

// --- DUMMY DATA FOR DONOR ---
const donorSummary = {
  totalDonations: 8,
  itemsDonated: 42,
  co2Saved: 35.7, 
};

const data = [
  { x: "Jan", y: 10 },
  { x: "Feb", y: 20 },
  { x: "Mar", y: 15 },
  { x: "Apr", y: 25 },
  { x: "May", y: 22 },
  { x: "Jun", y: 19 },
  { x: "Jul", y: 5 },
  { x: "Aug", y: 3 },
  { x: "Sept", y: 8 },
  { x: "Oct", y: 12 },
  { x: "Nov", y: 23 },
  { x: "Dec", y: 0 },
];

const carbonSavingsData = [
  { x: "Jan", y: 2 },
  { x: "Feb", y: 4 },
  { x: "Mar", y: 3 },
  { x: "Apr", y: 7 },
  { x: "May", y: 5 },
  { x: "Jun", y: 3.5 },
  { x: "Jul", y: 1.5 },
  { x: "Aug", y: 1 },
  { x: "Sept", y: 1.5},
  { x: "Oct", y: 2.5 },
  { x: "Nov", y: 4.5 },
  { x: "Dec", y: 0 },
];

// --- DONOR DASHBOARD COMPONENT ---
export default function DonorDashboardPage() {

  return (
    <main className="p-6 sm:p-8 bg-gray-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Impact</h1>
          <p className="text-gray-600 mt-1">Here's a summary of your impact. Thank you for contributing!</p>
        </div>
      </div>
      <p>You've had a great year! Here are all your donations, month by month.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-2">
        <BarChart data={data} label="Your Donation History" />
       <break></break>
      </div>
        <p>You've had your ups and downs but each month you've saved lots of Co2 emissions from being released into the environment!</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-2">
        <LineChart data={carbonSavingsData} label="Your Monthly Carbon Savings (g)" />
       <break></break>
      </div>
    </main>
  );
}