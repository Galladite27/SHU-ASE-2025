export function getDonationCount(userId) {
  const Database = require("better-sqlite3");
  const db = new Database("SustainWear.db");

  const [donorRow] = db
    .prepare("SELECT User_ID FROM User WHERE Clerk_ID = ?")
    .all(userId);

  if (!donorRow) {
    db.close();
    return {
      donorsInfo: {
        totalDonations: 0,
        itemsDonated: 0,
        co2Saved: 0,
      },
      donorsHistory: [],
    };
  }

  const donorId = donorRow.User_ID;

  // Summary metrics for the donor
  const [donation] = db
    .prepare(
      "SELECT COUNT(*) AS totalDonations FROM Donations WHERE Donor_ID = ?"
    )
    .all(donorId);

  const [items] = db
    .prepare(
      "SELECT COUNT(*) AS itemsDonated FROM Clothing WHERE Donation_ID IN (SELECT Donation_ID FROM Donations WHERE Donor_ID = ?)"
    )
    .all(donorId);

  const [impact] = db
    .prepare(
      "SELECT COALESCE(SUM(CO2_Emissions), 0) AS co2Saved FROM Clothing WHERE Donation_ID IN (SELECT Donation_ID FROM Donations WHERE Donor_ID = ?)"
    )
    .all(donorId);

  const donorsHistory = db
    .prepare(`
      SELECT
        d.Donation_ID AS id,
        d.Date_Donated,
        COALESCE(l.Name, 'Unknown') AS charityName,
        COUNT(c.Item_ID) AS items,
        COALESCE(SUM(c.CO2_Emissions), 0) AS impact,
        d.Status
      FROM Donations d
      LEFT JOIN Clothing c ON c.Donation_ID = d.Donation_ID
      LEFT JOIN Stock s ON s.Item_ID = c.Item_ID
      LEFT JOIN Locations l ON s.Location_ID = l.Location_ID
      WHERE d.Donor_ID = ?
      GROUP BY d.Donation_ID
      ORDER BY d.Date_Donated DESC
    `)
    .all(donorId);

  db.close();

  const donorsInfo = Object.assign({}, donation, items, impact);

  return { donorsInfo, donorsHistory };
}
