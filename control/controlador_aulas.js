const { get } = require("../roteamento/aulas_router");
const {listarAulas,atualizarAula} = require('../model/aulas_model')

function getAulas(req, res) {
    const id = parseInt(req.params.id);
    listarAulas((err, aulas) => {
        if (err) return res.status(500).json({ msg: "Erro no servidor" });
        const aula = aulas.find(aula => aula.id === id);
        if (!aula) return res.status(404).json({ msg: "Aula não encontrada" });
        res.status(200).json(aula);
    });
};

function criarAulas(req, res) {
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
};

function atualizarAulas (req, res) {
    const id = parseInt(req.params.id);
    const novosDados = req.body;

    atualizarAula(id, novosDados, (err, aulaAtualizada) => {
        if (err) {
            if (err.status === 404) return res.status(404).json({ msg: err.msg });
            return res.status(500).json({ msg: "Erro ao atualizar a aula" });
        }
        res.status(200).json({ msg: "Aula atualizada com sucesso", aula: aulaAtualizada });
    });
};

function deletarAulas(req, res) {
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
};




module.exports = {getAulas,criarAulas,atualizarAulas,deletarAulas}