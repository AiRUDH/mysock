/**
 * MySock — Synchronous Route Guard
 * Runs before the page renders — prevents flash of protected content.
 * Include in <head> of every protected page, AFTER auth.js.
 *
 *   <script src="js/users.js"></script>
 *   <script src="js/auth.js"></script>
 *   <script src="js/guard.js"></script>
 */
(function () {
  'use strict';

  function isLoggedIn() {
    try {
      return localStorage.getItem('mysock_isLoggedIn') === 'true' ||
             localStorage.getItem('auth') === 'true';
    } catch (e) {
      return false;
    }
  }

  if (!isLoggedIn()) {
    try { localStorage.setItem('mysock_redirect', window.location.href); } catch (e) {}
    window.location.replace('login.html');
  }
})();
