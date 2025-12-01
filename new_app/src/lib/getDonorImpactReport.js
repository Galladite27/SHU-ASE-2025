export function getDonorImpact(userId) {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db")
    const donationReportSQL = db.prepare("select STRFTIME('%m', Date_Donated) AS submission_month ,count(*) as number from donations inner join user on (donations.donor_id = user.user_id) where clerk_id = ? group by STRFTIME('%m', Date_Donated); ").all(userId);
    const co2_reportSQL = db.prepare("select STRFTIME('%m', Date_Donated) AS submission_month ,sum(CO2_Emissions) as CO2_Total from donations inner join clothing on (donations.donation_id = clothing.donation_id) inner join user on (donations.donor_id = user.user_id) where clerk_id = ? group by STRFTIME('%m', Date_Donated); ").all(userId);
    db.close()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const donationReport = monthNames.map((name, index) => {
    var monthNum = (index + 1).toString()
    if (monthNum.length == 1){
        monthNum = "0" + index
    }
    const found = donationReportSQL.find(m => m.submission_month === monthNum);

    return {x: name,y: found ? found.number : 0};});

    const co2_report = monthNames.map((name, index) => {
    var monthNum = (index + 1).toString()
    if (monthNum.length == 1){
        monthNum = "0" + index
    }
    const found = co2_reportSQL.find(m => m.submission_month === monthNum);

    return {x: name,y: found ? found.CO2_Total : 0};});
    
    return {donationReport,co2_report}

}