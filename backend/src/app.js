const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express(); // Inicializa o express

app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app; // Exporta a aplicação para ser utilizada em outros arquivos