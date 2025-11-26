"use server";

export async function setDonations(data) {
    const co2_emission = data.weight * 30
    const numbers = 2
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");

    const insert2 = db.prepare(`
      INSERT INTO donations
      (Donation_Description,Date_Donated,Donor_ID,Status) 
      VALUES (?,date('now'),?,'Processing')
    `);

    const result2 = insert2.run(
        data.title,
        numbers,
    );

    const insert = db.prepare(`
      INSERT INTO clothing
      (Quality,Size,Description, Gender, Material, Donation_Weight_KG,Category_Name,Co2_Emissions,donation_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
        data.size,
        data.quality,
        data.description,
        data.gender,
        data.material,
        data.weight,
        data.category,
        co2_emission,
        result2.lastInsertRowid
    );

    const getLocationId = db.prepare("SELECT Location_ID from Locations where name = (?)")
    const [locationId] = getLocationId.all(data.location)

    
    const insert3 = db.prepare(`
      INSERT INTO stock
      (Location_ID,item_id,Status) 
      VALUES (?,?,'In Warehouse')
    `);

    const result3 = insert3.run(
        locationId["Location_ID"],
        result.lastInsertRowid
    );

    db.close();

    return { success: "Donation saved successfully!" };
  } catch (err) {
    return { error: err.message };
  }
}
