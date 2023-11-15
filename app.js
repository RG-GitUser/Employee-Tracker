const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2/promise');
// Created connection pool
const pool = mysql.createPool({
  host: '5500',
  user: 'local',
  password: 'UNBbootcamp!23',
  database: 'employeetracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// VIEW DEPARTMENTS
async function viewAllDepartments() {
  try {
    // Getting connection from pool 
    const connection = await pool.getConnection();

    // Retrieve all departments 
    const [rows, fields] = await connection.query('SELECT * FROM departments');

    // Display result using console.table 
    console.table(rows);

    // Release connection back to pool 
    connection.release();
  } catch (error) {
    console.error('Error fetching departments:', error.message);
  }
}

// VIEW ROLES
async function viewAllRoles() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Retrieve all roles
    const [rows, fields] = await connection.query('SELECT * FROM roles');

    // Display the result using console.table
    console.table(rows);

    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    console.error('Error fetching roles:', error.message);
  }
}

// Inside your switch statement
switch (action) {
  case 'View all departments':
    await viewAllDepartments();
    break;

  case 'View all roles':
    await viewAllRoles();
    break;

}



        //VIEW EMPLOYEES
      case 'View all employees':
        // Call a function to fetch and display all employees
        // For example: viewAllEmployees();
        console.log('Viewing all employees...');
        break;



        //ADD DEPARTMENT
      case 'Add a department':
        // Call a function to add a new department
        // For example: addDepartment();
        console.log('Adding a department...');
        break;



        //ADD ROLE
      case 'Add a role':
        // Call a function to add a new role
        // For example: addRole();
        console.log('Adding a role...');
        break;



        //ADD EMPLOYEE
      case 'Add an employee':
        // Call a function to add a new employee
        // For example: addEmployee();
        console.log('Adding an employee...');
        break;



        //UPDATE EMPLOYEE
      case 'Update an employee role':
        // Call a function to update an employee's role
        // For example: updateEmployeeRole();
        console.log('Updating an employee role...');
        break;



        //EXIT 
      case 'Exit':
        // Exit the application
        console.log('Exiting the application.');
        process.exit(0);


        //ERROR MSG
      default:
        console.log('Invalid choice. Please try again.');
        break;
    }
  }
}


//START
startApplication();

  
  module.exports = {
    getAllDepartments,
    addDepartment,
    closeConnection,
  };