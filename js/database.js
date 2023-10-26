const mysql = require('mysql');

// Connection pool - reusing database connection
const pool = mysql.createPool({
  connectionLimit: 10, 
  host: '',
  user: '',
  password: '',
  database: 'db.json',
});

// Function for sql queries
function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(sql, values, (err, results) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });
}

module.exports = {
  query, 
};
