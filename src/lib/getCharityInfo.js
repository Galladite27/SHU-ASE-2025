export function getAllCharityInfo() {

	const number = 1
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const donorsHistory = db.prepare("select count(all) from Donations inner join clothing on (clothing.donation_id = donations.donation_id) inner join Stock on (clothing.item_id = stock.stock_id) where location_id = " + number + " and donations.status = 'Processing'").all();
    const clothesStock = db.prepare("select count(all) from Stock where location_id = 1 and status <> 'IN WAREHOUSE'").all();
    
    db.close()
    console.log(donorsHistory)
    console.log(clothesStock)

	return {donorsHistory}

}