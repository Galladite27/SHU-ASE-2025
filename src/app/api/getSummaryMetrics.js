export function getUserCount() {
	
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [rows] = db.prepare("SELECT Count(all) as totalUsers FROM User").all()
    db.close()

	return rows
}

export function getBranchCount(){

    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [rows] = db.prepare("SELECT Count(all) as activeBranches FROM Locations").all()
    db.close()

	return rows
}

export function getDonationCount(){

    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [rows] = db.prepare("SELECT Count(all) as totalDonations FROM Donations").all()
    db.close()

	return rows
}

export function getItemsCount(){
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const [rows] = db.prepare("SELECT Count(all) as totalItems FROM Clothing").all()
    db.close()

	return rows
}

export function getHistory(){
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const rows = db.prepare("SELECT Donation_ID as id, concat(F_name,' ',L_name) as donorName, 'test' as charityName,Donations.Donation_Description as items, Status as status FROM User inner join Donations on (User.User_ID = Donor_ID) Order By date_donated asc Limit 5").all()
    db.close()
    console.log(rows)
	return rows
}