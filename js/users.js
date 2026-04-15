/**
 * MySock — User Credentials Store
 * ─────────────────────────────────────────────────────────────
 * DEMO / TESTING ONLY — not for production use.
 * Replace with a real backend API before going live.
 *
 * HOW TO ADD A USER:
 *   {
 *     id:         'yourID',          // login username
 *     password:   'yourPassword',    // plain text (demo only)
 *     name:       'Display Name',    // shown in dashboard
 *     email:      'user@email.com',  // shown in dashboard
 *     role:       'Client',          // shown as badge
 *     expiryDate: '2026-12-31',      // YYYY-MM-DD — set to future date
 *   }
 *
 * EXPIRY:
 *   If today's date is past expiryDate, login is rejected with:
 *   "Access expired. Please contact admin."
 */

var MYSOCK_USERS = [
  {
    id:         'project7894',
    password:   'mysock@2026',
    name:       'Project Client',
    email:      'client@mysock.io',
    role:       'Client',
    expiryDate: '2026-12-31',
  },
  {
    id:         'admin',
    password:   'admin@2026',
    name:       'Admin User',
    email:      'admin@mysock.io',
    role:       'Administrator',
    expiryDate: '2027-06-30',
  },
  {
    id:         'demo',
    password:   'demo123',
    name:       'Demo Account',
    email:      'demo@mysock.io',
    role:       'Demo',
    expiryDate: '2027-12-31',
  },
];
