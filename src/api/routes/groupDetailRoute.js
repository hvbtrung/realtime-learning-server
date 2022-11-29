const express = require("express");
const groupDetailController = require("../controllers/groupDetailController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/:groupId", groupDetailController.getInfoGroup); // get info
router.get("/", groupDetailController.getMembers); // get all of members
router.post("/", groupDetailController.assignRole);
router.delete("/:groupId/:userId", groupDetailController.kickOutMember);
router.post("/join", groupDetailController.joinGroup);

module.exports = router;
