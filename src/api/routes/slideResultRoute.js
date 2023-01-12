const express = require("express");
const slideResultController = require("../controllers/slideResultController");

const router = express.Router();

router.route('/')
    .post(slideResultController.createSlideResult);

router.route('/:id')
    .get(slideResultController.getSlideResult);

module.exports = router;
