"use client";

import { useState, useTransition } from "react";
import { updateUserRoleAction, deleteUserAction } from "./actions";

export default function UsersPageClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  const updateRole = (userId, newRole) => {
    // Update UI instantly
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

  const deleteUser = (userId) => {
    startTransition(async () => {
      const fd = new FormData();
      fd.append("userId", userId);

      await deleteUserAction(fd);

      // Remove instantly from UI
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    });
  };

const downloadCsv = () => {
    if (!users || users.length === 0) {
      alert("No users to export.");
      return;
    }

    // CSV header
    const header = ["id", "email", "role"];

    const rows = users.map((u) => [
      u.id,
      u.emailAddresses?.[0]?.emailAddress || "No email",
      u.publicMetadata?.role || "none",
    ]);
 
    // Format CSV file
    const csvString = [header, ...rows]
      .map((row) =>
        row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    // Download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>

        <button
          onClick={downloadCsv}
          className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Download CSV
        </button>
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
                <p className="font-semibold text-gray-800">
                  {user.emailAddresses?.[0]?.emailAddress || "No email"}
                </p>
                <p className="text-sm text-gray-500">{user.id}</p>
              </div>

              <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:items-center">
                {/* Role dropdown */}
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

      {isPending && <p className="text-sm text-gray-500">Saving...</p>}
    </div>
  );
}
