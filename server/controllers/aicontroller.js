const axios = require('axios');

const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        reply: 'Prompt is required',
      });
    }

    const response = await axios.post(
      'http://127.0.0.1:11434/api/generate',
      {
        model: 'llama3.2:3b',
        prompt,
        stream: false,
        options: {
          num_predict: 120,
          temperature: 0.5,
          top_k: 20,
          top_p: 0.9,
        },
      },
      { timeout: 30000 }
    );

    res.json({
      success: true,
      reply: response.data.response,
    });

  } catch (error) {
    console.error('AI Error:', error.message);

    res.status(500).json({
      success: false,
      reply: '⚠️ AI is unavailable right now.',
    });
  }
};

module.exports = { chatWithAI };