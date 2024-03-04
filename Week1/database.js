const mysql = require("mysql2/promise");

// Create connection to MySQL server
async function connectToDb() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "hyfuser",
      password: "hyfpassword",
      database: "meetup",
    });
    console.log(
      "Connected to Meetup database successfully with connection id" +
        connection.threadId
    );
    return connection;
  } catch (error) {
    console.error(
      "Couldn't create connection to Meetup database: " + error.stack
    );
    throw error;
  }
}

// Create tables
async function createTables(connection) {
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no INT AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(255) NOT NULL,
      invited_by INT,
      FOREIGN KEY (invited_by) REFERENCES Invitee(invitee_no)
    )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS Room (
      room_no INT AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(255),
      floor_number TINYINT UNSIGNED
    )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title VARCHAR(255),
      starting_time DATETIME NOT NULL,
      ending_time DATETIME NOT NULL,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )`);
    console.log("Tables for Meetup database have been created successfully");
  } catch (error) {
    console.error("Error creating tables for Meetup database: " + error.stack);
    throw error;
  }
}

// Insert values into tables
async function insertValues(connection) {
  try {
    await connection.query(`INSERT INTO Invitee (invitee_name, invited_by)
      VALUES 
      ('John Doe', NULL),
      ('Alice Johnson', NULL),
      ('Emily Davis', NULL),
      ('Michael Lee', NULL),
      ('Samantha Clark', NULL)
    `);

    await connection.query(`INSERT INTO Room (room_name, floor_number)
      VALUES 
      ('Conference Room A', 1),
      ('Conference Room B', 2),
      ('Boardroom', 3),
      ('Meeting Room 1', 4),
      ('Meeting Room 2', 5)
    `);

    await connection.query(`INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
      VALUES 
      ('Team Meeting', '2024-02-20 09:00:00', '2024-02-20 10:00:00', 1),
      ('Project Review', '2024-02-21 13:00:00', '2024-02-21 14:30:00', 2),
      ('Client Presentation', '2024-02-22 10:30:00', '2024-02-22 12:00:00', 3),
      ('Training Session', '2024-02-23 11:00:00', '2024-02-23 13:00:00', 4),
      ('Team Building', '2024-02-24 15:00:00', '2024-02-24 17:00:00', 5)
    `);
    console.log("Meetup data inserted into the tables successfully!");
  } catch (error) {
    console.error("Error inserting data into the tables!: " + error.stack);
    throw error;
  }
}

// Close connection
async function closeConnection(connection) {
  try {
    await connection.end();
    console.log("Connection closed successfully!");
  } catch (error) {
    console.error("Failed to close connection to MySQL server: " + error.stack);
    throw error;
  }
}

// Run all functions
async function runAll() {
  let connection;
  try {
    connection = await connectToDb();
    await createTables(connection);
    await insertValues(connection);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      await closeConnection(connection);
    }
  }
}

runAll();
