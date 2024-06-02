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
    
            const result = await conn.query(
                'INSERT INTO Reserva (fecha, hora, cliente_id, mesa_id, tiempo, estado, precioPagado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [fecha, hora, cliente_id, mesa_id, tiempo, estado, precioPagado]
            );
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