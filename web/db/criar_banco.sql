CREATE DATABASE IF NOT EXISTS petcare;
USE petcare;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    raca VARCHAR(100),
    peso VARCHAR(50),
    data_vacina DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
