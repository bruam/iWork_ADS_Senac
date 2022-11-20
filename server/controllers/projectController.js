const Project = require("../models/project");
const Task = require("./taskController");

let tasks;

module.exports = {
  async createProject(req, res) {
    try {
      const { title, deadline, concluded, user_id } = req.body;
      // const currentDate = now();
      // if (deadline < currentDate) {
      //   console.log(deadline);
      //   console.log(currentDate);
      //   res.status(400).json({ message: "Prazo inválido!" });
      // } else {
      //   const project = await Project.create({ title, deadline });
      //   res.status(200).json({ project });
      // }
      const project = await Project.create({
        title,
        deadline,
        concluded,
        user_id,
      });
      res.status(201).json({ project });
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
      const projects = await Project.findAll();
      if (!projects) {
        res.status(404).json({ message: "Não existem projetos cadastros" });
      }
      res.status(200).json({ projects });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findOne({ where: { id } });
      if (!project) {
        res.status(404).json({ message: "Projeto não encontrada" });
      } else {
        await Project.destroy({ where: { id } });
        res.status(200).json({ project });
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
