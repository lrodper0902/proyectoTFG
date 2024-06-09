const bcrypt = require('bcryptjs');
const getConnection = require('../database/connect'); // Asegúrate de ajustar la ruta según tu estructura de carpetas

async function insertAdmin() {
    const nombre = "Quique";
    const apellido = "Martinez";
    const email = "quiquerestaurante@gmail.com";
    const contraseña = "password";
    const rol = "admin";

    try {
        const conn = await getConnection();
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const sql = `
            INSERT INTO Cliente (nombre, apellido, telefono, email, password, rol, login, banear, fechaRegistro, horaRegistro)
            VALUES (?, ?, NULL, ?, ?, ?, FALSE, FALSE, NULL, NULL);
        `;
        const [results] = await conn.execute(sql, [nombre, apellido, email, hashedPassword, rol]);
        console.log("Administrador añadido con éxito:", results);
    } catch (error) {
        console.error("Error al añadir administrador:", error);
    }
}

insertAdmin();