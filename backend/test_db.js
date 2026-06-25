const mongoose = require('mongoose');
const uri = "mongodb+srv://waseemsiddiqueop_db_user:hvWgUAZDIocehaWm@studysnap.1fkhxqk.mongodb.net/";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected successfully to server");

    // Print all database names and their document counts to figure out where the data is
    const db = mongoose.connection.db;
    const adminDb = db.admin();
    const result = await adminDb.listDatabases();

    console.log("Databases:");
    for (let i = 0; i < result.databases.length; i++) {
        let dbName = result.databases[i].name;
        if (dbName === 'admin' || dbName === 'local') continue;
        
        const count = await mongoose.connection.useDb(dbName).collection('users').countDocuments();
        console.log(` - ${dbName}: contains ${count} users.`);
    }

  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await mongoose.disconnect();
  }
}
run();
