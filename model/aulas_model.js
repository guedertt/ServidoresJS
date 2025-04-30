const fs = require('fs');

// Função reutilizável: listar todas as aulas
function listarAulas(callback) {
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) return callback(err, null);
        const aulas = JSON.parse(data);
        callback(null, aulas);
    });
}

// Função reutilizável: atualizar uma aula pelo ID
function atualizarAula(id, novosDados, callback) {
    listarAulas((err, aulas) => {
        if (err) return callback(err);

        const aulaIndex = aulas.findIndex(aula => aula.id === id);
        if (aulaIndex === -1) return callback({ status: 404, msg: 'Aula não encontrada' });

        for (let key in novosDados) {
            aulas[aulaIndex][key] = novosDados[key];
        }

        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) return callback(err);
            callback(null, aulas[aulaIndex]);
        });
    });
}

module.exports = {listarAulas, atualizarAula}