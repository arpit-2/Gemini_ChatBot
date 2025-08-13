const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config/config");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ 
      model: config.gemini.model,
      systemInstruction: config.gemini.systemInstruction,
      generationConfig: config.gemini.generationConfig
    });
    this.chatSession = null;
  }

  async startNewChat() {
    this.chatSession = await this.model.startChat({
      history: [],
      generationConfig: config.gemini.generationConfig
    });
    return this.chatSession;
  }

  async sendMessage(message) {
    try {
      if (!this.chatSession) {
        await this.startNewChat();
      }
      
      const result = await this.chatSession.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("GeminiService Error:", error);
      throw new Error("Failed to get response from Gemini");
    }
  }
}

module.exports = new GeminiService();