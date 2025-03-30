const express = require("express");
const { uploadToDrive, getFiles } = require("../googleDriveService");
const User = require("../models/User");
const verifyToken = require("../middleware/userAuth");
const router = express.Router();
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

router.get("/callback", async (req, res) => {
  console.log("OAuth callback received query:", req.query);

  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).send("Missing code or uid");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log("REFRESH TOKEN:", tokens.refresh_token);

    const user = await User.findOneAndUpdate(
      { uid: state },
      { refreshToken: tokens.refresh_token }
    );

    res.redirect("http://localhost:3000/");
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).send("Auth failed");
  }
});

router.post("/upload", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.token.uid;

    const user = await User.findOne({ uid: userId });

    if (!user.refreshToken) {
      return res.status(401).json({ error: "Please Sign in again." });
    }

    const file = await uploadToDrive(title, content, user.refreshToken);
    return res.json({ message: "Uploaded successfully", fileId: file.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.token.uid;

    const user = await User.findOne({ uid: userId });

    if (!user.refreshToken) {
      return res.status(401).json({ error: "Please Sign in again." });
    }

    const files = await getFiles(user.refreshToken);
    return res.json(files);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
