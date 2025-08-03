// Main JavaScript functionality for MindMatrix AIML Academy

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    initializeWhatsAppWidget();
    initializeNewsletterForm();
    initializeScrollAnimations();
    initializeActiveNavigation();
    initializeLazyLoading();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click from bubbling to document
            mobileMenu.classList.toggle('open');
            
            // Toggle hamburger icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('open');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Set active navigation based on current page
function initializeActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href && (currentPath.endsWith(href) || (href === 'index.html' && currentPath === '/'))) {
            link.classList.add('active');
        }
    });
}

// WhatsApp widget functionality
function initializeWhatsAppWidget() {
    const whatsappWidget = document.getElementById('whatsapp-widget');
    
    if (whatsappWidget) {
        // Show/hide based on scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                whatsappWidget.style.opacity = '1';
                whatsappWidget.style.visibility = 'visible';
            } else {
                whatsappWidget.style.opacity = '0.7';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Track WhatsApp clicks
        const whatsappButton = whatsappWidget.querySelector('.whatsapp-button');
        if (whatsappButton) {
            whatsappButton.addEventListener('click', function() {
                console.log('WhatsApp widget clicked');
            });
        }
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                course: formData.get('course'),
                message: formData.get('message')
            };
            
            if (!data.name || !data.email || !data.message) {
                showErrorMessage('Please fill in all required fields.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showErrorMessage('Please enter a valid email address.');
                return;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                showSuccessMessage();
                contactForm.reset();
                
                console.log('Contact form submitted:', data);
            }, 2000);
        });
    }
    
    function showSuccessMessage() {
        if (successMessage) {
            successMessage.classList.remove('hidden');
            errorMessage?.classList.add('hidden');
            
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    }
    
    function showErrorMessage(message) {
        if (errorMessage) {
            errorMessage.querySelector('span') || errorMessage.appendChild(document.createTextNode(message));
            errorMessage.classList.remove('hidden');
            successMessage?.classList.add('hidden');
        }
    }
}

// Newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                if (newsletterSuccess) {
                    newsletterSuccess.classList.remove('hidden');
                }
                
                newsletterForm.reset();
                
                setTimeout(() => {
                    if (newsletterSuccess) {
                        newsletterSuccess.classList.add('hidden');
                    }
                }, 5000);
                
                console.log('Newsletter subscription:', email);
            }, 1500);
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-card, .syllabus-card, .career-card, .blog-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

// Error handling for async operations
function handleError(error, message = 'An error occurred') {
    console.error(error);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fixed top-4 right-4 z-50';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Export functions for use in other modules
window.MindMatrixUtils = {
    formatDate,
    calculateReadingTime,
    debounce,
    throttle,
    handleError,
    saveToLocalStorage,
    getFromLocalStorage,
    measurePerformance
};