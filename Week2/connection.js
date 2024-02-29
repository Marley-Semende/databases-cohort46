const mysql = require("mysql2/promise");
const dbConfig = {
host: "localhost",
user: "hyfuser",
password: "hyfpassword",
database: "research_db",
};

async function createConnection(){
try {

const connection = await mysql.createConnection(dbConfig);
console.log("database connection created");
return connection;

} catch (error) {

console.error("Error creating database pool:", error);
throw error;
}
}
module.exports = createConnection;