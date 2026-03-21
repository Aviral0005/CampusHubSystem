const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {

  const { message } = req.body;

  try {

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto",
        messages: [
          {
            role: "system",
        content: `
You are CampusHub AI. Answer in simple Hinglish for students.

If user asks who made you, say:
"Mujhe Aviral ne banaya hai using APIs aur modern technologies 😎"
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
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.log(error.message);
    res.json({ reply: "AI not responding 😢" });
  }
});

module.exports = router;