
// Objetivo: Realizar verificações para evitar quebra da aplicação

const validateTitle = async (request, response, next) => {

    const { body } = request; // Recebe o corpo da requisição

    // Verifica se o título foi enviado
    if (body.title === undefined) {
        return response.status(400).json({ message: 'O título é obrigatório!' });
    }

    // Verifica se o título foi preenchido
    if (body.title === '') {
        return response.status(400).json({ message: 'O título não deve ser vazio!' });
    }

    next(); // Chama a próxima função
};

const validateStatus = async (request, response, next) => {

    const { body } = request; // Recebe o corpo da requisição

    // Verifica se o título foi enviado
    if (body.status === undefined) {
        return response.status(400).json({ message: 'O status é obrigatório!' });
    }

    // Verifica se o título foi preenchido
    if (body.status === '') {
        return response.status(400).json({ message: 'O status não deve ser vazio!' });
    }

    next(); // Chama a próxima função
};

module.exports = {
    validateTitle,
    validateStatus,
};