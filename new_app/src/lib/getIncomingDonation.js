export function getIncoming() {

	const number = "Sheffield"
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const acceptingDonations = db.prepare("select donations.donation_id as id,concat(F_Name,' ', L_Name) as user , clothing.Description as item,donation_description as description from donations inner join user on (donations.donor_id = user.user_id) inner join clothing on (clothing.donation_id = donations.donation_id) inner join stock on (stock.item_id = clothing.item_id) inner join locations on (locations.location_id = stock.location_id) where locations.name = (?) and donations.status = 'Processing'").all(number) || [];
    db.close()

	return acceptingDonations

}