USE employeetracker; 

-- Seeds for 'departments' table
INSERT INTO departments (department_name) VALUES
('HR'),
('Corporate'),
('Warehouse');

-- Seeds for 'roles' table
INSERT INTO roles (role_title, salary, department_id) VALUES
('Sales', 80000, 1),
('Assistant to the Regional Manager', 70000, 2),
('Accounting', 60000, 3);

-- Seeds for 'employees' table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Dwight', 'Schrute', 1, NULL),
('Pamela', 'Beesly', 2, 1),
('Creed', 'Bratton', 2, 1),
('Phyllis', 'Vance', 3, 1);