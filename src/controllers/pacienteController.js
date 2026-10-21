const db = require('../config/db');

// 1. LISTAR PACIENTES
exports.listar = async (req, res) => {
    try {
        const [pacientes] = await db.query(
            'SELECT * FROM paciente ORDER BY id_paciente DESC'
        );
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar pacientes'
        });
    }
};

// 2. BUSCAR PACIENTE POR ID
exports.buscar = async (req, res) => {
    try {
        const [pacientes] = await db.query(
            'SELECT * FROM paciente WHERE id_paciente = ?',
            [req.params.id]
        );

        if (pacientes.length === 0) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }

        res.json(pacientes[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar paciente'
        });
    }
};


// 3. REGISTRAR PACIENTE
exports.crear = async (req, res) => {
    try {
        const {
            nombre,
            dni,
            fecha_nacimiento,
            genero,
            telefono,
            correo,
            direccion
        } = req.body;

        // Validar nombre obligatorio
        if (typeof nombre !== 'string' || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        // Registrar paciente en MySQL
        const [resultado] = await db.query(
            `INSERT INTO paciente
            (nombre, dni, fecha_nacimiento, genero,
             telefono, correo, direccion)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre.trim(),
                dni || null,
                fecha_nacimiento || null,
                genero || null,
                telefono || null,
                correo || null,
                direccion || null
            ]
        );

        // Si se registra desde el formulario web
        if (req.is('application/x-www-form-urlencoded')) {
            return res.redirect('/pacientes/dashboard');
        }

        // Respuesta para solicitudes API
        res.status(201).json({
            mensaje: 'Paciente registrado correctamente',
            id_paciente: resultado.insertId
        });

    } catch (error) {
        console.error('Error al registrar paciente:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El DNI ya está registrado'
            });
        }

        res.status(500).json({
            mensaje: 'Error al registrar paciente'
        });
    }
};


// 4. ACTUALIZAR PACIENTE
exports.actualizar = async (req, res) => {
    try {
        const { nombre, dni, telefono, correo } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        const [resultado] = await db.query(
            `UPDATE paciente
             SET nombre = ?, dni = ?, telefono = ?, correo = ?
             WHERE id_paciente = ?`,
            [nombre.trim(), dni || null,
             telefono || null, correo || null,
             req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }

        res.json({
            mensaje: 'Paciente actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar paciente'
        });
    }
};

// 5. ELIMINAR PACIENTE
exports.eliminar = async (req, res) => {
    try {
        const [resultado] = await db.query(
            'DELETE FROM paciente WHERE id_paciente = ?',
            [req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Paciente no encontrado'
            });
        }

        res.json({
            mensaje: 'Paciente eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'No se pudo eliminar el paciente'
        });
    }
};


// Mostrar la interfaz de pacientes
exports.mostrarDashboard = async (req, res) => {
    try {
        const [pacientes] = await db.query(
            'SELECT * FROM paciente ORDER BY id_paciente DESC'
        );

        res.render('paciente/dashboard', { pacientes });
    } catch (error) {
        console.error(error);
        res.status(500).send(
            'Error al cargar la lista de pacientes'
        );
    }
};


// MOSTRAR FORMULARIO DE REGISTRO
exports.mostrarRegistro = (req, res) => {
    res.render('paciente/registro');
};
