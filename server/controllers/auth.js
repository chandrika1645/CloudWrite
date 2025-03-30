const jwt = require("jsonwebtoken");
const admin = require("../config/firebase");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
  path.join(__dirname, "../private.pem"),
  "utf8"
);

const generateJWT = (userId, email) => {
  return jwt.sign({ uid: userId, email: email, role: "user" }, privateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });
};

const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ uid, email, name, picture });
    }

    let jwtToken;

    try {
      jwtToken = generateJWT(user.uid, user.email);
    } catch (jwtError) {
      console.error("Error generating JWT:", jwtError);
    }

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({
      success: true,
      jwtToken,
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};

module.exports = { googleAuth, logout };
