-- List of employees / associated roles

SELECT e.first_name, e.last_name, r.title
FROM employee e 
JOIN role r ON e.role_ = r.id; 

-- List of employees / associated managers

SELECT e.first_namem, e.last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name
FROM employee e 
LEFT JOIN employee m ON e.manager_id = m.id; 

-- Getting highest paied employee 

SELECT e.first_name, e.last_name, r.salary 
FROM employee e 
JOIN role r ON e.role_id 
ORDER BY r.salary DESC
LIMIT 1; 

-- List of employees in a specific department

SELECT e.first_name, e.last_name, d.name AS department 
FROM employee e 
JOIN role r ON e.role_id = r.role_id
JOIN deparment d ON r.department_id = d.id;