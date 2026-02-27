/**
 * MySock AI Chatbot with Voice Capabilities
 * Intelligent assistant powered by Gemini API
 */

class MySockChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.isTyping = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isRecording = false;
        this.isSpeaking = false;

        // Gemini API Configuration
        this.GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // User will replace this
        this.GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

        this.init();
    }

    init() {
        this.createChatbotUI();
        this.setupEventListeners();
        this.setupVoiceRecognition();
        this.loadChatHistory();
        this.sendWelcomeMessage();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <!-- Chatbot Button -->
            <button class="chatbot-button" id="chatbot-toggle" aria-label="Open chat">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>

            <!-- Chatbot Window -->
            <div class="chatbot-window" id="chatbot-window">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-avatar">🤖</div>
                    <div class="chatbot-info">
                        <div class="chatbot-title">MySock Assistant</div>
                        <div class="chatbot-status">
                            <span class="status-dot"></span>
                            <span>Online - Ready to help</span>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Messages -->
                <div class="chatbot-messages" id="chatbot-messages"></div>

                <!-- Input Area -->
                <div class="chatbot-input-area">
                    <div class="chatbot-input-wrapper">
                        <input 
                            type="text" 
                            class="chatbot-input" 
                            id="chatbot-input" 
                            placeholder="Type your message..."
                            autocomplete="off"
                        />
                        <button class="voice-button" id="voice-button" aria-label="Voice input">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                        <button class="send-button" id="send-button" aria-label="Send message">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Branding -->
                <div class="chatbot-branding">
                    Powered by <a href="#" target="_blank">MySock</a>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('send-button');
        const input = document.getElementById('chatbot-input');
        const voiceBtn = document.getElementById('voice-button');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-toggle');

        window.classList.toggle('active');
        button.classList.toggle('active');
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Save to history
        this.conversationHistory.push({ role: 'user', content: message });
        this.saveChatHistory();

        // Show typing indicator
        this.showTypingIndicator();

        // Get AI response
        const response = await this.getAIResponse(message);

        // Remove typing indicator
        this.hideTypingIndicator();

        // Add AI response
        this.addMessage(response, 'ai');
        this.conversationHistory.push({ role: 'assistant', content: response });
        this.saveChatHistory();

        // Speak response if voice is enabled
        if (this.isSpeaking) {
            this.speak(response);
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const avatar = sender === 'ai' ? '🤖' : '👤';

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${this.formatMessage(text)}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Convert markdown-style formatting
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/\n/g, '<br>');
        return text;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.isTyping = true;
    }

    hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
        this.isTyping = false;
    }

    async getAIResponse(userMessage) {
        // Try Gemini API first
        if (this.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
            try {
                return await this.getGeminiResponse(userMessage);
            } catch (error) {
                console.error('Gemini API error:', error);
                // Fall back to local responses
            }
        }

        // Fallback to intelligent local responses
        return this.getLocalResponse(userMessage);
    }

    async getGeminiResponse(userMessage) {
        const systemPrompt = this.buildSystemPrompt();

        const response = await fetch(`${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            })
        });

        if (!response.ok) {
            throw new Error('Gemini API request failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    buildSystemPrompt() {
        return `You are the MySock AI Assistant, a friendly and professional chatbot for MySock, a premium marketing agency.

Company Information:
- Name: MySock
- Tagline: Your Complete Digital Growth Partner
- Email: info.mysock@gmail.com
- Phone: +91 98974 70837
- WhatsApp: +91 98974 70837

Services Offered:
1. Website Development (from ₹2,00,000, 4-8 weeks)
2. CRM & Automation (from ₹2,50,000, 6-10 weeks)
3. Digital Marketing (from ₹1,25,000/month, ongoing)
4. Business Consulting (from ₹40,000/session, 1-2 weeks)
5. E-Commerce Solutions (from ₹4,00,000, 8-12 weeks)
6. Maintenance & Security (from ₹25,000/month, ongoing)

Process:
1. Discovery Call (30-60 min strategy session)
2. Custom Roadmap (3-5 days)
3. Design & Build (4-12 weeks)
4. Launch & Scale (ongoing)

Client Types: International, National, and Local businesses

Values:
- From Zero to Launch - Complete hand-holding
- All-In-One Solution - No juggling vendors
- Dedicated Partnership - Extension of your team
- Transparent Pricing - No hidden fees
- 24/7 Support

Your personality:
- Friendly but authoritative
- Sales-aware, not salesy
- Professional marketing consultant
- Helpful and adaptive

Guidelines:
- Keep responses concise (2-4 sentences max)
- Ask qualifying questions to understand needs
- Guide users toward booking a discovery call
- Be enthusiastic about MySock's capabilities
- Use emojis sparingly for warmth

Never:
- Make up pricing or timelines not listed
- Promise specific results
- Be pushy or aggressive
- Provide technical implementation details`;
    }

    getLocalResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        // Greetings
        if (msg.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return "Hello! 👋 Welcome to MySock! I'm here to help you transform your business digitally. What brings you here today?";
        }

        // Services inquiry
        if (msg.includes('service') || msg.includes('what do you do') || msg.includes('what can you')) {
            return "MySock offers complete digital solutions:\n\n• **Website Development** - Custom, high-performance sites\n• **CRM & Automation** - Streamline your sales\n• **Digital Marketing** - SEO, PPC, Social Media\n• **Business Consulting** - Digital strategy from scratch\n• **E-Commerce** - Full online store setup\n• **Maintenance & Security** - 24/7 protection\n\nWhich area interests you most?";
        }

        // Pricing
        if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
            return "Our pricing is transparent and tailored to your needs:\n\n• Websites start at **₹2,00,000**\n• CRM systems from **₹2,50,000**\n• Marketing from **₹1,25,000/month**\n• Consulting **₹40,000/session**\n\nTo give you an accurate quote, I'd love to understand your specific needs. What type of project are you considering?";
        }

        // Timeline
        if (msg.includes('how long') || msg.includes('timeline') || msg.includes('when')) {
            return "Most websites launch in **4-8 weeks**. Complete digital transformations take **8-12 weeks**. We keep you updated at every milestone.\n\nWhat's your ideal launch date?";
        }

        // Process
        if (msg.includes('process') || msg.includes('how do you work') || msg.includes('steps')) {
            return "Our proven 4-step process:\n\n1. **Discovery Call** - Deep dive into your vision\n2. **Custom Roadmap** - Your digital blueprint\n3. **Design & Build** - Obsessive attention to detail\n4. **Launch & Scale** - Go live with confidence\n\nReady to start with a free 30-minute strategy call?";
        }

        // Contact/Book
        if (msg.includes('contact') || msg.includes('call') || msg.includes('meeting') || msg.includes('book') || msg.includes('whatsapp')) {
            this.showWhatsAppAction();
            return "Perfect! Let's get you started. You can:\n\n📧 Email: info.mysock@gmail.com\n📞 Call: +91 98974 70837\n💬 WhatsApp: Click button below\n\nOr scroll down to our contact form to book your **free 30-minute strategy call**. What works best for you?";
        }

        // Clients
        if (msg.includes('client') || msg.includes('who do you work')) {
            return "We work with **international, national, and local** businesses across all industries. From tech startups to retail chains to local service providers.\n\nOur 50+ clients love our all-in-one approach. What type of business are you in?";
        }

        // Support
        if (msg.includes('support') || msg.includes('help after') || msg.includes('maintenance')) {
            return "Every project includes **30 days of free support** post-launch. We also offer ongoing maintenance packages starting at **₹25,000/month** with:\n\n• Security audits\n• Regular updates\n• 24/7 monitoring\n• Priority support\n\nYour success is our success! 🚀";
        }

        // Default response
        return "That's a great question! I'd love to help you with that. Could you tell me more about what you're looking for?\n\nOr feel free to ask me about:\n• Our services\n• Pricing\n• Process\n• Timeline\n• Client success stories";
    }

    // WhatsApp Integration
    showWhatsAppAction() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const whatsappDiv = document.createElement('div');
        whatsappDiv.className = 'whatsapp-action-container';
        whatsappDiv.innerHTML = `
            <button class="whatsapp-action-btn" onclick="window.mysockChatbot.openWhatsApp()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                </svg>
                <span>Continue on WhatsApp</span>
            </button>
        `;
        messagesContainer.appendChild(whatsappDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    openWhatsApp(customMessage = '') {
        const conversationSummary = this.getConversationSummary();
        const message = customMessage || `Hi MySock! I'm interested in your digital services.\n\n${conversationSummary}`;
        const whatsappUrl = `https://wa.me/919897470837?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    getConversationSummary() {
        // Get last few user messages to provide context
        const userMessages = this.conversationHistory
            .filter(msg => msg.role === 'user')
            .slice(-3)
            .map(msg => msg.content);

        if (userMessages.length > 0) {
            return `Here's what I've been asking about:\n${userMessages.join('\n')}`;
        }
        return '';
    }

    sendWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hi! 👋 I'm the MySock AI Assistant. I'm here to help you transform your business digitally.\n\nHow can I help you today?", 'ai');

            // Add quick suggestions
            setTimeout(() => {
                this.addQuickSuggestions([
                    "What services do you offer?",
                    "How much does a website cost?",
                    "Tell me about your process",
                    "Contact on WhatsApp"
                ]);
            }, 500);
        }, 1000);
    }

    addQuickSuggestions(suggestions) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'quick-suggestions';

        suggestions.forEach(suggestion => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => {
                document.getElementById('chatbot-input').value = suggestion;
                this.sendMessage();
                suggestionsDiv.remove();
            });
            suggestionsDiv.appendChild(chip);
        });

        messagesContainer.appendChild(suggestionsDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Voice Recognition Setup
    setupVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('Speech recognition not supported');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chatbot-input').value = transcript;
            this.sendMessage();
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.stopVoiceInput();
        };

        this.recognition.onend = () => {
            this.stopVoiceInput();
        };
    }

    toggleVoiceInput() {
        if (this.isRecording) {
            this.stopVoiceInput();
        } else {
            this.startVoiceInput();
        }
    }

    startVoiceInput() {
        if (!this.recognition) {
            alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        this.isRecording = true;
        const voiceBtn = document.getElementById('voice-button');
        voiceBtn.classList.add('recording');

        try {
            this.recognition.start();
        } catch (error) {
            console.error('Error starting recognition:', error);
            this.stopVoiceInput();
        }
    }

    stopVoiceInput() {
        this.isRecording = false;
        const voiceBtn = document.getElementById('voice-button');
        voiceBtn.classList.remove('recording');

        if (this.recognition) {
            this.recognition.stop();
        }
    }

    // Text-to-Speech
    speak(text) {
        if (!this.synthesis) {
            console.log('Speech synthesis not supported');
            return;
        }

        // Cancel any ongoing speech
        this.synthesis.cancel();

        // Clean text for speech
        const cleanText = text.replace(/[*_#]/g, '').replace(/<[^>]*>/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.95; // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to use a natural voice
        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.name.includes('Google') ||
            voice.name.includes('Natural') ||
            voice.name.includes('Enhanced')
        );
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        this.synthesis.speak(utterance);
    }

    // Chat History Management
    saveChatHistory() {
        try {
            localStorage.setItem('mysock_chat_history', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    loadChatHistory() {
        try {
            const history = localStorage.getItem('mysock_chat_history');
            if (history) {
                this.conversationHistory = JSON.parse(history);
                // Optionally restore messages to UI
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mysockChatbot = new MySockChatbot();
});
