# MySock — Authentication Setup Guide

## Quick Start

### Step 1: Get a Google OAuth Client ID

1. Go to https://console.cloud.google.com/
2. Create a project → **APIs & Services → Credentials**
3. Click **Create Credentials → OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Add **Authorized JavaScript origins**:
   ```
   http://localhost
   http://localhost:3000
   http://localhost:5500
   http://127.0.0.1:5500
   https://yourdomain.com
   ```
6. Click **Create** — copy the **Client ID**

> ⚠️ Google Sign-In does NOT work on `file://` URLs.
> You must use a local server (VS Code Live Server, `npx serve`, etc.)

---

### Step 2: Add Your Client ID

Open `js/auth.js` and replace:
```js
CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
```
with your actual Client ID.

---

### Step 3: Run the Frontend

**Option A — VS Code Live Server:**
- Open `login.html` → click **Go Live**
- URL: `http://127.0.0.1:5500/login.html`

**Option B — Node serve:**
```bash
npx serve .
```

---

### Step 4: Run the Backend (Optional)

The backend verifies Google tokens server-side. If it's not running,
the frontend gracefully falls back to client-side session only.

```bash
cd server
cp .env.example .env
# Edit .env — add your GOOGLE_CLIENT_ID
npm install
npm start
# Server runs on http://localhost:3000
```

---

## Authentication Flow

```
User visits login.html
  → Already authenticated? → redirect to dashboard.html
  → Not authenticated?     → show Google Sign-In button

User clicks "Sign in with Google"
  → Google popup opens
  → User selects account
  → Google returns ID token (JWT)

auth.js receives token:
  → Decodes JWT client-side (for immediate UI use)
  → Optionally sends to /api/auth/verify (server-side validation)
  → Stores session in sessionStorage (8-hour expiry)
  → Redirects to dashboard.html (or originally requested page)

Protected pages (dashboard, profile, services, etc.):
  → guard.js runs synchronously in <head>
  → Checks sessionStorage for valid, non-expired token
  → Invalid/expired → redirect to login.html immediately
  → Valid → page renders normally

Sign Out:
  → Clears sessionStorage
  → Calls google.accounts.id.disableAutoSelect()
  → Redirects to login.html
```

---

## Page Structure

| Page | Protected | Notes |
|------|-----------|-------|
| `index.html` | No | Public homepage |
| `login.html` | No | Sign-in page — redirects to dashboard if already logged in |
| `dashboard.html` | **Yes** | Main client portal |
| `profile.html` | **Yes** | User account details |
| `services.html` | **Yes** | Services page |
| `work.html` | **Yes** | Projects page |
| `about.html` | No | Public |
| `vision.html` | No | Public |
| `contact.html` | No | Public |

---

## File Structure

```
├── login.html          ← Sign-in page (entry point for auth)
├── dashboard.html      ← Protected — main portal
├── profile.html        ← Protected — user profile
├── index.html          ← Public homepage
├── services.html       ← Protected
├── work.html           ← Protected
├── about.html          ← Public
├── vision.html         ← Public
├── contact.html        ← Public
│
├── css/
│   ├── style.css       ← Global styles
│   ├── pages.css       ← Inner page styles
│   ├── auth.css        ← Login page styles
│   └── dashboard.css   ← Dashboard & profile styles
│
├── js/
│   ├── auth.js         ← Core auth module (GIS, session, redirect)
│   ├── guard.js        ← Synchronous route guard (in <head>)
│   ├── login.js        ← Login page controller
│   ├── dashboard.js    ← Dashboard/profile controller
│   ├── main.js         ← Public pages (header auth UI, mobile nav)
│   ├── contact.js      ← Contact form
│   └── work.js         ← Work page filter
│
└── server/
    ├── index.js        ← Express server — token verification
    ├── package.json
    └── .env.example    ← Copy to .env
```

---

## Protecting Additional Pages

Add these two lines to `<head>` of any page you want to protect:

```html
<script src="js/auth.js"></script>
<script src="js/guard.js"></script>
```

That's it. `guard.js` runs synchronously before the page renders —
no flash of content, no extra configuration needed.
