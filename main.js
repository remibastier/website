/* ── LANGUAGE TOGGLE ── */
const translations = {
  en: {
    'hero-badge':   'Indie Developer',
    'hero-title':   'Building tools that<br><span class="accent">actually matter</span>',
    'hero-sub':     "I'm Remi, a developer shipping products at the intersection of language, learning, and technology. Based in Southeast Asia, building for the world.",
    'cta-projects': 'See my projects',
    'cta-contact':  'Get in touch',
    'tf-link-text': 'Visit thaifluent.com',
  },
  fr: {
    'hero-badge':   'Developpeur independant',
    'hero-title':   'Je construis des outils<br><span class="accent">qui font vraiment sens</span>',
    'hero-sub':     "Je suis Remi, un developpeur qui cree des produits a l'intersection du langage, de l'apprentissage et de la technologie. Base en Asie du Sud-Est, je cree pour le monde entier.",
    'cta-projects': 'Voir mes projets',
    'cta-contact':  'Me contacter',
    'tf-link-text': 'Visiter thaifluent.com',
  }
};

let currentLang = 'en';

function applyLang(lang) {
  // Update all data-en / data-fr elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  // Hero title has HTML — handle separately
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = lang === 'fr'
      ? 'Je construis des outils<br><span class="accent">qui font vraiment sens</span>'
      : 'Building tools that<br><span class="accent">actually matter</span>';
  }

  // Lang toggle labels
  document.getElementById('lang-active').textContent = lang.toUpperCase();
  document.getElementById('lang-other').textContent = lang === 'en' ? 'FR' : 'EN';

  // html lang attr
  document.documentElement.lang = lang;

  currentLang = lang;
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'fr' : 'en');
});

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
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--primary)'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));
