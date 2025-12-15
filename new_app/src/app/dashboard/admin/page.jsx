export const dynamic = "force-dynamic";

import { listUsers } from "./users/actions";
import AdminDashboardPageClient from "./client.admin";

export default async function AdminDashboardPage() {
  const users = await listUsers();
  const plainUsers = structuredClone(users.data);

  return (
    <main className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <AdminDashboardPageClient initialUsers={plainUsers} />
      </div>
    </main>
  );
}
