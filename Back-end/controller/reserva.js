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

    // static async createReservaPuntual(req, res) {
    //     console.log("Ha entrado en crear reservas puntual")
    //     const { fecha, hora, nombre, apellido, telefono, comensales, tiempo, mesaId } = req.body;
    //     console.log(fecha, hora, nombre, apellido, telefono, comensales, tiempo, mesaId)
    
    //     try {
    //         // Verificar si todos los campos requeridos están presentes
    //         if (!fecha || !hora || !nombre || !apellido || !telefono || !comensales || !tiempo || !mesaId) {
    //             return res.status(400).json({ message: 'Faltan datos para crear la reserva' });
    //         }
    
    //         const conn = await getConnection();
    
    //         // Verificar si el cliente ya existe en la base de datos
    //         let [existeCliente] = await conn.query('SELECT idCliente FROM Cliente WHERE nombre = ? AND apellido = ? AND telefono = ?', [nombre, apellido, telefono]);
    //         console.log('Resultado de la consulta para verificar si el cliente existe:', existeCliente);
    //         if (existeCliente.length === 0) {
    //             // Si el cliente no existe, crearlo
    //             console.log('El cliente no existe en la base de datos.');
    //             const [result] = await conn.query('INSERT INTO Cliente (nombre, apellido, telefono) VALUES (?, ?, ?)', [nombre, apellido, telefono]);
    //             const clienteId = result.insertId;
    //             existeCliente = [{ idCliente: clienteId }];
    //         }
    //         console.log('El cliente ya existe en la base de datos.');
    
    //         const clienteId = existeCliente[0].idCliente;
    
    //         // Insertar la reserva en la base de datos
    //         await conn.query(
    //             'INSERT INTO Reserva (fecha, hora, cliente_id, mesa_id, comensales, tiempo, estado, precioPagado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    //             [fecha, hora, clienteId, mesaId, comensales, tiempo, null, null]
    //         );
    
    //         // Actualizar el estado de la mesa a "ocupada"
    //         await conn.query(
    //             'UPDATE Mesa SET estado = ? WHERE idMesa = ?',
    //             ['ocupada', mesaId]
    //         );
    
    //         res.status(201).json({ message: 'Reserva creada correctamente' });
    //     } catch (error) {
    //         console.error('Error al crear la reserva:', error);
    
    //         // Determinar el tipo de error
    //         let errorMessage = 'Error al crear la reserva';
    //         if (error.code === 'ER_DUP_ENTRY') {
    //             errorMessage = 'Ya existe una reserva para esta fecha y hora';
    //         } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    //             errorMessage = 'La mesa seleccionada no existe';
    //         }
    
    //         res.status(500).json({ message: errorMessage });
    //     }
    // }

    // static async createReservaPuntual(req, res) {
    //     console.log("Ha entrado a crear reserva puntual");
    //     const { fecha, hora, nombre, apellido, telefono, comensales, tiempo, salaId } = req.body;
    
    //     if (!fecha || !hora || !nombre || !apellido || !telefono || !comensales || !tiempo || !salaId) {
    //         return res.status(400).json({ message: 'Faltan datos para crear la reserva' });
    //     }
    
    //     try {
    //         const conn = await getConnection();
    //         console.log(fecha + ' ' + tiempo + ' ' + salaId)
    //         // Verificamos la capacidad disponible en la sala
    //         const [capacidad] = await conn.query(`
    //             SELECT 
    //                 s.capacidad - COALESCE(SUM(r.comensales), 0) AS capacidad_disponible
    //             FROM 
    //                 Sala s
    //             LEFT JOIN 
    //                 Reserva r ON s.idSala = r.sala_id AND r.fecha = ? AND r.tiempo = ? AND r.estado = 'Confirmado'
    //             WHERE 
    //                 s.idSala = ?
    //             GROUP BY 
    //                 s.idSala
    //         `, [fecha, tiempo, salaId]);
    
    //         if (capacidad[0].capacidad_disponible < comensales) {
    //             return res.status(400).json({ message: 'No hay suficiente capacidad en la sala para la reserva' });
    //         }
    
    //         // Verificar si el cliente ya existe en la base de datos y si no, crearlo
    //         let [existeCliente] = await conn.query('SELECT idCliente FROM Cliente WHERE nombre = ? AND apellido = ? AND telefono = ?', [nombre, apellido, telefono]);
    //         if (existeCliente.length === 0) {
    //             const [result] = await conn.query('INSERT INTO Cliente (nombre, apellido, telefono) VALUES (?, ?, ?)', [nombre, apellido, telefono]);
    //             existeCliente = [{ idCliente: result.insertId }];
    //         }
    
    //         const clienteId = existeCliente[0].idCliente;
    
    //         // Crear la reserva
    //         await conn.query(
    //             'INSERT INTO Reserva (fecha, hora, cliente_id, sala_id, comensales, tiempo, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
    //             [fecha, hora, clienteId, salaId, comensales, tiempo, 'Confirmado']
    //         );
    
    //         res.status(201).json({ message: 'Reserva creada correctamente' });
    //     } catch (error) {
    //         console.error('Error al crear la reserva:', error);
    //         res.status(500).json({ message: 'Error al procesar la reserva' });
    //     }
    // }

    static async verificarCapacidad (req, res) {
        console.log("verificar capacidad")
        const { salaId, fecha, tiempo } = req.query;
        try {
            const conn = await getConnection();
            const [results] = await conn.query(`
                SELECT 
                    s.capacidad - COALESCE(SUM(r.comensales), 0) AS capacidad_disponible
                FROM 
                    Sala s
                LEFT JOIN 
                    Reserva r ON s.idSala = r.sala_id 
                    AND r.fecha = ?
                    AND r.tiempo = ?
                    AND r.estado = 'Confirmado'
                WHERE 
                    s.idSala = ?
                GROUP BY 
                    s.idSala
            `, [fecha, tiempo, salaId]);
    
            res.json({ capacidad_disponible: results[0]?.capacidad_disponible || 0 });
        } catch (error) {
            console.error('Error al verificar la disponibilidad:', error);
            res.status(500).send({ message: 'Error al verificar la disponibilidad' });
        }
    }

    // static async crearReserva (req, res) {
    //     console.log("crear reserva")

    //     const { fecha, hora, clienteId, salaId, comensales, tiempo } = req.body;
    //     console.log(fecha + ' '+  hora + ' '+  clienteId + ' '+ salaId + ' '+  comensales + ' '+ tiempo)
    //     try {
    //         const conn = await getConnection();
            
    //         const [result] = await conn. query('INSERT INTO Reserva (fecha, hora, cliente_id, sala_id, comensales, tiempo, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha, hora, clienteId, salaId, comensales, tiempo, 'Confirmado']);
    //         console.log(result);
    //         if (result.affectedRows === 1) {
    //             console.log('Reserva creada correctamente.');
    //             res.status(201).json({ message: 'Reserva creada correctamente' });
    //         } else {
    //             throw new Error('No se pudo insertar la reserva.');
    //         }
    //     } catch (error) {
    //         console.error('Error al crear la reserva:', error);
    //         res.status(500).json({ message: 'Error al crear la reserva' });
    //     }
    // }
    static async crearReserva (req, res) {
        console.log("crear reserva");
        const { fecha, hora, nombre, apellido, telefono, salaId, comensales, tiempo } = req.body;
    
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
                query = 'INSERT INTO Cliente (nombre, apellido, telefono) VALUES (?, ?, ?)';
                const [result] = await conn.query(query, [nombre, apellido, telefono]);
                console.log(result)
                clienteId = result.insertId;
            }
    
            // Insertar la reserva en la base de datos
            query = 'INSERT INTO Reserva (fecha, hora, cliente_id, sala_id, comensales, tiempo, estado) VALUES (?, ?, ?, ?, ?, ?, "Confirmado")';
            const [result] = await conn.query(query, [fecha, hora, clienteId, salaId, comensales, tiempo]);
            console.log(result)
            if (result.affectedRows === 1) {
                res.status(201).json({ message: 'Reserva creada correctamente' });
            } else {
                throw new Error('No se pudo insertar la reserva');
            }
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
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