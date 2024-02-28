const createPromiseQuery = require("./dbUtils");

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


getAuthorsAndMentors();
