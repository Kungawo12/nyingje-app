const router = require("express").Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email is required" });
  }
  try {
    await db.query("INSERT INTO waitlist (email) VALUES ($1)", [email.trim().toLowerCase()]);
    res.status(201).json({ message: "You're on the list!" });
  } catch (err) {
    if (err.code === "23505") return res.status(200).json({ message: "Already on the list!" });
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
