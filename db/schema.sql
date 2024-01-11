-- DROP
DROP DATABASE IF EXISTS employeetrackerdb;

-- CREATE
CREATE DATABASE employeetrackerdb;

-- SWITCH TO NEW
USE employeetrackerdb;

-- Department Table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Role Table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2), 
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Employee Table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id), 
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
