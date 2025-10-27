"use client"
import React from 'react';
import DashboardCard from '../../(components)/DashboardCard';
import BarChart from "../../(components)/BarChart";

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
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
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
        <BarChart data={data} />
        <p>Line chart for increasing donations over time, increasing carbon savings over time, a list of comparisons showing equivalent carbon savings (e.g. plastic cups saved)</p>
      </div>
    </main>
  );
}

/*
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  <DashboardCard title="Total Donations" value={donorSummary.totalDonations} />
  <DashboardCard title="Items Donated" value={donorSummary.itemsDonated} />
  <DashboardCard title="Sustainability Impact" value={`${donorSummary.co2Saved} kg of CO₂ Saved`} />
</div>
*/
