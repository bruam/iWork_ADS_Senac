const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./database");
const AuthController = require("./controllers/authController");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

//recebe o recurso exportado (router)
const taskRoute = require("./routes/taskRoutes");
const projectRoute = require("./routes/projectRoutes");
const maxScoreRoute = require("./routes/maxScoreRoutes");
const trophyRoutes = require("./routes/trophyRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/tasks", AuthController.verifyJWT, taskRoute);
app.use("/api/projects", AuthController.verifyJWT, projectRoute);
app.use("/api/maxScore", AuthController.verifyJWT, maxScoreRoute);
app.use("/api/trophy", AuthController.verifyJWT, trophyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Iniciando o servidor na porta ${PORT}`);
});
