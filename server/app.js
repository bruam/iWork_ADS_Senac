const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./database");

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoute);
app.use("/api/projects", projectRoute);
app.use("/api/maxScore", maxScoreRoute);
app.use("/api/trophy", trophyRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Iniciando o servidor na porta ${PORT}`);
});
