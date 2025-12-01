export function getLocationNames() {
    
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const locationNames = db.prepare("select location_id,name from Locations").all()
    console.log(locationNames)
    db.close()

	return locationNames

}