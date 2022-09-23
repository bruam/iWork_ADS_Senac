const listaProjetos = [
  {
      id: 1,
      nome: "Aprender Python",
      prazo: "20-04-2023"
  },
  {
      id: 2,
      nome: "Aprender Java",
      prazo: "20-05-2023"
  }
]

let idGerador = 3;

function geraId() {
  return idGerador++
}

// Para exportar a função diretamente se usa o exports. ao invés de const

exports.listar = (req, res) => {
  res.json(listaProjetos)
}

exports.buscarPorId = (req, res) => { 
  const id = req.params.id;

  for (const projeto of listaProjetos) {
      if(projeto.id == id){
          return res.json(projeto);
      }
  }
  res.status(404).json({"msg":"Projeto nao encontrado"})
}

exports.inserir = (req,res) => {
  
  let projeto = req.body
  
  projeto.id = geraId()    
  listaProjetos.push(projeto)
  
  res.status(201).json(projeto)

}

exports.atualizar = (req, res) => {
  const id = req.params.id;
  const projetoAtualizado = req.body;

  let projeto = listaProjetos.find( 
      function (projeto) {
          return (projeto.id == id);
      } 
  );
  if(projeto) {
      if(projetoAtualizado.nome) 
      projeto.nome = projetoAtualizado.nome;
      if(projetoAtualizado.prazo) 
      projeto.prazo = projetoAtualizado.prazo;
      res.json(projeto);
  }
  else {
      res.status(404).json({msg:"Projeto nao encontrado"});
  }

}

exports.deletar = (req, res) => {
  const id = req.params.id;

  const indRemover = listaProjetos.findIndex(
      (projeto) => projeto.id == id
  )
  
  if(indRemover >= 0) {
      res.json(listaProjetos.splice(indRemover, 1));
  }
  else {
      res.status(404).json({msg:"Projeto nao encontrado"});
  }
}

// exportando todas as funções
//module.exports = { listar, ... }