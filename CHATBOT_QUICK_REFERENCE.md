# MySock AI Chatbot - Quick Reference

## 🚀 Quick Start (3 Steps)

### 1. Open Your Website
```
Open: d:\Extra\Programming\WebDevs\mysock\mysock\index.html
```

### 2. Test the Chatbot
- Look for the purple chat button (bottom-right corner)
- Click it to open the chat
- Try: "What services do you offer?"

### 3. (Optional) Add Gemini API Key
```javascript
// In chatbot.js, line 15:
this.GEMINI_API_KEY = 'your-actual-api-key-here';
```

**Note**: Works perfectly without API key using smart local responses!

---

## 📁 Files Added

| File | Purpose | Size |
|------|---------|------|
| `knowledge-base.js` | Company data & FAQs | 200 lines |
| `chatbot.css` | Chatbot styling | 600 lines |
| `chatbot.js` | AI logic & voice | 550 lines |
| `CHATBOT_SETUP.md` | Setup guide | - |

---

## 🎯 Key Features

✅ **AI Responses** - Gemini API + Local fallback  
✅ **Voice Input** - Speak your questions  
✅ **Voice Output** - Hear responses  
✅ **24/7 Available** - Always ready to help  
✅ **Lead Qualification** - Identifies prospects  
✅ **Mobile Optimized** - Full-screen on mobile  
✅ **Brand Aligned** - Purple/pink design  

---

## 🧪 Test Commands

Try these in the chatbot:

```
"What services do you offer?"
"How much does a website cost?"
"Tell me about your process"
"I need help with digital marketing"
"Book a discovery call"
"Do you work with international clients?"
```

---

## 🎨 Customization Quick Guide

### Change Colors
```css
/* In chatbot.css, find and replace: */
#7c3aed → your-primary-color
#ec4899 → your-secondary-color
```

### Update Contact Info
```javascript
// In knowledge-base.js:
email: "your-email@domain.com",
phone: "+1 (XXX) XXX-XXXX"
```

### Modify Services/Pricing
```javascript
// In knowledge-base.js, services section:
startingPrice: "$X,XXX"
```

---

## 🔧 Troubleshooting

**Chatbot doesn't appear?**
- Clear browser cache
- Check browser console (F12)
- Ensure all 3 files are loaded

**Voice not working?**
- Use Chrome or Edge
- Enable HTTPS
- Grant microphone permissions

**API errors?**
- Check API key is correct
- Verify internet connection
- Fallback works automatically

---

## 📞 Support

Email: hello@mysock.com  
Phone: +1 (555) 123-4567

---

## ✨ You're Ready!

Your AI chatbot is fully functional and ready to:
- Answer questions 24/7
- Qualify leads automatically
- Guide users to book calls
- Enhance user experience

**Next**: Test it thoroughly and customize to your needs!
