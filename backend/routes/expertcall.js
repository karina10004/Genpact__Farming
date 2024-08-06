const express = require("express");
const router = express.Router();
const expertCallController = require("../controllers/expertcall");

router.post("/", expertCallController.createExpertCall);
router.get("/", expertCallController.getAllExpertCalls);
router.get("/pending/:expertId", expertCallController.getPendingCallsForExpert);
router.get("/farmer/:farmerId", expertCallController.getCallsForFarmer); // New route for farmer
router.get("/expert/:expertId", expertCallController.getCallsForExpert); // New route for expert

router.get("/:id", expertCallController.getExpertCallById);
router.put("/:id", expertCallController.updateExpertCallById);
router.delete("/:id", expertCallController.deleteExpertCallById);
router.patch("/:id/status", expertCallController.updateCallStatus);
module.exports = router;
