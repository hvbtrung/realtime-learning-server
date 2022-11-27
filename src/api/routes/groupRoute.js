const express = require("express");
const groupController = require("../controllers/groupController");
const groupDetailController = require("../controllers/groupDetailController");
const router = express.Router();

router.post("/", groupController.createGroup);
router.get("/:userId/all", groupController.getGroupsByUserId);
router.get("/:groupId/:type", groupController.getGroupInfo);
router.post("/assign", groupDetailController.assignRole);
router.post("/del-member", groupDetailController.detachRole);
router.post("/join", groupDetailController.joinGroup);
router.get("/:groupId", groupController.getGroup);
router.post("/invite", groupController.sendLinkGroup);
module.exports = router;
