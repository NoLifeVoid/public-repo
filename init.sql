-- Create database if not exists

CREATE DATABASE IF NOT EXISTS user_database;

-- Create user
CREATE USER IF NOT EXISTS 'mysql'@'%' IDENTIFIED BY 'mysql';

-- Grant all privileges on your database (and shadow DBs)
--GRANT ALL PRIVILEGES ON user_database.* TO 'mysql'@'%';
--CREATE USER IF NOT EXISTS 'mysql'@'%' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
