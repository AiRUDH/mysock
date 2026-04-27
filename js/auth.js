/**
 * MySock — Google Identity Services Auth
 * ─────────────────────────────────────────────────────────────
 * Pure client-side Google login. No backend, no Firebase.
 * Client ID: 841060951560-b3sro1dikmss5al5k0infucon3s61q8k.apps.googleusercontent.com
 */

(function () {
  'use strict';

  var CLIENT_ID  = '841060951560-b3sro1dikmss5al5k0infucon3s61q8k.apps.googleusercontent.com';
  var LOGIN_KEY  = 'mysock_loggedIn';
  var USER_KEY   = 'mysock_user';

  /* ── JWT decode (no library needed) ──────── */
  function parseJwt(token) {
    try {
      var base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      var json   = decodeURIComponent(
        atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  /* ── Session helpers ──────────────────────── */
  function saveSession(user) {
    try {
      localStorage.setItem(LOGIN_KEY, 'true');
      localStorage.setItem(USER_KEY, JSON.stringify({
        name:    user.name    || '',
        email:   user.email   || '',
        picture: user.picture || '',
        sub:     user.sub     || '',
      }));
    } catch (e) {}
  }

  function clearSession() {
    try {
      localStorage.removeItem(LOGIN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {}
  }

  function isLoggedIn() {
    try {
      return localStorage.getItem(LOGIN_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function getUser() {
    try {
      var raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  /* ── Google callback ──────────────────────── */
  function handleCredentialResponse(response) {
    var user = parseJwt(response.credential);
    if (!user) {
      console.error('[MySock Auth] Failed to parse Google credential.');
      return;
    }
    saveSession(user);

    // Redirect to intended page or index
    var dest = 'index.html';
    try {
      var intended = sessionStorage.getItem('mysock_intended');
      if (intended && intended.indexOf('login.html') === -1) {
        sessionStorage.removeItem('mysock_intended');
        dest = intended;
      }
    } catch (e) {}

    window.location.replace(dest);
  }
  function checkAuth() {
    if (!isLoggedIn()) {
      try {
        sessionStorage.setItem('mysock_intended', window.location.href);
      } catch (e) {}
      window.location.replace('login.html');
    }
  }

  /* ── Logout ───────────────────────────────── */
  function logout() {
    clearSession();
    // Revoke Google session so One Tap doesn't auto-sign back in
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try { window.google.accounts.id.disableAutoSelect(); } catch (e) {}
    }
    window.location.replace('login.html');
  }

  /* ── Init Google button (call on login.html) */
  function initGoogleLogin(buttonContainerId) {
    if (!window.google || !window.google.accounts) {
      console.error('[MySock Auth] Google Identity Services not loaded.');
      return;
    }
    google.accounts.id.initialize({
      client_id:              CLIENT_ID,
      callback:               handleCredentialResponse,
      auto_select:            false,
      cancel_on_tap_outside:  true,
    });
    google.accounts.id.renderButton(
      document.getElementById(buttonContainerId),
      {
        theme:     'outline',
        size:      'large',
        width:     320,
        text:      'continue_with',
        shape:     'rectangular',
        logo_alignment: 'left',
      }
    );
    // Also show One Tap prompt
    google.accounts.id.prompt();
  }

  /* ── Navbar user chip ─────────────────────── */
  function renderNavUser() {
    var slot = document.getElementById('navUserSlot');
    if (!slot) return;
    var user = getUser();
    if (!user) return;

    var initials = (user.name || 'U').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();

    slot.innerHTML =
      '<div class="nav-user-chip">' +
        (user.picture
          ? '<img src="' + user.picture + '" alt="' + user.name + '" class="nav-user-avatar" ' +
            'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">'
          : '') +
        '<span class="nav-user-initials" style="display:' + (user.picture ? 'none' : 'flex') + '">' + initials + '</span>' +
        '<span class="nav-user-name">' + (user.name || '').split(' ')[0] + '</span>' +
        '<button class="nav-logout-btn" id="navLogoutBtn" aria-label="Logout">Logout</button>' +
      '</div>';

    document.getElementById('navLogoutBtn').addEventListener('click', logout);
  }

  /* ── Public API ───────────────────────────── */
  window.MySockAuth = {
    checkAuth:            checkAuth,
    logout:               logout,
    isLoggedIn:           isLoggedIn,
    getUser:              getUser,
    initGoogleLogin:      initGoogleLogin,
    renderNavUser:        renderNavUser,
    _handleCredential:    handleCredentialResponse,
  };

})();
