export function getDonationCount() {

	const number = 1
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [rows] = db.prepare("SELECT Count(all) as totalDonations FROM Donations Where donor_id = " + number).all()
    const [rows2] = db.prepare("Select Count(all) as itemsDonated, sum(co2_emissions) as co2Saved From clothing inner join Donations on (clothing.Donation_ID = Donations.Donation_ID) where donor_id = " + number + " group by donor_id").all()
    db.close()
    console.log(rows2)
    const rows3 = Object.assign({},rows,rows2)
    console.log(rows3)

	return rows3
}