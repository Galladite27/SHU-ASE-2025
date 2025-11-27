"use server";

export async function setAcceptDonation(data) {
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");
    if (data.value){
        db.prepare("Update donations set Status = 'Completed' where donation_id = (?) ").run(data.id); 
    }
    else if (!data.value){
        db.prepare("Update donations set Status = 'Rejected' where donation_id = (?) ").run(data.id);
    }
  return { success: "Choice ackknowledged" };
  } catch (err) {
    return { error: err.message };
  }
}
