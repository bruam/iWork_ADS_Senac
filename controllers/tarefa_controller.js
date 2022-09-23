const listaTarefas = [
  {
      id: 1,
      titulo: "estudar",
      tempo: 20,
      estado: 1,
      projetoId: 1
  },
  {
      id: 2,
      titulo: "pesquisar",
      tempo: 10,
      estado: 0,
      projetoId: 1
  }
]

let idGerador = 3;

function geraId() {
  return idGerador++
}

// Para exportar a função diretamente se usa o exports. ao invés de const

exports.listar = (req, res) => {
  res.json(listaTarefas)
}

exports.buscarPorId = (req, res) => {
  const id = req.params.id;

  for (const tarefa of listaTarefas) {
      if(tarefa.id == id){
          return res.json(tarefa);
      }
  }
  res.status(404).json({"msg":"Tarefa nao encontrada"})
}

exports.inserir = (req,res) => {
  
  let tarefa = req.body
  
  tarefa.id = geraId()    
  listaTarefas.push(tarefa)
  
  res.status(201).json(tarefa)

}

exports.atualizar = (req, res) => {
  const id = req.params.id;
  const tarefaAtualizada = req.body;

  let tarefa = listaTarefas.find( 
      function (tarefa) {
          return (tarefa.id == id);
      } 
  );
  if(tarefa) {
      if(tarefaAtualizada.titulo) 
      tarefa.titulo = tarefaAtualizada.titulo;
      if(tarefaAtualizada.tempo) 
      tarefa.tempo = tarefaAtualizada.tempo;
      if(tarefaAtualizada.estado) 
      tarefa.estado = tarefaAtualizada.estado;
      res.json(tarefa);
  }
  else {
      res.status(404).json({msg:"Tarefa nao encontrada"});
  }

}

exports.deletar = (req, res) => {
  const id = req.params.id;

  const indRemover = listaTarefas.findIndex(
      (tarefa) => tarefa.id == id
  )
  
  if(indRemover >= 0) {
      res.json(listaTarefas.splice(indRemover, 1));
  }
  else {
      res.status(404).json({msg:"Tarefa nao encontrada"});
  }
}

// exportando todas as funções
//module.exports = { listar, ... }