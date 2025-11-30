"use server";

import { createClerkClient } from "@clerk/backend";
import { revalidatePath } from "next/cache";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// LIST USERS
export async function listUsers() {
  return clerkClient.users.getUserList({ limit: 100 });
}

// GET USER
export async function getUser(id) {
  return clerkClient.users.getUser(id);
}

// DELETE USER
export async function deleteUserAction(formData) {
  const userId = formData.get("userId");

  await clerkClient.users.deleteUser(userId);

  // Correct path for your dashboard route
  revalidatePath("/dashboard/admin/users");
}

// UPDATE ROLE
export async function updateUserRoleAction(formData) {
  const userId = formData.get("userId");
  const role = formData.get("role");

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      role: role === "none" ? null : role,
      _timestamp: Date.now(),
    },
  });

  revalidatePath("/dashboard/admin/users");
}

// CREATE USER
export async function createUserAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  await clerkClient.users.createUser({
    emailAddress: [email],
    password,
    publicMetadata: {
      role: role === "none" ? null : role,
      _timestamp: Date.now(),
    },
  });

  // Revalidate user list
  revalidatePath("/dashboard/admin/users");
}
