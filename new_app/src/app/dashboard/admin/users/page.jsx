export const dynamic = "force-dynamic";

import { listUsers } from "./actions";
import UsersPageClient from "./client.users";

export default async function UsersPage() {
  const users = await listUsers();

  const plainUsers = structuredClone(users.data);

  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <UsersPageClient initialUsers={plainUsers} />
      </div>
    </main>
  );
}

