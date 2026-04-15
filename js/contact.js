/* Contact form */
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form && success) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    setTimeout(() => {
      form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      btn.style.display = 'none';
      success.classList.add('visible');
    }, 1000);
  });
}
