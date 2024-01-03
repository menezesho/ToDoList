
// Objetivo: Gerenciamento das funcionalidades da aplicação

const tasksModel = require('../models/tasks_model');

const getAllTasks = async (request, response) => {

    // Esta funcionalidade busca todas as tarefas do banco de dados

    const tasks = await tasksModel.getAllTasks();
    return response.status(200).json(tasks); // Retorna o resultado da query
};

const createTask = async (request, response) => {

    // Esta funcionalidade faz a inserção de uma nova tarefa no banco de dados
    // O título da tarefa é recebido através do corpo da requisição (request.body)
    
    const createdTask = await tasksModel.createTask(request.body);
    return response.status(201).json(createdTask);
};

const updateTask = async (request, response) => {

    // Esta funcionalidade edita uma tarefa do banco de dados
    // O id da tarefa é recebido através dos parâmetros da requisição (request.params)
    // O título e o status da tarefa são recebidos através do corpo da requisição (request.body)

    const { id } = request.params;
    await tasksModel.updateTask(id, request.body);
    return response.status(204).json();
};

const deleteTask = async (request, response) => {
    
    // Esta funcionalidade deleta uma tarefa do banco de dados
    // O id da tarefa é recebido através dos parâmetros da requisição (request.params)

    const { id } = request.params;
    await tasksModel.deleteTask(id);
    return response.status(204).json();
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};