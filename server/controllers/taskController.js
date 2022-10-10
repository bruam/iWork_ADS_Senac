const Task = require("../models/task");

module.exports = {
  async createTask(req, res) {
    try {
      const { title, time, project_id } = req.body;
      // const currentDate = now();
      // if (deadline < currentDate) {
      //   console.log(deadline);
      //   console.log(currentDate);
      //   res.status(400).json({ message: "Prazo inválido!" });
      // } else {
      //   const project = await Project.create({ title, deadline });
      //   res.status(200).json({ project });
      // }
      const task = await Task.create({ title, time, project_id });
      res.status(201).json({ task });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, time } = req.body;
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        res.status(404).json({ message: "Nenhuma tarefa encontrada!" });
      } else {
        await Task.update({ title, time }, { where: { id } });
        const updatedTask = await Task.findOne({ where: { id } });
        res.status(200).json({ updatedTask });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async listTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      if (!tasks) {
        res.status(404).json({ message: "Não existem tarefas cadastras" });
      }
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        res.status(404).json({ message: "Tarefa não encontrada" });
      } else {
        await Task.destroy({ where: { id } });
        res.status(200).json({ task });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async findTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        res.status(404).json({ message: "Tarefa não encontrada!" });
      } else {
        res.status(200).json({ task });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
};
