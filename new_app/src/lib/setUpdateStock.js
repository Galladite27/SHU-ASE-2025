"use server";

export async function setChangeStock(data) {
  try {
    const co2_emission = data.weight * 30
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");
    db.prepare("Update clothing set material = (?), donation_weight_kg = (?), co2_Emissions = (?) where item_id = (?) ").run(data.material,data.weight,co2_emission,data.id); 
  return { success: "Stock Updated" };
  } catch (err) {
    return { error: err.message };
  }
}

export async function setDeleteStock(data) {
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");
    db.prepare("delete from stock where item_id = (?)").run(data.id); 
    db.prepare("delete from clothing where item_id = (?)").run(data.id); 
  return { success: "Stock Deleted" };
  } catch (err) {
    return { error: err.message };
  }
}


