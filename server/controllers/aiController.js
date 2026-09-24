const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        reply: "Prompt is required",
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are AyurVeda AI, a helpful wellness assistant. Give concise, friendly wellness guidance. Do not claim to diagnose diseases or replace a doctor.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.5,
      max_tokens: 200,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Groq AI Error:", error.message);

    res.status(500).json({
      success: false,
      reply: "⚠️ AI is unavailable right now.",
    });
  }
};

module.exports = { chatWithAI };
