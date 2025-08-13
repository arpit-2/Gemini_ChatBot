# Revolt Motors - Rev Gemini Voice Assistant

A voice-controlled AI assistant for Revolt Motors dealerships, powered by Google's Gemini AI. Provides instant voice responses about Revolt electric vehicles.

## Features

🎙️ **Voice-First Interaction**  
- Pure speech-to-speech interface
- Real-time listening indicators
- Multi-language support (English, Hindi, Marathi)

🌓 **Smart UI**  
- Light/Dark theme toggle
- Animated status indicators
- Revolt-branded interface
- Responsive design

⚡ **AI-Powered**  
- Google Gemini backend
- Custom system instructions for EV expertise
- Context-aware conversations

🔌 **Tech Stack**
- Node.js + Express backend
- Google Generative AI SDK
- Web Speech API (frontend)
- Modern CSS animations

## Install dependencies
npm install


##Configure environment
##Create .env file:
GEMINI_API_KEY=your_google_api_key
PORT=3000
GEMINI_MODEL=gemini-1.5-flash-latest


##Run the application
npm start


##Usage


Start the assistant
Click the microphone button or press Spacebar
Speak naturally about Revolt vehicles
Supported Queries
Model specifications
Pricing and variants
Dealership locations
Test drive booking

##Controls
🎙️ Microphone button: Toggle voice input
🌓 Moon/Sun icon: Toggle dark mode
🌐 Language selector: Change response language




Gemini_ChatBot
├── public/               # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── src/
│   ├── config/           # AI configuration
│   ├── controllers/      # Route handlers
│   ├── routes/           # Express routes
│   └── services/         # Gemini integration
├── .env.example          # Environment template
└── app.js               # Main server file
public/           # Frontend assets
  js/app.js       # Voice assistant logic
  css/style.css   # Responsive styles
  images/         # Brand assets
src/
  controllers/    # Route handlers
  config/         # AI configurations
  routes/         # Express routes
  services/       # Gemini integration
