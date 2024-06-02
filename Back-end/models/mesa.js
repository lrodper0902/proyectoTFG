const getConnection = require('../database/connect');

class Mesa {
    static async findAll() {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM Mesa');
        return rows;
    }

    static async findById(id) {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM Mesa WHERE idMesa = ?', [id]);
        return rows;
    }

    static async create(data) {
        const conn = await getConnection();
        const { numeroMesa, capacidad, estado, idCliente } = data;
        const result = await conn.query('INSERT INTO Mesa (numeroMesa, capacidad, estado, idCliente) VALUES (?, ?, ?, ?)', [numeroMesa, capacidad, estado, idCliente]);
        return result;
    }

    static async update(id, data) {
        const conn = await getConnection();
        const { numeroMesa, capacidad, estado, idCliente } = data;
        const result = await conn.query('UPDATE Mesa SET numeroMesa = ?, capacidad = ?, estado = ?, idCliente = ? WHERE idMesa = ?', [numeroMesa, capacidad, estado, idCliente, id]);
        return result;
    }

    static async delete(id) {
        const conn = await getConnection();
        const result = await conn.query('DELETE FROM Mesa WHERE idMesa = ?', [id]);
        return result;
    }
}

module.exports = Mesa;
