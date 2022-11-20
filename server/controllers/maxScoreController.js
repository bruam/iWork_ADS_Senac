const MaxScore = require("../models/maxScore");

module.exports = {
  async createMaxScore(req, res) {
    try {
      const { score, projects_done, user_id } = req.body;
      const maxScore = await MaxScore.create({ score, projects_done, user_id });
      res.status(201).json({ maxScore });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async updateMaxScore(req, res) {
    try {
      const { id } = req.params;
      const { score, projects_done, user_id } = req.body;
      const maxScore = await MaxScore.findOne({ where: { id } });
      if (!maxScore) {
        res.status(404).json({ message: "Nenhuma pontuação encontrada!" });
      } else {
        await MaxScore.update(
          { score, projects_done, user_id },
          { where: { id } }
        );
        const updatedMaxScore = await MaxScore.findOne({ where: { id } });
        res.status(200).json({ updatedMaxScore });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async listMaxScores(req, res) {
    try {
      const maxScores = await MaxScore.findAll();
      if (!maxScores) {
        res.status(404).json({ message: "Não existe pontuação cadastrada" });
      }
      res.status(200).json({ maxScores });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async deleteMaxScore(req, res) {
    try {
      const { id } = req.params;
      const maxScore = await MaxScore.findOne({ where: { id } });
      if (!maxScore) {
        res.status(404).json({ message: "Pontuação não encontrada" });
      } else {
        await MaxScore.destroy({ where: { id } });
        res.status(200).json({ maxScore });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async findMaxScore(req, res) {
    try {
      const { id } = req.params;
      const maxScore = await MaxScore.findOne({ where: { id } });
      if (!maxScore) {
        res.status(404).json({ message: "Pontuação não encontrada!" });
      } else {
        res.status(200).json({ maxScore });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  // async findAllMaxScoresFromProject(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const MaxScores = await MaxScore.findAll({ where: { projects_done, user_id: id } });
  //     if (!MaxScores) {
  //       res
  //         .status(404)
  //         .json({ message: "Não existem tarefas cadastras para esse projeto" });
  //     }
  //     res.status(200).json({ MaxScores });
  //   } catch (error) {
  //     res.status(500).json({ message: "Erro interno do servidor" });
  //     console.error(error);
  //   }
  // },
};
