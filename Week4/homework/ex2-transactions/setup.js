const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function setAccounts() {
  const client = new MongoClient(process.env.URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    const db = client.db("transactionsDB");
    const collection = db.collection("accounts");
    //clean acc
    await collection.deleteMany({});

    //insert acc data
    await collection.insertMany([
      { account_number: 101, balance: 5000.0, account_changes: [] },
      { account_number: 102, balance: 3000.0, account_changes: [] },
    ]);

    console.log("Accounts setup completed successfully!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

module.exports = setAccounts;
