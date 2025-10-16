// src/app/dashboard/admin/page.js

import React from 'react';
import DashboardCard from '../(components)/DashboardCard';

// --- DUMMY DATA ---
const summaryMetrics = {
  totalUsers: 152,
  activeBranches: 14, // Changed from charities to branches
  totalDonations: 789,
  totalItems: 2150, // Changed from value to items
};

const recentDonations = [
  { id: 'DON-001', donorName: 'Steve Johnson', charityName: 'Manchester Piccadilly Branch', items: '2 bags of clothes', status: 'Completed', date: '2025-10-15' },
  { id: 'DON-002', donorName: 'Penny Longing', charityName: 'London Oxford Street Branch', items: 'Box of children\'s books', status: 'Completed', date: '2025-10-15' },
  { id: 'DON-003', donorName: 'Ben Dover', charityName: 'Sheffield City Centre Branch', items: 'Used toys', status: 'Processing', date: '2025-10-14' },
  { id: 'DON-004', donorName: 'Bruce Wayne', charityName: 'Manchester Piccadilly Branch', items: '3 winter coats', status: 'Completed', date: '2025-10-13' },
  { id: 'DON-005', donorName: 'Ethan Hunt', charityName: 'Birmingham Bullring Branch', items: 'Board games', status: 'Failed', date: '2025-10-12' },
];

const userActivity = [
    { id: 'USR-010', name: 'Frank Castle', role: 'Donor', activity: 'Joined the platform', timestamp: '2 hours ago' },
    { id: 'CHR-003', name: 'Manchester Piccadilly Branch', role: 'Charity', activity: 'Updated stock levels', timestamp: '5 hours ago' },
    { id: 'USR-002', name: 'Bob Williams', role: 'Donor', activity: 'Made a new donation', timestamp: 'Yesterday' },
];

// --- ADMIN DASHBOARD COMPONENT ---
export default function AdminDashboardPage() {
  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Administrator Dashboard</h1>
          <p className="text-gray-600 mt-1">System-wide data and platform monitoring.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total Users" value={summaryMetrics.totalUsers.toLocaleString()} />
          <DashboardCard title="Active Branches" value={summaryMetrics.activeBranches.toLocaleString()} />
          <DashboardCard title="Total Donations" value={summaryMetrics.totalDonations.toLocaleString()} />
          <DashboardCard title="Total Items Donated" value={`${summaryMetrics.totalItems.toLocaleString()}`} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md xl:col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Donations Report</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-600">ID</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Donor</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Branch</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Items</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="py-3 px-4 text-gray-600">{donation.id}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium">{donation.donorName}</td>
                      <td className="py-3 px-4 text-gray-600">{donation.charityName}</td>
                      <td className="py-3 px-4 text-gray-800">{donation.items}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          donation.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent User Activity</h2>
            <ul className="space-y-4">
              {userActivity.map((activity) => (
                <li key={activity.id} className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${activity.role === 'Donor' ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.name}</p>
                    <p className="text-sm text-gray-500">{activity.activity}</p>
                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}