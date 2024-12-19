CREATE DATABASE IF NOT EXISTS employees;

USE employees;

CREATE TABLE IF NOT EXISTS employee (
  emp_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(15),
  dept VARCHAR(100),
  d_join DATE,
  role VARCHAR(100)
);

