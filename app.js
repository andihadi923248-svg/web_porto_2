/* ==========================================================================
   CREVO LAB — Andi Muhammad Hadi Pratama Portfolio
   Clean, Professional, Non-AI Gimmick Scripts
   With Dynamic Creative Scroll Animation Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initProjectFilters();
  initProjectCaseStudies();
  initCopyEmail();
  initContactForm();
  initMobileMenu();
  initStatsCounter();
  initActiveNavSpy();
  initScrollProgress();
  initScrollReveals();
  initScrollTopButton();
});

// 1. Dynamic Typing Effect for Roles
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const roles = [
    'Rekayasa Perangkat Lunak (RPL)',
    'Junior Web Developer',
    'HTML, CSS, JS & Bootstrap Builder',
    'AI & Creative Web Explorer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 75;
  const deleteSpeed = 35;
  const pauseTime = 1800;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

// 2. Project Category Filtering
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active', 'bg-lime', 'text-black');
        b.classList.add('bg-white/5', 'text-zinc-400');
      });
      btn.classList.add('active', 'bg-lime', 'text-black');
      btn.classList.remove('bg-white/5', 'text-zinc-400');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}



// Project case studies: concise, source-grounded project breakdowns.
function initProjectCaseStudies() {
  const modal = document.getElementById('case-study-modal');
  if (!modal) return;
  const cases = {
    'mbah-minar': {
      kicker: 'CASE STUDY / E-COMMERCE', title: 'E-Commerce “Mbah Minar”',
      summary: 'Website pemesanan kuliner online untuk menampilkan menu makanan dan minuman dengan pengalaman belanja yang sederhana.',
      challenge: 'Menyajikan katalog kuliner dalam tampilan yang mudah dijelajahi sekaligus memberi alur keranjang yang jelas.',
      approach: 'Membangun halaman dengan Bootstrap 5.3 dan JavaScript, memanfaatkan komponen UI serta interaksi DOM.',
      features: 'Katalog produk, keranjang dengan badge counter, modal, carousel promo, dan toggle Dark Mode / Light Mode.',
      tech: 'HTML5, CSS3, Bootstrap 5.3, JavaScript DOM.',
      live: 'https://andihadi923248-svg.github.io/E_Commerce_minar/', source: 'https://github.com/andihadi923248-svg/E_Commerce_minar'
    },
    'e-report': {
      kicker: 'CASE STUDY / REPORTING SYSTEM', title: 'E-Report Management System',
      summary: 'Antarmuka sistem pelaporan digital untuk membantu pengguna mengirim laporan dan mengikuti status penanganannya.',
      challenge: 'Membuat alur pelaporan yang terstruktur, mulai dari pengajuan laporan hingga pengguna melihat riwayat dan progres.',
      approach: 'Menyusun antarmuka multi-halaman dengan komponen Bootstrap dan form untuk mendukung alur pelaporan.',
      features: 'Create report dengan upload foto dan kategori, track report, history, panduan penggunaan, dan tampilan data.',
      tech: 'HTML, CSS, Bootstrap 5, JavaScript.',
      live: 'https://andihadi923248-svg.github.io/E-Report-skl/', source: 'https://github.com/andihadi923248-svg/E-Report-skl'
    },
    'portfolio': {
      kicker: 'CASE STUDY / PERSONAL BRAND', title: 'Personal Web Portfolio',
      summary: 'Website personal branding untuk memperkenalkan profil, kemampuan, proses belajar, dan proyek yang telah dibuat.',
      challenge: 'Menyusun informasi profil dan karya dalam satu pengalaman yang mudah dipahami dan konsisten secara visual.',
      approach: 'Menggunakan desain dark interface, aksen lime, layout responsif, animasi scroll, dan interaksi JavaScript.',
      features: 'Hero profile, tech stack, project showcase, filter proyek, learning journey, contact form, dan animasi cinematic.',
      tech: 'HTML5, Tailwind CSS, CSS, JavaScript, Lucide Icons.',
      live: '#hero', source: 'https://github.com/andihadi923248-svg'
    }
  };
  const fields = ['kicker','title','summary','challenge','approach','features','tech','live','source'];
  function close() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
  document.querySelectorAll('.case-study-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const data = cases[button.dataset.case];
      if (!data) return;
      fields.forEach(key => { const el = document.getElementById(`case-modal-${key}`); if (el) { if (key === 'live' || key === 'source') el.href = data[key]; else el.textContent = data[key]; } });
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
      document.getElementById('case-modal-title')?.focus?.();
    });
  });
  modal.querySelectorAll('[data-close-case]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('is-open')) close(); });
}

// 3. One-Click Copy Email Feature
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'andi.hadi923248@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email ${email} berhasil disalin ke clipboard!`);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });
}

// 4. Contact Form Handling
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || 'Teman';
    showToast(`Terima kasih, ${name}! Pesan Anda telah terkirim.`);
    form.reset();
  });
}

// 5. Toast Feedback
function showToast(message) {
  let toast = document.getElementById('crevo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'crevo-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-[#14141B] text-white border border-[#23232E] shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-12 opacity-0 text-sm font-medium';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-[#D4FF00]"></span>
    <span>${message}</span>
  `;

  toast.classList.remove('translate-y-12', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3200);
}

// 6. Animated Stats Counter
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 35);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count;
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      runCounters();
      animated = true;
    }
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('hero');
  if (statsSection) observer.observe(statsSection);
}

// 7. Mobile Navigation Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// 8. Active Nav Spy
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#D4FF00]', 'font-semibold');
      link.classList.add('text-zinc-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#D4FF00]', 'font-semibold');
        link.classList.remove('text-zinc-400');
      }
    });
  });
}

// 9. Top Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}

// 10. Creative Scroll Reveal Engine — varied motion + replay on reverse scroll
function initScrollReveals() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const addReveal = (selector, motion, stagger = false) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      // Avoid applying the same reveal twice when selectors overlap.
      if (el.classList.contains('scroll-reveal')) return;
      el.classList.add('scroll-reveal', motion);
      if (stagger) el.classList.add(`scroll-stagger-${(index % 5) + 1}`);
    });
  };

  // HERO: each layer enters with its own rhythm.
  addReveal('#hero .inline-flex', 'scroll-pop-badge');
  addReveal('#hero .hero-title-line', 'scroll-fade-up', true);
  addReveal('#hero #typewriter-text', 'scroll-fade-left');
  addReveal('#hero p', 'scroll-fade-right');
  addReveal('#hero .copy-email-btn, #hero a.btn-crevo-primary', 'scroll-scale-up', true);
  addReveal('#hero .counter-val', 'scroll-pop-badge');
  addReveal('#hero .editorial-photo', 'scroll-photo-reveal');

  // Section labels, headings and supporting copy.
  document.querySelectorAll('main section:not(#hero)').forEach((section, sectionIndex) => {
    const eyebrow = section.querySelector('span.text-xs.font-mono');
    const heading = section.querySelector('h2');
    const intro = heading?.parentElement?.parentElement?.querySelector(':scope > p');
    if (eyebrow) eyebrow.classList.add('scroll-reveal', 'scroll-pop-badge');
    if (heading) heading.classList.add('scroll-reveal', sectionIndex % 2 ? 'scroll-fade-left' : 'scroll-fade-up');
    if (intro && !intro.classList.contains('scroll-reveal')) {
      intro.classList.add('scroll-reveal', sectionIndex % 2 ? 'scroll-fade-right' : 'scroll-fade-up', 'scroll-stagger-2');
    }
  });

  // Skill, project, process, about and contact cards use different entrance styles.
  addReveal('#skills .crevo-card', 'scroll-tilt-card', true);
  addReveal('#skills .tech-logo-card', 'scroll-pop-badge', true);
  addReveal('#journey .journey-intro', 'scroll-photo-reveal');
  addReveal('#journey .journey-item', 'scroll-fade-right', true);
  addReveal('#projects .project-card', 'scroll-scale-up', true);
  addReveal('#process .crevo-card', 'scroll-fade-up', true);
  addReveal('#about .editorial-photo', 'scroll-photo-reveal');
  addReveal('#about .lg\\:col-span-7 > *', 'scroll-fade-right', true);
  addReveal('#about .grid.grid-cols-2 > div', 'scroll-tilt-card', true);
  addReveal('#contact .crevo-card', 'scroll-fade-up', true);
  addReveal('footer > div > *', 'scroll-fade-up', true);

  // Small details arrive after their parent for a layered, editorial feel.
  addReveal('#skills .tag-pill, #about .tag-pill', 'scroll-pop-badge', true);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Removing the class when leaving the viewport makes the animation replay
      // naturally in BOTH scroll directions.
      entry.target.classList.toggle('is-revealed', entry.isIntersecting);
    });
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
}

// 11. Floating Back-to-Top Button
function initScrollTopButton() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
