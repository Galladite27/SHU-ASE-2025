export function getSummaryMetrics() {
  const Database = require("better-sqlite3");
  const db = new Database("SustainWear.db");

  const [users] = db
    .prepare("SELECT COUNT(*) AS totalUsers FROM User")
    .all();
  const [branches] = db
    .prepare("SELECT COUNT(*) AS activeBranches FROM Locations")
    .all();
  const [donations] = db
    .prepare("SELECT COUNT(*) AS totalDonations FROM Donations")
    .all();
  const [items] = db
    .prepare("SELECT COUNT(*) AS totalItems FROM Clothing")
    .all();

  const summaryMetrics = Object.assign({}, users, branches, donations, items);

  const summaryHistory = db
    .prepare(`
      SELECT
        d.Donation_ID AS id,
        u.F_Name || ' ' || u.L_Name AS donorName,
        COALESCE(l.Name, 'Unknown') AS branch,
        COUNT(c.Item_ID) AS items,
        COALESCE(d.Status, 'Processing') AS status,
        d.Date_Donated AS dateDonated
      FROM Donations d
      JOIN User u ON d.Donor_ID = u.User_ID
      LEFT JOIN Clothing c ON c.Donation_ID = d.Donation_ID
      LEFT JOIN Stock s ON s.Item_ID = c.Item_ID
      LEFT JOIN Locations l ON s.Location_ID = l.Location_ID
      GROUP BY d.Donation_ID
      ORDER BY d.Date_Donated DESC
      LIMIT 5
    `)
    .all();

  db.close();

  return { summaryMetrics, summaryHistory };
}
