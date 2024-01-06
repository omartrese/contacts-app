
CREATE DATABASE IF NOT EXISTS contactsapp;
USE contactsapp;

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    tlfnum VARCHAR(20) NOT NULL,
    userOwner VARCHAR(255) NOT NULL
); 


-- TO TEST

-- INSERT INTO users (username, password)
-- VALUES ('test', 'testPass');
