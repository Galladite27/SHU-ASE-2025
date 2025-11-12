export function getDonationCount() {

	const number = 1
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [donation] = db.prepare("SELECT Count(all) as totalDonations FROM Donations Where donor_id = " + number).all()
    const [items] = db.prepare("Select Count(all) as itemsDonated, sum(co2_emissions) as co2Saved From clothing inner join Donations on (clothing.Donation_ID = Donations.Donation_ID) where donor_id = " + number + " group by donor_id").all()
    const donorsHistory = db.prepare("Select donations.donation_id as id, date_donated,donation_description as items,status,concat('Saved ',sum(co2_emissions),' KG of CO2') as impact,'test' as charityName from Donations inner join clothing on (Donations.donation_id = Clothing.donation_id) where donor_id = " + number + " group by donations.donation_id").all() || [];
    db.close()
    const donorsInfo = Object.assign({},donation,items)
    console.log(donorsInfo)

	return {donorsInfo,donorsHistory}

}