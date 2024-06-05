INSERT INTO Cliente (nombre, apellido, telefono, email, password, login, banear, fechaRegistro, horaRegistro) VALUES
('Juan', 'Perez', '555-0101', 'juan.perez@example.com', 'hashed_password1', TRUE, FALSE, CURDATE(), CURTIME()),
('Ana', 'Lopez', '555-0102', 'ana.lopez@example.com', 'hashed_password2', TRUE, FALSE, CURDATE(), CURTIME()),
('Luis', 'Martinez', '555-0103', 'luis.martinez@example.com', 'hashed_password3', TRUE, FALSE, CURDATE(), CURTIME()),
('Sofia', 'Garcia', '555-0104', 'sofia.garcia@example.com', 'hashed_password4', FALSE, TRUE, CURDATE(), CURTIME()),
('Carlos', 'Diaz', '555-0105', 'carlos.diaz@example.com', 'hashed_password5', FALSE, TRUE, CURDATE(), CURTIME()),
('Lucia', 'Hernandez', '555-0106', 'lucia.hernandez@example.com', 'hashed_password6', FALSE, FALSE, CURDATE(), CURTIME()),
('Miguel', 'Alvarez', '555-0107', 'miguel.alvarez@example.com', 'hashed_password7', TRUE, FALSE, CURDATE(), CURTIME()),
('Laura', 'Castro', '555-0108', 'laura.castro@example.com', 'hashed_password8', TRUE, FALSE, CURDATE(), CURTIME()),
('Oscar', 'Ruiz', '555-0109', 'oscar.ruiz@example.com', 'hashed_password9', FALSE, TRUE, CURDATE(), CURTIME()),
('Irene', 'Molina', '555-0110', 'irene.molina@example.com', 'hashed_password10', TRUE, FALSE, CURDATE(), CURTIME());

INSERT INTO Sala (nombre, capacidadMaxima) VALUES 
('Sala entrada', 10),
('Salon', 18),
('Salon grande', 42),
('Terraza', 16);

-- Sala de Entrada
INSERT INTO Mesa (numeroMesa, idSala) VALUES
(1, 1), -- Sala de Entrada
(2, 1), -- Sala de Entrada
(3, 1); -- Sala de Entrada

-- Salón
INSERT INTO Mesa (numeroMesa, idSala) VALUES
(1, 2), -- Salón
(2, 2), -- Salón
(3, 2); -- Salón

-- Salón Grande
INSERT INTO Mesa (numeroMesa, idSala) VALUES
(1, 3), -- Salón Grande
(2, 3), -- Salón Grande
(3, 3), -- Salón Grande
(4, 3), -- Salón Grande
(5, 3), -- Salón Grande
(6, 3), -- Salón Grande
(7, 3); -- Salón Grande

-- Terraza
INSERT INTO Mesa (numeroMesa, idSala) VALUES
(1, 4), -- Terraza
(2, 4), -- Terraza
(3, 4), -- Terraza
(4, 4); -- Terraza


INSERT INTO Reserva (fecha, hora, cliente_id, mesa_id, comensales, tiempo, estado, precioPagado) VALUES
('2024-06-01', '12:00:00', 1, 2, 4, 'Mediodia', 'Confirmado', 50.00),
('2024-06-01', '19:00:00', 2, 4, 2, 'Noche', 'Confirmado', 75.00),
('2024-06-01', '12:00:00', 3, 7, 1, 'Mediodia', 'Cancelado', 25.00),
('2024-06-01', '19:00:00', 4, 9, 3, 'Noche', 'Confirmado', 100.00),
('2024-06-01', '12:00:00', 5, 10, 2, 'Mediodia', 'Confirmado', 60.00),
('2024-06-02', '19:00:00', 6, 3, 4, 'Noche', 'Confirmado', 80.00),
('2024-06-02', '12:00:00', 7, 1, 2, 'Mediodia', 'Confirmado', 45.00),
('2024-06-02', '19:00:00', 8, 5, 2, 'Noche', 'Cancelado', 90.00),
('2024-06-02', '12:00:00', 9, 6, 3, 'Mediodia', 'Confirmado', 55.00),
('2024-06-02', '19:00:00', 10, 8, 4, 'Noche', 'Confirmado', 120.00);
