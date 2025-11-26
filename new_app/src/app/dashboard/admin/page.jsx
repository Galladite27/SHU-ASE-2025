"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "../(components)/DashboardCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const backupDonations = [
];

const userActivity = [
  { id: "USR-010", name: "Frank Castle", role: "Donor", activity: "Joined the platform", timestamp: "2 hours ago" },
  { id: "CHR-003", name: "Manchester Piccadilly Branch", role: "Charity", activity: "Updated stock levels", timestamp: "5 hours ago" },
  { id: "USR-002", name: "Bob Williams", role: "Donor", activity: "Made a new donation", timestamp: "Yesterday" },
];

// --- Component ---
export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeBranches: 0,
    totalDonations: 0,
    totalItems: 0,
  });

  const [history, setHistory] = useState(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await fetch("../../api/getSummaryMetrics");
        if (!res.ok) throw new Error("Failed to fetch summary metrics");
        const data = await res.json();
        setMetrics(data["summaryMetrics"]);
        setHistory(data["summaryHistory"])
      } catch (err) {
        console.error(err);
      }
    }
    loadMetrics();
  }, []);

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Donations",
        data: [100, 110, 95, 130, 170, 160],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.25,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Completed", "In Progress", "Failed"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: [
          "rgba(34,197,94,0.7)",
          "rgba(250,204,21,0.7)",
          "rgba(239,68,68,0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  //const summaryMetric = metrics || fallbackMetrics;
  const recentDonations = history || backupDonations;
  const summary = [
    { title: "Users", value: metrics.totalUsers },
    { title: "Branches", value: metrics.activeBranches },
    { title: "Donations", value: metrics.totalDonations },
    { title: "Items", value: metrics.totalItems },
  ];

  const activity = [
    { id: 1, name: "Frank Castle", role: "Donor", action: "Signed up", time: "2h ago" },
    { id: 2, name: "Manchester Branch", role: "Charity", action: "Updated stock", time: "5h ago" },
    { id: 3, name: "Bob Williams", role: "Donor", action: "Made a donation", time: "Yesterday" },
  ];


  return (
    <main className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-700 text-sm mt-1">Overview of platform stats</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {summary.map((s) => (
            <DashboardCard key={s.title} title={s.title} value={s.value.toLocaleString()} />
          ))}
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* Recent Donations */}
          <div className="bg-white p-5 rounded-xl shadow xl:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Donations</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3 text-gray-800">ID</th>
                    <th className="py-2 px-3 text-gray-800">Donor</th>
                    <th className="py-2 px-3 text-gray-800">Branch</th>
                    <th className="py-2 px-3 text-gray-800">Items</th>
                    <th className="py-2 px-3 text-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map((d) => (
                    <tr key={d.id} className="border-b last:border-none hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-900">{d.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{d.donorName}</td>
                      <td className="py-2 px-3 text-gray-900">{d.branch}</td>
                      <td className="py-2 px-3 text-gray-900">{d.items}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            d.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : d.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Activity */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h2>
            <ul className="space-y-4">
              {activity.map((a) => (
                <li key={a.id} className="flex items-start">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                      a.role === "Donor" ? "bg-blue-500" : "bg-indigo-500"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">{a.name}</p>
                    <p className="text-sm text-gray-800">{a.action}</p>
                    <p className="text-xs text-gray-700">{a.time}</p>
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