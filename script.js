// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Smooth scroll for same-page links
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof Element && target.matches('a[href^="#"]')) {
    const id = target.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  }
});

// Booking form validation and fake submission
const form = document.getElementById('booking-form');
const resultEl = document.querySelector('.form-result');

function setError(id, message) {
  const el = document.querySelector(`[data-error-for="${id}"]`);
  if (el) el.textContent = message || '';
}

function validateForm(formData) {
  let ok = true;

  const name = formData.get('fullName')?.toString().trim();
  if (!name) { setError('fullName', 'Please enter your full name'); ok = false; } else { setError('fullName', ''); }

  const phone = formData.get('phone')?.toString().trim();
  if (!phone || !/^[+\d][\d\-\s]{7,}$/.test(phone)) { setError('phone', 'Enter a valid phone number'); ok = false; } else { setError('phone', ''); }

  const address = formData.get('address')?.toString().trim();
  if (!address) { setError('address', 'Please enter your address'); ok = false; } else { setError('address', ''); }

  const service = formData.get('service')?.toString();
  if (!service) { setError('service', 'Select a service'); ok = false; } else { setError('service', ''); }

  const datetime = formData.get('datetime')?.toString();
  if (!datetime) { setError('datetime', 'Select preferred date and time'); ok = false; } else { setError('datetime', ''); }

  const consent = formData.get('consent');
  if (!consent) { ok = false; }

  return ok;
}

if (form && resultEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultEl.textContent = '';
    const formData = new FormData(form);
    if (!validateForm(formData)) {
      resultEl.textContent = 'Please fix the highlighted fields.';
      resultEl.style.color = '#b42318';
      return;
    }

    // Simulate API request
    resultEl.textContent = 'Submitting...';
    resultEl.style.color = '#0a1f2c';
    try {
      await new Promise((r) => setTimeout(r, 900));
      resultEl.textContent = 'Request received! Our coordinator will call you shortly.';
      resultEl.style.color = '#0b5d2a';
      form.reset();
    } catch (err) {
      resultEl.textContent = 'Something went wrong. Please try again.';
      resultEl.style.color = '#b42318';
    }
  });
}


