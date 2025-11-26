import React from "react";
import DashboardCard from "../(components)/DashboardCard";



const adminSummary = {
  totalUsers: 47,
  totalDonations: 112,
  totalItems: 386,
  co2Saved: 945.3, // kg
};

const systemWideStats = [
  {
    id: "SYS-001",
    label: "Active donors",
    value: 32,
    notes: "Most active in the last 30 days",
  },
  {
    id: "SYS-002",
    label: "Active charities",
    value: 7,
    notes: "2 new partners this term",
  },
  {
    id: "SYS-003",
    label: "Items currently in stock",
    value: 154,
    notes: "Mix of winter clothing and children’s items",
  },
];

const platformUsage = [
  {
    id: "USE-001",
    category: "Logins (last 7 days)",
    value: 39,
    notes: "Slight increase compared to the previous week",
  },
  {
    id: "USE-002",
    category: "New users (last 30 days)",
    value: 6,
    notes: "Mostly donors signing up via the homepage",
  },
  {
    id: "USE-003",
    category: "Donations created (last 30 days)",
    value: 24,
    notes: "Several larger “clear-out” donations",
  },
  {
    id: "USE-004",
    category: "Average items per donation",
    value: 4.8,
    notes: "Relatively consistent month-on-month",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin dashboard</h1>
          <p className="text-gray-600 mt-1">
            View of users, donations, and impact across the SustainWear platform.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total users" value={adminSummary.totalUsers} />
          <DashboardCard
            title="Total donations"
            value={adminSummary.totalDonations}
          />
          <DashboardCard
            title="Items donated"
            value={adminSummary.totalItems}
          />
          <DashboardCard
            title="Estimated CO₂ saved"
            value={`${adminSummary.co2Saved.toFixed(1)} kg`}
          />
        </div>

        {/* System-wide data */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            System-wide data overview
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            A summary of what’s happening across all branches. This will be connected
            to live data from the donations and inventory tables.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Value
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-600">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {systemWideStats.map((stat) => (
                  <tr key={stat.id}>
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {stat.label}
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-semibold">
                      {stat.value}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {stat.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reporting & platform usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reporting */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Reporting and exports
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
            This will be connected
            to live data from the donations and inventory tables.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
                type="button"
              >
                User report
              </button>
              <button
                className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                type="button"
              >
                Sustainability report
              </button>
              <button
                className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                type="button"
              >
                Download CSV
              </button>
            </div>
          </div>

          {/* Platform usage */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Platform usage
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Simple usage trends to help track how the platform is being used
              over time.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-600">
                      Category
                    </th>
                    <th className="py-3 px-4 font-semibold text-gray-600">
                      Value
                    </th>
                    <th className="py-3 px-4 font-semibold text-gray-600">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {platformUsage.map((row) => (
                    <tr key={row.id}>
                      <td className="py-3 px-4 text-gray-800 font-medium">
                        {row.category}
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">
                        {row.value}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {row.notes}
                      </td>
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
