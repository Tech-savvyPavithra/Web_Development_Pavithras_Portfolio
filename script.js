// FIXED Mobile Navigation Script

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburgerIcon = document.querySelector(".hamburger-icon");
    const menuLinks = document.querySelector(".menu-links");
    const body = document.body;
    
    // ========================
    // MOBILE MENU FUNCTIONALITY
    // ========================
    
    // Toggle mobile menu function
    function toggleMenu() {
        menuLinks.classList.toggle("open");
        hamburgerIcon.classList.toggle("open");
        
        const expanded = menuLinks.classList.contains("open");
        hamburgerIcon.setAttribute("aria-expanded", expanded);
        
        if (expanded) {
            // Create overlay
            let overlay = document.querySelector(".menu-overlay");
            if (!overlay) {
                overlay = document.createElement("div");
                overlay.className = "menu-overlay";
                document.body.appendChild(overlay);
                overlay.addEventListener("click", toggleMenu);
            }
            
            setTimeout(() => {
                overlay.classList.add("active");
            }, 10);
            
            body.style.overflow = "hidden";
        } else {
            // Remove overlay
            const overlay = document.querySelector(".menu-overlay");
            if (overlay) {
                overlay.classList.remove("active");
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            }
            
            body.style.overflow = "";
        }
    }
    
    // Add click event to hamburger icon
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener("click", toggleMenu);
    }
    
    // ========================
    // NAVIGATION LINKS
    // ========================
    
    // Mobile menu links - FIXED VERSION
    const mobileMenuLinks = document.querySelectorAll('.menu-links a');
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Store the target section id before closing the menu
            const targetId = this.getAttribute('href');
            
            // Close the mobile menu
            if (menuLinks.classList.contains("open")) {
                menuLinks.classList.remove("open");
                hamburgerIcon.classList.remove("open");
                
                // Remove overlay
                const overlay = document.querySelector(".menu-overlay");
                if (overlay) {
                    overlay.classList.remove("active");
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }
                
                // Restore body scrolling
                body.style.overflow = "";
            }
            
            // Use requestAnimationFrame for smoother transitions
            requestAnimationFrame(function() {
                // Find the target element
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get position with proper offset for fixed header
                    const headerOffset = 70; // Adjust based on your header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // Scroll to element
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                    
                    // Update active class
                    document.querySelectorAll('.nav-links a, .menu-links a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    document.querySelectorAll(`a[href="${targetId}"]`).forEach(navLink => {
                        navLink.classList.add('active');
                    });
                }
            });
        });
    });
    
    // Desktop navigation links
    const desktopNavLinks = document.querySelectorAll('.nav-links a, footer .nav-links a');
    
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
    
    // ========================
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // ========================
    
    document.addEventListener('click', function(e) {
        if (
            menuLinks &&
            menuLinks.classList.contains('open') &&
            !menuLinks.contains(e.target) &&
            hamburgerIcon &&
            !hamburgerIcon.contains(e.target)
        ) {
            toggleMenu();
        }
    });
    
    // ========================
    // LOGO CLICK TO TOP
    // ========================
    
    const logos = document.querySelectorAll('#desktop-nav .logo, #hamburger-nav .logo');
    
    logos.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // ========================
    // ACTIVE SECTION HIGHLIGHTING
    // ========================
    
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a, .menu-links a');
        
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            if (!section.id) return;
            
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
                activeLinks.forEach(link => {
                    link.classList.add('active');
                });
            }
        });
        
        // Special case for highlights section
        const highSection = document.getElementById('high');
        const highlightsSection = document.getElementById('highlights');
        
        if (highSection && highlightsSection) {
            const highTop = highSection.offsetTop;
            const highlightsBottom = highlightsSection.offsetTop + highlightsSection.offsetHeight;
            
            if (scrollPosition >= highTop && scrollPosition < highlightsBottom) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === '#high' || link.getAttribute('href') === '#highlights') {
                        link.classList.add('active');
                    }
                });
            }
        }
        
        // Special case for hobby section
        const hobbySection = document.getElementById('hobby');
        if (hobbySection) {
            const hobbyTop = hobbySection.offsetTop;
            const hobbyBottom = hobbyTop + hobbySection.offsetHeight;
            
            if (scrollPosition >= hobbyTop && scrollPosition < hobbyBottom) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === '#hobby') {
                        link.classList.add('active');
                    }
                });
            }
        }
    }
    
    // Initial call and event listener
    highlightActiveSection();
    window.addEventListener('scroll', highlightActiveSection);
    
    // ========================
    // DYNAMIC TEXT ANIMATION
    // ========================
    
    function setupDynamicText() {
        const element = document.getElementById('dynamic-text');
        if (!element) return;
        
        const texts = [
            "Data Scientist", 
            "MERN Full Stack Developer", 
            "ML Engineer", 
            "UI/UX Designer", 
            "Digital Creator", 
            "Business & Finance aficionado"
        ];
        let index = 0;
        
        function changeText() {
            element.style.opacity = 0;
            
            setTimeout(() => {
                element.textContent = texts[index];
                element.style.opacity = 1;
                index = (index + 1) % texts.length;
            }, 500);
        }
        
        element.textContent = texts[0];
        element.style.opacity = 1;
        
        setInterval(changeText, 4000);
    }
    
    setupDynamicText();
    
    // ========================
    // CAROUSEL FUNCTIONALITY
    // ========================
    
    function setupCarousel() {
        const slides = document.querySelector('.slides');
        if (!slides) return;
        
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        let slideInterval;
        
        function showNextSlide() {
            const slideElements = document.querySelectorAll('.slide');
            if (slideElements.length === 0) return;
            
            currentIndex = (currentIndex + 1) % slideElements.length;
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.style.transition = "transform 0.5s ease-in-out";
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const slideElements = document.querySelectorAll('.slide');
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % slideElements.length;
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
            }
            
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.style.transition = "transform 0.5s ease-in-out";
        }
        
        // Touch events
        slides.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        });
        
        slides.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            slideInterval = setInterval(showNextSlide, 5000);
        });
        
        // Mouse events
        slides.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slides.addEventListener('mouseleave', () => {
            slideInterval = setInterval(showNextSlide, 5000);
        });
        
        // Start automatic rotation
        slideInterval = setInterval(showNextSlide, 5000);
    }
    
    setupCarousel();
    
    // ========================
    // MOBILE VIEWPORT FIX
    // ========================
    
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Initial call and resize listener
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // ========================
    // LAZY LOADING IMAGES
    // ========================
    
    function setupLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img').forEach(img => {
                img.loading = 'lazy';
            });
        }
    }
    
    setupLazyLoading();
    
    // ========================
    // SETUP MOBILE MENU STRUCTURE (if needed)
    // ========================
    
    if (menuLinks) {
        // If there's no parent ul, create one and organize items
        if (!menuLinks.querySelector('ul')) {
            const liElements = menuLinks.querySelectorAll('li');
            if (liElements.length > 0) {
                const ul = document.createElement('ul');
                liElements.forEach(li => {
                    ul.appendChild(li.cloneNode(true));
                    li.remove();
                });
                menuLinks.appendChild(ul);
            }
        }
    }
});


