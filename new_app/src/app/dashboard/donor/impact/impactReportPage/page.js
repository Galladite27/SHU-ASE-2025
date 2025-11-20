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

const donationHistory = [
  { id: 'DON-001', charityName: 'Manchester Piccadilly Branch', items: '2 bags of clothes', status: 'Completed', date: '2025-10-15', impact: 'Saved 15.2 kg of CO₂' },
  { id: 'DON-002', charityName: 'London Oxford Street Branch', items: 'Box of children\'s books', status: 'Completed', date: '2025-09-21', impact: 'Promoted literacy' },
  { id: 'DON-003', charityName: 'Sheffield City Centre Branch', items: 'Used toys', status: 'Completed', date: '2025-08-10', impact: 'Brought joy to a child' },
  { id: 'DON-004', charityName: 'Manchester Piccadilly Branch', items: '3 winter coats', status: 'Completed', date: '2025-07-29', impact: 'Saved 20.5 kg of CO₂' },
  { id: 'DON-005', charityName: 'Birmingham Bullring Branch', items: 'Board games', status: 'Processing', date: '2025-10-16', impact: 'Pending' },
];

const data = [
  { x: 2010, y: 10 },
  { x: 2011, y: 20 },
  { x: 2012, y: 15 },
  { x: 2013, y: 25 },
  { x: 2014, y: 22 },
  { x: 2015, y: 30 },
  { x: 2016, y: 28 },
];

const pieData = [
  { name: "Bob", val: 12 },
  { name: "Billy", val: 20 },
  { name: "Brian", val: 7 },
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-2">
        <BarChart data={data} label="Your Donation History" />
        <p>Line chart for increasing donations over time</p>
       <break></break>
      </div>
    </main>
  );
}