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

CREATE TABLE Mesa (
    idMesa INT AUTO_INCREMENT PRIMARY KEY,
    numeroMesa INT,
    capacidad INT, 
    estado ENUM('Disponible', 'Ocupada') DEFAULT 'Disponible',
    idSala INT,
    FOREIGN KEY (idSala) REFERENCES Sala(idSala)
);

CREATE TABLE Reserva (
    idReserva INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME,
    cliente_id INT,
    sala_id INT, 
    mesa_id INT,
    comensales INT DEFAULT 1,
    tiempo ENUM('Mediodia', 'Noche') NOT NULL DEFAULT 'Mediodia',
    estado ENUM('Confirmado', 'Cancelado') DEFAULT 'Confirmado',
    precioPagado DECIMAL(10, 2),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(idCliente),
    FOREIGN KEY (sala_id) REFERENCES Sala(idSala),
    FOREIGN KEY (mesa_id) REFERENCES Mesa(idMesa)
);

INSERT INTO Sala (idSala, nombre, capacidad) VALUES
(1, 'Sala de Entrada', 10),
(2, 'Salon', 18),
(3, 'Salón Grande', 42),
(4, 'Terraza', 16);

INSERT INTO Mesa (idMesa, numeroMesa, capacidad, estado, idSala) VALUES
(1, 1, 2, 'Disponible', 1),
(2, 2, 4, 'Disponible', 1),
(3, 3, 3, 'Disponible', 1),
(4, 4, 1, 'Disponible', 2),
(5, 5, 2, 'Disponible', 2),
(6, 6, 2, 'Disponible', 1),
(7, 7, 4, 'Disponible', 1),
(8, 8, 3, 'Disponible', 1),
(9, 9, 1, 'Disponible', 2),
(10, 10, 2, 'Disponible', 2),
(11, 11, 2, 'Disponible', 1),
(12, 12, 4, 'Disponible', 1),
(13, 13, 3, 'Disponible', 1),
(14, 14, 1, 'Disponible', 2),
(15, 15, 2, 'Disponible', 2),
(16, 16, 2, 'Disponible', 1),
(17, 17, 4, 'Disponible', 1),
(18, 18, 3, 'Disponible', 1),
(19, 19, 1, 'Disponible', 2),
(20, 20, 2, 'Disponible', 2);

INSERT INTO Cliente (idCliente, nombre, apellido, telefono, email, rol, password, login, banear, fechaRegistro, horaRegistro) VALUES
(1, 'Laura', 'Gomez', '123456789', 'laura@example.com', 'cliente', 'password123', 1, 0, '2024-06-13', '15:37:19'),
(2, 'Carlos', 'Perez', '987654321', 'carlos@example.com', 'cliente', 'password123', 0, 1, '2024-06-13', '15:37:19'),
(3, 'Ana', 'Martinez', '555555555', 'ana@example.com', 'admin', 'password123', 1, 0, '2024-06-13', '15:37:19'),
(4, 'Luis', 'Lopez', '444444444', 'luis@example.com', 'cliente', 'password123', 1, 0, '2024-06-13', '15:37:19'),
(5, 'Maria', 'Fernandez', '333333333', 'maria@example.com', 'cliente', 'password123', 0, 0, '2024-06-13', '15:37:19'),
(6, 'Jose', 'Garcia', '222222222', 'jose@example.com', 'cliente', 'password123', 1, 0, '2024-06-13', '15:37:19'),
(7, 'Lucia', 'Rodriguez', '111111111', 'lucia@example.com', 'cliente', 'password123', 0, 0, '2024-06-13', '15:37:19'),
(8, 'Miguel', 'Hernandez', '666666666', 'miguel@example.com', 'cliente', 'password123', 1, 0, '2024-06-13', '15:37:19'),
(9, 'Marta', 'Lopez', '777777777', 'marta@example.com', 'cliente', 'password123', 0, 0, '2024-06-13', '15:37:19'),
(10, 'David', 'Sanchez', '888888888', 'david@example.com', 'cliente', 'password123', 1, 0, '2024-06-13', '15:37:19'),
(11, 'Elena', 'Ramirez', '999999999', 'elena@example.com', 'cliente', 'password123', 0, 0, '2024-06-13', '15:37:19'),
(12, 'Javier', 'Torres', '000000000', 'javier@example.com', 'cliente', 'password123', 1, 0, '2024-06-13', '15:37:19'),
(13, 'Sara', 'Diaz', '112233445', 'sara@example.com', 'cliente', 'password123', 0, 0, '2024-06-13', '15:37:19'),
-- (14, 'Quique', 'Martinez', NULL, 'quiquerestaurante@gmail.com', 'admin', '$2a$10$oS0W5tCkNvspm7663BCKFeO6I0XU75B0EHS6ZM0g7MsozSp3bAAf.', 0, 0, NULL, NULL),
(15, 'laura', 'rodriguezz', '667454545', 'laura.rodriguezperales@gmail.com', 'cliente', 'password', 1, 0, NULL, NULL),
(17, 'laura', 'rodriguezz', '667454545', 'laura.rodriguezperales98@gmail.com', 'cliente', 'password', 1, 0, NULL, NULL),
(19, 'julia', 'rodriguezz', '667454545', 'julia@gmail.com', 'cliente', 'password', 1, 0, NULL, NULL),
(20, 'Jose', 'jose', '2423423432', 'jose@gmail.com', 'cliente', 'password', 1, 0, NULL, NULL),
(22, 'luna', 'luna', '234', 'luna@gmail.com', 'cliente', 'password', 1, 0, NULL, NULL),
(23, 'sol', 'sol', '234', 'sol@gmail.com', 'cliente', 'password', 1, 0, NULL, NULL),
(25, 'holaa', 'holaa', '234', 'holaa@gmail.com', 'cliente', '$2a$10$vxYyIcj0U6iAP/eE4X9eIO0oT/sLRua3ObPuwsDwRn4yo7p3Kyojq', 1, 0, NULL, NULL);

