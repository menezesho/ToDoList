
// Objetivo: Armazenamento das rotas da aplicação

const express = require('express'); // Importa o Express
const tasksController = require('./controllers/tasks_controller');
const tasksMiddleware = require('./middlewares/tasks_middleware');

const router = express.Router(); // Cria o roteador

router.get('/tasks', tasksController.getAllTasks); // Buscar todas as tarefas
router.post('/tasks', tasksMiddleware.validateTitle, tasksController.createTask); // Criar uma nova tarefa
router.delete('/tasks/:id', tasksController.deleteTask); // Deletar uma tarefa
router.put('/tasks/:id', tasksMiddleware.validateTitle, tasksMiddleware.validateStatus, tasksController.updateTask); // Editar uma tarefa

module.exports = router; // Exporta o roteador