const express = require('express') //express eh um modulo que simplifica a criação de uma api, com o require to importando ele
const app = express() //inicializando express pra ele servir de algo (só importar nao adianta de nada)
const port = 8000 //variavel com a porta que vamo utilizar

const bd = []

app.get('/aulas',(req,res)=>{ //criando uma rota que só vai aceitar metodos get, depois crio uma callback ()=> 
    res.send("Aula de desenvolvimento de sistemas do Ramon") //mandando uma resposta pro servidor, console.log ia imprimir no console, o res é de resposta la no servidor e o send manda 
})

app.post('/aulas',(req,res) => res.send("Criando aula")) //pode ter uma rota com o mesmo nome de 'aulas' pq são metodos diferentes (post e get), dai pra acessar tem que usar o postman


app.listen(port,()=>{ //inicializando o servidor, o app que é responsavel pelo express agora ouve a porta 8000 com o listen
    console.log("Servidor inicializado") //console log só pra ter certeza que o servidor foi inicializado
})

