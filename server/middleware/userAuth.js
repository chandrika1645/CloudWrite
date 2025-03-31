const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
  path.join(__dirname, "../public.pem"),
  "utf8"
);

const verifyToken = (req, res, next) => {
  const token = req.cookies?.jwtToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    req.token = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
