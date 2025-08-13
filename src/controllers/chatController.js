const geminiService = require("../services/geminiService");

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: "Invalid input: Message must be a non-empty string" 
      });
    }

    const startTime = Date.now();
    const response = await geminiService.sendMessage(message);
    const latency = Date.now() - startTime;

    console.log(`Response latency: ${latency}ms`);
    
    res.json({ 
      response,
      metadata: {
        latency: `${latency}ms`,
        model: process.env.GEMINI_MODEL
      }
    });
  } catch (error) {
    console.error("ChatController Error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
};