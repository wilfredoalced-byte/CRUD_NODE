const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Procesar datos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Importar rutas de pacientes
const pacienteRoutes = require('./src/routes/pacienteRoutes');

// Activar rutas CRUD
app.use('/pacientes', pacienteRoutes);

// Página principal
app.get('/', (req, res) => {
    res.send('Sistema Odontológico FASSIARA funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor FASSIARA en http://localhost:${PORT}`);
});
