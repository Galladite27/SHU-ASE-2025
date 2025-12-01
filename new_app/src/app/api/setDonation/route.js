"use server";

import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
    const { userId } = getAuth(req);
    const body = await req.json();
    const co2_emission = body.weight * 30
    console.log(userId,co2_emission)
    
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");

    const [getDonorId] = db.prepare("select user_id from user where Clerk_ID = (?)").all(userId)
    console.log(getDonorId.User_ID)

    const insert2 = db.prepare("INSERT INTO donations(Donation_Description,Date_Donated,Donor_ID,Status) VALUES (?,date('now'),?,'Processing')");

    const result2 = insert2.run(body.title,getDonorId.User_ID,);

    const insert = db.prepare("INSERT INTO clothing(Quality,Size,Description, Gender, Material, Donation_Weight_KG,Category_Name,Co2_Emissions,donation_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    const result = insert.run(
        body.size,
        body.quality,
        body.description,
        body.gender,
        body.material,
        body.weight,
        body.category,
        co2_emission,
        result2.lastInsertRowid
    );

    const getLocationId = db.prepare("SELECT Location_ID from Locations where name = (?)")
    const [locationId] = getLocationId.all(body.location)

    const insert3 = db.prepare(`INSERT INTO stock(Location_ID,item_id,Status) VALUES (?,?,'In Warehouse')`);

    const result3 = insert3.run(locationId["Location_ID"],result.lastInsertRowid);

    db.close();

    return new Response(JSON.stringify({ success: "Donation Successfully Submitted" }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }));
  }
}
