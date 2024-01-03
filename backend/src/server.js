const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 5500; // Define a porta que será utilizada

app.listen(port, () => {} ); // Inicializa o servidor