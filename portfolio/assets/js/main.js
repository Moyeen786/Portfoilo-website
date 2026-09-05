/**
 * Main Interactive Logic for Shaik Moyeen's Portfolio
 * - Custom Cyber Glowing Cursor
 * - 3D Tilt Effects
 * - Typewriter Simulation
 * - Project Filter, Direct GitHub Navigation & Modal
 * - Interactive Resume Modal
 * - Clipboard Copy & Toasts
 * - Web Audio Sound Feedback
 * - Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTypewriter();
  init3DTilt();
  initScrollReveal();
  initProjectFilter();
  initProjectCardsAndModals();
  initResumeModal();
  initContactForm();
  initAudioFeedback();
  initNavbar();
});

/* ----------------------------------------------------
 * 0. Custom Cyber Glowing Cursor
 * ---------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const outline = document.getElementById('custom-cursor-outline');

  if (!dot || !outline) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant dot movement
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth lerp outline follow
  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover state detection on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, input, textarea, .project-clickable-card, .tilt-card, [role="button"]'
  );

  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    target.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* ----------------------------------------------------
 * 1. Typewriter Effect
 * ---------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const words = [
    'B.Tech Computer Science Student',
    'Mobile Application Developer',
    'Flutter & Dart Specialist',
    'Software & Web Developer',
    'Algorithm & Problem Solver',
    'AI & Machine Learning Explorer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 350; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ----------------------------------------------------
 * 2. 3D Tilt Effect on Cards
 * ---------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ----------------------------------------------------
 * 3. Scroll Reveal Animations
 * ---------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-fade');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------
 * 4. Project Category Filter
 * ---------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-indigo-500/30');
        b.classList.add('bg-slate-800/80', 'text-slate-400');
      });

      btn.classList.remove('bg-slate-800/80', 'text-slate-400');
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-indigo-500/30');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });

      playClickSound();
    });
  });
}

/* ----------------------------------------------------
 * 5. Project Modals & Direct GitHub Navigation
 * ---------------------------------------------------- */
const projectData = {
  lightup: {
    title: 'Lightup - Algorithmic GUI Puzzle Game',
    timeline: 'Jan 2026 – Apr 2026',
    category: 'Algorithms & Java GUI',
    tech: ['Java', 'Java Swing', 'Greedy Algorithm', 'Divide & Conquer', 'Dynamic Programming', 'OOP'],
    github: 'https://github.com/Moyeen786',
    description: `A dynamic and engaging puzzle game crafted in Java Swing that leverages advanced algorithmic strategies for solver engines, state evaluation, and optimal move suggestions.`,
    highlights: [
      'Engineered an intuitive Java Swing GUI with animated grid states and visual feedback.',
      'Implemented Greedy Algorithm heuristics for fast local state evaluations and hints.',
      'Utilized Divide & Conquer and Dynamic Programming techniques to optimize grid partitions and memoize subproblem solutions.',
      'Engineered clean OOP architecture separating MVC logic, game physics, and algorithm engine.'
    ],
    architecture: `Java Swing UI <---> Game State Controller <---> Algorithmic Engine (DP + Greedy + D&C)`
  },
  'smart-university': {
    title: 'Smart University App - Campus Portal & Attendance',
    timeline: 'Aug 2025 – Nov 2025',
    category: 'Mobile Application Development',
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'REST API', 'Android Studio', 'State Management'],
    github: 'https://github.com/Moyeen786',
    description: `A comprehensive cross-platform mobile application engineered for university students and faculty, featuring live attendance tracking, campus timetable alerts, course materials repository, and real-time notice broadcasts.`,
    highlights: [
      'Engineered responsive cross-platform mobile UI using Flutter and Dart for Android and iOS.',
      'Integrated Firebase Authentication for secure multi-role student and faculty sign-in.',
      'Configured Cloud Firestore real-time database for live timetable updates and course material delivery.',
      'Implemented offline caching and clean state management for zero-latency screen transitions.'
    ],
    architecture: `Flutter UI (Dart) <---> State Management (Provider/Bloc) <---> Firebase Cloud & REST API`
  },
  'hospital-management': {
    title: 'Hospital Management & Healthcare Web Portal',
    timeline: 'Aug 2025 – Nov 2025',
    category: 'Full-Stack Web Development',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Bootstrap 5', 'RESTful Design', 'Responsive UI'],
    github: 'https://github.com/Moyeen786',
    description: `A responsive healthcare platform designed to streamline clinical workflows, patient record tracking, doctor appointment booking, and billing overview.`,
    highlights: [
      'Built a modern, accessible interface with Bootstrap 5 and custom CSS3 variables.',
      'Designed responsive dashboard portals for administrators, doctors, and patients.',
      'Implemented client-side form validation and dynamic appointment scheduling calendar.',
      'Structured modular frontend architecture ready for backend API & database integration.'
    ],
    architecture: `Responsive UI (Bootstrap/JS) <---> Client-Side State Manager <---> Healthcare Records API`
  },
  'python-converter': {
    title: 'Python Multi-Domain Unit Converter',
    timeline: 'Aug 2024 – Nov 2024',
    category: 'Python Desktop Utility',
    tech: ['Python', 'Tkinter/CLI', 'Data Parsing', 'Clean Architecture', 'Modular Design'],
    github: 'https://github.com/Moyeen786',
    description: `A versatile conversion tool built in Python engineered for precision unit translation across length, temperature, digital data size, mass, speed, and currency.`,
    highlights: [
      'Comprehensive conversion matrix covering SI, Imperial, and binary computing units.',
      'Intuitive user interface with real-time recalculations and zero latency.',
      'Robust input validation and mathematical precision rounding.',
      'Modular code structure allowing easy plug-in of novel conversion formulas.'
    ],
    architecture: `UI / CLI Layer <---> Conversion Formula Registry <---> Precision Math Core`
  }
};

function initProjectCardsAndModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailsBtns = document.querySelectorAll('.project-details-btn');
  const projectCards = document.querySelectorAll('.project-clickable-card');

  // Direct GitHub Navigation on Card Click (unless clicking architecture button)
  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // If clicked on the details button, do not navigate directly
      if (e.target.closest('.project-details-btn')) return;

      const repoUrl = card.getAttribute('data-github') || 'https://github.com/Moyeen786';
      playClickSound();
      window.open(repoUrl, '_blank', 'noopener,noreferrer');
    });
  });

  if (!modal) return;

  // Open Detailed Architecture Modal
  detailsBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-timeline').textContent = data.timeline;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-desc').textContent = data.description;
      document.getElementById('modal-architecture').textContent = data.architecture;
      document.getElementById('modal-github-link').setAttribute('href', data.github);

      // Render Tech Badges
      const techContainer = document.getElementById('modal-tech-stack');
      techContainer.innerHTML = data.tech
        .map(
          (t) =>
            `<span class="px-3 py-1 text-xs font-mono font-medium rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">${t}</span>`
        )
        .join('');

      // Render Highlights
      const highlightsContainer = document.getElementById('modal-highlights');
      highlightsContainer.innerHTML = data.highlights
        .map(
          (h) =>
            `<li class="flex items-start text-sm text-slate-300"><span class="text-indigo-400 mr-2">✦</span> ${h}</li>`
        )
        .join('');

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playClickSound();
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ----------------------------------------------------
 * 6. Interactive Resume Modal
 * ---------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close-btn');
  const printBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playClickSound();
    });
  });

  const closeResumeModal = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeResumeModal);
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ----------------------------------------------------
 * 7. Copy to Clipboard & Toast
 * ---------------------------------------------------- */
window.copyToClipboard = function (text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ Copied ${label} to clipboard!`);
    playClickSound();
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ----------------------------------------------------
 * 8. Contact Form Handling
 * ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all fields.');
      return;
    }

    const mailtoUrl = `mailto:cb.sc.u4cse24347@cb.students.amrita.edu?subject=Portfolio Contact from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(`Sender Email: ${email}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoUrl;
    showToast('🚀 Opening your email client to send message...');
    form.reset();
  });
}

/* ----------------------------------------------------
 * 9. Audio Feedback (Web Audio API Synthesizer)
 * ---------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function playClickSound() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (err) {
    // Audio not permitted or supported
  }
}

/* ----------------------------------------------------
 * 10. Navbar Toggle & Active Link
 * ---------------------------------------------------- */
function initNavbar() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      playClickSound();
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active section spy
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach((sec) => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelectorAll(`nav a[href*="#${sectionId}"]`)
          .forEach((a) => {
            a.classList.add('text-indigo-400', 'font-semibold');
          });
      } else {
        document
          .querySelectorAll(`nav a[href*="#${sectionId}"]`)
          .forEach((a) => {
            a.classList.remove('text-indigo-400', 'font-semibold');
          });
      }
    });
  });
}
