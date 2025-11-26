"use server";

import Database from "better-sqlite3";

export async function setDonations(data) {
  try {
    const db = new Database("SustainWear.db");

    const insert = db.prepare(`
      INSERT INTO clothing
      (Quality,Size,Description, Gender, Material, Donation_Weight_KG) 
      VALUES (?,?, ?, ?, ?, ?)
    `);

    insert.run(
        data.size,
        data.quality,
        data.description,
        data.gender,
        data.material,
        data.weight,
    );

    db.close();

    return { success: "Donation saved successfully!" };
  } catch (err) {
    return { error: err.message };
  }
}
