"use client";

import { useState, useTransition } from "react";
import {
  updateUserRoleAction,
  deleteUserAction,
  createUserAction,
} from "./actions";

export default function UsersPageClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  //NEW USER FORM
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("donor");

  // UPDATE ROLE
  const updateRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, publicMetadata: { role: newRole } } : u
      )
    );

    startTransition(async () => {
      const fd = new FormData();
      fd.append("userId", userId);
      fd.append("role", newRole);
      await updateUserRoleAction(fd);
    });
  };

  // DELETE USER
  const deleteUser = (userId) => {
    startTransition(async () => {
      const fd = new FormData();
      fd.append("userId", userId);
      await deleteUserAction(fd);

      setUsers((prev) => prev.filter((u) => u.id !== userId));
    });
  };

  // DOWNLOAD CSV
  const downloadCsv = () => {
    if (!users || users.length === 0) return alert("No users to export.");

    const header = ["id", "email", "role"];

    const rows = users.map((u) => [
      u.id,
      u.emailAddresses?.[0]?.emailAddress || "No email",
      u.publicMetadata?.role || "none",
    ]);

    const csvString = [header, ...rows]
      .map((row) =>
        row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users-report.csv";
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-3xl font-bold">User Management</h1>

        <button
          onClick={downloadCsv}
          className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Download CSV
        </button>
      </div>

      {/* CREATE USER FORM */}
      <div className="p-4 border rounded bg-white shadow">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900 w-full"
        >
          {/* Added the new database from Theo because it didn't work before :/ */}
          
          {showCreateForm ? "Close (X)" : "Create New User"}
        </button>

        {showCreateForm && (
          <form action={createUserAction} className="space-y-3 mt-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="border p-2 rounded w-full"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="border p-2 rounded w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <select
              name="role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="donor">Donor</option>
              <option value="charity">Charity</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700 w-full"
            >
              Add User
            </button>
          </form>
        )}
      </div>

      {/* USER LIST */}
      <div className="space-y-4">
        {users.map((user) => {
          const role = user.publicMetadata?.role || "none";

          return (
            <div
              key={user.id}
              className="p-4 border rounded flex flex-col sm:flex-row justify-between gap-3"
            >
              <div>
                <p className="font-semibold text-black dark:text-black">
                  {user.emailAddresses?.[0]?.emailAddress}
                </p>
                <p className="text-sm text-gray-500">{user.id}</p>
              </div>

              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                <select
                  className="border p-2 rounded"
                  value={role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="charity">Charity</option>
                  <option value="donor">Donor</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isPending && <p className="text-sm text-gray-500">Saving...</p>}
    </div>
  );
}
