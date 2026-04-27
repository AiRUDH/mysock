/**
 * MySock — Login Page Controller
 * Handles: ID/password form, Google demo button, notices, validation UI.
 */
(function () {
  'use strict';

  var auth = window.MySockAuth;

  /* ---- Already logged in → go to dashboard ---- */
  if (auth.isAuthenticated()) {
    window.location.replace(auth.AUTH_CONFIG.POST_LOGIN_REDIRECT);
    return;
  }

  /* ---- Show notice if bounced from a protected page ---- */
  try {
    if (localStorage.getItem('mysock_redirect')) {
      showNotice('Please sign in to access that page.');
    }
  } catch (e) {}

  /* ---- Password visibility toggle ---- */
  var toggleBtn = document.getElementById('togglePassword');
  var pwdInput  = document.getElementById('loginPassword');
  if (toggleBtn && pwdInput) {
    toggleBtn.addEventListener('click', function () {
      var isText = pwdInput.type === 'text';
      pwdInput.type = isText ? 'password' : 'text';
      toggleBtn.innerHTML = isText
        ? '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M7.5 7.6A2.5 2.5 0 0011.4 11.5M5.2 5.3C3.3 6.5 2 9 2 9s3 6 7 6c1.5 0 2.9-.5 4-1.3M8 3.1C8.3 3 8.7 3 9 3c4 0 7 6 7 6s-.7 1.4-1.9 2.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    });
  }

  /* ---- ID + Password form ---- */
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      hideError();

      var id  = document.getElementById('loginId').value.trim();
      var pwd = document.getElementById('loginPassword').value;
      var btn = document.getElementById('loginSubmitBtn');

      if (!id || !pwd) {
        showError('Please enter your ID and password.');
        return;
      }

      // Loading state
      btn.disabled    = true;
      btn.textContent = 'Signing in…';

      // Small delay for UX feedback
      setTimeout(function () {
        var result = auth.loginWithPassword(id, pwd);
        if (!result.ok) {
          showError(result.error || 'Login failed. Please try again.');
          btn.disabled    = false;
          btn.textContent = 'Sign In';
        }
        // On success, auth.js handles redirect — no code needed here
      }, 400);
    });
  }

  /* ---- Google demo button ---- */
  var googleBtn = document.getElementById('googleLoginBtn');
  if (googleBtn) {
    googleBtn.addEventListener('click', function () {
      googleBtn.disabled = true;
      googleBtn.querySelector('.google-btn-text').textContent = 'Signing in…';
      setTimeout(function () {
        auth.loginWithGoogle();
      }, 400);
    });
  }

  /* ---- Helpers ---- */
  function showError(msg) {
    var el = document.getElementById('loginError');
    var tx = document.getElementById('loginErrorText');
    if (el && tx) { tx.textContent = msg; el.style.display = 'flex'; }
  }

  function hideError() {
    var el = document.getElementById('loginError');
    if (el) el.style.display = 'none';
  }

  function showNotice(msg) {
    var el = document.getElementById('loginNotice');
    var tx = document.getElementById('loginNoticeText');
    if (el && tx) { tx.textContent = msg; el.style.display = 'flex'; }
  }

})();
