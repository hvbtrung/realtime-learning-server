const express = require("express");
const presentationController = require("../controllers/presentationController");
const authController = require("../controllers/authController");
const slideRoute = require("./slideRoute");
const router = express.Router();

router.use("/:presentationId/slides", slideRoute);

router.use(authController.protect);

router.get("/", presentationController.getAll);
router.post("/", presentationController.createPresentation);
router.put("/", presentationController.updatePresentation);
router.delete("/:presentationId", presentationController.deletePresentation);
module.exports = router;
