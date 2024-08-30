const express = require('express');
const path = require('path'); // Importar o módulo path
const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./productRoutes');

// Middleware
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname))); // Serve arquivos estáticos da pasta principal

// Rota principal para servir a home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
