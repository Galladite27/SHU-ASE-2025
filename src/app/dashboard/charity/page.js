import React from 'react';
import DashboardCard from '../(components)/DashboardCard';

// --- DUMMY DATA FOR A SPECIFIC CHARITY BRANCH ---
const charitySummary = {
  pendingDonations: 3,
  itemsInStock: 256,
  donorsThisMonth: 18,
};

const incomingDonations = [
  { id: 'INC-101', donorName: 'Alice Johnson', items: '2 bags of clothes', date: '2025-10-16', status: 'Pending Pickup' },
  { id: 'INC-102', donorName: 'Charlie Brown', items: 'Winter Coats (5)', date: '2025-10-15', status: 'Received' },
  { id: 'INC-103', donorName: 'Diana Prince', items: 'Box of children\'s books', date: '2025-10-15', status: 'Pending Pickup' },
  { id: 'INC-104', donorName: 'Bob Williams', items: 'Used toys', date: '2025-10-14', status: 'Received' },
  { id: 'INC-105', donorName: 'Ethan Hunt', items: 'Board games (1 box)', date: '2025-10-14', status: 'Pending Pickup' },
];

const stockLevels = [
  { id: 'STK-01', itemName: 'Children\'s Books', quantity: 72, category: 'Books' },
  { id: 'STK-02', itemName: 'Winter Coats (Adult)', quantity: 25, category: 'Clothing' },
  { id: 'STK-03', itemName: 'Board Games', quantity: 50, category: 'Toys' },
  { id: 'STK-04', itemName: 'T-Shirts (Mixed Sizes)', quantity: 109, category: 'Clothing' },
];

// --- CHARITY DASHBOARD COMPONENT ---
export default function CharityDashboardPage() {
  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manchester Piccadilly Branch</h1>
          <p className="text-gray-600 mt-1">Monitor donations and manage inventory for this branch.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Pending Donations" value={charitySummary.pendingDonations} />
          <DashboardCard title="Total Items in Stock" value={charitySummary.itemsInStock} />
          <DashboardCard title="Donors This Month" value={charitySummary.donorsThisMonth} />
        </div>

        {/* Donations & Stock Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Incoming Donations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Incoming Donations</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-600">Donor</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Items</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {incomingDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="py-3 px-4 text-gray-800 font-medium">{donation.donorName}</td>
                      <td className="py-3 px-4 text-gray-600">{donation.items}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          donation.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
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

          {/* Current Stock Levels */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Stock Levels</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-600">Item</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Category</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stockLevels.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-4 text-gray-800 font-medium">{item.itemName}</td>
                      <td className="py-3 px-4 text-gray-600">{item.category}</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}