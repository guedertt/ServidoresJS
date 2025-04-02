const express = require('express')
const soma = require('./teste.js')
const server = express()
const PORT = 8000

server.get('/soma',(req,res) => {
    let resultado = soma(req.query.a,req.query.b)
    res.send(`resultado da soma: ${resultado}`)
})


server.listen(PORT, () => {
    console.log(`o servidor foi inicializado na porta ${PORT}`)
})  