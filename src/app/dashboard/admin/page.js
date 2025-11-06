"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "../(components)/DashboardCard";
import BarChart from "../(components)/BarChart";
import LineChart from "../(components)/LineChart";
import PieChart from "../(components)/PieChart";


export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalUsers: 150,
    activeBranches: 12,
    totalDonations: 800,
    totalItems: 2000,
  });

  useEffect(() => {
    fetch("/api/summary")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.[0]) setMetrics(data[0]);
      })
      .catch(() => {
        console.log("Using local fallback metrics");
      });
  }, []);

  const summary = [
    { title: "Users", value: metrics.totalUsers },
    { title: "Branches", value: metrics.activeBranches },
    { title: "Donations", value: metrics.totalDonations },
    { title: "Items", value: metrics.totalItems },
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

  const donationsData = [
    { id: "D001", donor: "Steve Johnson", branch: "Manchester", items: "Clothes", status: "Completed" },
    { id: "D002", donor: "Penny Longing", branch: "London", items: "Books", status: "Completed" },
    { id: "D003", donor: "Ben Dover", branch: "Sheffield", items: "Toys", status: "Processing" },
    { id: "D004", donor: "Bruce Wayne", branch: "Manchester", items: "Coats", status: "Completed" },
    { id: "D005", donor: "Ethan Hunt", branch: "Birmingham", items: "Games", status: "Failed" },
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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <LineChart data={data} label="Continuous things" />
          </div>

          <div className="bg-white rounded-xl shadow p-5">
              <PieChart data={pieData} label="Pie Chart" />
          </div>
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
                  {donationsData.map((d) => (
                    <tr key={d.id} className="border-b last:border-none hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-900">{d.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{d.donor}</td>
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
