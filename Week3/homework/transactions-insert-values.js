const mysql = require("mysql2/promise");
const { connectionToDb } = require("./transactions-create-tables");

//insert accounts data

async function insertAccountsData() {
  try {
    const connection = await connectionToDb();
    await connection.query(`
    INSERT INTO account (account_number, balance) VALUES
      (101, 5000.00),
      (102, 3000.00)

    `);
await connection.query(`
INSERT INTO account_changes (account_number, amount, remark) VALUES
      (101, 1000.00, 'Initial deposit'),
      (102, 1500.00, 'Initial deposit')
`);
console.log("Accounts data inserted successfully!")
  } catch (error) {
  console.error("Error inserting accounts data into tables: " + error.stack);
  }
}

insertAccountsData();
      
