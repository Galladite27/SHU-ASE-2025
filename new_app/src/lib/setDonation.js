export function getSummaryMetrics() {
	
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const insert1 = db.prepare("insert into donations")
    const insert = db.prepare("insert into clothings (quality,size,description,gender,material,donation_weight_kg,category_name,co2_emissions").all()
    db.close()
}
