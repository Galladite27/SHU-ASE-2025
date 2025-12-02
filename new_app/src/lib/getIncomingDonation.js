export function getIncoming(userId) {
  const Database = require("better-sqlite3");
  const db = new Database("SustainWear.db");

  const [locationRow] = db
    .prepare(`
      SELECT ul.Location_ID
      FROM User u
      JOIN User_Location ul ON u.User_ID = ul.User_ID
      WHERE u.Clerk_ID = ?
    `)
    .all(userId);

  if (!locationRow) {
    db.close();
    return [];
  }

  const locationId = locationRow.Location_ID;

  const acceptingDonations = db
    .prepare(`
      SELECT
        d.Donation_ID AS id,
        COALESCE(d.Donation_Description, '') AS description,
        u.F_Name || ' ' || u.L_Name AS user,
        -- Use the first item's description as the "title" for display
        MAX(c.Description) AS item
      FROM Donations d
      JOIN User u ON d.Donor_ID = u.User_ID
      JOIN Clothing c ON c.Donation_ID = d.Donation_ID
      JOIN Stock s ON s.Item_ID = c.Item_ID
      WHERE s.Location_ID = ?
        AND d.Status = 'Processing'
      GROUP BY d.Donation_ID
      ORDER BY d.Date_Donated DESC
    `)
    .all(locationId);

  db.close();

  return acceptingDonations;
}
