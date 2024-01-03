
// Objetivo: Contato direto com o banco de dados realizando operações CRUD

const { json } = require('express'); // Importa o Express
const connection = require('./connection'); // Importa a conexão com o banco de dados

const getAllTasks = async () => {

    // Esta funcionalidade busca todas as tarefas do banco de dados

    const query = 'SELECT * FROM tasks';
    const tasks = await connection.execute(query);
    return tasks[0]; // Retorna apenas o resultado da query
};

const createTask = async (task) => {

    // Esta funcionalidade faz a inserção de uma nova tarefa no banco de dados
    // O título da tarefa deve ser passado
    // O status da tarefa é 'pendente' por padrão
    // A data de criação é gerada no momento da inserção

    const utcDate = new Date(Date.now()).toUTCString(); // Recebe a data atual

    const { title } = task; // Recebe o título da tarefa

    const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';
    const createdTask = await connection.execute(query, [title, 'pendente', utcDate]);

    return {message: 'Tarefa criada com sucesso!', id: createdTask[0].insertId};
};

const updateTask = async (id, task) => {

    // Esta funcionalidade edita uma tarefa do banco de dados
    // O ID da tarefa deve ser passado

    const { title, status} = task; // Recebe o título e o status da tarefa

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    await connection.execute(query, [title, status, id]);
    // return;
};

const deleteTask = async (id) => {

    // Esta funcionalidade deleta uma tarefa do banco de dados
    // O ID da tarefa deve ser passado

    const query = 'DELETE FROM tasks WHERE id = ?';
    await connection.execute(query, [id]);
    return;
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};