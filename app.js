const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2/promise');
const { viewAllDepartments, viewAllRoles, ... } = require('./db');
const inquirer = require('./prompts');
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

startApplication();

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


        // ADD DEPARTMENT
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
  
      // Add the new department into the database
      await connection.query('INSERT INTO departments (department_name) VALUES (?)', [departmentName]);
  
      // Release the connection back to the pool
      connection.release();
  
      console.log(`Department "${departmentName}" added successfully.`);
    } catch (error) {
      console.error('Error adding department:', error.message);
    }
  }
  
         // ADD ROLE
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
  
      // Add the new role into the database
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
  
      // Add the new employee into the database
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
          // UPDATE EMPLOYEE ROLE
         
            async function updateEmployeeRole() {
              try {
      // Get a list of existing employees for user selection
      const connection = await pool.getConnection();
      const [employees] = await connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employees');
      connection.release();
  
      const employeeChoices = employees.map(employee => ({
        name: employee.employee_name,
        value: employee.id,
      }));
  
      // Prompt the user to select an employee to update
      const { employeeId } = await inquirer.prompt({
        name: 'employeeId',
        type: 'list',
        message: 'Select the employee whose role you want to update:',
        choices: employeeChoices,
      });
  
      // Prompt the user to enter the new role ID for the selected employee
      const { newRoleId } = await inquirer.prompt({
        name: 'newRoleId',
        type: 'number',
        message: 'Enter the new role ID for the selected employee:',
      });
  
      // Update the employee's role in the database
      const updateConnection = await pool.getConnection();
      await updateConnection.query('UPDATE employees SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
      updateConnection.release();
  
      console.log('Employee role updated successfully.');
    } catch (error) {
      console.error('Error updating employee role:', error.message);
    }
    console.log('Updating an employee role...');
  }  

  //EXIT
  process.on('exit', () => {
    pool.end();
  });

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
    try{
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

      case 'Add a department':
        await addDepartment();
        break;

      case 'Add a role':
        await addRole();
        break;

      case 'Add an employee':
        await addEmployee();
        break;

      case 'Update an employee role':
        await updateEmployeeRole();
        break;

      case 'Exit':
        console.log('Exiting the application.');
        return;

      default:
        console.log('Invalid choice. Please try again.');
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error.message);
  }
}
} 


// Start the application
startApplication();