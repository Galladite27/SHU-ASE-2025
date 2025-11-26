'use client';

import React, { useState } from 'react';
import DashboardCard from '../../(components)/DashboardCard';

const adminSummary = {
  newUsersToday: 3,
  staffMembers: 22,
  donationsThisMonth: 122,
};

const newUsersToday = [
  { id: 'INC-101', donorName: 'Alice Johnson', location: 'Reading', email: 'alice@example.com', phone: '07700 111111' },
  { id: 'INC-102', donorName: 'Charlie Brown', location: 'Leicester', email: 'charlie@example.com', phone: '07700 222222' },
  { id: 'INC-103', donorName: 'Diana Prince', location: 'Sheffield', email: 'diana@example.com', phone: '07700 333333' },
  { id: 'INC-104', donorName: 'Bob Williams', location: 'Manchester', email: 'bob@example.com', phone: '07700 444444' },
  { id: 'INC-105', donorName: 'Ethan Hunt', location: 'London', email: 'ethan@example.com', phone: '07700 555555' },
];

export default function CharityDashboardPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openViewModal = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const closeModals = () => {
    setIsViewOpen(false);
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manchester Piccadilly Branch</h1>
          <p className="text-gray-600 mt-1">Monitor donations for this branch.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* <DashboardCard title="New Users today" value={adminSummary.newUsersToday} />
          <DashboardCard title="Total Staff" value={adminSummary.staffMembers} />
          <DashboardCard title="Donations this month" value={adminSummary.donationsThisMonth} /> */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">New Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-600">Donor</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Location</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {newUsersToday.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 px-4 text-gray-800 font-medium">{user.donorName}</td>
                    <td className="py-3 px-4 text-gray-600">{user.location}</td>
                    <td className="py-3 px-4 flex gap-3">
                      <button
                        onClick={() => openViewModal(user)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isViewOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <p><strong>Name:</strong> {selectedUser.donorName}</p>
              <p><strong>Location:</strong> {selectedUser.location}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>

              <button
                onClick={closeModals}
                className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isEditOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
              <h2 className="text-xl font-bold mb-4">Edit User Details</h2>

              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                defaultValue={selectedUser.donorName}
                className="w-full border p-2 rounded mb-3 text-black"
              />

              <label className="block mb-2 text-sm font-medium">Location</label>
              <input
                defaultValue={selectedUser.location}
                className="w-full border p-2 rounded mb-3 text-black"
              />

              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                defaultValue={selectedUser.email}
                className="w-full border p-2 rounded mb-3 text-black"
              />

              <label className="block mb-2 text-sm font-medium">Phone</label>
              <input
                defaultValue={selectedUser.phone}
                className="w-full border p-2 rounded mb-3 text-black"
              />

              <button className="w-full bg-green-600 text-white py-2 rounded mb-2">
                Save Changes
              </button>

              <button
                onClick={closeModals}
                className="w-full bg-gray-800 text-white py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

