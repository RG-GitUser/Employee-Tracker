const mysql = require('mysql'); 


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'database.password',
  database: 'employeetracker',
});

// connect to database

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err);
        return;
    }
    console.log('Connect to database');
});

// function to retrieve departments 

function getAllDepartments(callback) {
    const query = 'SELECT id, name FROM departments';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching departments: ' + err);
       return callback(err, null);
        
      }
      callback(null, results);
    });
  }

  // Function to add a new department
function addDepartment(departmentName, callback) {
    const query = 'INSERT INTO departments (name) VALUES (?)';
    db.query(query, [departmentName], (err, results) => {
      if (err) {
        console.error('Error adding a department: ' + err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
  
  // Close the database connection when exiting 
  function closeConnection() {
    db.end();
  }
  
  module.exports = {
    getAllDepartments,
    addDepartment,
    closeConnection,
  };