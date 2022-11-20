const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.post("/", controller.createUser);
router.get("/", controller.listUsers);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.get("/byEmail", controller.findUserByEmail);
router.get("/:id", controller.findUser);

module.exports = router;
