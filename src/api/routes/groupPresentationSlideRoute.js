const express = require("express");
const groupPresentationSlideController = require("../controllers/groupPresentationSlideController");
const router = express.Router();

router.post("/", groupPresentationSlideController.createGroupPresentationSlide);
router.route("/:presentationId/:groupId")
    .get(groupPresentationSlideController.getGroupPresentationSlide)
    .patch(groupPresentationSlideController.updateGroupPresentationSlide)
    .delete(groupPresentationSlideController.deleteGroupPresentationSlide);

module.exports = router;
