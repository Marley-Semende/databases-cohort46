const mysql = require("mysql");

// create connection to dB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL database with connection id ' + connection.threadId);

  //create invite table
  const createInviteeTableQuery = `
    CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no INT AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(255),
      invited_by VARCHAR(255)
    )
  `;
  connection.query(createInviteeTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Invitee table created successfully');
  });

  //create room table
  const createRoomTableQuery = `
    CREATE TABLE IF NOT EXISTS Room (
      room_no INT AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(255),
      floor_number INT
    )
  `;
  connection.query(createRoomTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Room table created successfully');
  });

  // Create Meeting table
  const createMeetingTableQuery = `
    CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title VARCHAR(255),
      starting_time DATETIME,
      ending_time DATETIME,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )
  `;
  connection.query(createMeetingTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Meeting table created successfully');
  });

  // inserting into invite table
  const insertInviteeDataQuery = `
    INSERT INTO Invitee (invitee_name, invited_by)
    VALUES
      ('John Doe', 'Jane Smith'),
      ('Alice Johnson', 'Bob Brown'),
      ('Emily Davis', 'Jack Wilson'),
      ('Michael Lee', 'Sarah Thompson'),
      ('Samantha Clark', 'David Martinez')
  `;
  connection.query(insertInviteeDataQuery, (err, result) => {
    if (err) throw err;
    console.log('Data inserted into Invitee table successfully');
  });

  //inserting into room table
  const insertRoomDataQuery = `
    INSERT INTO Room (room_name, floor_number)
    VALUES
      ('Conference Room A', 1),
      ('Conference Room B', 2),
      ('Boardroom', 3),
      ('Meeting Room 1', 4),
      ('Meeting Room 2', 5)
  `;
  connection.query(insertRoomDataQuery, (err, result) => {
    if (err) throw err;
    console.log('Data inserted into Room table successfully');
  });

  // Inserting into meeting table
  const insertMeetingDataQuery = `
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES
      ('Team Meeting', '2024-02-20 09:00:00', '2024-02-20 10:00:00', 1),
      ('Project Review', '2024-02-21 13:00:00', '2024-02-21 14:30:00', 2),
      ('Client Presentation', '2024-02-22 10:30:00', '2024-02-22 12:00:00', 3),
      ('Training Session', '2024-02-23 11:00:00', '2024-02-23 13:00:00', 4),
      ('Team Building', '2024-02-24 15:00:00', '2024-02-24 17:00:00', 5)
  `;
  connection.query(insertMeetingDataQuery, (err, result) => {
    if (err) throw err;
    console.log('Data inserted into Meeting table successfully');
  });

  // close connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection: ' + err.stack);
      return;
    }

    console.log('Connection to MySQL database closed.');
  });
});
