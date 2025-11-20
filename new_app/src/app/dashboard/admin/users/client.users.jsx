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

    // Persist via server action
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
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Clerk Users</h1>

      <div className="space-y-4">
        {users.map((user) => {
          const role = user.publicMetadata?.role || "none";

          return (
            <div
              key={user.id}
              className="p-4 border rounded flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">
                  {user.emailAddresses?.[0]?.emailAddress || "No email"}
                </p>
                <p className="text-sm text-gray-500">{user.id}</p>
              </div>

              <div className="flex items-center gap-4">
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