export function getStock() {

	const number = 1
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const stockLevels = db.prepare("Select clothing.item_id as id, clothing.Description as itemName, clothing.material as material, clothing.donation_weight_kg as weight,clothing.quality as quality, clothing.gender as gender, clothing.size  from clothing inner join stock on(stock.stock_id = clothing.item_id) where location_id = 7 and clothing.description = 'Socks'").all(); 
    db.close()
    console.log(stockLevels)

	return stockLevels

}