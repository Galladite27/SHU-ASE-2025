export function getIncoming(userId) {
    
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [locationID] = db.prepare("select location_id from User_Location inner join user on (user.user_id = user_location.user_id) where clerk_id = ?").all(userId)
    const acceptingDonations = db.prepare("select donations.donation_id as id,concat(F_Name,' ', L_Name) as user , clothing.Description as item,donation_description as description from donations inner join user on (donations.donor_id = user.user_id) inner join clothing on (clothing.donation_id = donations.donation_id) inner join stock on (stock.item_id = clothing.item_id) where location_id = (?) and donations.status = 'Processing'").all(locationID.Location_ID);
    db.close()

	return acceptingDonations

}