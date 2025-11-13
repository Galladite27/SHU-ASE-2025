export function getSummaryMetrics() {
	
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [users] = db.prepare("SELECT Count(all) as totalUsers FROM User").all()
    const [branches] = db.prepare("SELECT Count(all) as activeBranches FROM Locations").all()
    const [donations] = db.prepare("SELECT Count(all) as totalDonations FROM Donations").all()
    const [items] = db.prepare("SELECT Count(all) as totalItems FROM Clothing").all()
    const summaryMetrics = Object.assign({},users,branches,donations,items)
    const summaryHistory = db.prepare("SELECT Donations.Donation_ID as id, concat(F_name,' ',L_name) as donorName, Locations.name as branch,Donations.Donation_Description as items, donations.Status as status FROM User inner join Donations on (User.User_ID = Donor_ID) inner join Clothing on (Clothing.Donation_ID = Donations.Donation_ID) inner join Stock on (Stock.Item_ID = Clothing.Item_ID) inner join Locations on (Locations.Location_ID = Stock.Location_ID) GROUP BY Donations.Donation_ID order By date_donated desc Limit 5").all()
    db.close()
    console.log(summaryMetrics,summaryHistory)

	return {summaryMetrics,summaryHistory}
}
