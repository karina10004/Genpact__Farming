const express = require("express");
const router = express.Router();
const expertCallController = require("../controllers/expertcall");

router.post("/", expertCallController.createExpertCall);
router.get("/", expertCallController.getAllExpertCalls);
router.get("/:id", expertCallController.getExpertCallById);
router.put("/:id", expertCallController.updateExpertCallById);
router.delete("/:id", expertCallController.deleteExpertCallById);
router.patch("/:id/status", expertCallController.updateCallStatus);
module.exports = router;
