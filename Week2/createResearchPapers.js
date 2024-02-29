const mysql = require("mysql2/promise");
const createConnection = require("./connection");
const promiseQuery = require("./dbUtils");

async function createResearchTb() {
    try {
        const connection = await createConnection();
        await promiseQuery(`
            CREATE TABLE IF NOT EXISTS research_papers (
                paper_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
                paper_title TEXT NOT NULL, 
                conference VARCHAR(300) NOT NULL, 
                publish_date DATE
            )
        `);
        console.log("Research papers table created successfully!");
        await connection.end();
    } catch (err) {
        console.error("Error creating research paper table:", err);
    }
}

async function insertResearchPapersData() {
    try {
        const connection = await createConnection();
        
        await promiseQuery(`
            INSERT INTO research_papers (paper_title, conference, publish_date)
            VALUES
                ('Paper 1', 'Conference A', '2023-01-15'),
                ('Paper 2', 'Conference B', '2022-07-20'),
                ('Paper 3', 'Conference C', '2024-03-10'),
                ('Paper 4', 'Conference D', '2023-11-05'),
                ('Paper 5', 'Conference E', '2022-09-30'),
                ('Paper 6', 'Conference F', '2024-05-25'),
                ('Paper 7', 'Conference G', '2023-04-12'),
                ('Paper 8', 'Conference H', '2022-12-08'),
                ('Paper 9', 'Conference I', '2024-08-17'),
                ('Paper 10', 'Conference J', '2023-06-22'),
                ('Paper 11', 'Conference K', '2022-10-02'),
                ('Paper 12', 'Conference L', '2024-02-18'),
                ('Paper 13', 'Conference M', '2023-03-29'),
                ('Paper 14', 'Conference N', '2022-05-14'),
                ('Paper 15', 'Conference O', '2024-01-07'),
                ('Paper 16', 'Conference A', '2023-08-09'),
                ('Paper 17', 'Conference B', '2022-04-23'),
                ('Paper 18', 'Conference C', '2024-12-03'),
                ('Paper 19', 'Conference D', '2023-10-28'),
                ('Paper 20', 'Conference E', '2022-11-19'),
                ('Paper 21', 'Conference F', '2024-09-14'),
                ('Paper 22', 'Conference G', '2023-02-27'),
                ('Paper 23', 'Conference H', '2022-06-11'),
                ('Paper 24', 'Conference I', '2024-04-05'),
                ('Paper 25', 'Conference J', '2023-09-21'),
                ('Paper 26', 'Conference K', '2022-03-16'),
                ('Paper 27', 'Conference L', '2024-07-01'),
                ('Paper 28', 'Conference M', '2023-05-08'),
                ('Paper 29', 'Conference N', '2022-08-03'),
                ('Paper 30', 'Conference O', '2024-10-30')
        `);

        console.log("Research papers data inserted successfully!");

        await connection.end();
    } catch (err) {
        console.error("Error inserting research papers data:", err);
    }
}

createResearchTb();
insertResearchPapersData();
module.exports = { createResearchTb, insertResearchPapersData };


