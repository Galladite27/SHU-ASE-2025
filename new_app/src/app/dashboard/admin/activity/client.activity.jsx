'use client';

import React, { useState } from "react";
import DashboardCard from "../../(components)/DashboardCard";
import { updateUserDetailsAction } from "../users/actions";

export default function ActivityPageClient({ initialUsers }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const users = initialUsers.map(user => {
    const email = user.emailAddresses?.[0]?.emailAddress || "";
    const fullName =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.fullName || "";

    return {
      id: user.id,
      donorName: fullName,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      location: user.publicMetadata?.location || "",
      email,
      role: user.publicMetadata?.role || "none",
      createdAt: new Date(user.createdAt),
    };
  });

  // Count users created today
  const today = new Date();
  const newUsersTodayCount = users.filter(u => {
    const c = u.createdAt;
    return (
      c.getDate() === today.getDate() &&
      c.getMonth() === today.getMonth() &&
      c.getFullYear() === today.getFullYear()
    );
  }).length;

  const adminSummary = {
    newUsersToday: newUsersTodayCount,
    staffMembers: users.filter(u => u.role?.toLowerCase() === "admin").length,
    donationsThisMonth: 122,
  };

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
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Recent Activity</h1>
        <p className="text-gray-600 mt-1">Monitor real-time user activity.</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="New Users Today" value={adminSummary.newUsersToday} />
        <DashboardCard title="Total Admin Staff" value={adminSummary.staffMembers} />
        <DashboardCard title="Donations this month" value={adminSummary.donationsThisMonth} />
      </div>

      {/* USERS TABLE */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">New Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Location</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-4 text-black font-medium">{user.donorName}</td>
                  <td className="py-3 px-4 text-gray-600">{user.location}</td>

                  <td className="py-3 px-4 flex gap-2">
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

      {/* VIEW MODAL */}
      {isViewOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
            <h2 className="text-xl font-bold mb-4">User Details</h2>

            <p><strong>Name:</strong> {selectedUser.donorName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Location:</strong> {selectedUser.location}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>

            <button
              onClick={closeModals}
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
            <h2 className="text-xl font-bold mb-4">Edit User Details</h2>

            <form action={updateUserDetailsAction} className="space-y-3">
              {/* Required */}
              <input type="hidden" name="userId" value={selectedUser.id} />

              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  name="firstName"
                  defaultValue={selectedUser.firstName}
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  name="lastName"
                  defaultValue={selectedUser.lastName}
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  defaultValue={selectedUser.email}
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  name="location"
                  defaultValue={selectedUser.location}
                  className="w-full border p-2 rounded text-black"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  name="location"
                  defaultValue={selectedUser.location}
                  className="w-full border p-2 rounded text-black"
                >
                  <option value="">Select a city</option>
                  <option>London</option>
                  <option>Manchester</option>
                  <option>Birmingham</option>
                  <option>Leeds</option>
                  <option>Sheffield</option>
                  <option>Liverpool</option>
                  <option>Newcastle</option>
                  <option>Nottingham</option>
                  <option>Bristol</option>
                  <option>Cardiff</option>
                  <option>Glasgow</option>
                  <option>Edinburgh</option>
                  <option>Leicester</option>
                  <option>Coventry</option>
                  <option>Reading</option>
                </select>
              </div>


              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  defaultValue={selectedUser.role}
                  className="w-full border p-2 rounded text-black"
                >
                  <option value="none">None</option>
                  <option value="donor">Donor</option>
                  <option value="charity">Charity</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={closeModals}
                className="w-full bg-gray-800 text-white py-2 rounded"
              >
                Cancel
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
