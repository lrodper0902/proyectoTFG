const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'laura',
    password: 'password',
    database: 'restaurante_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const getConnection = async () => {
    try {
        console.log('Conectado correctamente <3');
       return pool;
    } catch (error) {
        console.error("No se ha podido conectar a la base de datos del restaurante", error)
        throw error;
    }
};

module.exports = getConnection;
