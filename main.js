/* ── LANGUAGE TOGGLE ── */
let currentLang = 'en';

function applyLang(lang) {
  // Update all data-en / data-fr text elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'P' || el.tagName === 'DIV' || el.tagName === 'SPAN' || el.tagName === 'LI') {
      el.textContent = val;
    }
  });

  // Update input/textarea placeholders
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const val = el.getAttribute('data-' + lang + '-placeholder');
    if (val) el.placeholder = val;
  });

  // Contact button text
  const btnText = document.getElementById('contact-btn-text');
  if (btnText) {
    btnText.textContent = lang === 'fr' ? 'Envoyer →' : 'Send message →';
  }

  // LinkedIn CTA in about section
  const linkedinCta = document.getElementById('about-linkedin');
  if (linkedinCta) {
    const span = linkedinCta.querySelector('span');
    if (span) span.textContent = lang === 'fr' ? 'Voir mon profil complet sur LinkedIn' : 'View my full profile on LinkedIn';
  }

  // tf link
  const tfLink = document.getElementById('tf-link');
  if (tfLink) {
    const span = tfLink.querySelector('span');
    if (span) span.textContent = lang === 'fr' ? 'Visiter thaifluent.com' : 'Visit thaifluent.com';
  }

  // contact btn in hero
  const ctaLinkedIn = document.getElementById('cta-linkedin');
  if (ctaLinkedIn) {
    const span = ctaLinkedIn.querySelector('span');
    if (span) span.textContent = lang === 'fr' ? 'Voir LinkedIn' : 'View LinkedIn';
  }

  // contact note
  const note = document.querySelector('.contact-note');
  if (note) {
    note.innerHTML = lang === 'fr'
      ? 'Ou ecrivez-moi a <a href="mailto:contact@remibastier.com" class="inline-link">contact@remibastier.com</a>'
      : 'Or email me directly at <a href="mailto:contact@remibastier.com" class="inline-link">contact@remibastier.com</a>';
  }

  // Lang toggle labels
  document.getElementById('lang-active').textContent = lang.toUpperCase();
  document.getElementById('lang-other').textContent = lang === 'en' ? 'FR' : 'EN';

  document.documentElement.lang = lang;
  currentLang = lang;
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'fr' : 'en');
});

/* ── CONTACT FORM: honeypot + mailto fallback ── */
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const honeypot = form.querySelector('input[name="_gotcha"]');
  if (honeypot && honeypot.value) return; // bot caught

  const name = encodeURIComponent(form.querySelector('#cf-name').value);
  const email = encodeURIComponent(form.querySelector('#cf-email').value);
  const msg = encodeURIComponent(form.querySelector('#cf-msg').value);

  const subject = encodeURIComponent('Message from ' + decodeURIComponent(name));
  const body = encodeURIComponent(
    'Name: ' + decodeURIComponent(name) + '\n' +
    'Email: ' + decodeURIComponent(email) + '\n\n' +
    decodeURIComponent(msg)
  );

  window.location.href = 'mailto:contact@remibastier.com?subject=' + subject + '&body=' + body;
}
window.handleContact = handleContact;

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.project-card, .stat-card, .about-text, .about-stats, .contact-inner'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--primary-dark)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
