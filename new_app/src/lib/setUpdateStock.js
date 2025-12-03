"use server";

export async function setChangeStock(data) {
  try {
    if (body.weight == 0){
      body.weight = 0.5
    }
    var co2_emission = body.weight * 28
    switch (body.material){
      case "Wool": co2_emission = body.weight * 46; break;
      case "Acrylic": co2_emission = body.weight * 38; break;
      case "Viscose": co2_emission = body.weight * 30; break;
      case "Cotton": co2_emission = body.weight * 28; break;
      case "Silk": co2_emission = body.weight * 25; break;
      case "Polyester": co2_emission = body.weight * 21; break;
      case "Polyurethane": co2_emission = body.weight * 20; break;
      case "Flax linen": co2_emission = body.weight * 15; break;
      case "Denim": co2_emission = body.weight * 16; break;
      case "Leather": co2_emission = body.weight * 30; break;
    }
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


