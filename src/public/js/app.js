class VoiceAssistant {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
    this.isSpeaking = false;
    
    this.uiElements = {
      startBtn: document.getElementById('startBtn'),
      languageSelect: document.getElementById('languageSelect'),
      statusIndicator: document.getElementById('statusIndicator'),
      listeningAnimation: document.getElementById('listeningAnimation'),
      themeToggle: document.getElementById('themeToggle')
    };
    
    this.initEventListeners();
    this.checkSpeechSupport();
  }
  
  checkSpeechSupport() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      this.showStatusError("Speech recognition not supported in your browser");
      return false;
    }
    
    if (!('speechSynthesis' in window)) {
      this.showStatusError("Speech synthesis not supported in your browser");
      return false;
    }
    
    return true;
  }
  
  initEventListeners() {
    this.uiElements.startBtn.addEventListener('click', () => this.toggleListening());
    this.uiElements.languageSelect.addEventListener('change', () => this.updateLanguage());
    this.uiElements.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Handle keyboard shortcut (Space) for voice control
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.isSpeaking) {
        e.preventDefault();
        this.toggleListening();
      }
    });
  }
  
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = this.uiElements.languageSelect.value;
    
    this.recognition.onstart = () => {
      this.isListening = true;
      this.updateUI();
    };
    
    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.processUserInput(transcript);
    };
    
    this.recognition.onerror = (event) => {
      this.showStatusError(`Error: ${event.error}`);
      this.stopListening();
    };
    
    this.recognition.onend = () => {
      this.stopListening();
    };
  }
  
  async processUserInput(text) {
    try {
      const response = await this.sendToAssistant(text);
      this.speak(response);
    } catch (error) {
      this.showStatusError("Failed to get response");
      this.speak("Sorry, I encountered an error. Please try again.");
    }
  }
  
  async sendToAssistant(message) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  }
  
  speak(text) {
    if (this.isSpeaking) {
      this.synthesis.cancel();
    }
    
    this.isSpeaking = true;
    this.updateUI();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.uiElements.languageSelect.value;
    
    utterance.onstart = () => {
      this.uiElements.statusIndicator.innerHTML = '<span class="pulse"></span><span>Speaking</span>';
    };
    
    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateUI();
    };
    
    utterance.onerror = (event) => {
      console.error('SpeechSynthesis error:', event);
      this.isSpeaking = false;
      this.updateUI();
    };
    
    this.synthesis.speak(utterance);
  }
  
  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }
  
  startListening() {
    if (this.isSpeaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
    
    if (!this.recognition) {
      this.initSpeechRecognition();
    }
    
    this.recognition.start();
    document.body.classList.add('listening');
  }
  
  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
    
    this.isListening = false;
    this.updateUI();
    document.body.classList.remove('listening');
  }
  
  updateLanguage() {
    if (this.recognition) {
      this.recognition.lang = this.uiElements.languageSelect.value;
    }
  }
  
  updateUI() {
    if (this.isListening) {
      this.uiElements.statusIndicator.innerHTML = '<span class="pulse"></span><span>Listening</span>';
      this.uiElements.listeningAnimation.style.display = 'flex';
      this.uiElements.startBtn.innerHTML = '<i class="fas fa-stop"></i>';
    } else if (this.isSpeaking) {
      this.uiElements.statusIndicator.innerHTML = '<span class="pulse"></span><span>Speaking</span>';
      this.uiElements.listeningAnimation.style.display = 'none';
      this.uiElements.startBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    } else {
      this.uiElements.statusIndicator.innerHTML = '<span class="pulse"></span><span>Ready</span>';
      this.uiElements.listeningAnimation.style.display = 'none';
      this.uiElements.startBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    }
  }
  
  toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = this.uiElements.themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }
  
  showStatusError(message) {
    this.uiElements.statusIndicator.innerHTML = `<span class="pulse" style="background-color:#ff4444;"></span><span>${message}</span>`;
    setTimeout(() => this.updateUI(), 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new VoiceAssistant();
});