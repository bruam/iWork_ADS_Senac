const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.deadline) {
    res.status(400).send({
      message: "Conteúdo não pode ser vazio!"
    });
    return;
  }

  // Create
  const project = {
    title: req.body.title,
    deadline: req.body.deadline
  };

  // Save in the database
  Project.create(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro durante criação de projeto."
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Project.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro durante a recuperação dos projetos."
      });
    });
};

// Find a single one with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi encontrado o projeto de id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar projeto de id=" + id
      });
    });
};

// Update by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Projeto atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar projeto de id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar projeto de id=" + id
      });
    });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Projeto deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar projeto de id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao deletar projeto de id=" + id
      });
    });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
  Project.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Projetos deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar deletar todos os projetos."
      });
    });
};