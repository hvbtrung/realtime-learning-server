const express = require("express");
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router.get("/", messageController.getAll);
router.post("/", messageController.save);

module.exports = router;
