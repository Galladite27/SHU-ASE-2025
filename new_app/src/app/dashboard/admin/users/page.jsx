export const dynamic = "force-dynamic";

import { listUsers } from "./actions";
import UsersPageClient from "./client.users";

export default async function UsersPage() {
  const users = await listUsers();

  // FIX: serialize before passing to the client component
  const plainUsers = structuredClone(users.data);

  return <UsersPageClient initialUsers={plainUsers} />;
}

