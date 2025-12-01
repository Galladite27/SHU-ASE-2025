// import sqlite3 from "sqlite3";
// import { open } from "sqlite";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// export async function GET() {
//   const db = await open({
//     filename: "SustainWear.db",
//     driver: sqlite3.Database,
//   });

//   const rows = await db.all(`
//     SELECT 
//       Donations.Donation_ID,
//       Donations.Donation_Description,
//       Donations.Date_Donated,
//       Donations.Status,
//       User.F_Name,
//       User.L_Name,
//       User.Email
//     FROM Donations
//     JOIN User ON Donations.Donor_ID = User.User_ID
//     ORDER BY Donations.Donation_ID DESC
//     LIMIT 10;
//   `);

//   const clerkUsers = await clerk.users.getUserList({ limit: 200 });
//   const plainUsers = clerkUsers.data.map((u) => ({
//     id: u.id,
//     email: u.emailAddresses?.[0]?.emailAddress?.toLowerCase(),
//     name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
//     role: u.publicMetadata?.role || "unknown",
//     location: u.publicMetadata?.location || "Unknown",
//   }));

//   const merged = rows.map((row) => {
//     const match = plainUsers.find(
//       (u) => u.email === row.Email?.toLowerCase()
//     );

//     return {
//       id: row.Donation_ID,
//       description: row.Donation_Description,
//       date: row.Date_Donated,
//       status: row.Status,

//       donorName: match ? match.name : `${row.F_Name} ${row.L_Name}`,
//       donorEmail: match ? match.email : row.Email,
//       role: match ? match.role : "unknown",
//       location: match ? match.location : "Unknown",
//     };
//   });

//   return Response.json(merged);
// }

import Database from "better-sqlite3";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET() {
  // Open database
  const db = new Database("SustainWear.db");

  // Fetch donations + DB user info
  const rows = db
    .prepare(
      `SELECT 
        Donations.Donation_ID,
        Donations.Donation_Description,
        Donations.Date_Donated,
        Donations.Status,
        User.F_Name,
        User.L_Name,
        User.Email
      FROM Donations
      JOIN User ON Donations.Donor_ID = User.User_ID
      ORDER BY Donations.Donation_ID DESC
      LIMIT 10;`
    )
    .all();

  // Fetch Clerk users ONCE
  const clerkUsers = await clerk.users.getUserList({ limit: 300 });

  const flatUsers = clerkUsers.data.map((u) => ({
    email: u.emailAddresses?.[0]?.emailAddress?.toLowerCase(),
    name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
    role: u.publicMetadata?.role || "unknown",
    location: u.publicMetadata?.location || "Unknown",
  }));

  // Merge Clerk → DB using email matching
  const merged = rows.map((row) => {
    const match = flatUsers.find(
      (u) => u.email === row.Email?.toLowerCase()
    );

    return {
      id: row.Donation_ID,
      description: row.Donation_Description,
      date: row.Date_Donated,
      status: row.Status,

      donorName: match ? match.name : `${row.F_Name} ${row.L_Name}`,
      donorEmail: match ? match.email : row.Email,
      role: match ? match.role : "unknown",
      location: match ? match.location : "Unknown",
    };
  });

  return Response.json(merged);
}
