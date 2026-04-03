document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    const toggleMenu = (force) => {
      const isOpen = mobileToggle.classList.toggle('open', force);
      mobileMenu.classList.toggle('open', force);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      
      if (isOpen) {
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      }
    };

    mobileToggle.addEventListener('click', () => {
      toggleMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu(false);
        mobileToggle.focus();
      }
    });
  }

  // 2. Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. Active nav link highlighting based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown-card').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop() || 'index.html';
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      
      // If it's inside a dropdown, highlight the trigger too
      const dropdown = link.closest('.nav-item-dropdown');
      if (dropdown) {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (trigger) trigger.classList.add('active');
      }
    }
  });

  // 4. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileToggle.click();
        }
      }
    });
  });

  // 5. QA Pack form unlock
  const qaForm = document.getElementById('qa-form');
  if (qaForm) {
    qaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(qaForm)) {
        const submitBtn = qaForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Unlocking...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          document.querySelectorAll('.qa-doc-row.locked').forEach(row => {
            row.classList.remove('locked');
            const btn = row.querySelector('.btn');
            btn.innerHTML = 'Download <span class="arrow">↓</span>';
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-outline-dark');
          });
          qaForm.innerHTML = '<div style="padding: 40px; text-align: center; background: var(--cream); border-radius: var(--radius-md); border: 0.5px solid var(--border);"><h3>Access Granted</h3><p>You can now download all documents below.</p></div>';
        }, 800);
      }
    });
  }

  // 6. Contact form conditional fields
  const contactForm = document.getElementById('contact-form');
  const enquiryType = document.getElementById('enquiry-type');
  if (contactForm && enquiryType) {
    const quoteFields = document.getElementById('quote-fields');
    const sampleFields = document.getElementById('sample-fields');
    
    // Check URL params for pre-selection
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam === 'sample') {
      enquiryType.value = 'sample';
    } else if (typeParam === 'quote') {
      enquiryType.value = 'quote';
    }
    
    const updateFields = () => {
      if (quoteFields) quoteFields.style.display = enquiryType.value === 'quote' ? 'block' : 'none';
      if (sampleFields) sampleFields.style.display = enquiryType.value === 'sample' ? 'block' : 'none';
      const t = enquiryType.value;
      enquiryType.style.borderColor = t === 'sample' || t === 'quote' ? 'var(--gold)' : '';
    };
    
    enquiryType.addEventListener('change', updateFields);
    updateFields();

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formspree.io/f/xbdpzrgo', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          window.location.href = '/thankyou.html';
        } else {
          submitBtn.textContent = 'Send Enquiry →';
          submitBtn.disabled = false;
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        submitBtn.textContent = 'Send Enquiry →';
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    });
  }

  // 7. Intersection Observer for fade-in animations on scroll
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
  
  fadeElements.forEach(el => fadeObserver.observe(el));

  // 8. Products dropdown keyboard accessibility
  const dropdowns = document.querySelectorAll('.nav-item-dropdown');
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (trigger && menu) {
      const toggleDropdown = (force) => {
        const isOpen = dropdown.classList.toggle('focus-within', force);
        trigger.setAttribute('aria-expanded', isOpen);
      };

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDropdown();
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDropdown();
        } else if (e.key === 'Escape' && dropdown.classList.contains('focus-within')) {
          e.preventDefault();
          toggleDropdown(false);
          trigger.focus();
        } else if (e.key === 'ArrowDown' && dropdown.classList.contains('focus-within')) {
          e.preventDefault();
          const firstLink = menu.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });

      menu.addEventListener('keydown', (e) => {
        const links = Array.from(menu.querySelectorAll('a'));
        const index = links.indexOf(document.activeElement);

        if (e.key === 'Escape') {
          e.preventDefault();
          toggleDropdown(false);
          trigger.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (index < links.length - 1) {
            links[index + 1].focus();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index > 0) {
            links[index - 1].focus();
          } else {
            trigger.focus();
          }
        }
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && dropdown.classList.contains('focus-within')) {
          toggleDropdown(false);
        }
      });

      dropdown.addEventListener('focusout', (e) => {
        if (!dropdown.contains(e.relatedTarget)) {
          toggleDropdown(false);
        }
      });
    }
  });

  // 9. Form validation with inline error messages
  function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('invalid');
        isValid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        group.classList.add('invalid');
        const error = group.querySelector('.form-error');
        if (error) error.textContent = 'Please enter a valid email address.';
        isValid = false;
      } else {
        group.classList.remove('invalid');
      }
      
      field.addEventListener('input', () => {
        group.classList.remove('invalid');
      }, { once: true });
    });
    
    return isValid;
  }

  // 10. Scroll progress indicator on long pages
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
});
