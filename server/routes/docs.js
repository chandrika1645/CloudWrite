const express = require("express");
const { uploadToDrive, getFiles } = require("../googleDriveService");
const User = require("../models/User");
const verifyToken = require("../middleware/userAuth");
const router = express.Router();
const { google } = require("googleapis");
const axios = require("axios");

router.post("/upload", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if(!title || !content){
        return res.send("Input fields are required.")
    }
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
