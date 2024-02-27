const mysql = require("mysql2/promise");
const createConnection = require("./connection");
const { promisify } = require("util");

async function createPromiseQuery() {
  const connection = await createConnection();
  const promiseQuery = promisify(connection.query).bind(connection);
  return promiseQuery;
}

module.exports = createPromiseQuery;
