// Typing Animation - Cursor ONLY in H1
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content h2');
    
    // Texts for H2 repeating animation
    const subtitleTexts = [
        "Software Engineer & AI/ML Developer",
        "Full Stack Developer", 
        "Problem Solver",
        "Tech Enthusiast",
        "Lifelong Learner",
        "Open Source Contributor"
    ];
    
    let subtitleIndex = 0;
    let subtitleCharIndex = 0;
    let isDeletingSubtitle = false;
    let subtitleTimeout;

    // Type name first (one-time only) - WITH CURSOR in H1
    if (heroTitle) {
        const spanElement = heroTitle.querySelector('span');
        if (spanElement) {
            const text = spanElement.textContent;
            spanElement.textContent = '';
            spanElement.classList.add('typing-text'); // CURSOR ONLY HERE
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    spanElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove blinking cursor after typing completes
                    setTimeout(() => {
                        spanElement.classList.remove('typing-text'); // REMOVE CURSOR
                        // Start H2 repeating animation after name completes
                        startSubtitleTyping();
                    }, 1000);
                }
            }
            // Start typing after a short delay
            setTimeout(typeWriter, 1000);
        }
    }
    
    // H2 Repeating Typing Function - WITHOUT CURSOR
    function startSubtitleTyping() {
        if (!heroSubtitle) return;
        
        function typeSubtitle() {
            const currentText = subtitleTexts[subtitleIndex];
            
            if (!isDeletingSubtitle) {
                // Typing forward - NO CURSOR
                if (subtitleCharIndex < currentText.length) {
                    heroSubtitle.textContent = currentText.substring(0, subtitleCharIndex + 1);
                    subtitleCharIndex++;
                    subtitleTimeout = setTimeout(typeSubtitle, 100);
                } else {
                    // Finished typing, wait then start deleting
                    subtitleTimeout = setTimeout(() => {
                        isDeletingSubtitle = true;
                        subtitleTimeout = setTimeout(typeSubtitle, 500);
                    }, 2000);
                }
            } else {
                // Deleting - NO CURSOR
                if (subtitleCharIndex > 0) {
                    heroSubtitle.textContent = currentText.substring(0, subtitleCharIndex - 1);
                    subtitleCharIndex--;
                    subtitleTimeout = setTimeout(typeSubtitle, 50);
                } else {
                    // Move to next text
                    isDeletingSubtitle = false;
                    subtitleIndex = (subtitleIndex + 1) % subtitleTexts.length;
                    subtitleCharIndex = 0;
                    
                    // Brief pause before next text
                    heroSubtitle.textContent = '';
                    subtitleTimeout = setTimeout(() => {
                        subtitleTimeout = setTimeout(typeSubtitle, 300);
                    }, 300);
                }
            }
        }
        
        // Start the H2 typing loop
        heroSubtitle.textContent = '';
        subtitleTimeout = setTimeout(typeSubtitle, 500);
    }

    // ... rest of your existing code remains same
    // Clean up timeouts when page unloads
    window.addEventListener('beforeunload', function() {
        if (subtitleTimeout) {
            clearTimeout(subtitleTimeout);
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isDisplayed = navLinks.style.display === 'flex';
            navLinks.style.display = isDisplayed ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navLinks.style.zIndex = '1000';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 968) {
            if (!e.target.closest('nav') && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading state
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                
                // Show success message
                showMessage(`Thank you ${name}! Your message has been sent successfully. I'll get back to you at ${email} soon.`, 'success');
                
                // Reset form
                contactForm.reset();
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type === 'success' ? 'form-success' : 'form-error'}`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        // Insert before the form
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 5000);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.skill-category, .project-card, .about-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Responsive navigation
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            navLinks.style.flexDirection = 'row';
        } else {
            navLinks.style.display = 'none';
        }
    });
});

// Skills counter animation
function animateSkills() {
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    animateSkills();
    
    // Initialize mobile menu
    if (window.innerWidth <= 968) {
        document.querySelector('.nav-links').style.display = 'none';
    }
});