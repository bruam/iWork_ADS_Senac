const express = require('express')
const app = express()

//recebe o recurso exportado (router)
const tarefaRota = require('./routes/tarefa_rotas')
const projetoRota = require('./routes/projeto_rotas')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/tarefas', tarefaRota);
app.use('/api/projetos', projetoRota);

app.listen(3000, () => {
    console.log("Iniciando o servidor...")
})