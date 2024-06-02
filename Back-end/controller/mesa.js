const getConnection = require('../database/connect');

class MesaController {
    static async getAllMesas(req, res) {
        const conn = await getConnection();
        try {
            const [mesas] = await conn.query('SELECT * FROM Mesa');
            res.json(mesas);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener las mesas', error });
        }
    }

    static async getMesa(req, res) {
        const conn = await getConnection();
        try {
            const [mesas] = await conn.query('SELECT * FROM Mesa WHERE idMesa = ?', [req.params.id]);
            if (mesas.length > 0) {
                res.json(mesas[0]);
            } else {
                res.status(404).send({ message: 'Mesa no encontrada' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la mesa', error });
        }
    }

    static async createMesa(req, res) {
        const { numeroMesa, capacidad, estado, idCliente } = req.body;
        const conn = await getConnection();
        try {
            const result = await conn.query('INSERT INTO Mesa (numeroMesa, capacidad, estado, idCliente) VALUES (?, ?, ?, ?)', [numeroMesa, capacidad, estado, idCliente]);
            res.status(201).send({ message: 'Mesa creada', id: result.insertId });
        } catch (error) {
            res.status(500).send({ message: 'Error al crear la mesa', error });
        }
    }

    static async updateMesa(req, res) {
        const { numeroMesa, capacidad, estado, idCliente } = req.body;
        const conn = await getConnection();
        try {
            const result = await conn.query('UPDATE Mesa SET numeroMesa = ?, capacidad = ?, estado = ?, idCliente = ? WHERE idMesa = ?', [numeroMesa, capacidad, estado, idCliente, req.params.id]);
            if (result.affectedRows > 0) {
                res.send({ message: 'Mesa actualizada' });
            } else {
                res.status(404).send({ message: 'Mesa no encontrada' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar la mesa', error });
        }
    }

    static async deleteMesa(req, res) {
        const conn = await getConnection();
        try {
            const result = await conn.query('DELETE FROM Mesa WHERE idMesa = ?', [req.params.id]);
            if (result.affectedRows > 0) {
                res.send({ message: 'Mesa eliminada' });
            } else {
                res.status(404).send({ message: 'Mesa no encontrada' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar la mesa', error });
        }
    }
}

module.exports = MesaController;
