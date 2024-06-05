DROP DATABASE IF EXISTS restaurante_database;
CREATE DATABASE restaurante_database;
USE restaurante_database;

CREATE TABLE Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    login BOOLEAN DEFAULT FALSE, 
    banear BOOLEAN DEFAULT FALSE,
    fechaRegistro DATE DEFAULT NULL, 
    horaRegistro TIME DEFAULT NULL
);

CREATE TABLE Sala (
    idSala INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    capacidad INT
);

CREATE TABLE Mesa (
    idMesa INT AUTO_INCREMENT PRIMARY KEY,
    numeroMesa INT,
    capacidad INT, 
    estado ENUM('Disponible', 'Ocupada') DEFAULT 'Disponible',
    idCliente INT,
    idSala INT,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idSala) REFERENCES Sala(idSala)
);

CREATE TABLE Reserva (
    idReserva INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    hora TIME,
    cliente_id INT,
    mesa_id INT,
    comensales INT DEFAULT 1,
    tiempo ENUM('Mediodia', 'Noche') DEFAULT 'Mediodia',
    estado ENUM('Confirmado', 'Cancelado') DEFAULT 'Confirmado',
    precioPagado DECIMAL(10, 2),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(idCliente),
    FOREIGN KEY (mesa_id) REFERENCES Mesa(idMesa)
);
