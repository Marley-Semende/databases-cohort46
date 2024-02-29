const mysql = require("mysql2/promise");
const createConnection = require("./connection");
const { createResearchTb, insertResearchPapersData } = require("./createResearchPapers.js");

async function executeQueries() {
    try {
        const connection = await createConnection();

        const query1 = `
            SELECT rp.paper_title, COUNT(at.author_id) AS num_authors
            FROM research_papers rp
            LEFT JOIN authors at ON rp.paper_id = at.paper_id
            GROUP BY rp.paper_id;
        `;
        const [rows1] = await connection.query(query1);
        console.log("Query 1 result:", rows1);

        const query2 = `
            SELECT SUM(num_papers) AS total_female_papers
            FROM (
                SELECT COUNT(ap.paper_id) AS num_papers
                FROM authors a
                JOIN author_paper ap ON a.author_id = ap.author_id
                WHERE a.gender = 'female'
                GROUP BY a.author_id
            ) AS female_papers;
        `;
        const [rows2] = await connection.query(query2);
        console.log("Query 2 result:", rows2);

        const query3 = `
            SELECT university, AVG(h_index) AS avg_h_index
            FROM authors
            GROUP BY university;
        `;
        const [rows3] = await connection.query(query3);
        console.log("Query 3 result:", rows3);

        const query4 = `
            SELECT university, SUM(num_papers) AS total_papers
            FROM (
                SELECT a.university, COUNT(ap.paper_id) AS num_papers
                FROM authors a
                JOIN author_paper ap ON a.author_id = ap.author_id
                GROUP BY a.author_id
            ) AS author_papers
            GROUP BY university;
        `;
        const [rows4] = await connection.query(query4);
        console.log("Query 4 result:", rows4);

        await connection.end();
    } catch (error) {
        console.error("Error executing queries:", error);
    }
}

createResearchTb()
    .then(insertResearchPapersData)
    .then(executeQueries)
    .catch(error => {
        console.error("Error initializing database and executing queries:", error);
    });

