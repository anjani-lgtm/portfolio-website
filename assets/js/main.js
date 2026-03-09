// =========================================
// Anjani Gupta — Portfolio JS
// =========================================

// --- Mobile Nav ---
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- About Tabs ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// --- Portfolio Filters ---
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    const cat = btn.dataset.category;

    // Update active state within same filter group
    document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // Filter cards
    document.querySelectorAll(`.portfolio-card[data-group="${group}"]`).forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- Lightbox ---
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;

function openLightbox(src) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (lightbox) {
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}

// Make gallery images clickable
document.querySelectorAll('.img-gallery img, .ab-cell img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src));
});

// Keyboard close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// --- Project Modal ---
function openProjectModal(index) {
  const detail = document.querySelector(`.project-detail[data-index="${index}"]`);
  const header = document.getElementById('projectModalHeader');
  const body = document.getElementById('projectModalBody');
  const overlay = document.getElementById('projectModalOverlay');
  if (!detail || !header || !body || !overlay) return;
  const logo = detail.querySelector('.project-logo-mark');
  const h3 = detail.querySelector('h3');
  header.innerHTML = (logo ? logo.outerHTML : '') + (h3 ? h3.outerHTML : '');
  const rows = detail.querySelectorAll('.pf-row');
  body.innerHTML = '';
  rows.forEach(row => body.appendChild(row.cloneNode(true)));
  body.scrollTop = 0;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(event, force) {
  const overlay = document.getElementById('projectModalOverlay');
  if (!overlay) return;
  if (force || event.target === overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('projectModalOverlay');
    if (overlay && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// --- Active nav highlight on scroll ---
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = '#111';
          a.style.fontWeight = '700';
        } else {
          a.style.fontWeight = '';
        }
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));
