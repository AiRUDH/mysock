# MySock AI Chatbot - Setup Guide

## 🎉 Installation Complete!

Your AI-powered chatbot with voice capabilities has been successfully integrated into your MySock website.

## 📋 Quick Start

### 1. **Gemini API Setup** (Optional but Recommended)

To enable advanced AI responses:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Open `chatbot.js` and replace:
   ```javascript
   this.GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
   with your actual API key:
   ```javascript
   this.GEMINI_API_KEY = 'your-actual-api-key';
   ```

**Note**: The chatbot works perfectly without the API key using intelligent local responses!

### 2. **Test the Chatbot**

1. Open `index.html` in your browser
2. Click the purple chat button in the bottom-right corner
3. Try these test messages:
   - "What services do you offer?"
   - "How much does a website cost?"
   - "Tell me about your process"
   - "Book a discovery call"

### 3. **Test Voice Features**

1. Click the microphone icon in the chat input
2. Allow microphone permissions when prompted
3. Speak your question clearly
4. The chatbot will transcribe and respond

**Browser Support for Voice**:
- ✅ Chrome (Best)
- ✅ Edge
- ✅ Safari
- ⚠️ Firefox (Limited support)

## 🎨 Features Included

### ✅ AI Intelligence
- Gemini API integration for advanced responses
- Intelligent fallback responses (works without API)
- Context-aware conversations
- Lead qualification logic
- Company knowledge base

### ✅ Voice Capabilities
- **Speech-to-Text**: Speak your questions
- **Text-to-Speech**: Hear responses (auto-enabled)
- Professional voice tone
- Visual recording indicators

### ✅ Premium UI/UX
- Glassmorphism design matching your brand
- Smooth animations and transitions
- Mobile-responsive (full-screen on mobile)
- Typing indicators
- Quick suggestion chips
- Chat history persistence

### ✅ Branding
- "Powered by MySock" footer
- Brand colors (purple/pink gradients)
- Professional avatar
- Custom styling

## 🎯 Customization

### Update Company Information

Edit `knowledge-base.js` to update:
- Services and pricing
- Contact details
- Company values
- FAQs
- Testimonials

### Customize Appearance

Edit `chatbot.css` to change:
- Colors (search for `#7c3aed` and `#ec4899`)
- Button position
- Window size
- Animations

### Modify AI Personality

Edit `chatbot.js` in the `buildSystemPrompt()` function to adjust:
- Tone and style
- Response length
- Conversation guidelines

## 📱 Mobile Experience

The chatbot automatically adapts to mobile:
- Full-screen chat window
- Touch-optimized controls
- Responsive text sizing
- Optimized animations

## 🔒 Security & Privacy

- API key should be moved to environment variables in production
- Chat history stored locally (user's browser only)
- No sensitive data logged
- HTTPS required for voice features

## 🚀 Deployment Checklist

Before going live:

- [ ] Add your Gemini API key (or use local responses)
- [ ] Test all conversation flows
- [ ] Test voice input/output
- [ ] Verify mobile responsiveness
- [ ] Update contact information in knowledge base
- [ ] Test on multiple browsers
- [ ] Enable HTTPS for voice features

## 💡 Usage Tips

### For Best AI Responses:
1. Use the Gemini API for most natural conversations
2. Update the knowledge base with your actual services/pricing
3. Monitor conversations to improve responses

### For Voice Features:
1. Use Chrome or Edge for best experience
2. Ensure HTTPS is enabled
3. Grant microphone permissions
4. Speak clearly and pause between sentences

## 🛠️ Troubleshooting

### Chatbot doesn't appear
- Check browser console for errors
- Ensure all files are loaded (chatbot.css, chatbot.js, knowledge-base.js)
- Clear browser cache

### Voice not working
- Check browser compatibility
- Ensure HTTPS is enabled
- Grant microphone permissions
- Try Chrome or Edge

### API errors
- Verify API key is correct
- Check API quota limits
- Ensure internet connection
- Fallback to local responses works automatically

## 📞 Support

For questions or issues:
- Email: hello@mysock.com
- Phone: +1 (555) 123-4567

---

## 🎊 You're All Set!

Your MySock website now has a premium AI chatbot that will:
- ✅ Answer visitor questions 24/7
- ✅ Qualify leads automatically
- ✅ Guide users to book discovery calls
- ✅ Provide voice interaction
- ✅ Enhance user experience

**Next Steps**: Test thoroughly and customize to your needs!
