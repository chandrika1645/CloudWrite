require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080;


connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/drafts", require("./routes/drafts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/google-drive", require("./routes/docs"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
