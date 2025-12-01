"use server";

import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
    const { userId } = getAuth(req);
    const body = await req.json();
    var co2_emission = 0
    switch (body.material){
      case "Wool": co2_emission = body.weight * 46; break;
      case "Acrylic": co2_emission = body.weight * 38; break;
      case "Viscose": co2_emission = body.weight * 30; break;
      case "Cotton": co2_emission = body.weight * 28; break;
      case "Silk": co2_emission = body.weight * 25; break;
      case "Polyester": co2_emission = body.weight * 21; break;
      case "Polyurethane": co2_emission = body.weight * 20; break;
      case "Flax linen": co2_emission = body.weight * 15; break;
    }
    console.log(co2_emission)
    
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");

    const [getDonorId] = db.prepare("select user_id from user where Clerk_ID = (?)").all(userId)

    const insertDonation = db.prepare("INSERT INTO donations(Donation_Description,Date_Donated,Donor_ID,Status) VALUES (?,date('now'),?,'Processing')");

    const donationResult = insertDonation.run(body.title,getDonorId.User_ID,);

    const insertClothing = db.prepare("INSERT INTO clothing(Quality,Size,Description, Gender, Material, Donation_Weight_KG,Category_Name,Co2_Emissions,donation_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    const clothingResult = insertClothing.run(
        body.quality,
        body.size,
        body.description,
        body.gender,
        body.material,
        body.weight,
        body.category,
        co2_emission,
        donationResult.lastInsertRowid
    );

    const getLocationId = db.prepare("SELECT Location_ID from Locations where name = (?)")
    const [locationId] = getLocationId.all(body.location)

    const insertStock = db.prepare(`INSERT INTO stock(Location_ID,item_id,Status) VALUES (?,?,'In Warehouse')`);

    insertStock.run(locationId["Location_ID"],clothingResult.lastInsertRowid);

    db.close();

    return new Response(JSON.stringify({ success: "Donation Successfully Submitted" }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }));
  }
}
