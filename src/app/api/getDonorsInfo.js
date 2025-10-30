export function getDonationCount() {

	const number = 1
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [donation] = db.prepare("SELECT Count(all) as totalDonations FROM Donations Where donor_id = " + number).all()
    const [items] = db.prepare("Select Count(all) as itemsDonated, sum(co2_emissions) as co2Saved From clothing inner join Donations on (clothing.Donation_ID = Donations.Donation_ID) where donor_id = " + number + " group by donor_id").all()
    db.close()
    console.log(items)
    const donorsInfo = Object.assign({},donation,items)
    console.log(donorsInfo)

	return donorsInfo
}