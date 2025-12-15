"use client";

import React, { useEffect, useState, useMemo } from "react";
import DashboardCard from "../(components)/DashboardCard";

function formatRelativeTime(date) {
  if (!date) return "";
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffHr < 1) return `${diffMin} min ago`;
  if (diffDay < 1) return `${diffHr} h ago`;
  if (diffDay === 1) return "Yesterday";
  return `${diffDay} days ago`;
}

export default function AdminDashboardPageClient({ initialUsers }) {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeBranches: 0,
    totalDonations: 0,
    totalItems: 0,
  });
  const [recentDonations, setRecentDonations] = useState([]);

  // Load donation metrics + history from your existing API
  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await fetch("/api/getSummaryMetrics");
        if (!res.ok) throw new Error("Failed to fetch summary metrics");
        const data = await res.json();
        setMetrics(data["summaryMetrics"]);
        setRecentDonations(data["summaryHistory"]);
      } catch (err) {
        console.error(err);
      }
    }
    loadMetrics();
  }, []);

  const users = useMemo(
    () =>
      (initialUsers || []).map((user) => {
        const email = user.emailAddresses?.[0]?.emailAddress || "";
        const role = user.publicMetadata?.role || "none";
        const fullName =
          (user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.fullName) || email || "Unknown user";

        return {
          id: user.id,
          name: fullName,
          email,
          role,
          createdAt: user.createdAt ? new Date(user.createdAt) : null,
        };
      }),
    [initialUsers]
  );

  // User statistics
  const totalUsers = users.length;
  const totalAdmins = users.filter(
    (u) => u.role?.toLowerCase() === "admin"
  ).length;
  const totalDonors = users.filter(
    (u) => u.role?.toLowerCase() === "donor"
  ).length;
  const totalCharities = users.filter(
    (u) => u.role?.toLowerCase() === "charity"
  ).length;

  // New users today (based on createdAt)
  const today = new Date();
  const newUsersToday = users.filter((u) => {
    if (!u.createdAt) return false;
    const d = u.createdAt;
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }).length;

  // Activity: latest signups (top 5 newest users)
  const recentUserActivity = [...users]
    .filter((u) => u.createdAt)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map((u, idx) => ({
      id: idx,
      name: u.name,
      role:
        u.role === "none"
          ? "Unassigned"
          : u.role.charAt(0).toUpperCase() + u.role.slice(1),
      action: "Signed up",
      time: formatRelativeTime(u.createdAt),
    }));

  // Summary cards (mix of user + donation metrics)
  const summaryCards = [
    { title: "Total Users", value: totalUsers },
    { title: "New Users Today", value: newUsersToday },
    { title: "Total Charities", value: totalCharities || 0 },
    { title: "Total Donors", value: totalDonors || 0 },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-700 text-sm mt-1">
          Overview of platform stats and recent activity.
        </p>
      </header>

      {/* SUMMARY CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((s) => (
          <DashboardCard
            key={s.title}
            title={s.title}
            value={
              typeof s.value === "number"
                ? s.value.toLocaleString()
                : String(s.value)
            }
          />
        ))}
      </div>

      {/* MAIN GRID: Recent Donations + User Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Donations */}
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow xl:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Donations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2 sm:px-3 text-gray-800">ID</th>
                  <th className="py-2 px-2 sm:px-3 text-gray-800">Donor</th>
                  <th className="py-2 px-2 sm:px-3 text-gray-800">Branch</th>
                  <th className="py-2 px-2 sm:px-3 text-gray-800">Items</th>
                  <th className="py-2 px-2 sm:px-3 text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2 px-2 sm:px-3 text-gray-900">
                      {d.id}
                    </td>
                    <td className="py-2 px-2 sm:px-3 font-medium text-gray-900">
                      {d.donorName}
                    </td>
                    <td className="py-2 px-2 sm:px-3 text-gray-900">
                      {d.branch}
                    </td>
                    <td className="py-2 px-2 sm:px-3 text-gray-900">
                      {d.items}
                    </td>
                    <td className="py-2 px-2 sm:px-3">
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

                {recentDonations.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 text-center text-gray-500"
                    >
                      No recent donations yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            User Activity
          </h2>
          <ul className="space-y-4">
            {recentUserActivity.map((a) => (
              <li key={a.id} className="flex items-start">
                <div
                  className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                    a.role === "Donor"
                      ? "bg-blue-500"
                      : a.role === "Charity"
                      ? "bg-indigo-500"
                      : a.role === "Admin"
                      ? "bg-emerald-500"
                      : "bg-gray-400"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-gray-900">{a.name}</p>
                  <p className="text-sm text-gray-800">
                    {a.action} · <span className="italic">{a.role}</span>
                  </p>
                  <p className="text-xs text-gray-700">{a.time}</p>
                </div>
              </li>
            ))}

            {recentUserActivity.length === 0 && (
              <p className="text-sm text-gray-500">
                No recent user activity yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
