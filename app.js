const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2/promise');

// Created connection pool
const pool = mysql.createPool({
  host: '5500', // <-- Update with your actual host
  user: 'local', // <-- Update with your actual user
  password: 'UNBbootcamp!23', // <-- Update with your actual password
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

        // ADD DEPARTMENT
      case 'Add a department':
        console.log('Adding a department...');
        break;
      
        //function
async function addDepartment() {
  try {
    const { departmentName } = await inquirer.prompt({
      name: 'departmentName',
      type: 'input',
      message: 'Enter the name of the new department:',
    });

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Insert the new department into the database
    await connection.query('INSERT INTO departments (department_name) VALUES (?)', [departmentName]);

    // Release the connection back to the pool
    connection.release();

    console.log(`Department "${departmentName}" added successfully.`);
  } catch (error) {
    console.error('Error adding department:', error.message);
  }
}

// ADD ROLE
      case 'Add a role':
        // Implement the function to add a role
        console.log('Adding a role...');
        break;
        
        //function
async function addRole() {
  try {
    const { roleName, roleSalary, departmentId } = await inquirer.prompt([
      {
        name: 'roleName',
        type: 'input',
        message: 'Enter the name of the new role:',
      },
      {
        name: 'roleSalary',
        type: 'number',
        message: 'Enter the salary for the new role:',
      },
      {
        name: 'departmentId',
        type: 'number',
        message: 'Enter the department ID for the new role:',
      },
    ]);

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Insert the new role into the database
    await connection.query(
      'INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?)',
      [roleName, roleSalary, departmentId]
    );

    // Release the connection back to the pool
    connection.release();

    console.log(`Role "${roleName}" added successfully.`);
  } catch (error) {
    console.error('Error adding role:', error.message);
  }
}


// ADD EMPLOYEE
      // ADD EMPLOYEE
async function addEmployee() {
  try {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'roleId',
        type: 'number',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'managerId',
        type: 'number',
        message: "Enter the employee's manager ID (if applicable):",
      },
    ]);

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Insert the new employee into the database
    await connection.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [firstName, lastName, roleId, managerId]
    );

    // Release the connection back to the pool
    connection.release();

    console.log(`Employee "${firstName} ${lastName}" added successfully.`);
  } catch (error) {
    console.error('Error adding employee:', error.message);
  }
}




        // functions to update employee role 
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