// Create overlay element
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);
    
    // Add overlay click event
    overlay.addEventListener('click', closeMobileMenu);
  });
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (mobileMenu.classList.contains('active')) {
      // Close menu
      mobileMenu.classList.remove('active');
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      hamburgerIcon.classList.remove('active');
    } else {
      // Open menu
      mobileMenu.classList.add('active');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      hamburgerIcon.classList.add('active');
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    mobileMenu.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    hamburgerIcon.classList.remove('active');
  }
  
  // Add active class for hamburger icon animation
  document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    hamburgerIcon.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  
    // Add animated hamburger styles
    const style = document.createElement('style');
    style.textContent = `
      .hamburger-icon.active span:nth-child(1) {
        transform: translateY(10px) rotate(45deg);
      }
      .hamburger-icon.active span:nth-child(2) {
        opacity: 0;
      }
      .hamburger-icon.active span:nth-child(3) {
        transform: translateY(-10px) rotate(-45deg);
      }
    `;
    document.head.appendChild(style);
  });

  // Certifications Slideshow
const certSlides = document.querySelector('.cert-slides');
const certSlideItems = document.querySelectorAll('.cert-slide');
const certPrevBtn = document.querySelector('.cert-prev');
const certNextBtn = document.querySelector('.cert-next');
let currentCertSlide = 0;
const maxCertSlides = certSlideItems.length;

function updateCertSlide() {
  certSlides.style.transform = `translateX(-${currentCertSlide * 100}%)`;
}

certNextBtn.addEventListener('click', () => {
  currentCertSlide = (currentCertSlide + 1) % maxCertSlides;
  updateCertSlide();
});

certPrevBtn.addEventListener('click', () => {
  currentCertSlide = (currentCertSlide - 1 + maxCertSlides) % maxCertSlides;
  updateCertSlide();
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

certSlides.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].clientX;
}, {passive: true});

certSlides.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].clientX;
  handleCertSwipe();
}, {passive: true});

function handleCertSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    currentCertSlide = (currentCertSlide + 1) % maxCertSlides;
    updateCertSlide();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    currentCertSlide = (currentCertSlide - 1 + maxCertSlides) % maxCertSlides;
    updateCertSlide();
  }
}

// Add this to your existing script.js
function handleNavbarResize() {
    const desktopNav = document.getElementById('desktop-nav');
    if (window.innerWidth < 1200) {
      desktopNav.style.padding = '1rem 3%';
    } else {
      desktopNav.style.padding = '1rem 5%';
    }
  }
  
  // Call on load and resize
  window.addEventListener('load', handleNavbarResize);
  window.addEventListener('resize', handleNavbarResize);

  // Gallery Slider Functionality
function setupGallerySliders() {
  const sliders = document.querySelectorAll('.flip-slider');
  
  sliders.forEach(slider => {
    const container = slider.closest('.flip-slider-container');
    const prevBtn = container.querySelector('.flip-slider-prev');
    const nextBtn = container.querySelector('.flip-slider-next');
    const slides = slider.querySelectorAll('.flip-slide');
    let currentIndex = 0;
    
    // Function to update slider position
    function updateSlider() {
      const slideWidth = slides[0].offsetWidth + 20; // Include gap
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
    }
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(slides.length - 1, currentIndex + 1);
      updateSlider();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, {passive: true});
    
    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        currentIndex = Math.min(slides.length - 1, currentIndex + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        currentIndex = Math.max(0, currentIndex - 1);
      }
      updateSlider();
    }
  });
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', setupGallerySliders);