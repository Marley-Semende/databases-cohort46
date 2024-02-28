<<<<<<< HEAD

const createConnection = require("./connection");
const promiseQuery = require("./dbUtils");

async function createAuthorTb(){
=======
const mysql = require("mysql2/promise");
const createConnection = require("./connection");
const promiseQuery = require("./dbUtils");

<<<<<<< HEAD
async function createAuthorTb() {
>>>>>>> 24d2f78 (re-add package.json package.jsonlock)
=======
async function createAuthorTb(){
>>>>>>> ef19629 (fix pr)
    try {
        const connection = await createConnection();

        await promiseQuery(`
            CREATE TABLE IF NOT EXISTS authors (
                author_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                author_name VARCHAR(255) NOT NULL,
                university VARCHAR(255) NOT NULL,
                date_of_birth DATE,
                h_index INT,
                gender ENUM('male', 'female', 'other') 
            )
        `);

        console.log("Authors table created successfully!");
<<<<<<< HEAD
=======

<<<<<<< HEAD
>>>>>>> 24d2f78 (re-add package.json package.jsonlock)
=======
        // Insert authors data
>>>>>>> ef19629 (fix pr)
        await promiseQuery(`
            INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
            VALUES
                ('Alice', 'University A', '1990-05-15', 10, 'female'),
                ('Bob', 'University B', '1985-09-20', 15, 'male'),
                ('Charlie', 'University C', '1988-11-30', 8, 'male'),
                ('David', 'University D', '1992-03-25', 12, 'male'),
                ('Emma', 'University E', '1995-07-10', 18, 'female'),
                ('Frank', 'University F', '1983-02-05', 14, 'male'),
                ('Grace', 'University G', '1993-09-02', 9, 'female'),
                ('Henry', 'University H', '1998-01-18', 11, 'male'),
                ('Ivy', 'University I', '1986-06-28', 16, 'female'),
                ('Jack', 'University J', '1991-10-12', 13, 'male'),
                ('Kate', 'University K', '1987-04-08', 20, 'female'),
                ('Liam', 'University L', '1994-08-22', 7, 'male'),
                ('Mia', 'University M', '1989-12-16', 22, 'female'),
                ('Noah', 'University N', '1996-02-14', 19, 'male'),
                ('Olivia', 'University O', '1999-06-03', 6, 'female')
        `);

        console.log("Authors data inserted successfully!");

        await connection.end();
    } catch(err) {
        console.error("Error creating table:", err);
    }
}

async function addMentorsTb() {
    try {
<<<<<<< HEAD
        const promiseQuery = await createPromiseQuery();
=======
>>>>>>> ef19629 (fix pr)
        const connection = await createConnection();
        await promiseQuery(`
            ALTER TABLE authors 
            ADD COLUMN mentor INT,
            ADD CONSTRAINT fk_mentor,
            FOREIGN KEY (mentor) REFERENCES authors(author_id)
        `);
        console.log("Mentor column added successfully!");
<<<<<<< HEAD
    } catch (err) {
        await connection.end();
    } catch (err) {
=======
        await connection.end();
    } catch(err) {
>>>>>>> ef19629 (fix pr)
        console.error("Error adding mentor column:", err);
    }
}

createAuthorTb();
<<<<<<< HEAD
addMentorsTb()

module.exports = { createAuthorTb, addMentorsTb };

=======
addMentorsTb();
module.exports = {createAuthorTb, addMentorsTb};
>>>>>>> ef19629 (fix pr)
