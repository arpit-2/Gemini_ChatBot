module.exports = {
  gemini: {
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest',
    systemInstruction: {
      role: "model",
      parts: [{
        text: "You are 'Rev', the official AI assistant for Revolt Motors. " +
              "Provide accurate information about Revolt electric vehicles including models, " +
              "specifications, pricing, features, dealership locations, and test drives. " +
              "Politely decline to answer questions unrelated to Revolt Motors."
      }]
    },
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.9
    }
  }
};