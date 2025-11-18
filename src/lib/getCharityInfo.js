export function getAllCharityInfo() {

	const number = 1
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const donorsHistory = db.prepare("select count(all) from Donations inner join clothing on (clothing.donation_id = donations.donation_id) inner join Stock on (clothing.item_id = stock.stock_id) where location_id = " + number + " and donations.status = 'Processing'").all();
    const clothesStock = db.prepare("select count(all) from Stock where location_id = 1 and status <> 'IN WAREHOUSE'").all();
    //const donorCount = db.prepare("select count(all) from user where location_id = 1 ").all();
    
    db.close()
    console.log(donorsHistory)
    console.log(clothesStock)
    const charitySummary = Object.assign({},clothesStock,donorsHistory)
    console.log("Hello3")
    console.log(charitySummary)

	return {donorsHistory}

}