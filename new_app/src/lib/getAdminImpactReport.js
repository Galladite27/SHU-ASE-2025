export function getAdminReport() {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")

    const [user_count] = db.prepare("select count(*) as usersPerMonth from user where date(Date_Created) between date('now','-7 day') and date('now');").all()
    const [donation_count] = db.prepare("select count(donations.Donation_Id) as donationsPerMonth, sum(co2_emissions) as totalCo2Saved from donations inner join clothing on(donations.donation_id = clothing.donation_id) where date(Date_Donated) between date('now','-7 day') and date('now');").all()
    const weeklyDonations = db.prepare("select date_donated, count(donations.Donation_Id) as donationsPerMonth, sum(co2_emissions) as totalCo2Saved from donations inner join clothing on(donations.donation_id = clothing.donation_id) where date(Date_Donated) between date('now','-6 day') and date('now') group by Date_Donated order by date_donated desc; ").all()

    console.log(weeklyDonations)
    const weeklySummary = Object.assign({},user_count,donation_count)
    console.log(weeklySummary)

const week_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const co2Data = [];
for (let i = 0; i < week_days.length; i++) {
    const dayName = week_days[i];
    const day_num = i + 1;

    var total_Co2 = 0;

    for (let j = 0; j < weeklyDonations.length; j++) {
        const entry = weeklyDonations[j];
        const weekday = new Date(entry.Date_Donated).getDay();
        const weekday_num = weekday === 0 ? 7 : weekday;

        if (weekday_num === day_num) {
            total_Co2 = entry.totalCo2Saved;
        }
    }

    co2Data.push({
        x: dayName,
        y: total_Co2
    });
}

const donationData = [];
for (let i = 0; i < week_days.length; i++) {
    const dayName = week_days[i];
    const day_num = i + 1;

    var total_Donation = 0;

    for (let j = 0; j < weeklyDonations.length; j++) {
        const entry = weeklyDonations[j];
        const weekday = new Date(entry.Date_Donated).getDay();
        const weekday_num = weekday === 0 ? 7 : weekday;

        if (weekday_num === day_num) {
            total_Donation = entry.donationsPerMonth;
        }
    }

    donationData.push({
        x: dayName,
        y: total_Donation
    });
}

console.log(donationData)
    return {weeklySummary,co2Data,donationData}

}