const express = require('express') //express eh um modulo que simplifica a criação de uma api, com o require to importando ele
const app = express() //inicializando express pra ele servir de algo (só importar nao adianta de nada)
const port = 8000 //variavel com a porta que vamo utilizar
app.use(express.json()) //fala p servidor que vai receber os dados em json (das aulas)


const bd = [
    {
        //definindo oq é uma aula
        titulo:"desenvolvimento de sistemas",
        curso:"Tecnico em desenvolvimento de sistemas",
        turma:"3B",
        professor:"Ramon",
        id:1
    }
]



app.get('/aulas',(req,res)=>{ //criando uma rota que só vai aceitar metodos get, depois crio uma callback ()=>, nesse caso o get mostra todas as aulas do bd 
    res.send(bd) //res serve para mandar a resposta no servidor, sem ser no console, nesse caso a gente mostra todas as informaçoes das aulas do nosso banco de dados 
})
app.post('/aulas',(req,res) => { //pode ter uma rota com o mesmo nome de 'aulas' pq são metodos diferentes (post e get), dai pra acessar tem que usar o postman, serve pra criar aulas
    const dados = req.body //salvando dentro da variavel "dados" as informações do json
    dados['id'] = bd.length+1 //aqui estamos criando a variavel id com dados['id'] e aumentando +1 a cada aula nova, pra ter id 1,2,3 etc
    console.log(dados)
    bd.push(dados)//atualizando o nosso bd mandando os dados da nova aula criada
    res.status(201)//código pra criado com sucesso
}) 

app.put('/aulas/:id', (req,res) =>{ //put é pra atualizar
    const id = req.params.id 
    const usuario = bd.find(user => user.id ==id)
    if (!usuario){ //quando o find não acha ele retorna undefined, então o retorno vai ser diferente de usuario, por isso o !usuario
        res.status(404).json({msg:"erro"})
    }
    res.send('ok') // mandando msg p servidor
})

app.delete('/aulas/:id',(req,res) => {
    const id = req.params.id
    const usuarioIndex = bd.findIndex(user => user.id == id)
    if (usuarioIndex === -1){//quando o findIndex nao acha oq quer, ele retorna -1, então da pra usar isso pra verificar se funcionou ou nao
        res.status(404).json({msg:"erro"})
    }
    bd.splice(usuarioIndex,1)
    res.status(204).send()
})

app.listen(port,()=>{ //inicializando o servidor, o app que é responsavel pelo express agora ouve a porta 8000 com o listen
    console.log("Servidor inicializado") //console log só pra ter certeza que o servidor foi inicializado
})

