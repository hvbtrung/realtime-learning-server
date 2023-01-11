const express = require("express");
const questionVoteController = require("../controllers/questionVoteController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router.post("/", questionVoteController.save);
router.get("/", questionVoteController.getVote);
router.put("/", questionVoteController.update);

module.exports = router;
