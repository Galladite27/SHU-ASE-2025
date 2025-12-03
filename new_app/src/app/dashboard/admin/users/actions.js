"use server";

import { createClerkClient } from "@clerk/backend";
import { revalidatePath } from "next/cache";
import { setNewUser, setDeleteUser } from "@/lib/setNewUser"

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});


export async function listUsers() {
  return clerkClient.users.getUserList({ limit: 100 });
}


export async function getUser(id) {
  return clerkClient.users.getUser(id);
}


export async function deleteUserAction(formData) {
  const userId = formData.get("userId");

  await clerkClient.users.deleteUser(userId);

  setDeleteUser({userId: userId})

  revalidatePath("/dashboard/admin/users");
}

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


export async function createFullUserAction(formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const location = formData.get("location");
  const role = formData.get("role");

  const user = await clerkClient.users.createUser({
    emailAddress: [email],
    password,
    firstName,
    lastName,
    publicMetadata: {
      location: location ?? "",
      role: role === "none" ? null : role,
      _timestamp: Date.now(),
    },
  });
    
  const data = {id : user.id, 
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    location: formData.get("location"),
    role: formData.get("role")}
  setNewUser(data)


  revalidatePath("/dashboard/admin/users");
}

export async function updateUserDetailsAction(formData) {
  const userId = formData.get("userId");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const location = formData.get("location");
  const role = formData.get("role");

  await clerkClient.users.updateUser(userId, {
    firstName,
    lastName,
  });

  if (email) {
    await clerkClient.users.updateUser(userId, {
      emailAddress: email,
    });
  }

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      location: location ?? "",
      role: role === "none" ? null : role,
      _timestamp: Date.now(),
    },
  });

  revalidatePath("/dashboard/admin/activity");
}

