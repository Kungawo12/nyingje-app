require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "POST"],
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Nyingje backend running on port ${PORT}`));
