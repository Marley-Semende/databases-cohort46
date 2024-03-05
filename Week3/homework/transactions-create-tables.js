const mysql = require("mysql2/promise");

//create connection to mysql
async function connectionToDb() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "hyfuser",
      password: "hyfpassword",
      database: "accounts",
    });
    console.log("connection to MySQL server was successful");
    return connection;
  } catch (error) {
    console.error("Error creating connection to MySQL server");
    throw error;
  }
}

connectionToDb();
//create account tables
async function createAccountTables() {
  let connection;
  try {
    connection = await connectionToDb();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS account (
        account_number INT AUTO_INCREMENT PRIMARY KEY,
        balance DECIMAL(10, 2)
      )
    `);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
      )
    `);
    console.log("Account tables created successfully!");
  } catch (error) {
    console.error("error creating accounts tables");
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.end(); //close connection
        console.log("Connection closed successfully");
      } catch (error) {
        console.error("Error closing connection");
        throw error;
      }
    }
  }
}

createAccountTables();

module.exports = { connectionToDb, createAccountTables };
