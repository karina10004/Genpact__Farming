const express = require("express");
const router = express.Router();
const { register, authUser } = require("../controllers/user");

router.post("/", register);
router.post("/login", authUser);

module.exports = router;
