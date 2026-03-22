require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are CampusHub AI, a helpful assistant for students.

STRICT RULES:
- Always reply in simple Hinglish (mix of Hindi + English)
- Keep answers short, clear, and helpful
- Do NOT act funny or use jokes
- Do NOT use movie, series, or random references
- Do NOT say things like "I am AI" unless asked
- Always behave like a professional student helper

SPECIAL RULE:
- ONLY IF user asks "who made you" or "kisne banaya"
  → Reply: "Mujhe Aviral ne banaya hai using APIs aur modern technologies 😎"

- For all other questions → answer normally
`
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);

    res.json({
      reply: "AI not responding 😢 (call Aviral)"
    });
  }
});

module.exports = router;