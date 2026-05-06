const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email, and password are required" });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const { rows } = await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, passwordHash]
    );
    const user = rows[0];
    res.status(201).json({ token: signToken(user.id), user });
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ error: "Email already in use" });
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  try {
    const { rows } = await db.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = $1",
      [email]
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ token: signToken(user.id), user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
