const express = require('express');
const router = require('./router');

const app = express(); // Inicializa o express

app.use(express.json()); // Define que a aplicação irá utilizar o formato JSON
app.use(router); // Define que a aplicação irá utilizar o arquivo router.js para as rotas da API

module.exports = app; // Exporta a aplicação para ser utilizada em outros arquivos