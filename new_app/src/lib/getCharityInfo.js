export function getAllCharityInfo(userId) {
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
    return {
      charitySummary: {
        pendingDonations: 0,
        itemsInStock: 0,
        donorsThisMonth: 0,
      },
      incomingDonations: [],
      // Keep the shape { Name: string } so the React code still works
      locationName: { Name: "Unknown" },
    };
  }

  const locationId = locationRow.Location_ID;

  // Branch name
  const [locationName] = db
    .prepare("SELECT Name FROM Locations WHERE Location_ID = ?")
    .all(locationId);

  // Pending donations (Processing)
  const [pendingDonations] = db
    .prepare(`
      SELECT COUNT(DISTINCT d.Donation_ID) AS pendingDonations
      FROM Donations d
      JOIN Clothing c ON c.Donation_ID = d.Donation_ID
      JOIN Stock s ON s.Item_ID = c.Item_ID
      WHERE s.Location_ID = ?
        AND d.Status = 'Processing'
    `)
    .all(locationId);

  // Items currently in stock at this location
  const [itemsInStock] = db
    .prepare(`
      SELECT COUNT(*) AS itemsInStock
      FROM Stock
      WHERE Location_ID = ?
        AND Status <> 'Distributed'
    `)
    .all(locationId);

  // Unique donors who donated to this branch in the last month
  const [donorsThisMonth] = db
    .prepare(`
      SELECT COUNT(DISTINCT d.Donor_ID) AS donorsThisMonth
      FROM Donations d
      JOIN Clothing c ON c.Donation_ID = d.Donation_ID
      JOIN Stock s ON s.Item_ID = c.Item_ID
      WHERE s.Location_ID = ?
        AND d.Date_Donated BETWEEN date('now','-1 month') AND date('now')
    `)
    .all(locationId);

  // Table of incoming donations
  const incomingDonations = db
    .prepare(`
      SELECT
        d.Donation_ID AS id,
        u.F_Name || ' ' || u.L_Name AS donorName,
        COUNT(c.Item_ID) AS items,
        d.Status AS status
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

  const charitySummary = Object.assign(
    {},
    pendingDonations,
    itemsInStock,
    donorsThisMonth
  );

  return { charitySummary, incomingDonations, locationName };
}
