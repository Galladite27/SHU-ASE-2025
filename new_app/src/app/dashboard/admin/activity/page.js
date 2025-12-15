export const dynamic = "force-dynamic";

import { listUsers } from "../users/actions";
import ActivityPageClient from "./client.activity";

export default async function ActivityPage() {
  const users = await listUsers();
  const plainUsers = structuredClone(users.data);

  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ActivityPageClient initialUsers={plainUsers} />
      </div>
    </main>
  );
}

