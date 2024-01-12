const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'UNBbootcamp!23',
  database: 'employee_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get a database connection
const getDbConnection = async () => {
  const connection = await pool.getConnection();
  return connection;
};

startApp();

// Function to start the application
async function startApp() {
  const answer = await inquirer.prompt({
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

  switch (answer.action) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'View all roles':
      await viewRoles();
      break;
    case 'View all employees':
      await viewEmployees();
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
      process.exit();
  }
}

// Function to view all departments
async function viewDepartments() {
  const db = await getDbConnection();
  const [rows] = await db.execute('SELECT * FROM departments');
  console.table(rows);
  db.release();
  startApp();
}

// Function to view all roles
async function viewRoles() {
  const db = await getDbConnection();
  const [rows] = await db.execute(
    'SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id'
  );
  console.table(rows);
  db.release();
  startApp();
}

// Function to view all employees
async function viewEmployees() {
  const db = await getDbConnection();
  const [rows] = await db.execute(
    'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id'
  );
  console.table(rows);
  db.release();
  startApp();
}

// Function to add a department
async function addDepartment() {
  const db = await getDbConnection();
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:',
  });

  await db.execute('INSERT INTO departments (name) VALUES (?)', [answer.name]);
  console.log('Department added successfully!');
  db.release();
  startApp();
}

// Function to add a role
async function addRole() {
  const db = await getDbConnection();
  const [departments] = await db.execute('SELECT * FROM departments');

  const answers = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary for the role:',
    },
    {
      name: 'department',
      type: 'list',
      message: 'Select the department for the role:',
      choices: departments.map((department) => department.name),
    },
  ]);

  const department = departments.find((d) => d.name === answers.department);

  await db.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [
    answers.title,
    answers.salary,
    department.id,
  ]);

  console.log('Role added successfully!');
  db.release();
  startApp();
};

// handling errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Connect to the MySQL database and start the application
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
