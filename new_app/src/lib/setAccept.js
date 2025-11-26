"use server";

export async function setDonations(data) {
    const co2_emission = data.weight * 30
    const numbers = 2
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");
  return { success: "Donation Accepted" };
  } catch (err) {
    return { error: err.message };
  }
}
