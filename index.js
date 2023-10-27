const {prompt} = require ('inquirer');

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

// async function start() {
//     console.log('Welcome to your Employee Management System!');
//     while (true) {
//       const { action } = await inquirer.prompt([
//         {
//           name: 'action',
//           type: 'list',
//           message: 'What would you like to do?',
//           choices: mainMenu,
//         },
//       ]);
//     }
// };

init()

function init() {
    startprompt()
}

function startprompt() {
    prompt([{
    name: '',
    type: 'list',
    choices: ['1', '2', '3']
    }]).then(response => {
 
        (async () => {
            const response = await prompt([
              {
                name: 'test',
                type: 'list',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
              }
            ]);
          
            switch (response.test) {
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
                break;
              default:
                console.log('Invalid choice.');
            }
          })();
        })};           
        
// Functions called based off of user choices



//  View Departments

//   async function viewAllDepartments() {
//     console.log('All Departments View')
//     try {
//         const query = 'SELECT * FROM department';
//         const departments = await db.query(query);

//         if (departments.length === 0) {
//             console.log('No departments to display.');
//         } else {
//             console.log('Department list:');
//             departments.forEach((departments) => {
//                 console.log('ID: ${department.id}, Name: ${department.name}');
//             });
//         }
//     } catch (error) {
//         console.error('Error fetching departments:', error);
//     }
//   }

//   async function viewAllRoles() {
//     console.log('All Roles View')
//     try {
//         const query = 'SELECT * FROM Roles';
//         const roles = await db.query(query);

//         if (roles.length === 0 ) {
//             console.log('No roles to display');
//         } else {
//             console.log('Role list:');
//             roles.forEach((roles) => {
//                 console.log('ID: ${roles.id}, Name: ${roles.name}');
//             });
//         }
//     } catch (error) {
//         console.error('Error fetching roles', error);

//     }

//     }
  
  