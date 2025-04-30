const express = require('express')
const router_aulas = express.Router()
const {getAulas,criarAulas,atualizarAula,deletarAulas} = require('../model/aulas_model')

router_aulas.get('/aulas', (req, res) => {
    listarAulas((err, aulas) => {
        if (err) return res.status(500).json({ msg: "Erro no servidor" });
        res.status(200).json(aulas);
    });
});

// Rota: pegar uma aula específica
router_aulas.get('/aulas/:id', getAulas )

// Rota: criar nova aula
router_aulas.post('/aulas', criarAulas)

// Rota: atualizar aula
router_aulas.put('/aulas/:id', atualizarAula)

// Rota: deletar aula
router_aulas.delete('/aulas/:id', deletarAulas)


module.exports = router_aulas