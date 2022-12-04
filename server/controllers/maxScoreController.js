const MaxScore = require("../models/maxScore");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  async createMaxScore(req, res) {
    try {
      const { score, projects_done, user_id } = req.body;
      const user = await User.findOne({ where: user_id });
      if (!user) {
        res.status(400).json({ message: "Código de usuário inexistente" });
      } else {
        const maxScore = await MaxScore.create({
          score,
          projects_done,
          user_id,
        });
        res.status(201).json({ maxScore });
      }
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
      if (maxScore === 0) {
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
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      const payload = jwt.decode(token);
      const userId = payload.id;
      const maxScores = await MaxScore.findAll({ where: { user_id: userId } });
      if (maxScores.length === 0) {
        res.status(404).json({ message: "Não existe pontuação cadastrada" });
      } else {
        res.status(200).json({ maxScores });
      }
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
};
