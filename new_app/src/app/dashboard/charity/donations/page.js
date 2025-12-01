"use client"
import React, { useEffect, useState } from "react";
import { setAcceptDonation } from "@/lib/setAccept"

export default function CharityManagerDonationsPage() {

  const [acceptDonation,setAccept] = useState("")
  const [incomingDonations, setIncoming] = useState([]);
    useEffect(() => {
      async function loadMetrics() {
        try {
          const res = await fetch("../../../api/getIncomingDonation");
          if (!res.ok) throw new Error("Failed to fetch IncomingDonation");
          const data = await res.json();
          setIncoming(data);
        } catch (err) {
          console.error(err);
        }
      }
      loadMetrics();
    }, []);

  async function testFunction (value,id){
    const res = await setAcceptDonation({value,id})
    alert(res?.error||res?.success)
  }

  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Incoming Donations</h1>
        <p className="text-gray-600 mb-8">Review and manage newly submitted donations.</p>

        <div className="space-y-4">
          {incomingDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white p-4 sm:p-5 rounded-xl shadow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{donation.item}</h2>
                <p className="text-sm text-gray-500">Donated by: {donation.user}</p>
                <p className="mt-2 text-gray-700">Description: {donation.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:justify-end">
                <button onClick = {() => testFunction("true",donation.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition" >
                  Accept
                </button>
                <button onClick = {() => testFunction("false",donation.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
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
