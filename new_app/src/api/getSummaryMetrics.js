export function getSummaryMetrics2() {
	
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const rows = db.prepare("SELECT Count(all) as totalUsers,F_Name FROM User").all()
    console.log(rows)
    db.close()

	return rows
}