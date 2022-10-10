const express = require("express");
const router = express.Router();

const controller = require("../controllers/projectController");

router.post("/", controller.createProject);
router.get("/", controller.listProjects);
router.get("/:id", controller.findProject);
router.put("/:id", controller.updateProject);
router.delete("/:id", controller.deleteProject);

module.exports = router;
