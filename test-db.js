const db = require('./src/config/db');

async function probarConexion() {
    try {
        const [resultado] = await db.query(
            'SELECT DATABASE() AS base_datos'
        );

        console.log('CONEXIÓN EXITOSA CON MYSQL');
        console.log('Base de datos:', resultado[0].base_datos);

    } catch (error) {
        console.error('ERROR DE CONEXIÓN:', error.message);
    } finally {
        await db.end();
    }
}

probarConexion();
