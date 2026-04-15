/**
 * MySock — Authentication Module
 * ─────────────────────────────────────────────────────────────
 * Supports:
 *   1. ID + Password login  (validated against js/users.js)
 *   2. Google demo login    (simulated — no real OAuth)
 *
 * Session stored in localStorage.
 * Structure is ready for backend upgrade.
 */

var AUTH_CONFIG = {
  LOGIN_KEY:           'mysock_isLoggedIn',
  USER_KEY:            'mysock_user',
  METHOD_KEY:          'mysock_login_method',
  POST_LOGIN_REDIRECT: 'services.html',
};

/* ============================================================
   Credential Validation  (uses MYSOCK_USERS from users.js)
   ============================================================ */

/**
 * Validate ID + password against the users store.
 * @returns {{ ok: true, user: object } | { ok: false, error: string }}
 */
function validateCredentials(id, password) {
  if (!id || !password) {
    return { ok: false, error: 'Please enter both ID and password.' };
  }

  if (typeof MYSOCK_USERS === 'undefined') {
    return { ok: false, error: 'User store unavailable. Reload the page.' };
  }

  var match = null;
  for (var i = 0; i < MYSOCK_USERS.length; i++) {
    if (MYSOCK_USERS[i].id === id.trim()) {
      match = MYSOCK_USERS[i];
      break;
    }
  }

  if (!match) {
    return { ok: false, error: 'Invalid ID or password.' };
  }

  if (match.password !== password) {
    return { ok: false, error: 'Invalid ID or password.' };
  }

  // Expiry check
  if (match.expiryDate) {
    var expiry = new Date(match.expiryDate);
    expiry.setHours(23, 59, 59, 999); // end of expiry day
    if (Date.now() > expiry.getTime()) {
      return { ok: false, error: 'Access expired. Please contact admin.' };
    }
  }

  return { ok: true, user: match };
}

/* ============================================================
   Session Helpers
   ============================================================ */

function storeSession(user, method) {
  try {
    localStorage.setItem(AUTH_CONFIG.LOGIN_KEY, 'true');
    localStorage.setItem('auth', 'true');
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify({
      id:      user.id      || '',
      name:    user.name    || '',
      email:   user.email   || '',
      role:    user.role    || 'User',
      picture: user.picture || '',
    }));
    localStorage.setItem(AUTH_CONFIG.METHOD_KEY, method || 'password');
  } catch (e) {
    console.error('[MySock Auth] localStorage write failed:', e);
  }
}

function clearSession() {
  try {
    localStorage.removeItem(AUTH_CONFIG.LOGIN_KEY);
    localStorage.removeItem('auth');
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    localStorage.removeItem(AUTH_CONFIG.METHOD_KEY);
    localStorage.removeItem('mysock_redirect');
  } catch (e) {}
}

function isAuthenticated() {
  try {
    return localStorage.getItem(AUTH_CONFIG.LOGIN_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

function getUser() {
  try {
    var raw = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function getLoginMethod() {
  try {
    return localStorage.getItem(AUTH_CONFIG.METHOD_KEY) || 'unknown';
  } catch (e) {
    return 'unknown';
  }
}

/* ============================================================
   Login Actions
   ============================================================ */

/**
 * ID + Password login.
 * @returns {{ ok: boolean, error?: string }}
 */
function loginWithPassword(id, password) {
  var result = validateCredentials(id, password);
  if (!result.ok) return result;

  storeSession(result.user, 'password');
  redirectAfterLogin();
  return { ok: true };
}

/**
 * Google demo login — simulates OAuth without any real API call.
 */
function loginWithGoogle() {
  var googleUser = {
    id:      'google-demo',
    name:    'Google User',
    email:   'googleuser@gmail.com',
    role:    'Client',
    picture: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff&size=64',
  };
  storeSession(googleUser, 'google');
  redirectAfterLogin();
}

function redirectAfterLogin() {
  var dest = AUTH_CONFIG.POST_LOGIN_REDIRECT;
  try {
    var stored = localStorage.getItem('mysock_redirect');
    if (stored && stored.indexOf('login.html') === -1 && stored.indexOf('index.html') === -1) {
      localStorage.removeItem('mysock_redirect');
      dest = stored;
    }
  } catch (e) {}
  window.location.href = dest;
}

/* ============================================================
   Sign Out
   ============================================================ */

function signOut() {
  clearSession();
  window.location.replace('login.html');
}

/* ============================================================
   Public API
   ============================================================ */
window.MySockAuth = {
  isAuthenticated:    isAuthenticated,
  getUser:            getUser,
  getLoginMethod:     getLoginMethod,
  loginWithPassword:  loginWithPassword,
  loginWithGoogle:    loginWithGoogle,
  signOut:            signOut,
  AUTH_CONFIG:        AUTH_CONFIG,
};
