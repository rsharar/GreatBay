CREATE DATABASE GreatBayDB;

USE GreatBayDB;

CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (100) NULL,
    category VARCHAR(100) NULL,
    startingbid INT(10) NULL,
    highestbid INT(10) NULL,
    PRIMARY KEY (id)
)

