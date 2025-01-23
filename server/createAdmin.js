const bcrypt = require('bcrypt');
const pool = require('./db');

async function createAdminUser() {
    try {
        // Datos del administrador
        const username = 'admin';
        const password = 'Sistemas*2025'; // Cambia esto por la contraseña que desees

        // Generar hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar el usuario en la base de datos
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        console.log('Usuario administrador creado exitosamente:', {
            id: newUser.rows[0].id,
            username: newUser.rows[0].username
        });

    } catch (err) {
        console.error('Error al crear el usuario administrador:', err.message);
    } finally {
        // Cerrar la conexión del pool
        pool.end();
    }
}

createAdminUser();