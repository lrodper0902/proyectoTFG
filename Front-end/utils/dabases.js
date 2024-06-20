import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'restaurante_database',
});

console.log('Conexión establecida correctamente');

export default connection;