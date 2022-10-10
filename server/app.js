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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoute);
app.use("/api/projects", projectRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Iniciando o servidor na porta ${PORT}`);
});
