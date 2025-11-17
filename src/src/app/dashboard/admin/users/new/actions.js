'use server'

import { clerkAdmin } from "@/lib/clerkadmin";

export async function getClerkUsers ( ) {
    const { data: users } = await clerkAdmin.users.getUserList();
    let usersObj = users.map( u => u._raw);
    console.log(usersObj);
    return usersObj;
}

export async function deleteClerkUser ( userId ) {
    await clerkAdmin.users.deleteUser(userId);
    return (
        { ok: true }
    )
}