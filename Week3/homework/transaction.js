const mysql = require("mysql2/promise");
const { connectionToDb, createAccountTables } = require("./transactions-create-tables");

async function transferAmount() {
  let connection;
  try {
    connection = await connectionToDb();
    await connection.beginTransaction();

    //subtraction from 101
    await connection.query('UPDATE account SET balance = balance - 1000.00 WHERE account_number = 101');

    //addition to 102
    await connection.query('UPDATE account SET balance = balance + 1000.00 WHERE account_number = 102');

    //log to acc-changes
    await connection.query(`
      INSERT INTO account_changes (account_number, amount, remark) VALUES
      (101, -1000.00, 'Transfer to account 102'),
      (102, 1000.00, 'Transfer from account 101')
    `);

    await connection.commit();
    console.log('Transaction completed successfully');
  } catch (error) {
    console.error('Error executing transaction', error);
    if (connection) {
      await connection.rollback();
    }
  } finally {
    if (connection) {
      try {
        await connection.end(); // close my connection
        console.log('Connection closed successfully');
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}

transferAmount();
