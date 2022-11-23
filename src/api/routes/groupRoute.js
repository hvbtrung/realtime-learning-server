const express = require("express");
const groupController = require("../controllers/groupController");

const router = express.Router();

router.post("/", groupController.createGroup);
router.get("/:userid/all", groupController.getGroupsByUserId);

module.exports = router;
