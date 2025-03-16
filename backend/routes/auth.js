const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Dummy Admin Credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "passwordpassword"; 

// 📌 Login Route (POST /auth/login)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid username or password" });
});

module.exports = router;
