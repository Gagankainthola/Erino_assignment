const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}));


app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

module.exports = app;
