/* ============================================================
   MySock — Main JS
   Handles: sticky header, mobile nav, scroll reveal, auth UI
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

/* ---- Mobile nav ---- */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const open  = mainNav.classList.contains('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = open ? '0' : '1';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  document.addEventListener('click', (e) => {
    if (header && !header.contains(e.target)) mainNav.classList.remove('open');
  });
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(
  '.strength-card, .work-card, .testimonial-card, .vm-card, .intro-stats, .about-grid, .section-header-center'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });

/* ============================================================
   Auth UI — runs on every page that includes this script
   ============================================================ */

/**
 * Update the header to show either:
 *   - "Sign In" button  (logged out)
 *   - User avatar + name + "Sign Out" (logged in)
 */
function renderAuthHeader() {
  const auth    = window.MySockAuth;
  const ctaSlot = document.getElementById('headerAuthSlot');
  if (!ctaSlot || !auth) return;

  if (auth.isAuthenticated()) {
    const user     = auth.getUser();
    const initials = getInitials(user.name);
    const hasPic   = user.picture && user.picture.length > 0;

    ctaSlot.innerHTML = `
      <div class="auth-user-chip" id="authUserChip">
        ${hasPic
          ? `<img src="${user.picture}" alt="${user.name}" class="auth-avatar"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />`
          : ''}
        <span class="auth-avatar-fallback" style="display:${hasPic ? 'none' : 'flex'}">${initials}</span>
        <span class="auth-user-name">${user.name.split(' ')[0]}</span>
        <button class="auth-signout-btn" id="signOutBtn" aria-label="Sign out">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3M9 10l3-3-3-3M12 7H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>`;

    document.getElementById('signOutBtn')?.addEventListener('click', () => {
      auth.signOut();
    });

  } else {
    ctaSlot.innerHTML = `
      <button class="btn btn-primary" id="headerSignInBtn">Sign In</button>`;

    document.getElementById('headerSignInBtn')?.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}

function getInitials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ---- Toast notification ---- */
function showToast(message, type = 'info') {
  const existing = document.getElementById('mysockToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'mysockToast';
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderAuthHeader();
});
