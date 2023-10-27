USE employeetrackerdb; 

-- Seeds for 'department' table
INSERT INTO department (id, name) VALUES
(1, 'HR'),
(2, 'Corporate'),
(3, 'Warehouse');

-- Seeds for 'role' table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales', 80000, 1),
(2, 'Asisstant to the Regional Manager', 70000, 2),
(3, 'Accounting', 60000, 3);

-- Seeds for 'employee' table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Dwight', 'Schrute', 1, NULL),
(2, 'Pamela', 'Beasly', 2, 1),
(3, 'Creed', 'Bratton', 2, 1),
(4, 'Phylis', 'Lapin-Vance', 3, 1);
