-- Insert sample departments
INSERT INTO departments (name) VALUES
('HR'),
('Finance'),
('IT');

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
('HR Manager', 60000, 1),
('Accountant', 50000, 2),
('Software Engineer', 80000, 3);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Bob', 'Vance', 1, NULL),
('Pam', 'Beasly', 2, 1),
('Michael', 'Scott', 3, 1);