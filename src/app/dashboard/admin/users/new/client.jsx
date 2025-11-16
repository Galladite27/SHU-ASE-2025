"use client";

import { useEffect, useState } from "react";
import { getClerkUsers, deleteClerkUser } from "./actions";

export default function ClerkUserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);
    const data = await getClerkUsers();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this user?")) return;
    await deleteClerkUser(id);
    await loadUsers();
  }

  if (loading) return <p>Loading users...</p>;
  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>Clerk Users</h2>
      {users.map((u) => (
        <div key={u.id} style={{
          padding: 10,
          marginBottom: 10,
          border: "1px solid #ddd",
          borderRadius: 6
        }}>
          <p><strong>{u.firstName} {u.lastName}</strong></p>
          <p>{u.emailAddresses?.[0]?.emailAddress}</p>
          <button onClick={() => handleDelete(u.id)}
                  style={{ background: "red", color: "white", borderRadius: 4, padding: "6px 10px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}