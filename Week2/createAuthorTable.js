const { createConnection, createPromiseQuery } = require("./dbUtils");

async function createAuthorTb() {
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

        //come back to add author data

        await promiseQuery(`
            ALTER TABLE authors 
            ADD COLUMN mentor INT,
            ADD CONSTRAINT fk_mentor,
            FOREIGN KEY (mentor) REFERENCES authors(author_id)
        `);

        console.log("Mentor column added successfully!");
    } catch (err) {
        console.error("Error creating table:", err);
    }
}

async function addMentorsTb() {
    try {
        const promiseQuery = await createPromiseQuery();
        await promiseQuery(`
            ALTER TABLE authors 
            ADD COLUMN mentor INT,
            ADD CONSTRAINT fk_mentor,
            FOREIGN KEY (mentor) REFERENCES authors(author_id)
        `);
        console.log("Mentor column added successfully!");
    } catch (err) {
        console.error("Error adding mentor column:", err);
    }
}

createAuthorTb();
addMentorsTb();

module.exports = { createAuthorTb, addMentorsTb };