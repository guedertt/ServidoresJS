const soma = require('./teste.js')
const http = require('http')
const url = require('url')

const PORT = 8000

const server = http.createServer((req,res) => {
    const urlCapturada = url.parse(req.url,true)
    const {query} = urlCapturada
    let resultado = soma(Number(query.a),Number(query.b))
    res.end(`o valor final é ${resultado}`)
})

server.listen(PORT, () => {
    console.log(`o servidor foi inicializado na porta ${PORT}`)
})  