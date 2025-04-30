const fs = require('fs');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

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

// Rota: listar todas as aulas
app.get('/aulas', (req, res) => {
    listarAulas((err, aulas) => {
        if (err) return res.status(500).json({ msg: "Erro no servidor" });
        res.status(200).json(aulas);
    });
});

// Rota: pegar uma aula específica
app.get('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    listarAulas((err, aulas) => {
        if (err) return res.status(500).json({ msg: "Erro no servidor" });
        const aula = aulas.find(aula => aula.id === id);
        if (!aula) return res.status(404).json({ msg: "Aula não encontrada" });
        res.status(200).json(aula);
    });
});

// Rota: criar nova aula
app.post('/aulas', (req, res) => {
    const novaAula = req.body;
    listarAulas((err, aulas) => {
        if (err) return res.status(500).json({ msg: "Erro ao ler o banco de dados" });

        novaAula.id = aulas.length > 0 ? aulas[aulas.length - 1].id + 1 : 1;
        aulas.push(novaAula);

        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) return res.status(500).json({ msg: "Erro ao salvar a nova aula" });
            res.status(201).json({ msg: "Aula criada com sucesso", aula: novaAula });
        });
    });
});

// Rota: atualizar aula
app.put('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const novosDados = req.body;

    atualizarAula(id, novosDados, (err, aulaAtualizada) => {
        if (err) {
            if (err.status === 404) return res.status(404).json({ msg: err.msg });
            return res.status(500).json({ msg: "Erro ao atualizar a aula" });
        }
        res.status(200).json({ msg: "Aula atualizada com sucesso", aula: aulaAtualizada });
    });
});

// Rota: deletar aula
app.delete('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    listarAulas((err, aulas) => {
        if (err) return res.status(500).json({ msg: "Erro no servidor" });

        const aulaIndex = aulas.findIndex(aula => aula.id === id);
        if (aulaIndex === -1) return res.status(404).json({ msg: "Aula não encontrada" });

        aulas.splice(aulaIndex, 1);

        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) return res.status(500).json({ msg: "Erro ao salvar alterações" });
            res.status(204).send();
        });
    });
});

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
});
