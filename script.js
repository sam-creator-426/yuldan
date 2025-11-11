// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

mobileMenuBtn.addEventListener('click', function() {
  mainNav.classList.toggle('active');
  this.classList.toggle('active');
});

// Smooth scrolling for navigation items
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Close mobile menu if open
      mainNav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Smart Header Hide/Show on Scroll
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const headerHeight = header.offsetHeight;
const heroSection = document.querySelector('.hero');
const heroHeight = heroSection.offsetHeight;

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add background when scrolled past hero section
  if (scrollTop > heroHeight * 0.8) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Hide header when scrolling down, show when scrolling up
  if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
    // Scrolling down & past header height - hide header
    header.classList.add('hidden');
  } else {
    // Scrolling up - show header
    header.classList.remove('hidden');
  }
  
  // Reset header position when at top of page
  if (scrollTop === 0) {
    header.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop;
});

// Enhanced brand image loading with fallbacks
function initializeBrandImages() {
  const brandCards = document.querySelectorAll('.brand-card');
  
  brandCards.forEach(card => {
    const img = card.querySelector('.brand-logo');
    
    // Add error handling for images
    img.addEventListener('error', function() {
      console.log(`Brand image failed to load: ${this.src}`);
      
      // Try alternative paths
      const currentSrc = this.src;
      const fileName = currentSrc.split('/').pop();
      
      // Try different file extensions
      if (fileName.includes('.png')) {
        const baseName = fileName.replace('.png', '');
        this.src = `assets/brands/${baseName}.PNG`;
      } else if (fileName.includes('.PNG')) {
        const baseName = fileName.replace('.PNG', '');
        this.src = `assets/brands/${baseName}.png`;
      } else {
        // If all fails, show placeholder with brand name
        const altText = this.alt || 'Brand Logo';
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'brand-placeholder';
        placeholder.textContent = altText;
        placeholder.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: var(--gradient-2);
          color: var(--primary);
          font-weight: 600;
          font-size: 14px;
          text-align: center;
          border-radius: var(--radius);
        `;
        card.appendChild(placeholder);
      }
    });
    
    // Add load event to confirm successful loading
    img.addEventListener('load', function() {
      console.log(`Brand image loaded successfully: ${this.src}`);
      this.style.opacity = '1';
    });
  });
}

// Gallery modal functionality
function initializeGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const caption = this.querySelector('.gallery-caption h3').textContent;
      const description = this.querySelector('.gallery-caption p').textContent;
      
      // In a real implementation, you would show a modal with larger images
      console.log('Gallery item clicked:', caption);
      
      // For now, we'll just log to console
      // In production, implement a lightbox or modal here
      
      // Add visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
}

// Service card interactions
function initializeServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      const serviceName = this.querySelector('h3').textContent;
      console.log('Service clicked:', serviceName);
      
      // Visual feedback
      this.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        this.style.transform = 'translateY(-5px)';
      }, 150);
    });
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
    mainNav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
  }
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
  phoneLink.addEventListener('click', function() {
    console.log('Phone number clicked:', this.href);
    // In production, you might want to send this to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': 'Contact',
        'event_label': 'Phone Call'
      });
    }
  });
});

// Email click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
  emailLink.addEventListener('click', function() {
    console.log('Email clicked:', this.href);
    // In production, you might want to send this to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': 'Contact',
        'event_label': 'Email'
      });
    }
  });
});

// Schedule service button tracking
document.querySelectorAll('.schedule-btn, .cta.primary').forEach(button => {
  button.addEventListener('click', function() {
    console.log('Schedule service clicked');
    // In production, you might want to send this to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': 'Conversion',
        'event_label': 'Schedule Service'
      });
    }
  });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Yuldan.inc website loaded successfully');
  
  // Initialize all components
  initializeBrandImages();
  initializeGallery();
  initializeServiceCards();
  
  // Check brand image loading status
  setTimeout(() => {
    const loadedImages = document.querySelectorAll('.brand-logo[src]');
    let successfullyLoaded = 0;
    
    loadedImages.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        successfullyLoaded++;
      }
    });
    
    console.log(`Brand images successfully loaded: ${successfullyLoaded}/${loadedImages.length}`);
    
    // If many images failed to load, show a warning
    if (successfullyLoaded < loadedImages.length * 0.5) {
      console.warn('Many brand images failed to load. Check file paths and names.');
    }
  }, 2000);
  
  // Add loading state for better UX
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 300);
    }
  });
});

// Handle page visibility changes (for when user switches tabs and comes back)
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    // Page is visible again, ensure header is visible
    header.classList.remove('hidden');
  }
});

// Handle resize events
window.addEventListener('resize', function() {
  // Recalculate header height on resize
  headerHeight = header.offsetHeight;
});

// Prevent header hide on menu interaction
mainNav.addEventListener('click', function(e) {
  // If clicking on a nav item, prevent the scroll event from immediately hiding the header
  if (e.target.classList.contains('nav-item')) {
    lastScrollTop = window.pageYOffset - 1;
  }
});