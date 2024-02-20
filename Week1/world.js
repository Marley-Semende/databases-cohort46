// Import MySQL package
const mysql = require("mysql");

// create connectionto db
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

//connect 
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }


  // 1
  connection.query("SELECT Name FROM country WHERE Population > 8000000", (err, results) => {
    if (err) {
      console.error('Error executing query for question 1: ' + err.stack);
      return;
    }
    console.log('Countries with population greater than 8 million:');
    console.log(results);
  });

  // 2
  connection.query("SELECT Name FROM country WHERE Name LIKE '%land%'", (err, results) => {
    if (err) {
      console.error('Error executing query for question 2: ' + err.stack);
      return;
    }
    console.log('Countries with "land" in their names:');
    console.log(results);
  });

  // 3
  connection.query("SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000", (err, results) => {
    if (err) {
      console.error('Error executing query for question 3: ' + err.stack);
      return;
    }
    console.log('Cities with population between 500,000 and 1 million:');
    console.log(results);
  });

  // 4
  connection.query("SELECT Name FROM country WHERE Continent = 'Europe'", (err, results) => {
    if (err) {
      console.error('Error executing query for question 4: ' + err.stack);
      return;
    }
    console.log('Countries in Europe:');
    console.log(results);
  });

  // 5
  connection.query("SELECT Name FROM country ORDER BY SurfaceArea DESC", (err, results) => {
    if (err) {
      console.error('Error executing query for question 5: ' + err.stack);
      return;
    }
    console.log('Countries ordered by surface area (descending):');
    console.log(results);
  });

  // 6
  connection.query("SELECT Name FROM city WHERE CountryCode = 'NLD'", (err, results) => {
    if (err) {
      console.error('Error executing query for question 6: ' + err.stack);
      return;
    }
    console.log('Cities in the Netherlands:');
    console.log(results);
  });

  // 7
  connection.query("SELECT Population FROM city WHERE Name = 'Rotterdam'", (err, results) => {
    if (err) {
      console.error('Error executing query for question 7: ' + err.stack);
      return;
    }
    console.log('Population of Rotterdam:');
    console.log(results);
  });

  //8
  connection.query("SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10", (err, results) => {
    if (err) {
      console.error('Error executing query for question 8: ' + err.stack);
      return;
    }
    console.log('Top 10 countries by surface area:');
    console.log(results);
  });

  // 9
  connection.query("SELECT Name FROM city ORDER BY Population DESC LIMIT 10", (err, results) => {
    if (err) {
      console.error('Error executing query for question 9: ' + err.stack);
      return;
    }
    console.log('Top 10 most populated cities:');
    console.log(results);
  });

  //10
  connection.query("SELECT SUM(Population) AS WorldPopulation FROM country", (err, results) => {
    if (err) {
      console.error('Error executing query for question 10: ' + err.stack);
      return;
    }
    console.log('Population of the world:');
    console.log(results);
  });

  //end connection
  connection.end();
});
