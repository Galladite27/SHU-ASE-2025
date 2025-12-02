"use server";

export async function setAcceptDonation(data) {
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");

    const isAccept =
      data.value === true ||
      data.value === "true" ||
      data.value === 1 ||
      data.value === "1";

    if (isAccept) {
      db.prepare(
        "UPDATE Donations SET Status = 'Completed' WHERE Donation_ID = ?"
      ).run(data.id);
    } else {
      db.prepare(
        "UPDATE Donations SET Status = 'Rejected' WHERE Donation_ID = ?"
      ).run(data.id);
    }

    db.close();
    return { success: "Choice acknowledged" };
  } catch (err) {
    return { error: err.message };
  }
}
