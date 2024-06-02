const pool = require('./database');  // Asegúrate de que el path al archivo de conexión es correcto

// Crear una nueva reserva
function createReserva(reservaData, callback) {
    pool.query(
        `INSERT INTO Reserva (fecha, hora, cliente_id, mesa_id, tiempo, estado, precioPagado) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [reservaData.fecha, reservaData.hora, reservaData.cliente_id, reservaData.mesa_id, reservaData.tiempo, reservaData.estado, reservaData.precioPagado],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

// Obtener todas las reservas
function getAllReservas(callback) {
    pool.query(
        `SELECT * FROM Reserva`,
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

// Obtener una reserva por ID
function getReservaById(id, callback) {
    pool.query(
        `SELECT * FROM Reserva WHERE id = ?`,
        [id],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

// Actualizar una reserva
function updateReserva(id, reservaData, callback) {
    pool.query(
        `UPDATE Reserva SET fecha = ?, hora = ?, cliente_id = ?, mesa_id = ?, tiempo = ?, estado = ?, precioPagado = ? WHERE id = ?`,
        [reservaData.fecha, reservaData.hora, reservaData.cliente_id, reservaData.mesa_id, reservaData.tiempo, reservaData.estado, reservaData.precioPagado, id],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

// Eliminar una reserva
function deleteReserva(id, callback) {
    pool.query(
        `DELETE FROM Reserva WHERE id = ?`,
        [id],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

module.exports = {
    createReserva,
    getAllReservas,
    getReservaById,
    updateReserva,
    deleteReserva
};
