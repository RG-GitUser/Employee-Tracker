const inquirer = require('inquirer');
const department = require('./js/department');
const role = require('./js/role');
const employee = require('./js/employee');

const mainMenu = [
    'View all Departments',
    'view all Roles',
    'view all Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
    'Exit',
];


// Starting application 

async function start() {
    console.log('Welcome to your Employee Management System!');
    while (true) {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: mainMenu,
        },
      ]);
    }
};


// Functions called based off of user choices

switch (action) {
    case 'View All Departments':
      await viewAllDepartments();
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add a Department':
      await addDepartment();
      break;
    case 'Add a Role':
      await addRole();
      break;
    case 'Add an Employee':
      await addEmployee();
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
    default:
      console.log('Invalid choice.');
  }

  // View Departments

  async function viewAllDepartments() {
    console.log('All Departments View')
    try {
        const query = 'SELECT * FROM department';
        const departments = await db.query(query);

        if (departments.length === 0) {
            console.log('No departments to display.');
        } else {
            console.log('Department list:');
            departments.forEach((departments) => {
                console.log('ID: ${department.id}, Name: ${department.name}');
            });
        }
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
  }

  async function viewAllRoles() {
    console.log('All Roles View')
    try {
        const query = 'SELECT * FROM Roles';
        const roles = await db.query(query);

        if (roles.length === 0 ) {
            console.log('No roles to display');
        } else {
            console.log('Role list:');
            roles.forEach((roles) => {
                console.log('ID: ${roles.id}, Name: ${roles.name}');
            });
        }
    } catch (error) {
        console.error('Error fetching roles', error);

    }

 }
  
  