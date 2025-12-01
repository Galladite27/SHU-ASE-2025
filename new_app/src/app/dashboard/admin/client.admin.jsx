"use client";

import React, { useEffect, useState, useMemo } from "react";
import DashboardCard from "../(components)/DashboardCard";

function formatRelativeTime(date) {
  if (!date) return "";
  const now = new Date();
  const diff = now - date;
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (min < 1) return "Just now";
  if (hr < 1) return `${min} min ago`;
  if (day < 1) return `${hr} h ago`;
  if (day === 1) return "Yesterday";
  return `${day} days ago`;
}

export default function AdminDashboardPageClient({ initialUsers }) {
  const [recentDonations, setRecentDonations] = useState([]); 
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
  });

  useEffect(() => {
    async function loadDonations() {
      try {
        const res = await fetch("/api/getRealDonations");
        const text = await res.text();

        console.log("Donations API raw response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Failed to parse donations JSON");
          data = [];
        }

        if (!Array.isArray(data)) {
          console.warn("Donations API returned non-array:", data);
          setRecentDonations([]);
        } else {
          setRecentDonations(data);
        }
      } catch (err) {
        console.error("Failed to load donations:", err);
        setRecentDonations([]);
      }
    }
    loadDonations();
  }, []);

  const users = useMemo(
    () =>
      (initialUsers || []).map((user) => {
        const email = user.emailAddresses?.[0]?.emailAddress || "";
        const role = user.publicMetadata?.role || "none";
        const fullName =
          (user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.fullName) || email;

        return {
          id: user.id,
          name: fullName,
          email,
          role,
          location: user.publicMetadata?.location || "Unknown",
          createdAt: user.createdAt ? new Date(user.createdAt) : null,
        };
      }),
    [initialUsers]
  );

  const totalUsers = users.length;
  const totalDonors = users.filter((u) => u.role === "donor").length;
  const totalCharities = users.filter((u) => u.role === "charity").length;

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

  const recentUserActivity = [...users]
    .filter((u) => u.createdAt)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map((u, idx) => ({
      id: idx,
      name: u.name,
      role: u.role === "none" ? "Unassigned" : u.role,
      action: "Signed up",
      time: formatRelativeTime(u.createdAt),
    }));

  // SUMMARY CARDS
  const summaryCards = [
    { title: "Total Users", value: totalUsers },
    { title: "New Users Today", value: newUsersToday },
    { title: "Total Donors", value: totalDonors },
    { title: "Total Charities", value: totalCharities },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-700 text-sm mt-1">
          Overview of platform statistics and user activity.
        </p>
      </header>

      {/* SUMMARY CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value.toLocaleString()}
          />
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* RECENT DONATIONS */}
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
                  <th className="py-2 px-2 sm:px-3 text-gray-800">Role</th>
                  <th className="py-2 px-2 sm:px-3 text-gray-800">Location</th>
                  <th className="py-2 px-2 sm:px-3 text-gray-800">Status</th>
                </tr>
              </thead>

              <tbody>
                {(recentDonations ?? []).map((d) => (
                  <tr
                    key={d.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2 px-2 sm:px-3 text-gray-900">{d.id}</td>
                    <td className="py-2 px-2 sm:px-3 font-medium text-gray-900">
                      {d.donorName}
                    </td>
                    <td className="py-2 px-2 sm:px-3">{d.role}</td>
                    <td className="py-2 px-2 sm:px-3">{d.location}</td>
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

                {(recentDonations ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 text-center text-gray-500"
                    >
                      No recent donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* USER ACTIVITY */}
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            User Activity
          </h2>

          <ul className="space-y-4">
            {recentUserActivity.map((a) => (
              <li key={a.id} className="flex items-start">
                <div
                  className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                    a.role === "donor"
                      ? "bg-blue-500"
                      : a.role === "charity"
                      ? "bg-purple-500"
                      : a.role === "admin"
                      ? "bg-green-500"
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
                No recent user activity.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

