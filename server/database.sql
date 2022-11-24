CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    profile_picture BYTEA,
    verified BOOLEAN DEFAULT FALSE,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);