'use strict';

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const { OAuth2Client } = require('google-auth-library');

/* ============================================================
   Config
   ============================================================ */
const PORT       = process.env.PORT || 3000;
const CLIENT_ID  = process.env.GOOGLE_CLIENT_ID;
const ORIGINS    = (process.env.ALLOWED_ORIGINS || 'http://localhost:5500')
                     .split(',').map(o => o.trim());

if (!CLIENT_ID || CLIENT_ID.includes('YOUR_GOOGLE')) {
  console.error('\n[MySock Server] ⚠️  GOOGLE_CLIENT_ID is not set in .env\n');
  process.exit(1);
}

const client = new OAuth2Client(CLIENT_ID);
const app    = express();

/* ============================================================
   Middleware
   ============================================================ */
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman) in dev
    if (!origin || ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

/* ============================================================
   Routes
   ============================================================ */

/**
 * POST /api/auth/verify
 * Body: { token: <Google ID token string> }
 * Returns: { ok: true, user: { id, email, name, picture } }
 *       or: { ok: false, error: '...' }
 */
app.post('/api/auth/verify', async (req, res) => {
  const { token } = req.body;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ ok: false, error: 'Missing or invalid token.' });
  }

  try {
    const ticket  = await client.verifyIdToken({
      idToken:  token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Validate required fields
    if (!payload.email_verified) {
      return res.status(401).json({ ok: false, error: 'Google account email is not verified.' });
    }

    return res.json({
      ok:   true,
      user: {
        id:      payload.sub,
        email:   payload.email,
        name:    payload.name,
        picture: payload.picture,
      },
    });

  } catch (err) {
    console.error('[MySock Server] Token verification failed:', err.message);

    // Distinguish between expired tokens and other errors
    const isExpired = err.message?.includes('Token used too late');
    return res.status(401).json({
      ok:    false,
      error: isExpired ? 'Session expired. Please sign in again.' : 'Invalid token.',
    });
  }
});

/**
 * GET /api/health
 * Simple health check endpoint.
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'MySock Auth Server', timestamp: new Date().toISOString() });
});

/**
 * POST /order
 * Body: { service_name, price, category }
 * Saves order intent and returns WhatsApp URL.
 */
app.post('/order', (req, res) => {
  const { service_name, price, category } = req.body;
  if (!service_name) {
    return res.status(400).json({ ok: false, error: 'service_name is required.' });
  }
  // In production: save to MongoDB here
  console.log('[MySock Order]', { service_name, price, category, at: new Date().toISOString() });
  const waNumber = process.env.WHATSAPP_NUMBER || '919999999999';
  const text = encodeURIComponent(`I want this service: ${service_name}`);
  return res.json({ ok: true, whatsapp: `https://wa.me/${waNumber}?text=${text}` });
});

/* ============================================================
   Error handler
   ============================================================ */
app.use((err, _req, res, _next) => {
  console.error('[MySock Server] Unhandled error:', err.message);
  res.status(500).json({ ok: false, error: 'Internal server error.' });
});

/* ============================================================
   Start
   ============================================================ */
app.listen(PORT, () => {
  console.log(`\n✅  MySock Auth Server running on http://localhost:${PORT}`);
  console.log(`   Allowed origins: ${ORIGINS.join(', ')}`);
  console.log(`   Google Client ID: ${CLIENT_ID.slice(0, 20)}...\n`);
});
