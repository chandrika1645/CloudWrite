const express = require("express");
const { googleAuth, logout, userProfile } = require("../controllers/auth");
const verifyToken = require("../middleware/userAuth");
const router = express.Router();

router.get("/google-callback", googleAuth);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, userProfile);

module.exports = router;
