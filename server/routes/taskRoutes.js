const express = require("express");
const router = express.Router();

const controller = require("../controllers/taskController");

router.post("/", controller.createTask);
router.get("/", controller.listTasks);
router.get("/:id", controller.findTask);
router.get("/fromProject/:id", controller.findAllTasksFromProject);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);
router.delete("/deleteAll/:id", controller.deleteAllTasks);

module.exports = router;
