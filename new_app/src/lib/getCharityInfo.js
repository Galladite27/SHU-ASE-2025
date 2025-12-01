export function getAllCharityInfo(userId) {
	const number = 2
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [locationID] = db.prepare("select location_id from User_Location inner join user on (user.user_id = user_location.user_id) where clerk_id = ?").all(userId)
    const [donorsHistory] = db.prepare("select count(all) as pendingDonations from Donations inner join clothing on (clothing.donation_id = donations.donation_id) inner join Stock on (clothing.item_id = stock.stock_id) where location_id = ? and donations.status = 'Processing'").all(locationID.Location_ID);
    const [clothesStock] = db.prepare("select count(all) as itemsInStock from Stock where location_id = 1 and status <> 'IN WAREHOUSE'").all();
    const [donorCount] = db.prepare("select count(distinct user.user_id) as donorsThisMonth from user inner join donations on (donations.donor_id = user.user_id) inner join clothing on (clothing.donation_id = donations.donation_id) inner join stock on (stock.stock_id = clothing.item_id) where stock.location_id = ? and date(Date_Donated) between date('now','-1 month') and date('now');").all(locationID.Location_ID);
    const incomingDonations = db.prepare("select donations.donation_id as id, concat(F_Name , ' ' , L_Name) as donorName, description as items,donations.status as status from Donations inner join user on (donor_id = user_id) inner join clothing on (donations.donation_id = clothing.donation_id) inner join stock on (stock.stock_id = clothing.item_id) where location_id = ?").all(locationID.Location_ID)
    db.close()
    const charitySummary = Object.assign({},clothesStock,donorsHistory,donorCount)

	return {charitySummary,incomingDonations}

}