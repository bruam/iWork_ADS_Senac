module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres', 
  password: '30332692', 
  database: 'iwork',    
  define: {
    timestamp: true, //adiciona data de criação dos dados
    underscored: true, //define que os nomes de tabela devem ter letras maiúscula
  }
};