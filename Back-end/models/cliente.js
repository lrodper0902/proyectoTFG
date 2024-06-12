const getConnection = require('../database/connect');
// const jwt = require("../services/jwt");
const bcrypt = require('bcryptjs'); 

class Cliente {
    static async findAll() {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM Cliente');
        return rows;
    }

    static async findById(id) {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM Cliente WHERE idCliente = ?', [id]);
        return rows;
    }

    static async findByEmail(email) {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM Cliente WHERE email = ?', [email]);
        return rows;
    }    
        
    static async register(data) {
        const conn = await getConnection();
        const { nombre, apellido, telefono, email, password } = data;
        console.log(nombre+' Contraseña:'+ password)
        if (!password) {
            throw new Error("La contraseña no puede estar vacía " + nombre);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await conn.query('INSERT INTO Cliente (nombre, apellido, telefono, email, password, login) VALUES (?, ?, ?, ?, ?, TRUE)', [nombre, apellido, telefono, email, hashedPassword]);
        return result;
    }
    
    
    static async login({ email, password }) {
        const conn = await getConnection();
        const [result] = await conn.query( 'SELECT idCliente, email, password, rol FROM Cliente WHERE email = ?', [email])
        if (result.length === 0) {
            throw new Error('Usuario no encontrado');
        } 
        const user = result[0];
        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (passwordIsValid) {
            return { idCliente: user.idCliente, email: user.email, rol: user.rol };
        } else {
            return {message: "Contraseña incorrecta"}
        }
    }

    static async create(data) {
        try {
            const conn = await getConnection();
            const { nombre, apellido, telefono, email, password, login } = data;
            console.log('Datos recibidos para registro:', data);
    
            const [result] = await conn.query('INSERT INTO Cliente (nombre, apellido, telefono, email, password, login) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, telefono, email, password, login]);
            console.log('Cliente creado con éxito:', result);
            return result;
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            throw error; // Re-lanzar el error para manejo en el caller
        }
    }

    static async update(id, data) {
        try {
            const conn = await getConnection();
            const { banear } = data;
            const [result] = await conn.query('UPDATE Cliente SET banear = ? WHERE idCliente = ?', [banear, id]);

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        const conn = await getConnection();
        const [result] = await conn.query('DELETE FROM Cliente WHERE idCliente = ?', [id]);
        return result;
    }
}

module.exports = Cliente;
