const createPromiseQuery = require("./dbUtils");
const mysql = require("mysql2/promie")
async function getAuthorsAndMentors() {
    try {
        const promiseQuery = await createPromiseQuery();
        const [rows] = await promiseQuery(`
            SELECT a.author_name AS author, m.author_name AS mentor
            FROM authors a
            LEFT JOIN authors m ON a.mentor = m.author_id;
        `);
        rows.forEach(row => {
            console.log(`Author: ${row.author}, Mentor: ${row.mentor || 'None'}`);
        });
    } catch (error) {
        console.error("Error retrieving authors and mentors:", error);
    }
}

async function getAllAuthorsWithPaperTitles() {
    try {
        const promiseQuery = await createPromiseQuery();
        const [rows] = await promiseQuery(`
            SELECT authors.*, research_papers.paper_title
            FROM authors
            LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
            LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id;
        `);
        console.log(rows);
    } catch (error) {
        console.error("Error retrieving authors and paper titles:", error);
    }
}

getAllAuthorsWithPaperTitles();
getAuthorsAndMentors();
