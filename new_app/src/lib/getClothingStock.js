export function getStock(userId) {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [locationID] = db.prepare("select location_id from User_Location inner join user on (user.user_id = user_location.user_id) where clerk_id = ?").all(userId)
    const stockLevels = db.prepare("Select clothing.item_id as id, clothing.Description as itemName, clothing.material as material, clothing.donation_weight_kg as weight,clothing.quality as quality, clothing.gender as gender, clothing.size  from clothing inner join stock on(stock.stock_id = clothing.item_id) where location_id = ? and clothing.description = 'Socks'").all(locationID.Location_ID); 
    db.close()

	return stockLevels

}