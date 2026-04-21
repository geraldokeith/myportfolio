/* ═══════════════════════════════════════════
   AGONZEBWA GERALD — PORTFOLIO JS
═══════════════════════════════════════════ */

'use strict';

/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    // Trigger hero number counters after load
    animateCounters();
  }, 1800);
});

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scaling on interactive elements
document.addEventListener('mouseover', e => {
  const el = e.target.closest('a, button, .tech-card, .project-card, .about-mini-card');
  if (el) {
    if (cursor) { cursor.style.width = '14px'; cursor.style.height = '14px'; }
    if (follower) { follower.style.width = '50px'; follower.style.height = '50px'; follower.style.borderColor = 'rgba(16,185,129,0.8)'; }
  }
});
document.addEventListener('mouseout', e => {
  const el = e.target.closest('a, button, .tech-card, .project-card, .about-mini-card');
  if (el) {
    if (cursor) { cursor.style.width = '8px'; cursor.style.height = '8px'; }
    if (follower) { follower.style.width = '32px'; follower.style.height = '32px'; follower.style.borderColor = 'rgba(16,185,129,0.5)'; }
  }
});

/* ── Scroll Progress ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';
});

/* ── Navbar scroll state ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

/* ── Mobile Menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Typing Animation ── */
const typedEl = document.getElementById('typedText');
const phrases = [
  'WordPress Expert',
  'web designer',
  'Django Builder',
  'UI Enthusiast',
  'Problem Solver',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeLoop() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 100;
  }
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typeDelay = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeDelay = 400;
  }
  setTimeout(typeLoop, typeDelay);
}
setTimeout(typeLoop, 1200);

/* ── Counter Animation ── */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + '+';
    }, 40);
  });
}

/* ── Intersection Observer — Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ── Skill Bar Animation ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => fill.classList.add('animated'));
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.stack-group').forEach(group => {
  skillObserver.observe(group);
});

/* ── 3D Tilt Effect on Project Cards ── */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Move glow
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.background = `radial-gradient(ellipse at ${x}px ${y}px, rgba(16,185,129,0.12), transparent 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.background = 'radial-gradient(ellipse at top left, rgba(16,185,129,0.08), transparent 60%)';
    }
  });
});

/* ── Active Nav Link on Scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));

/* ── Initialize EmailJS ── */
emailjs.init('HGHY78P43f-MukyAY'); // Initialize with public key

/* ── Contact Form Validation & Submission ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    const msgErr  = document.getElementById('messageError');

    // Reset
    [name, email, message].forEach(f => f.classList.remove('error'));
    [nameErr, emailErr, msgErr].forEach(e => e.classList.remove('visible'));

    if (!name.value.trim()) {
      name.classList.add('error');
      nameErr.classList.add('visible');
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.classList.add('error');
      emailErr.classList.add('visible');
      valid = false;
    }
    if (!message.value.trim()) {
      message.classList.add('error');
      msgErr.classList.add('visible');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText   = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;

    try {
      const response = await emailjs.send('service_57qlsdu', 'template_hhz0mx5', {
        from_name: name.value.trim(),
        from_email: email.value.trim(),
        subject: subject.value.trim() || 'No subject',
        message: message.value.trim(),
        reply_to: email.value.trim()
      });

      if (response.status === 200) {
        btnLoading.style.display = 'none';
        submitBtn.style.display = 'none';
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) successMsg.style.display = 'flex';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      btnLoading.style.display = 'none';
      btnText.style.display = 'flex';
      submitBtn.disabled = false;
      alert('Error sending message. Please try again.');
    }
  });
}

/* ── Smooth Scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Animated background blobs follow mouse slightly ── */
const blobs = document.querySelectorAll('.blob');
let blobX = 0, blobY = 0;
document.addEventListener('mousemove', e => {
  blobX = (e.clientX / window.innerWidth - 0.5) * 30;
  blobY = (e.clientY / window.innerHeight - 0.5) * 30;
  blobs.forEach((blob, i) => {
    const factor = (i + 1) * 0.4;
    blob.style.transform = `translate(${blobX * factor}px, ${blobY * factor}px)`;
  });
});

/* ── Timeline animation on scroll ── */
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  timelineObserver.observe(item);
});

/* ── Tech card stagger on reveal ── */
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.tech-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stack-grid').forEach(grid => {
  grid.querySelectorAll('.tech-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s, box-shadow 0.3s';
  });
  techObserver.observe(grid);
});
