const express = require("express");
const {
  registerExpert,
  loginExpert,
  getAllExperts,
} = require("../controllers/expert");

const router = express.Router();

// Register route
router.post("/register", registerExpert);

// Login route
router.post("/login", loginExpert);
router.get("/all", getAllExperts);

module.exports = router;
