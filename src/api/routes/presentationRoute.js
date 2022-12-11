const express = require("express");
const presentationController = require("../controllers/presentationController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.get("/", presentationController.getAll);
router.post("/", presentationController.createPresentation);
router.put("/", presentationController.updatePresentation);

module.exports = router;
