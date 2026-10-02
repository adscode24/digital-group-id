// Navbar scroll + hamburger + reveal + counter + form
const navbar = document.getElementById('navbar');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 10);
  toTop.classList.toggle('show', y > 600);
}, { passive: true });

const ham = document.getElementById('hamburger');
const links = document.getElementById('navLinks');
ham.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let cur = 0; const step = Math.max(1, Math.round(target / 60));
    const t = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = cur; }, 30);
    cio.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => cio.observe(el));

// Contact form -> WhatsApp / mailto fallback (tanpa backend)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Halo Digital Group ID,%0A%0ANama: ${encodeURIComponent(f.get('nama'))}%0AEmail: ${encodeURIComponent(f.get('email'))}%0AKebutuhan: ${encodeURIComponent(f.get('kebutuhan'))}%0APesan: ${encodeURIComponent(f.get('pesan'))}`;
  // Ganti nomor di bawah dengan nomor WhatsApp asli perusahaan
  const waNumber = '6281200000000';
  document.getElementById('formNote').textContent = 'Membuka WhatsApp... terima kasih, pesan Anda siap dikirim.';
  window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
});
