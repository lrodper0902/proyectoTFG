const getConnection = require('../database/connect');

class SalaController {
    static async getAllSalas(req, res) {
        const conn = await getConnection();
        try {
            const [salas] = await conn.query('SELECT * FROM Sala');
            res.json(salas);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener las salas', error });
        }
    }

    static async getSala(req, res) {
        const conn = await getConnection();
        try {
            const [salas] = await conn.query('SELECT * FROM Sala WHERE idSala = ?', [req.params.id]);
            if (salas.length > 0) {
                res.json(salas[0]);
            } else {
                res.status(404).send({ message: 'Sala no encontrada' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la sala', error });
        }
    }
}

module.exports = SalaController;
