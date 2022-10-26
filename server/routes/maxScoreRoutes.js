const express = require("express");
const router = express.Router();

const controller = require("../controllers/maxScoreController");

router.post("/", controller.createMaxScore);
router.get("/", controller.listMaxScores);
router.get("/:id", controller.findMaxScore);
router.put("/:id", controller.updateMaxScore);
router.delete("/:id", controller.deleteMaxScore);

module.exports = router;
