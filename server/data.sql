CREATE DATABASE goalapp;

CREATE TABLE daily_goals(
    id VARCHAR (255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(40),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
)

CREATE TABLE goals(
    id VARCHAR (255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(40),
    progress INT,
    date VARCHAR(300),
    goalType VARCHAR(40)
);