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

// Contact form -> kirim langsung ke Gmail via Web3Forms (gratis, tanpa backend)
const WEB3FORMS_KEY = 'e8cb2075-fbc6-4561-bb37-f0e9051d78ba';

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const f = new FormData(e.target);

  // Fallback kalau key belum dipasang
  if (WEB3FORMS_KEY === 'PASTE_ACCESS_KEY_HERE') {
    const subject = `[Website] Kebutuhan: ${f.get('kebutuhan')} — dari ${f.get('nama')}`;
    const body = `Nama: ${f.get('nama')}\nEmail: ${f.get('email')}\nWhatsApp: ${f.get('wa') || '-'}\nKebutuhan: ${f.get('kebutuhan')}\n\nPesan:\n${f.get('pesan')}`;
    note.textContent = '(Mode demo) Membuka aplikasi email Anda...';
    window.location.href = `mailto:digitalgroup.admin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return;
  }

  note.textContent = 'Mengirim...';
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[Website DGID] Kebutuhan: ${f.get('kebutuhan')} — dari ${f.get('nama')}`,
        from_name: f.get('nama'),
        email: f.get('email'),
        message: `Nomor WhatsApp: ${f.get('wa') || '-'}\n\n${f.get('pesan')}`,
        kebutuhan: f.get('kebutuhan'),
        whatsapp: f.get('wa') || '-',
      }),
    });
    const json = await res.json();
    if (json.success) {
      note.textContent = '✅ Terkirim! Kami akan balas maksimal 1×24 jam kerja.';
      e.target.reset();
    } else {
      note.textContent = '❌ Gagal mengirim. Coba lagi atau email langsung ke digitalgroup.admin@gmail.com';
    }
  } catch {
    note.textContent = '❌ Koneksi gagal. Email langsung ke digitalgroup.admin@gmail.com';
  }
});
