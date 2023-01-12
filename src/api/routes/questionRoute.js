const express = require("express");
const questionController = require("../controllers/questionController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router.get("/", questionController.getAll);
router.post("/", questionController.save);
router.patch("/", questionController.markQuestion);

module.exports = router;
