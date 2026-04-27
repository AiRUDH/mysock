/**
 * MySock — Contact Form → WhatsApp
 * Captures form fields, builds a formatted message, opens WhatsApp in a new tab.
 * No backend. No submission. Pure client-side lead capture.
 */
(function () {
  'use strict';

  var form    = document.getElementById('contactForm');
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form || !submitBtn) return;

  var ORIGINAL_LABEL = submitBtn.textContent.trim();
  var WA_NUMBER      = '918057470837';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* ── Read field values ──────────────────── */
    var firstName = document.getElementById('firstName').value.trim();
    var lastName  = document.getElementById('lastName').value.trim();
    var email     = document.getElementById('email').value.trim();
    var company   = document.getElementById('company').value.trim();
    var service   = document.getElementById('service').value.trim();
    var message   = document.getElementById('message').value.trim();

    /* ── Validate required fields ───────────── */
    var missing = [];
    if (!firstName) missing.push('First Name');
    if (!lastName)  missing.push('Last Name');
    if (!email)     missing.push('Email');
    if (!message)   missing.push('Message');

    if (missing.length) {
      alert('Please fill in the required fields:\n• ' + missing.join('\n• '));
      return;
    }

    /* ── Basic email format check ───────────── */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      document.getElementById('email').focus();
      return;
    }

    /* ── Build WhatsApp message ─────────────── */
    var text =
      'Hello MySock Team,' +
      '\n\n' +
      'Name: '    + firstName + ' ' + lastName + '\n' +
      'Email: '   + email + '\n' +
      'Company: ' + (company || 'Not provided') + '\n' +
      'Service: ' + (service  || 'Not specified') + '\n' +
      '\nMessage:\n' + message;

    var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);

    /* ── Loading state ──────────────────────── */
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Opening WhatsApp…';

    /* ── Open WhatsApp ──────────────────────── */
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    /* ── Show success state ─────────────────── */
    var success = document.getElementById('formSuccess');
    if (success) {
      success.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none">' +
          '<path d="M4 10l4 4 8-8" stroke="#1a7a40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '<span>WhatsApp opened — we\'ll reply within one business day.</span>';
      success.classList.add('visible');
    }

    /* ── Reset button after 4s ──────────────── */
    setTimeout(function () {
      submitBtn.disabled    = false;
      submitBtn.textContent = ORIGINAL_LABEL;
    }, 4000);
  });

})();
