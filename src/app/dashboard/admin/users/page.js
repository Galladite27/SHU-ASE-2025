"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "../../(components)/DashboardCard";

export default function AdminDashboardPage() {
  const activity = [
    { id: 1, name: "Frank Castle", role: "Donor", action: "Signed up", time: "2h ago" },
    { id: 2, name: "Manchester Branch", role: "Charity", action: "Updated stock", time: "5h ago" },
    { id: 3, name: "Bob Williams", role: "Donor", action: "Made a donation", time: "Yesterday" },
  ];
  
  const users = [
    { id: 1, name: "Bob Williams", role: "Donor" },
    { id: 2, name: "Frank Castle", role: "Donor" },
    { id: 3, name: "Manchester Branch", role: "Charity" },
  ];

  return (
    <main className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-700 text-sm mt-1">Overview of platform stats</p>
        </header>

        {/* User Activity */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">User listings</h2>
          <button className="rounded-xl p-1 shadow-sm mb-4 text-blue-500 hover:text-gray-900 hover:cursor-pointer" onClick={console.log}>Add User</button>
          <ul className="space-y-4">
            {users.map((a) => (
              <li key={a.id} className="flex items-start">
                <div
                  className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                    a.role === "Donor" ? "bg-blue-500" : "bg-indigo-500"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-gray-900">{a.id} - {a.name}</p>
                  <button className="rounded-xl p-1 shadow-sm text-blue-500 hover:text-gray-900 hover:cursor-pointer" onClick={console.log}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
