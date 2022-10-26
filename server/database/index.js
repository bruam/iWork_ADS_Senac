// ---------- Configuração de conexão com o banco de dados ----------

const Sequelize = require("sequelize");
const configDB = require("../config/database");

const Project = require("../models/project");
const Task = require("../models/task");
const MaxScore = require("../models/maxScore");

const connection = new Sequelize(configDB);

//Inicializa conexão com o models
Project.init(connection);
Task.init(connection);
MaxScore.init(connection);

module.exports = connection;
