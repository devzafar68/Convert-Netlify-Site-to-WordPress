/* ========================================
   Crown of Caribbean — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation scroll effect ---
  const nav = document.querySelector('.nav');
  const heroImg = document.querySelector('.hero-bg img');
  
  window.addEventListener('scroll', () => {
    // Sticky nav
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    // Parallax hero
    if (heroImg) {
      heroImg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.1)`;
    }
  }, { passive: true });

  // --- Mobile menu ---
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');

  if (toggle) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      overlay.classList.toggle('open');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
    });
  });

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll reveal ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });
  reveals.forEach(el => revealObserver.observe(el));

  // --- Testimonial Carousel ---
  const testimonials = [
    { text: "Absolutely breathtaking! The Villa Panoramic exceeded every expectation. Waking up to ocean views every morning was pure magic. We're already planning our return trip.", author: "Sarah & James M.", location: "New York, NY", stars: 5 },
    { text: "Island Escape was the perfect family getaway. The kids loved the outdoor spaces and we loved the privacy. The concierge recommendations for snorkeling spots were incredible.", author: "The Rodriguez Family", location: "Miami, FL", stars: 5 },
    { text: "Our anniversary at the Oceanview Getaway was unforgettable. The sunset views from the terrace, the beautifully designed interiors — every detail was thoughtfully curated.", author: "David & Lisa K.", location: "Toronto, Canada", stars: 5 },
  ];

  let currentTestimonial = 0;
  const quoteEl = document.getElementById('testimonial-quote');
  const authorEl = document.getElementById('testimonial-author');
  const locationEl = document.getElementById('testimonial-location');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  function updateTestimonial() {
    if (!quoteEl) return;
    const t = testimonials[currentTestimonial];
    quoteEl.textContent = `"${t.text}"`;
    authorEl.textContent = t.author;
    locationEl.textContent = t.location;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial();
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });

  // --- Villa Selection (Book Now page) ---
  document.querySelectorAll('.villa-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.villa-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // --- Form Submissions ---
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const page = form.closest('.section') || form.closest('section');
      if (page) {
        page.innerHTML = `
          <div class="success-page" style="min-height:auto; padding: 4rem 1.5rem;">
            <div class="text-center">
              <svg viewBox="0 0 24 24" style="width:64px;height:64px;stroke:var(--gold);fill:none;stroke-width:1.5;margin:0 auto 1.5rem;display:block;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h1 style="font-family:var(--font-serif);font-size:1.875rem;font-weight:700;margin-bottom:1rem;">Thank You!</h1>
              <p style="color:var(--muted);max-width:420px;margin:0 auto;">Your message has been received. Our team will get back to you within 24 hours.</p>
            </div>
          </div>
        `;
      }
    });
  });
});
