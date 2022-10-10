const express = require("express");
const router = express.Router();

const controller = require("../controllers/taskController");

router.post("/", controller.createTask);
router.get("/", controller.listTasks);
router.get("/:id", controller.findTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
