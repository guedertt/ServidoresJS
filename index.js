const fs = require('fs');
const express = require('express'); // express é um módulo que simplifica a criação de uma API, com o require estou importando ele
const app = express(); // inicializando express pra ele servir de algo (só importar não adianta de nada)
const port = 8000; // variável com a porta que vamos utilizar
app.use(express.json()); // fala pro servidor que vai receber os dados em JSON (das aulas)

// Ler todas as aulas
app.get('/aulas', (req, res) => {
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const dados = JSON.parse(data);
        res.status(200).json(dados);
    });
});

// Ler uma aula específica pelo ID
app.get('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
        const aulas = JSON.parse(data);
        const aula = aulas.find(aula => aula.id === id);
        if (!aula) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }
        res.status(200).json(aula);
    });
});

// Criar uma nova aula
app.post('/aulas', (req, res) => {
    const novaAula = req.body; // Dados novos recebidos no body
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: 'Erro ao ler o banco de dados' });
        }

        const aulas = JSON.parse(data);
        novaAula.id = aulas.length > 0 ? aulas[aulas.length - 1].id + 1 : 1; // Novo ID sequencial
        aulas.push(novaAula);

        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ msg: 'Erro ao salvar a nova aula' });
            }
            res.status(201).json({ msg: 'Aula criada com sucesso', aula: novaAula });
        });
    });
});

// Atualizar uma aula existente
app.put('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: 'Erro no servidor' });
        }
        const aulas = JSON.parse(data);
        const aulaIndex = aulas.findIndex(aula => aula.id === id);

        if (aulaIndex === -1) {
            return res.status(404).json({ msg: 'Aula não encontrada' });
        }

        const novosDados = req.body;
        for (let key in novosDados) {
            aulas[aulaIndex][key] = novosDados[key];
        }

        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ msg: 'Erro ao salvar as alterações' });
            }
            res.status(200).json({ msg: 'Aula atualizada com sucesso', aula: aulas[aulaIndex] });
        });
    });
});

// Deletar uma aula
app.delete('/aulas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('bancoDeDados.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: 'Erro no servidor' });
        }

        let aulas = JSON.parse(data);
        const aulaIndex = aulas.findIndex(aula => aula.id === id);

        if (aulaIndex === -1) {
            return res.status(404).json({ msg: "Aula não encontrada" });
        }

        aulas.splice(aulaIndex, 1);

        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ msg: 'Erro ao salvar as alterações' });
            }
            res.status(204).send(); // 204: Sucesso sem conteúdo
        });
    });
});

// Inicializar o servidor
app.listen(port, () => {
    console.log("Servidor inicializado na porta " + port);
});
