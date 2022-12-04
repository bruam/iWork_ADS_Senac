const Project = require("../models/project");
const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

let tasks;

module.exports = {
  async createProject(req, res) {
    try {
      const { title, deadline, concluded, user_id } = req.body;
      const user = await User.findOne({ where: user_id });
      if (!user) {
        res.status(400).json({ message: "Código de usuário inexistente" });
      } else {
        const project = await Project.create({
          title,
          deadline,
          concluded,
          user_id,
        });
        res.status(201).json({ project });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async updateProject(req, res) {
    try {
      const { id } = req.params;
      const { title, deadline, concluded, user_id } = req.body;
      const project = await Project.findOne({ where: { id } });
      if (!project) {
        res.status(404).json({ message: "Nenhum projeto encontrado!" });
      } else {
        await Project.update(
          { title, deadline, concluded, user_id },
          { where: { id } }
        );
        const updatedProject = await Project.findOne({ where: { id } });
        res.status(200).json({ updatedProject });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async listProjects(req, res) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      const payload = jwt.decode(token);
      const userId = payload.id;
      const projects = await Project.findAll({ where: { user_id: userId } });
      if (projects.length === 0) {
        res.status(404).json({ message: "Não existem projetos cadastros" });
      } else {
        res.status(200).json({ projects });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findOne({ where: { id } });
      const tasks = await Task.findAll({
        where: { project_id: id, concluded: false },
      });
      if (tasks.length != 0) {
        res
          .status(405)
          .json({ message: "Projeto contém tarefas não concluídas" });
      } else {
        if (!project) {
          res.status(404).json({ message: "Projeto não encontrada" });
        } else {
          await Project.destroy({ where: { id } });
          res.status(200).json({ project });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async findProject(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findOne({ where: { id } });
      if (!project) {
        res.status(404).json({ message: "Projeto não encontrado!" });
      } else {
        res.status(200).json({ project });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
};
