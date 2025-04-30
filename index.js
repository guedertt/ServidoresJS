const express = require('express');
const app = express();
const port = 8000;
const router_aulas = require('./roteamento/aulas_router')

app.use(express.json());
app.use('', router_aulas)

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
});
