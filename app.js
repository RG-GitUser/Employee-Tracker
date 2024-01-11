const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'UNBbootcamp!23',
  database: 'employee_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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
      pool.end();
      break;
  }
}

// Function to view all departments
async function viewDepartments() {
  const [rows] = await pool.query('SELECT * FROM departments');
  console.table(rows);
  startApp();
}

// Function to view all roles
async function viewRoles() {
  const [rows] = await pool.query(
    'SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id'
  );
  console.table(rows);
  startApp();
}

// Function to view all employees
async function viewEmployees() {
  const [rows] = await pool.query(
    'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id'
  );
  console.table(rows);
  startApp();
}

// Function to add a department
async function addDepartment() {
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:',
  });

  await pool.query('INSERT INTO departments SET ?', { name: answer.name });
  console.log('Department added successfully!');
  startApp();
}

// Function to add a role
async function addRole() {
  const [departments] = await pool.query('SELECT * FROM departments');

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

  await pool.query('INSERT INTO roles SET ?', {
    title: answers.title,
    salary: answers.salary,
    department_id: department.id,
  });

  console.log('Role added successfully!');
  startApp();
}

// Function to add an employee
function addEmployee() {
  // Retrieve the list of roles from the database
  connection.query('SELECT * FROM roles', (err, roles) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: "Enter the employee's first name:",
        },
        {
          name: 'last_name',
          type: 'input',
          message: "Enter the employee's last name:",
        },
        {
          name: 'role',
          type: 'list',
          message: "Select the employee's role:",
          choices: roles.map((role) => role.title),
        },
        {
          name: 'manager',
          type: 'list',
          message: "Select the employee's manager:",
          choices: employees.map(
            (employee) =>
              `${employee.first_name} ${employee.last_name}`
          ),
        },
      ])
      .then((answers) => {
        const role = roles.find((role) => role.title === answers.role);
        const manager = employees.find(
          (employee) =>
            `${employee.first_name} ${employee.last_name}` === answers.manager
        );

        connection.query(
          'INSERT INTO employees SET ?',
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: role.id,
            manager_id: manager.id,
          },
          (err) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            startApp();
          }
        );
      });
  });
}

// Function to update an employee role
function updateEmployeeRole() {
  // Retrieve the list of employees from the database
  connection.query('SELECT * FROM employees', (err, employees) => {
    if (err) throw err;

    // Retrieve the list of roles from the database
    connection.query('SELECT * FROM roles', (err, roles) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employees.map(
              (employee) =>
                `${employee.first_name} ${employee.last_name}`
            ),
          },
          {
            name: 'role',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: roles.map((role) => role.title),
          },
        ])
        .then((answers) => {
          const employee = employees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          );
          const role = roles.find((role) => role.title === answers.role);

          connection.query(
            'UPDATE employees SET ? WHERE ?',
            [
              {
                role_id: role.id,
              },
              {
                id: employee.id,
              },
            ],
            (err) => {
              if (err) throw err;
              console.log('Employee role updated successfully!');
              startApp();
            }
          );
        });
    });
  });
}

// Connect to the MySQL database and start the application
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to the employee database!');
  startApp();
});