const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2/promise');

// Created connection pool
const pool = mysql.createPool({
  host: '5500', 
  user: 'localhost', 
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

// VIEW EMPLOYEES
async function viewAllEmployees() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Retrieve all employees
    const [rows, fields] = await connection.query('SELECT * FROM employees');

    // Display the result using console.table
    console.table(rows);

    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    console.error('Error fetching employees:', error.message);
  }
}

// Function to display options and handle user input
async function startApplication() {
  while (true) {
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    });

    // Switch statement to handle user action
    switch (action) {
      case 'View all departments':
        await viewAllDepartments();
        break;


      case 'View all roles':
        await viewAllRoles();
        break;

      case 'View all employees':
        await viewAllEmployees();
        break;


        // Functions for adding department, role and employee 

      case 'Add a department':
        // Implement the function to add a department
        console.log('Adding a department...');
        break;

      case 'Add a role':
        // Implement the function to add a role
        console.log('Adding a role...');
        break;

      case 'Add an employee':
        // Implement the function to add an employee
        console.log('Adding an employee...');
        break;



        // function to update an epmployee role

      case 'Update an employee role':
        // Implement the function to update an employee's role
        console.log('Updating an employee role...');
        break;

      case 'Exit':
        // Exit the application
        console.log('Exiting the application.');
        process.exit(0);

      default:
        console.log('Invalid choice. Please try again.');
        break;
    }
  }
}

// Start the application
startApplication();
