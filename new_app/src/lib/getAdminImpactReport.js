export function getAdminReport() {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")

    const [user_count] = db.prepare("select count(*) as usersPerMonth from user where date(Date_Created) between date('now','-7 day') and date('now');").all()
    const [donation_count] = db.prepare("select count(donations.Donation_Id) as donationsPerMonth, sum(co2_emissions) as totalCo2Saved from donations inner join clothing on(donations.donation_id = clothing.donation_id) where date(Date_Donated) between date('now','-7 day') and date('now');").all()
    const weeklyDonations = db.prepare("select date_donated, count(donations.Donation_Id) as donationsPerMonth, sum(co2_emissions) as totalCo2Saved from donations inner join clothing on(donations.donation_id = clothing.donation_id) where date(Date_Donated) between date('now','-6 day') and date('now') group by Date_Donated order by date_donated desc; ").all()

    console.log(weeklyDonations)
    const weeklySummary = Object.assign({},user_count,donation_count)
    console.log(weeklySummary)

    return {weeklySummary,weeklyDonations}

}