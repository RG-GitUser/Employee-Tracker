const { prompt } = require('inquirer');

const mainMenu = [
    'View all Departments',
    'View all Roles',
    'View all Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
    'Exit',
];

init();

async function init() {
    console.log('Welcome to your Employee Management System!');
    while (true) {
        const { action } = await prompt([
            {
                name: 'action',
                type: 'list',
                message: 'What would you like to do?',
                choices: mainMenu,
            },
        ]);

        switch (action) {
            case 'View all Departments':
                await viewAllDepartments();
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
            case 'View all Roles':
                await viewAllRoles();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
                break;
            default:
                console.log('Invalid choice.');
        }
    }
}

// overall functions


async function viewAllDepartments() {
    console.log('All Departments View');
    // Retrieve department data from the database and display it here
}
