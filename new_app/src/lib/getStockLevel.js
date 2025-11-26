export function getStock() {

	const number = 1
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const stockLevels = db.prepare("Select ROW_NUMBER() OVER (ORDER BY clothing.Description) AS id, clothing.Description as itemName, clothing.category_name as category,count(all) as quantity from clothing inner join stock on(stock.stock_id = clothing.item_id) where location_id = 7 group by clothing.Description").all(); 
    db.close()

	return stockLevels

}