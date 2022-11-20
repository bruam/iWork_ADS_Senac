require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
  verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(403)
        .json({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res
          .status(401)
          .json({ auth: false, message: "Failed to authenticate token." });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      //esse teste abaixo deve ser feito no seu banco de dados
      const user = await User.findOne({ where: { email } });
      if (email == user.email && bcrypt.compareSync(password, user.password)) {
        //auth ok
        const id = user.id; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 86400, // expires in 24 hours
        });
        return res.json({ auth: true, token: token });
      }
      res.status(500).json({ message: "Login inválido!" });
    } catch (error) {
      console.log(error);
    }
  },
  logout(req, res) {
    res.json({ auth: false, token: null });
  },
};
