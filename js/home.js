// ══════════════════════════════
//  HOME PAGE INTERACTIONS
// ══════════════════════════════

// ── MODAL ──
function openModal(view) {
  document.getElementById('modal-overlay').classList.add('open');
  const modal = document.getElementById('auth-modal');
  modal.classList.add('open');
  switchView(view);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('auth-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function switchView(view) {
  document.getElementById('view-signup').style.display = 'none';
  document.getElementById('view-login').style.display  = 'none';
  document.getElementById('view-success').style.display = 'none';
  document.getElementById('view-' + view).style.display = 'block';
}

// close modal with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── SIGN UP HANDLER ──
function handleSignup() {
  switchView('success');
}

// ── LOGIN HANDLER ──
function handleLogin() {
  closeModal();
  window.location.href = 'pages/dashboard.html';
}

// ── GO TO DASHBOARD ──
function goToDashboard() {
  closeModal();
  sessionStorage.setItem('paymentSuccess', 'true');
  window.location.href = 'pages/dashboard.html';
}

// ── COURSE CARDS → open modal before going to course ──
// Override main.js goToCourse to require account
function goToCourse(index) {
  sessionStorage.setItem('selectedCourse', index);
  // If user is "logged in" (we use sessionStorage flag), go straight to curriculum
  if (sessionStorage.getItem('loggedIn') === 'true') {
    window.location.href = 'pages/curriculum.html';
  } else {
    openModal('signup');
  }
}

// ── FAQ ACCORDION ──
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  // open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

// Open first FAQ by default
document.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.faq-item.open');
  // already set via HTML class, nothing extra needed
});

// ── LESSON PREVIEW VIDEO ──
function playVideo() {
  document.getElementById('player-overlay').style.display = 'none';
  document.getElementById('player-playing').style.display = 'block';
}

// ── SMOOTH SCROLL for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── NAV: highlight active section on scroll ──
const sections = ['about', 'courses-sec', 'testimonials', 'faq'];
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    const link = document.querySelector(`a[href="#${id}"]`);
    if (el && link) {
      if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        link.style.color = 'var(--teal)';
      } else {
        link.style.color = '';
      }
    }
  });
});
