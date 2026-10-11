/* ── app.js – RangKalaa Website ── */

// ── Cart Counter ──
let cartCount = 0;
const navCta = document.querySelector('.nav-cta');

function addToCart() {
  cartCount++;
  if (navCta) navCta.textContent = `Cart (${cartCount})`;
  showToast('✅ Product cart mein add ho gaya!');
}
window.addToCart = addToCart;

// ── Toast Notification ──
function showToast(message) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Navbar Scroll Effect ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Painter's Choice Carousel ──
let currentSlide = 0;
const cards = document.querySelectorAll('.pc-card');
const dots  = document.querySelectorAll('.dot');

function goToSlide(index) {
  if (cards.length === 0) return;
  cards[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = (index + cards.length) % cards.length;
  cards[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
}
window.goToSlide = goToSlide;

// Auto-rotate carousel every 5 seconds
setInterval(() => goToSlide(currentSlide + 1), 5000);

// ── Modal ──
function openShareModal() {
  const modal = document.getElementById('shareModal');
  if (modal) modal.classList.add('open');
}
function closeShareModal() {
  const modal = document.getElementById('shareModal');
  if (modal) modal.classList.remove('open');
}
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;

// Close modal when clicking overlay
document.getElementById('shareModal')?.addEventListener('click', function (e) {
  if (e.target === this) closeShareModal();
});

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll(
  '.cat-card, .review-card, .process-card, .pillar, .pc-card, .fp-text, .fp-visual, .hero-content, .hero-visual'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ── Image Error Fallback ──
// Gracefully replace broken images with a styled placeholder
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    const w = this.width || 400;
    const h = this.height || 300;
    const colors = ['CFB5D6', 'DBC8E0', 'E1D1E6', '9C82A3'];
    const bg = colors[Math.floor(Math.random() * colors.length)];
    const label = encodeURIComponent(this.alt || 'Image');
    this.src = `https://placehold.co/${w}x${h}/${bg}/88728F?text=${label}`;
    this.removeEventListener('error', arguments.callee);
  });
});

// ── Category Card Click Ripple ──
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(156,130,163,0.25);
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      animation:rippleAnim 0.6s ease-out forwards;
      pointer-events:none;
      z-index:10;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);

    const catName = this.dataset.cat;
    if (catName) showToast(`🎨 ${catName.charAt(0).toUpperCase() + catName.slice(1)} collection dekh rahe hain…`);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    from { opacity:1; transform:scale(0); }
    to   { opacity:0; transform:scale(2); }
  }
`;
document.head.appendChild(style);

// ── Color Swatch Highlight ──
document.querySelectorAll('.swatch').forEach(sw => {
  sw.addEventListener('click', function () {
    document.querySelectorAll('.swatch').forEach(s => s.style.borderColor = 'transparent');
    this.style.borderColor = '#88728F';
    showToast(`🎨 ${this.title || 'Color'} selected!`);
  });
});

// ── Smooth Scroll for Nav Links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Hero Parallax (subtle) ──
window.addEventListener('scroll', () => {
  const blobs = document.querySelectorAll('.hero-blob');
  const scrollY = window.scrollY;
  blobs.forEach((blob, i) => {
    const factor = i === 0 ? 0.15 : -0.1;
    blob.style.transform = `translateY(${scrollY * factor}px)`;
  });
});