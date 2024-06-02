INSERT INTO Cliente (idCliente, nombre, apellido, telefono, email, password, login, fechaRegistro, horaRegistro) VALUES
('Juan', 'Pérez', '555-0101', 'juan.perez@example.com', 'hashed_password1', TRUE, '2024-05-01', '08:00:00'),
('Ana', 'Lopez', '555-0102', 'ana.lopez@example.com', 'hashed_password2', TRUE, '2024-05-01', '09:00:00'),
('Luis', 'Martinez', '555-0103', 'luis.martinez@example.com', 'hashed_password3', TRUE, '2024-05-01', '10:00:00'),
('Sofia', 'Garcia', '555-0104', 'sofia.garcia@example.com', 'hashed_password4', FALSE, '2024-05-01', '11:00:00'),
('Carlos', 'Díaz', '555-0105', 'carlos.diaz@example.com', 'hashed_password5', FALSE, '2024-05-01', '12:00:00'),
('Lucia', 'Hernandez', '555-0106', 'lucia.hernandez@example.com', 'hashed_password6', FALSE, '2024-05-01', '13:00:00'),
('Miguel', 'Álvarez', '555-0107', 'miguel.alvarez@example.com', 'hashed_password7', TRUE, '2024-05-01', '14:00:00');

INSERT INTO Mesa (numeroMesa, capacidad, estado, idCliente) VALUES
(1, 4, 'Disponible', NULL),
(2, 2, 'Disponible', NULL),
(3, 6, 'Disponible', NULL),
(4, 4, 'Disponible', NULL),
(5, 2, 'Disponible', NULL),
(6, 4, 'Disponible', NULL),
(7, 6, 'Disponible', NULL),
(8, 4, 'Disponible', NULL),
(9, 2, 'Disponible', NULL),
(10, 4, 'Disponible', NULL);

INSERT INTO Reserva (fecha, hora, cliente_id, mesa_id, comensales, tiempo, estado, precioPagado) VALUES
('2024-05-31', '12:00', 1, 1, 2, 'Mediodia', 'Confirmado', 30.50),
('2024-05-31', '12:00', 2, 2, 2, 'Mediodia', 'Confirmado', 25.00),
('2024-05-31', '19:00', 3, 3, 4, 'Noche', 'Confirmado', 45.00),
('2024-05-31', '19:00', 4, 4, 3, 'Noche', 'Confirmado', 40.00),
('2024-06-01', '12:00', 5, 5, 1, 'Mediodia', 'Confirmado', 20.00),
('2024-06-01', '12:00', 6, 6, 2, 'Mediodia', 'Confirmado', 22.00),
('2024-06-01', '19:00', 7, 7, 5, 'Noche', 'Confirmado', 55.00);
