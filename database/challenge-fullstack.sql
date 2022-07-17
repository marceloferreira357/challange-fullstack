DROP DATABASE IF EXISTS "challenge-fullstack";
CREATE DATABASE "challenge-fullstack";
\c "challenge-fullstack";

CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    line1 TEXT NOT NULL,
    number TEXT NOT NULL,
    district TEXT NOT NULL,
    line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL
);

CREATE TABLE clinics (
    id BIGSERIAL PRIMARY KEY,
    address_id BIGSERIAL,
    name TEXT NOT NULL,
    CNPJ INTEGER NOT NULL,
    CONSTRAINT fk_address FOREIGN KEY(address_id) REFERENCES addresses(id) ON UPDATE CASCADE ON DELETE CASCADE
);