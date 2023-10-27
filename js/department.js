const mysql = require('mysql');
const inquirer = require('inquirer');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'UNBbootcamp!23', 
  database: 'employeetracker', 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err);
    return;
  }
  console.log('Connected to the database');
  mainMenu();
});

// Function to retrieve departments
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

// Function to display all departments

async function viewAllDepartments() {
  console.log('All Departments View');
  getAllDepartments((err, departments) => {
    if (err) {
      console.error('Error: ' + err);
      return;
    }

    if (departments.length === 0) {
      console.log('No departments to display.');
    } else {
      console.log('Department list:');
      departments.forEach((department) => {
        console.log(`ID: ${department.id}, Name: ${department.name}`);
      });
    }
    mainMenu();
  });
}

