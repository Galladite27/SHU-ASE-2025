"use server";

import { getAuth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";


const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req) {
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");
    const { userId } = getAuth(req);
    const [getUser] = db.prepare("select user_id from user where Clerk_ID = ?").all(userId)
    if (getUser === undefined){
        const user = await clerkClient.users.getUser(userId)
        console.log(user.firstName,user.lastName)
        db.prepare("insert into user(F_Name,L_Name,Email,Date_Created,Role,Clerk_ID) values (?,?,?,date('now'),'Donor',?)").run(user.firstName,user.lastName,user.emailAddresses,userId)
    }
    return new Response(JSON.stringify({ success: "User Created/ AlreadyCreated" }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }));
  }
}
