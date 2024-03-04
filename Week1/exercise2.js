const mysql = require("mysql2/promise");

async function executeQuery(connection, query, message) {
    try {
        const [results] = await connection.query(query);
        console.log(message);
        console.log(results);
    } catch (error) {
        console.error('Error executing query: ' + error.stack);
    }
}

async function runQueries() {
    try {
        //create connection
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'hyfuser',
            password: 'hyfpassword',
            database: 'world'
        });

        //execute queries
        await executeQuery(connection, "SELECT Name FROM country WHERE Population > 8000000", 'Countries with population greater than 8 million:');
        await executeQuery(connection, "SELECT Name FROM country WHERE Name LIKE '%land%'", 'Countries with "land" in their names:');
        await executeQuery(connection, "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000", 'Cities with population between 500,000 and 1 million:');
        await executeQuery(connection, "SELECT Name FROM country WHERE Continent = 'Europe'", 'Countries in Europe:');
        await executeQuery(connection, "SELECT Name FROM country ORDER BY SurfaceArea DESC", 'Countries ordered by surface area (descending):');
        await executeQuery(connection, "SELECT Name FROM city WHERE CountryCode = 'NLD'", 'Cities in the Netherlands:');
        await executeQuery(connection, "SELECT Population FROM city WHERE Name = 'Rotterdam'", 'Population of Rotterdam:');
        await executeQuery(connection, "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10", 'Top 10 countries by surface area:');
        await executeQuery(connection, "SELECT Name FROM city ORDER BY Population DESC LIMIT 10", 'Top 10 most populated cities:');
        await executeQuery(connection, "SELECT SUM(Population) AS WorldPopulation FROM country", 'Population of the world:');
        
        //close connection
        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

//run queries
runQueries();

