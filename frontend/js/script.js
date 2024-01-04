const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {

    const url = 'http://localhost:5001/tasks';
    const response = await fetch(url);
    const tasks = await response.json();
    return tasks;
}

const addTask = async (event) => {
    event.preventDefault();
    
    
    const url = 'http://localhost:5001/tasks';
    
    const task = { title: inputTask.value }; // Cria o objeto task

    // Cria o cabeçalho da requisição
    const headers = {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    await fetch(url, headers); // Envia a requisição, passando a url e o cabeçalho

    loadTasks();
}

const updateTask = async ({ id, title, status}) => {
        
    const url = `http://localhost:5001/tasks/${id}`;

    const task = { title, status }; // Cria o objeto task

    // Cria o cabeçalho da requisição
    const headers = {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    await fetch(url, headers); // Envia a requisição, passando a url e o cabeçalho

    loadTasks();
    
}

const deleteTask = async (id) => {

    const url = `http://localhost:5001/tasks/${id}`;

    const headers = { method: 'DELETE', };

    await fetch(url, headers);

    loadTasks();

}

const formatDate = (utcDate) => {

    const options = { dateStyle: 'long', timeStyle: 'short' }; // Cria as opções de formatação
    const date = new Date(utcDate).toLocaleString('pt-br', options); // Cria um objeto Date
    
    return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (innerText !== '')
        element.innerText = innerText;

    if (innerHTML !== '')
        element.innerHTML = innerHTML;
    return element;
}

const createSelect = (value) => {

    const options = `
        <option value="pendente">Pendente</option>
        <option value="em-andamento">Em andamento</option>
        <option value="concluido">Concluído</option>
    `; // Cria as opções do select

    const select = createElement('select', '', options);

    select.value = value
    return select;
}

const createRow = (task) => {

    const { id, title, created_at, status } = task; // Desconstroi o objeto task

    // Cria os elementos da linha
    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status); // Cria o select

    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value})); // Adiciona o evento de mudança no select

    // Cria os botões, passando os ícones como parâmetro    
    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form'); // Cria o formulário para edição da task
    const editInput = createElement('input'); // Cria o input para edição da task
    const saveButton = createElement('button', '', '<span class="material-symbols-outlined">done</span>'); // Cria o botão de salvar

    editInput.value = title; // Adiciona o título da task no input
    editForm.appendChild(editInput); // Adiciona o input no formulário

    const saveTask = (event) => {
        event.preventDefault();
        updateTask({ ...task, title: editInput.value }); // Atualiza a task
        tdActions.removeChild(saveButton); // Remove o botão de salvar
    }

    editForm.addEventListener('submit', (event) => {
        saveTask(event);
    });

    saveButton.addEventListener('click', (event) => {
        saveTask(event);
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = ''; // Limpa o título da task
        tdTitle.appendChild(editForm); // Adiciona o formulário na coluna do título
        editInput.value = title; // Adiciona o título da task no input
        editInput.focus(); // Coloca o foco no input
        tdActions.appendChild(saveButton); // Adiciona o botão de salvar no formulário
    });

    // Adiciona as classes nos botões
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');
    saveButton.classList.add('btn-action');

    // Adiciona os eventos de clique nos botões
    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select); // Adiciona o select na coluna status
    
    // Aplica os eventos nos botões
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    // Monta a linha da tabela
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}

const loadTasks = async () => {

    tbody.innerHTML = ''; // Limpa a tabela
    
    const tasks = await fetchTasks(); // Busca as tarefas

    tasks.forEach((task) => {
        const tr = createRow(task); // Cria a linha da tabela
        tbody.appendChild(tr); // Adiciona a linha na tabela
    });

    inputTask.value = ''; // Limpa o input
}

addForm.addEventListener('submit', addTask);

loadTasks(); // Carrega as tarefas ao carregar a página