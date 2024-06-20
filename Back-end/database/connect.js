const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    passwor: 'password',
    database:  'restaurante_database',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const getConnection = async () => {
    try {
        console.log('Conectado correctamente a la base de datos: restaurante_database' );
       return pool;
    } catch (error) {
        console.error("No se ha podido conectar a la base de datos del restaurante", error)
        throw error;
    }
};

module.exports = getConnection;