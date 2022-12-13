const express = require("express");
const slideController = require("../controllers/slideController");

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(slideController.getSlides)
    .post(slideController.createSlide);

router.route('/:id')
    .get(slideController.getSlide)
    .patch(slideController.updateSlide)
    .delete(slideController.deleteSlide);

module.exports = router;
