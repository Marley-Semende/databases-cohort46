//Example of value that can be passed as `name` and `code` that would take advantage of sql injection => 
getPopulation('country_table', "' OR '1'='1", "' OR '1'='1", cb);

//refactored function
async function getPopulation(conn, Country, name, code, cb) {
  try {
    const query = 'SELECT Population FROM ?? WHERE Name = ? AND code = ?';
    const [rows, fields] = await conn.query(query, [Country, name, code]);
    if (rows.length === 0) {
      throw new Error('Not found');
    }
    cb(null, rows[0].Population);
  } catch (err) {
    cb(err);
  }
}
