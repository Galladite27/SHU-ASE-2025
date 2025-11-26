"use client"
import React, { useEffect, useState } from "react";

export default function CharityManagerDonationsPage() {
  const incomingDonations = [
    {
      id: 1,
      user: "Alice Johnson",
      item: "Jeans",
      description: "Thick Cotton. Only worn a handful of times, like new.",
    },
    {
      id: 2,
      user: "Charlie Brown",
      item: "Jumper",
      description: "Christmas Jumper. Worn many times but still in very good condition.",
    },
    {
      id: 3,
      user: "Diana Prince",
      item: "Green Dress",
      description: "Green dress. Bought for an occasion. Only worn once!",
    },
    {
      id: 4,
      user: "Bob Williams",
      item: "Blue Jacket",
      description: "Bought by my mother-in-law. New, only worn once briefly.",
    },
    {
      id: 5,
      user: "Ethan Hunt",
      item: "Grey Jeans",
      description: "Well worn, much-loved. Need these to go to a better home.",
    },
  ];

const [metrics, setMetrics] = useState([]);
  useEffect(() => {
      async function loadMetrics() {
        try {
          const res = await fetch("../../../api/getStockLevel");
          if (!res.ok) throw new Error("Failed to fetch summary metrics");
          const data = await res.json();
          console.log(data)
          setMetrics(data);
        } catch (err) {
          console.error(err);
        }
      }
      loadMetrics();
    }, []);

  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Incoming Donations</h1>
        <p className="text-gray-600 mb-8">Review and manage newly submitted donations.</p>

        <div className="space-y-4">
          {incomingDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white p-5 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{donation.item}</h2>
                <p className="text-sm text-gray-500">Donated by: {donation.user}</p>
                <p className="mt-2 text-black-700">Description: {donation.description}</p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Accept
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
