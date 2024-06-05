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

    static async createReservaPuntual(req, res) {
        console.log("Ha entrado en crear reservas puntual")
        const { fecha, hora, nombre, apellido, telefono, comensales, tiempo, mesaId } = req.body;
        console.log(fecha, hora, nombre, apellido, telefono, comensales, tiempo, mesaId)
        
    
        try {
            // Verificar si todos los campos requeridos están presentes
            if (!fecha || !hora || !nombre || !apellido || !telefono || !comensales || !tiempo || !mesaId) {
                return res.status(400).json({ message: 'Faltan datos para crear la reserva' });
            }
    
            const conn = await getConnection();
    
            // Verificar si el cliente ya existe en la base de datos
            let [existeCliente] = await conn.query('SELECT idCliente FROM Cliente WHERE nombre = ? AND apellido = ? AND telefono = ?', [nombre, apellido, telefono]);
            console.log('Resultado de la consulta para verificar si el cliente existe:', existeCliente);
            if (existeCliente.length === 0) {
                // Si el cliente no existe, crearlo
                console.log('El cliente no existe en la base de datos.');
                const [result] = await conn.query('INSERT INTO Cliente (nombre, apellido, telefono) VALUES (?, ?, ?)', [nombre, apellido, telefono]);
                const clienteId = result.insertId;
                existeCliente = [{ idCliente: clienteId }];
            }
            console.log('El cliente ya existe en la base de datos.');
    
            const clienteId = existeCliente[0].idCliente;
    
            // Insertar la reserva en la base de datos
            await conn.query(
                'INSERT INTO Reserva (fecha, hora, cliente_id, mesa_id, comensales, tiempo, estado, precioPagado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [fecha, hora, clienteId, mesaId, comensales, tiempo, null, null]
            );
    
            res.status(201).json({ message: 'Reserva creada correctamente' });
        } catch (error) {
            console.error('Error al crear la reserva:', error);
    
            // Determinar el tipo de error
            let errorMessage = 'Error al crear la reserva';
            if (error.code === 'ER_DUP_ENTRY') {
                errorMessage = 'Ya existe una reserva para esta fecha y hora';
            } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                errorMessage = 'La mesa seleccionada no existe';
            }
    
            res.status(500).json({ message: errorMessage });
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
            console.log(fecha, hora, cliente_id, mesa_id, tiempo, estado  );
    
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