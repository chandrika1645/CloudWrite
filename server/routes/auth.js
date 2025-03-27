const express = require("express");
const { googleAuth, logout } = require("../controllers/auth");
const router = express.Router();

router.post("/google", googleAuth);
router.post("/logout", logout);

module.exports = router;
