const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/pacienteController');

// 1. Listar pacientes
router.get('/', pacienteController.listar);

// 2. Mostrar dashboard
router.get('/dashboard', pacienteController.mostrarDashboard);

// 3. Mostrar formulario de registro
router.get('/nuevo', pacienteController.mostrarRegistro);

// 4. Buscar paciente por ID
router.get('/:id', pacienteController.buscar);

// 5. Registrar paciente
router.post('/', pacienteController.crear);

// 6. Actualizar paciente
router.put('/:id', pacienteController.actualizar);

// 7. Eliminar paciente
router.delete('/:id', pacienteController.eliminar);

module.exports = router;
