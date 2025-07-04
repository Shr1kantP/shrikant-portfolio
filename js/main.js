// Mobile View Popup Functionality
function showMobilePopup() {
  const popup = document.getElementById('mobilePopup');
  const popupContent = document.getElementById('mobilePopupContent');
  
  if (popup && popupContent) {
    // Show overlay first
    popup.classList.add('show');
    
    // Show popup content with slight delay for animation
    setTimeout(() => {
      popupContent.classList.add('show');
    }, 100);
  }
}

function closeMobilePopup() {
  const popup = document.getElementById('mobilePopup');
  const popupContent = document.getElementById('mobilePopupContent');
  
  if (popup && popupContent) {
    // Hide popup content first
    popupContent.classList.remove('show');
    
    // Hide overlay with delay
    setTimeout(() => {
      popup.classList.remove('show');
    }, 300);
  }
}

// Show mobile popup when page loads
window.addEventListener('DOMContentLoaded', function() {
  // Add a small delay to ensure everything is loaded
  setTimeout(() => {
    showMobilePopup();
  }, 500);
});

// Close popup when clicking outside of it
document.addEventListener('click', function(e) {
  const popup = document.getElementById('mobilePopup');
  const popupContent = document.getElementById('mobilePopupContent');
  
  if (popup && popupContent && e.target === popup) {
    closeMobilePopup();
  }
});

// Close popup on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const popup = document.getElementById('mobilePopup');
    if (popup && popup.classList.contains('show')) {
      closeMobilePopup();
    }
  }
});

// Scroll-triggered fade-in animations
const fadeEls = document.querySelectorAll('.fade-in, .about-section, .skills-section, .experience-section, .projects-section, .contact-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// Card tilt effect
function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 8;
  const rotateY = ((x - centerX) / centerX) * 8;
  card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
}
function resetTilt(e) {
  e.currentTarget.style.transform = '';
}
[...document.querySelectorAll('.project-card, .skill-sticker')].forEach(card => {
  card.addEventListener('mousemove', handleTilt);
  card.addEventListener('mouseleave', resetTilt);
});

// Nav hover flicker underline (already handled by CSS, but add extra JS flicker if desired)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.classList.add('flicker');
    setTimeout(() => link.classList.remove('flicker'), 300);
  });
});

// Marquee headline animation (if needed for JS, but CSS handles it)
// Optionally, you can duplicate the text for seamless loop
const marquee = document.querySelector('.headline-marquee');
if (marquee) {
  marquee.innerHTML = marquee.textContent + '  A0  A0 ' + marquee.textContent;
}

// Scroll to section on nav click (smooth)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Parallax effect for hero background image
const heroBgImage = document.querySelector('.hero-bg-image');
if (heroBgImage) {
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      // Get scroll position relative to hero section
      const hero = document.querySelector('.hero-section');
      const rect = hero.getBoundingClientRect();
      // Only apply if hero is in viewport
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        // Parallax: move bg image slower than scroll
        const offset = window.scrollY * 0.3;
        heroBgImage.style.transform = `translateY(${offset}px)`;
      }
    });
  });
}

// Parallax effect for About section background
window.addEventListener('scroll', function() {
  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    const scrolled = window.scrollY;
    aboutSection.style.backgroundPosition = `center ${-scrolled * 0.3}px`;
  }
});

// Hamburger menu logic
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const menuOverlay = document.getElementById('menu-overlay');

function closeMenu() {
  navLinks.classList.remove('open');
  hamburgerBtn.classList.remove('active');
  menuOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function openMenu() {
  navLinks.classList.add('open');
  hamburgerBtn.classList.add('active');
  menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

hamburgerBtn.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu when overlay is clicked
menuOverlay.addEventListener('click', closeMenu);

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
  }
});

// Close menu on window resize if screen becomes larger
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
    closeMenu();
  }
});

// Skills accordion for mobile
function setupSkillsAccordion() {
  if (window.innerWidth > 600) return;
  const headers = document.querySelectorAll('#skills-accordion .accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      // Close all
      headers.forEach(h => {
        h.setAttribute('aria-expanded', 'false');
        h.nextElementSibling.style.maxHeight = null;
      });
      // Open this one if it was closed
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 'px';
      }
    });
    // Start closed
    header.setAttribute('aria-expanded', 'false');
    if (header.nextElementSibling) header.nextElementSibling.style.maxHeight = null;
  });
}

window.addEventListener('DOMContentLoaded', setupSkillsAccordion);
window.addEventListener('resize', setupSkillsAccordion);

// Animate skill cards on scroll into view
const skillStickers = document.querySelectorAll('.skills-grid .skill-sticker');
const skillsSection = document.querySelector('.skills-section');
if (skillStickers.length && skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillStickers.forEach(card => {
          card.style.opacity = '1';
          card.classList.add('visible');
        });
        // Remove observer after animation
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  skillsObserver.observe(skillsSection);
}

// Drawing Canvas Logic
window.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('draw-canvas');
  const clearBtn = document.getElementById('clear-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let lastX = 0, lastY = 0;

  function startDraw(x, y) {
    drawing = true;
    [lastX, lastY] = [x, y];
  }
  function draw(x, y) {
    if (!drawing) return;
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
  }
  function stopDraw() { drawing = false; }

  // Mouse events
  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    startDraw(e.clientX - rect.left, e.clientY - rect.top);
  });
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  });
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  // Touch events
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      startDraw(t.clientX - rect.left, t.clientY - rect.top);
    }
  });
  canvas.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      draw(t.clientX - rect.left, t.clientY - rect.top);
      e.preventDefault();
    }
  }, { passive: false });
  canvas.addEventListener('touchend', stopDraw);
  canvas.addEventListener('touchcancel', stopDraw);

  // Clear button
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});