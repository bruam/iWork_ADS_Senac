const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  async createUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        const newUser = await User.create({
          email: email,
          password: bcrypt.hashSync(password, 8),
        });
        res.status(201).json({ newUser });
      } else {
        res.status(400).json({ message: "Email já está em uso!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        res.status(404).json({ message: "Usuário inexistente!" });
      } else {
        await User.update({ email, password }, { where: { id } });
        const updatedUser = await User.findOne({ where: { id } });
        res.status(200).json({ updatedUser });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async listUsers(req, res) {
    try {
      const users = await User.findAll();
      if (!users) {
        res.status(404).json({ message: "Não existem usuários cadastros" });
      }
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
      } else {
        await User.destroy({ where: { id } });
        res.status(200).json({ user });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async findUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado!" });
      } else {
        res.status(200).json({ user });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
  async findUserByEmail(req, res) {
    try {
      const email = req.body.email;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado!" });
      } else {
        res.status(200).json({ user });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
      console.error(error);
    }
  },
};
