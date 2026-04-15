/* ============================================================
   MySock — Main JS
   Handles: sticky header, mobile nav, scroll reveal, nav user chip
   ============================================================ */

/* ---- Sticky header shadow ---- */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,0,0,0.10)'
      : '0 1px 4px rgba(0,0,0,0.08)';
  }, { passive: true });
}

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = open ? '0' : '1';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  document.addEventListener('click', (e) => {
    if (header && !header.contains(e.target)) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    }
  });
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(
  '.strength-card, .work-card, .testimonial-card, .vm-card, .intro-stats, .about-grid, .section-header-center'
);
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('reveal', 'visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => { el.classList.add('reveal'); obs.observe(el); });
} else {
  revealEls.forEach(el => el.classList.add('reveal', 'visible'));
}

/* ---- Render nav user chip (if auth present) ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (window.MySockAuth && window.MySockAuth.renderNavUser) {
    window.MySockAuth.renderNavUser();
  }
});

/* ---- Toast ---- */
function showToast(message, type = 'info') {
  const existing = document.getElementById('mysockToast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'mysockToast';
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => { toast.classList.remove('toast--visible'); setTimeout(() => toast.remove(), 300); }, 3000);
}
