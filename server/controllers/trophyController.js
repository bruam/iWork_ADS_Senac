const Trophy = require("../models/trophy");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  async createTrophy(req, res) {
    try {
      const { title, description, goal, trophy_type, user_id } = req.body;
      const user = await User.findOne({ where: user_id });
      if (!user) {
        res.status(400).json({ message: "Código de usuário inexistente" });
      } else {
        const trophy = await Trophy.create({
          title,
          description,
          goal,
          trophy_type,
          user_id,
        });
        res.status(201).json({ trophy });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async updateTrophy(req, res) {
    try {
      const { id } = req.params;
      const { title, description, goal, trophy_type, user_id } = req.body;
      const trophy = await Trophy.findOne({ where: { id } });
      if (!trophy) {
        res.status(404).json({ message: "Nenhum troféu encontrado!" });
      } else {
        await Trophy.update(
          { title, description, goal, trophy_type, user_id },
          { where: { id } }
        );
        const updatedTrophy = await Trophy.findOne({ where: { id } });
        res.status(200).json({ updatedTrophy });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async listTrophies(req, res) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      let payload = jwt.decode(token);
      let userId = payload.id;
      const trophies = await Trophy.findAll({ where: { user_id: userId } });
      if (trophies.length === 0) {
        res.status(404).json({ message: "Não existe troféu cadastrado" });
      } else {
        res.status(200).json({ trophies });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async deleteTrophy(req, res) {
    try {
      const { id } = req.params;
      const trophy = await Trophy.findOne({ where: { id } });
      if (!trophy) {
        res.status(404).json({ message: "Troféu não encontrado" });
      } else {
        await Trophy.destroy({ where: { id } });
        res.status(200).json({ trophy });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async findTrophy(req, res) {
    try {
      const { id } = req.params;
      const trophy = await Trophy.findOne({ where: { id } });
      if (!trophy) {
        res.status(404).json({ message: "Troféu não encontrado!" });
      } else {
        res.status(200).json({ trophy });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
};
