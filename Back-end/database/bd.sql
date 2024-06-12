DROP DATABASE IF EXISTS restaurante_database;
CREATE DATABASE restaurante_database;
USE restaurante_database;

CREATE TABLE Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    rol ENUM('admin', 'cliente') DEFAULT 'cliente',
    password VARCHAR(255) DEFAULT NULL,
    login BOOLEAN DEFAULT FALSE, 
    banear BOOLEAN DEFAULT FALSE,
    fechaRegistro DATE DEFAULT NULL, 
    horaRegistro TIME DEFAULT NULL
);

CREATE TABLE Sala (
    idSala INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    capacidad INT NOT NULL
);

CREATE TABLE Reserva (
    idReserva INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME,
    cliente_id INT,
    sala_id INT, 
    comensales INT DEFAULT 1,
    tiempo ENUM('Mediodia', 'Noche') NOT NULL DEFAULT 'Mediodia',
    estado ENUM('Confirmado', 'Cancelado') DEFAULT 'Confirmado',
    precioPagado DECIMAL(10, 2),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(idCliente),
    FOREIGN KEY (sala_id) REFERENCES Sala(idSala)
);

CREATE TABLE Mesa (
    idMesa INT AUTO_INCREMENT PRIMARY KEY,
    numeroMesa INT AUTO_INCREMENT,
    capacidad INT, 
    estado ENUM('Disponible', 'Ocupada') DEFAULT 'Disponible',
    idSala INT,
    FOREIGN KEY (idSala) REFERENCES Sala(idSala)
);
