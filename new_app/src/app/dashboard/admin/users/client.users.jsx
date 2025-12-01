"use client";

import { useState, useTransition } from "react";
import {
  updateUserRoleAction,
  deleteUserAction,
  createFullUserAction,
} from "./actions";

export default function UsersPageClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  const updateRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, publicMetadata: { role: newRole } }
          : u
      )
    );

    startTransition(async () => {
      const fd = new FormData();
      fd.append("userId", userId);
      fd.append("role", newRole);

      await updateUserRoleAction(fd);
    });
  };

  const deleteUser = (userId) => {
    startTransition(async () => {
      const fd = new FormData();
      fd.append("userId", userId);

      await deleteUserAction(fd);

      setUsers((prev) => prev.filter((u) => u.id !== userId));
    });
  };

  const downloadCsv = () => {
    if (!users || users.length === 0) {
      alert("No users to export.");
      return;
    }

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

    const blob = new Blob([csvString], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "users-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>

        <div className="flex gap-3">
          <button
            onClick={downloadCsv}
            className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Download CSV
          </button>

          <button
            onClick={openCreate}
            className="text-sm px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            New User
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => {
          const role = user.publicMetadata?.role || "none";

          return (
            <div
              key={user.id}
              className="p-4 border rounded flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-black dark:text-black">
                  {user.emailAddresses?.[0]?.emailAddress || "No email"}
                </p>
                <p className="text-sm text-black dark:text-black">
                  {user.id}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:items-center">

                <select
                  className="border p-2 rounded"
                  value={role}
                  onChange={(e) =>
                    updateRole(user.id, e.target.value)
                  }
                >
                  <option value="none">None</option>
                  <option value="donor">Donor</option>
                  <option value="charity">Charity</option>
                  <option value="admin">Admin</option>
                </select>

                {/* Delete */}
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

      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md mx-4">

            <h2 className="text-xl font-bold mb-4">Create New User</h2>

            <form action={createFullUserAction} className="space-y-3">

              <div>
                <label className="text-sm font-medium">
                  First Name
                </label>
                <input
                  name="firstName"
                  required
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  name="lastName"
                  required
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <input
                  name="location"
                  required
                  className="w-full border p-2 rounded text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Role</label>
                <select
                  name="role"
                  required
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
                Create User
              </button>

              <button
                type="button"
                onClick={closeCreate}
                className="w-full bg-gray-800 text-white py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isPending && (
        <p className="text-sm text-gray-500">Saving...</p>
      )}
    </div>
  );
}
