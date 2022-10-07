const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.time) {
    res.status(400).send({
      message: "Conteúdo não pode ser vazio!"
    });
    return;
  }

  // Create
  const task = {
    title: req.body.title,
    time: req.body.time
  };

  // Save in the database
  Task.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro durante criação da tarefa."
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Task.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro durante a recuperação das tarefas."
      });
    });
};

// Find a single one with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi encontrado a tarefa de id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar tarefa de id=" + id
      });
    });
};

// Update by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tarefa atualizada com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar tarefa de id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar tarefa de id=" + id
      });
    });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tarefa deletada com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar tarefa de id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao deletar tarefa de id=" + id
      });
    });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
  Task.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tarefas deletadas com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar deletar todas as tarefas."
      });
    });
};