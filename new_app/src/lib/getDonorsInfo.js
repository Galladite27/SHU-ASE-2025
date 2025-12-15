export function getDonationCount(userId) {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [donorId] = db.prepare("select user_id from user where Clerk_ID = (?)").all(userId)
    const [donation] = db.prepare("SELECT Count(all) as totalDonations FROM Donations Where donor_id = ?").all(donorId.User_ID)
    const [items] = db.prepare("Select Count(all) as itemsDonated, sum(co2_emissions) as co2Saved From clothing inner join Donations on (clothing.Donation_ID = Donations.Donation_ID) where donor_id = ? group by donor_id").all(donorId.User_ID)
    const donorsHistory = db.prepare("Select donations.donation_id as id, date_donated,donation_description as items,donations.status,concat('Saved ',sum(co2_emissions),' KG of CO2') as impact,Locations.name as charityName from Donations inner join clothing on (Donations.donation_id = Clothing.donation_id) inner join Stock on (Stock.Item_ID = Clothing.Item_ID) inner join Locations on (Stock.Location_ID = Locations.Location_ID) where donor_id = ? group by donations.donation_id").all(donorId.User_ID);
    db.close()
    const donorsInfo = Object.assign({},donation,items)

	return {donorsInfo,donorsHistory}

}