INSERT INTO Reserva (idReserva, fecha, hora, cliente_id, sala_id, mesa_id, comensales, tiempo, estado, precioPagado) VALUES
(1, '2024-06-13', '12:00:00', 1, 1, 1, 2, 'Mediodia', 'Confirmado', 50.00),
(2, '2024-06-13', '12:30:00', 2, 1, 2, 4, 'Mediodia', 'Confirmado', 100.00),
(3, '2024-06-13', '13:00:00', 3, 1, 3, 3, 'Mediodia', 'Confirmado', 75.00),
(4, '2024-06-13', '13:30:00', 4, 2, 4, 1, 'Mediodia', 'Confirmado', 25.00),
(5, '2024-06-13', '14:00:00', 5, 2, 5, 2, 'Mediodia', 'Confirmado', 50.00),
(6, '2024-06-13', '20:00:00', 6, 1, 6, 2, 'Noche', 'Confirmado', 50.00),
(7, '2024-06-13', '20:30:00', 7, 1, 7, 4, 'Noche', 'Confirmado', 100.00),
(8, '2024-06-13', '21:00:00', 8, 1, 8, 3, 'Noche', 'Confirmado', 75.00),
(9, '2024-06-13', '21:30:00', 9, 2, 9, 1, 'Noche', 'Confirmado', 25.00),
(10, '2024-06-13', '22:00:00', 10, 2, 10, 2, 'Noche', 'Confirmado', 50.00),
(11, '2024-06-14', '12:00:00', 11, 1, 11, 2, 'Mediodia', 'Confirmado', 50.00),
(12, '2024-06-14', '12:30:00', 12, 1, 12, 4, 'Mediodia', 'Confirmado', 100.00),
(13, '2024-06-14', '13:00:00', 13, 1, 13, 3, 'Mediodia', 'Confirmado', 75.00),
(14, '2024-06-14', '13:30:00', 1, 2, 14, 1, 'Mediodia', 'Confirmado', 25.00),
(15, '2024-06-14', '14:00:00', 2, 2, 15, 2, 'Mediodia', 'Confirmado', 50.00),
(16, '2024-06-14', '20:00:00', 3, 1, 16, 2, 'Noche', 'Confirmado', 50.00),
(17, '2024-06-14', '20:30:00', 4, 1, 17, 4, 'Noche', 'Confirmado', 100.00),
(18, '2024-06-14', '21:00:00', 5, 1, 18, 3, 'Noche', 'Confirmado', 75.00),
(19, '2024-06-14', '21:30:00', 6, 2, 19, 1, 'Noche', 'Confirmado', 25.00),
(20, '2024-06-14', '22:00:00', 7, 2, 20, 2, 'Noche', 'Confirmado', 50.00);
