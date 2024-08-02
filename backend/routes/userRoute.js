const express = require("express");
const router = express.Router();
const { register, authUser, allUsers } = require("../controllers/user");
const { protect } = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", authUser);
router.route("/").post(register).get(protect, allUsers);

module.exports = router;
