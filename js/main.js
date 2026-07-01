window.addEventListener('load', () => {

    // Loading screen
    const loader = document.getElementById('loadingScreen');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1500);

    // Particles.js
    const marqueeContainer = document.querySelector('.marquee-container');
    const animateMarquee = document.querySelector('.animate-marquee');

    const updateMarqueeDistance = () => {
        if (!marqueeContainer || !animateMarquee) return;
        const containerWidth = marqueeContainer.clientWidth;
        const contentWidth = animateMarquee.scrollWidth;
        const shift = Math.max(0, contentWidth - containerWidth);
        animateMarquee.style.setProperty('--marquee-distance', `-${shift}px`);

        if (shift > 0) {
            animateMarquee.style.animation = 'marquee 48s linear infinite alternate';
        } else {
            animateMarquee.style.animation = 'none';
        }
    };

    updateMarqueeDistance();
    window.addEventListener('resize', updateMarqueeDistance);

    if (animateMarquee) {
        const setMarqueePaused = (paused) => {
            animateMarquee.style.animationPlayState = paused ? 'paused' : 'running';
        };

        document.querySelectorAll('.tech-item').forEach((item) => {
            item.addEventListener('pointerenter', () => setMarqueePaused(true));
            item.addEventListener('pointerleave', () => setMarqueePaused(false));
        });
    }

    const navBar = document.querySelector('nav');
    const getNavOffset = () => navBar ? navBar.offsetHeight : 0;

    document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            event.preventDefault();
            const offset = getNavOffset();
            const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset - offset - 12;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });

            document.querySelectorAll('.nav-link').forEach((navLink) => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        let currentId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach((navLink) => {
            navLink.classList.toggle('active', navLink.getAttribute('href') === `#${currentId}`);
        });
    };

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: '#ffd369' },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.8, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 4, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: '#ffd369', opacity: 0.7, width: 1 },
                move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'window',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: {
                    grab: { distance: 200, line_linked: { opacity: 0.8 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }

    const navbar = document.getElementById('main-navbar');
    const updateNavbar = () => {
        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('bg-transparent', 'border-transparent', 'backdrop-blur-none');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('bg-transparent', 'border-transparent', 'backdrop-blur-none');
        }
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    const certificatesSection = document.getElementById('certificates-section');
    if (certificatesSection) {
        const certificateModal = document.getElementById('certificateModal');
        const modalImage = document.getElementById('certificateModalImage');
        const closeButton = document.getElementById('closeCertificateModal');

        const openCertificateModal = (src) => {
            if (!modalImage) return;
            modalImage.src = src;
            certificateModal.classList.remove('hidden');
            // Prevent layout shift by compensating for scrollbar disappearance
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
            document.body.classList.add('overflow-hidden');
        };

        const closeCertificateModal = () => {
            certificateModal.classList.add('hidden');
            if (modalImage) modalImage.src = '';
            document.body.classList.remove('overflow-hidden');
            // Remove any padding added to compensate for scrollbar
            document.body.style.paddingRight = '';
        };

        certificatesSection.querySelectorAll('img').forEach((img) => {
            img.addEventListener('click', () => {
                if (img.getAttribute('src')) {
                    openCertificateModal(img.getAttribute('src'));
                }
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeCertificateModal);
        }

        certificateModal.addEventListener('click', (event) => {
            if (event.target === certificateModal) {
                closeCertificateModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !certificateModal.classList.contains('hidden')) {
                closeCertificateModal();
            }
        });
    }
});

// Initialize EmailJS
const EMAILJS_PUBLIC_KEY = 'Jy04q4eVfNerskfqF';
const EMAILJS_SERVICE_ID = 'service_dwnmjzs';
const EMAILJS_TEMPLATE_ID = 'template_ds7q5ek';

if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        submitBtn.disabled = true;

        const name = this.querySelector('input[name="name"]')?.value || '';
        const email = this.querySelector('input[name="email"]')?.value || '';
        const subject = this.querySelector('input[name="subject"]')?.value || 'Portfolio Contact';
        const message = this.querySelector('textarea[name="message"]')?.value || '';

        if (typeof emailjs === 'undefined') {
            const mailtoLink = `mailto:bhandaripawan841@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;
            showNotification('Your email app is opening with your message.', 'success');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Send email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this, EMAILJS_PUBLIC_KEY)
            .then(function() {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, function(error) {
                showNotification('Failed to send message. Please try again.', 'error');
                console.log('EmailJS Error:', error);
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'status');
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon" aria-hidden="true">
                ${type === 'success'
                    ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>'
                    : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" /></svg>'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 350);
    }, 4500);
}
