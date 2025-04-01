const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const axios = require("axios");

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

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const googleAuth = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing code or uid");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    const user = userInfoResponse.data;

    let data = await User.findOne({ uid: user.sub });
    if (data) {
      data = await User.findOneAndUpdate(
        { uid: user.sub },
        { refreshToken: tokens.refresh_token },
        { new: true }
      );
    } else {
      data = await User.create({
        uid: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
        refreshToken: tokens.refresh_token,
      });
    }

    let jwtToken;

    try {
      jwtToken = generateJWT(user.sub, user.email);
    } catch (jwtError) {
      console.error("Error generating JWT:", jwtError);
    }

    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    return res.redirect("http://localhost:3000/");

    // return res.json({
    //   success: true,
    //   jwtToken,
    //   user: {
    //     uid: user.sub,
    //     email: user.email,
    //     name: user.name,
    //     picture: user.picture,
    //   },
    // });
  } catch (err) {
    console.error("OAuth callback error:", err);
    return res.status(500).send("Auth failed");
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.token.uid;

    const user = await User.findOne({ uid: userId }).select("-refreshToken");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwtToken");
  res.json({ success: true, message: "Logged out" });
};

module.exports = { googleAuth, logout, userProfile };
