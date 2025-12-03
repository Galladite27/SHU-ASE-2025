"use server";

export async function setNewUser(data) {
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");
    if (data.role == "charity"){
        const result = db.prepare("Insert into user(F_Name,L_Name,Email,Date_Created,Role,Clerk_ID) values (?,?,?,date('now'),?,?)").run(data.firstName,data.lastName,data.email,data.role,data.id); 
        const [locationId] = db.prepare("select location_id from locations where name = ? ").all(data.location)
        console.log(locationId.Location_ID)
        db.prepare("insert into User_Location(user_id,Location_id) values (?,?)").run(result.lastInsertRowid,locationId.Location_ID)
    }
    else
    {
        db.prepare("Insert into user(F_Name,L_Name,Email,Date_Created,Role,Clerk_ID) values (?,?,?,date('now'),?,?)").run(data.firstName,data.lastName,data.email,data.role,data.id); 
    }
  return { success: "Stock Updated" };
  } catch (err) {
    console.log(err)
    return { error: err.message };
  }
}

export async function setDeleteUser(data) {
  try {
    const Database = require("better-sqlite3");
    const db = new Database("SustainWear.db");
    const [user_id] = db.prepare("select User_ID from user where clerk_id = ?").all(data.userId)
    db.prepare("delete from user_location where user_id = ?").run(user_id.User_ID)
    db.prepare("delete from user where user_id = ?").run(user_id.User_ID)
  return { success: "Stock Updated" };
  } catch (err) {
    console.log(err)
    return { error: err.message };
  }
}