export function getStock(userId) {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [locationID] = db.prepare("select location_id from User_Location inner join user on (user.user_id = user_location.user_id) where clerk_id = ?").all(userId)
    const [locationName] = db.prepare("select name from locations where location_id = ?").all(locationID.Location_ID)
    const stockLevels = db.prepare("Select ROW_NUMBER() OVER (ORDER BY clothing.Description) AS id, clothing.Description as itemName, clothing.category_name as category,count(all) as quantity from clothing inner join stock on(stock.stock_id = clothing.item_id) where location_id = ? group by clothing.Description").all(locationID.Location_ID); 
    db.close()

	return {stockLevels,locationName}

}