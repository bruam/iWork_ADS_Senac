const Trophy = require("../models/trophy");

module.exports = {
  async createTrophy(req, res) {
    try {
      const { title, description, goal, trophy_type, user_id } = req.body;
      const trophy = await Trophy.create({
        title,
        description,
        goal,
        trophy_type,
        user_id,
      });
      res.status(201).json({ trophy });
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
      const trophies = await Trophy.findAll();
      if (!trophies) {
        res.status(404).json({ message: "Não existe troféu cadastrado" });
      }
      res.status(200).json({ trophies });
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
  // async findAllTrophysFromProject(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const Trophys = await Trophy.findAll({ where: { trophy_type, user_id: id } });
  //     if (!Trophys) {
  //       res
  //         .status(404)
  //         .json({ message: "Não existem tarefas cadastras para esse projeto" });
  //     }
  //     res.status(200).json({ Trophys });
  //   } catch (error) {
  //     res.status(500).json({ message: "Erro interno do servidor" });
  //     console.error(error);
  //   }
  // },
};
