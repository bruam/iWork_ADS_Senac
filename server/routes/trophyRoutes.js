const express = require("express");
const router = express.Router();

const controller = require("../controllers/trophyController");

router.post("/", controller.createTrophy);
router.get("/", controller.listTrophies);
router.get("/:id", controller.findTrophy);
router.put("/:id", controller.updateTrophy);
router.delete("/:id", controller.deleteTrophy);

module.exports = router;
