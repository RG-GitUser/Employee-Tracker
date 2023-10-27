const { connectToDatabase } = require('./db');

function getAllDepartments(callback) {
  const db = connectToDatabase();
  const query = 'SELECT id, name FROM departments';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching departments: ' + err);
      db.end();
      return callback(err, null);
    }
    callback(null, results);
    db.end();
  });
}

module.exports = {
  getAllDepartments,
};
