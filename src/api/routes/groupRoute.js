const express = require("express");
const groupController = require("../controllers/groupController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/", groupController.getGroupsByUserId);
router.post("/", groupController.createGroup);
router.post("/invite", groupController.sendLinkGroup);

module.exports = router;
