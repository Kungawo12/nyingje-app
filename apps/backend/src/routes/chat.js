const router = require("express").Router();
const Anthropic = require("@anthropic-ai/sdk");
const db = require("../config/db");
const verifyToken = require("../middleware/auth");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Nyingje, a compassionate AI companion rooted in Buddhist wisdom and modern psychology.
You help people navigate difficult emotions — anger, anxiety, depression, and everyday struggles.
Listen with care, reflect with wisdom, and respond with warmth. Never judge. Keep responses concise and human.`;

const ENCRYPTION_KEY = process.env.JWT_SECRET; // reuse secret for symmetric encryption

async function encryptContent(client, text) {
  const { rows } = await client.query(
    "SELECT pgp_sym_encrypt($1, $2) AS enc",
    [text, ENCRYPTION_KEY]
  );
  return rows[0].enc;
}

async function decryptContent(client, enc) {
  const { rows } = await client.query(
    "SELECT pgp_sym_decrypt($1::bytea, $2) AS dec",
    [enc, ENCRYPTION_KEY]
  );
  return rows[0].dec;
}

// POST /chat  — requires auth
router.post("/", verifyToken, async (req, res) => {
  const { message, conversationId } = req.body;
  if (!message) return res.status(400).json({ error: "message is required" });

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      const { rows } = await client.query(
        "INSERT INTO conversations (user_id) VALUES ($1) RETURNING id",
        [req.user.userId]
      );
      convId = rows[0].id;
    } else {
      // Verify ownership
      const { rows } = await client.query(
        "SELECT id FROM conversations WHERE id = $1 AND user_id = $2",
        [convId, req.user.userId]
      );
      if (!rows.length) return res.status(403).json({ error: "Not your conversation" });
    }

    // Save user message (encrypted)
    const userEnc = await encryptContent(client, message);
    await client.query(
      "INSERT INTO messages (conversation_id, role, content_encrypted) VALUES ($1, $2, $3)",
      [convId, "user", userEnc]
    );

    // Fetch last 10 messages for context
    const { rows: msgRows } = await client.query(
      "SELECT role, content_encrypted FROM messages WHERE conversation_id = $1 ORDER BY created_at DESC LIMIT 10",
      [convId]
    );
    const history = await Promise.all(
      msgRows.reverse().map(async (m) => ({
        role: m.role,
        content: await decryptContent(client, m.content_encrypted),
      }))
    );

    // Call Claude
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: history,
    });
    const aiText = response.content[0].text;

    // Save AI reply (encrypted)
    const aiEnc = await encryptContent(client, aiText);
    await client.query(
      "INSERT INTO messages (conversation_id, role, content_encrypted) VALUES ($1, $2, $3)",
      [convId, "assistant", aiEnc]
    );

    await client.query("COMMIT");
    res.json({ reply: aiText, conversationId: convId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  } finally {
    client.release();
  }
});

module.exports = router;
