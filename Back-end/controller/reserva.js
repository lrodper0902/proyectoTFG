const getConnection = require('../database/connect');

class ReservaController {
    static async getAllReservas(req, res) {
        const conn = await getConnection();
        try {
            const [reservas] = await conn.query('SELECT * FROM Reserva');
            res.json(reservas);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener las reservas', error });
        }
    }

    static async obtenerReservasPorCliente(req, res) {
        const cliente_id = req.params.id;
        const conn = await getConnection();
        try {
          const [reservas] = await conn.query(
            `SELECT r.*, s.nombre AS salaNombre
             FROM Reserva r
             JOIN Sala s ON r.sala_id = s.idSala
             WHERE r.cliente_id = ?`,
            [cliente_id]
          );
          res.status(200).json(reservas);
        } catch (error) {
          console.error('Error al obtener las reservas:', error);
          res.status(500).json({ message: 'Error al obtener las reservas', error });
        }
      }
    
    static async verificarCapacidad (req, res) {
        console.log("verificar capacidad")
        const { salaId, fecha, tiempo } = req.query;
        console.log(tiempo)
        console.log(fecha)
        console.log(salaId)
        try {
            const conn = await getConnection();
            const [results] = await conn.query(`
                SELECT s.capacidad - COALESCE(SUM(r.comensales), 0) AS capacidad_disponible
                    FROM Sala s
                        LEFT JOIN  Reserva r ON s.idSala = r.sala_id  AND r.fecha = ? AND r.tiempo = ? AND r.estado = 'Confirmado'
                            WHERE s.idSala = ? 
                                GROUP BY s.idSala
            `, [fecha, tiempo, salaId]);
    
            res.json({ capacidad_disponible: results[0]?.capacidad_disponible || 0 });
        } catch (error) {
            console.error('Error al verificar la disponibilidad:', error);
            res.status(500).send({ message: 'Error al verificar la disponibilidad' });
        }
    }

    static async crearReserva (req, res) {
        console.log("crear reserva");
        const { fecha, hora, nombre, apellido, telefono, email, salaId, comensales, tiempo } = req.body;
    
        try {
            const conn = await getConnection();
    
            // Verificar si el cliente ya existe
            let query = 'SELECT idCliente FROM Cliente WHERE telefono = ?';
            let [cliente] = await conn.query(query, [telefono]);
            console.log(cliente)
    
            let clienteId;
            if (cliente.length > 0) {
                // Cliente existe, usar el id existente
                clienteId = cliente[0].idCliente;
            } else {
                // Cliente no existe, crear uno nuevo
                query = 'INSERT INTO Cliente (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)';
                const [result] = await conn.query(query, [nombre, apellido, telefono, email]);
                console.log(result)
                clienteId = result.insertId;

            
            // Insertar la reserva en la base de datos
            query = 'INSERT INTO Reserva (fecha, hora, cliente_id, sala_id, comensales, tiempo, estado) VALUES (?, ?, ?, ?, ?, ?, "Confirmado")';
            const [result2] = await conn.query(query, [fecha, hora, clienteId, salaId, comensales, tiempo]);
            console.log(result2)
            if (result2.affectedRows === 1) {
                res.status(201).json({ message: 'Reserva creada correctamente' });
            } else {
                throw new Error('No se pudo insertar la reserva');
            }
           } 
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
        }
    }
    

    //Eliminar este endpoint
    static async createReserva(req, res) {
        const { fecha, hora, cliente_id, mesa_id, tiempo, estado } = req.body;
        let { precioPagado } = req.body;  // Recibimos precioPagado, pero podríamos ajustarlo
        const conn = await getConnection();
        try {
            // Verificamos que el cliente está registrado
            const [cliente] = await conn.query('SELECT * FROM Cliente WHERE idCliente = ?', [cliente_id]);
            if (cliente.length > 0) {
                precioPagado = 0;  
            }
            console.log(fecha, hora, cliente_id, mesa_id, tiempo, estado  );
            // Verificar si la mesa está disponible
            const [mesa] = await conn.query('SELECT * FROM Mesa WHERE idMesa = ? AND estado = ?', [mesa_id, 'Disponible']);
            console.log(mesa)
            if (mesa.length === 0) {
                res.status(400).send({ message: 'La mesa no está disponible' });
                return;
            }

            // Actualizar el estado de la mesa a "Ocupada"
            await conn.query('UPDATE Mesa SET estado = ? WHERE idMesa = ?', ['Ocupada', mesa_id]);
            console.log(mesa_id.estado)

    
            const result = await conn.query(
                'INSERT INTO Reserva (fecha, hora, cliente_id, mesa_id, tiempo, estado, precioPagado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [fecha, hora, cliente_id, mesa_id, tiempo, estado, precioPagado]
            );
            console.log("result")
            console.log(result)
            res.status(201).send({ message: 'Reserva creada', id: result.insertId });
        } catch (error) {
            res.status(500).send({ message: 'Error al crear la reserva', error });
        }
    }

    static async updateReserva(req, res) {
        const { fecha, hora, cliente_id, mesa_id, tiempo, estado, precioPagado } = req.body;
        const conn = await getConnection();
        try {
            const result = await conn.query('UPDATE Reserva SET fecha = ?, hora = ?, cliente_id = ?, mesa_id = ?, tiempo = ?, estado = ?, precioPagado = ? WHERE idReserva = ?', [fecha, hora, cliente_id, mesa_id, tiempo, estado, precioPagado, req.params.id]);
            if (result.affectedRows > 0) {
                res.send({ message: 'Reserva actualizada' });
            } else {
                res.status(404).send({ message: 'Reserva no encontrada' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar la reserva', error });
        }
    }

    static async deleteReserva(req, res) {
        const conn = await getConnection();
        try {
            const result = await conn.query('DELETE FROM Reserva WHERE idReserva = ?', [req.params.id]);
            if (result.affectedRows > 0) {
                res.send({ message: 'Reserva eliminada' });
            } else {
                res.status(404).send({ message: 'Reserva no encontrada' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar la reserva', error });
        }
    }
}

module.exports = ReservaController;