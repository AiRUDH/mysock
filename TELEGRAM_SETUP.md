# MySock - Telegram Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Create Your Telegram Bot
1. Open Telegram and search for **@BotFather**
2. Send the command: `/newbot`
3. Give your bot a name (e.g., "MySock Leads")
4. Give it a username ending in `bot` (e.g., `mysock_leads_bot`)
5. **Copy the API token** you receive (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Your Chat ID
1. **Message your new bot** first (just send "hi")
2. Open this URL in your browser (replace `YOUR_TOKEN`):
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
3. Find `"chat":{"id":123456789` - that number is your **Chat ID**

### Step 3: Configure the Website
1. Open `script.js`
2. Find these lines at the top:
   ```javascript
   const TELEGRAM_CONFIG = {
       BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
       CHAT_ID: 'YOUR_CHAT_ID_HERE'
   };
   ```
3. Replace with your actual values:
   ```javascript
   const TELEGRAM_CONFIG = {
       BOT_TOKEN: '123456789:ABCdefGHIjklMNOpqrsTUVwxyz',
       CHAT_ID: '987654321'
   };
   ```

### Step 4: Test It!
1. Open the website
2. Fill out the contact form
3. Submit - you should receive a Telegram message instantly!

---

## What You'll Receive

When someone submits the form, you'll get a formatted message like:

```
🔔 New MySock Lead!

👤 Name: John Smith
📧 Email: john@example.com
🏢 Company: Tech Corp

💬 Message:
I need a website for my business...

📅 Submitted: 2/3/2026, 12:30:00 AM
```

---

## Troubleshooting

**Not receiving messages?**
- Make sure you messaged your bot first
- Double-check the token and chat ID
- Check browser console for errors (F12 → Console)

**CORS errors?**
- This is normal for some browsers in local testing
- Deploy to a hosting service for full functionality
- Or use a CORS proxy for development

---

## Security Note

⚠️ The bot token is visible in your JavaScript code. For production:
1. Consider using a serverless function (Cloudflare Workers, Vercel Functions)
2. Or use a form service like Formspree with Telegram webhook

For a simple portfolio/agency site, direct API calls work fine!
