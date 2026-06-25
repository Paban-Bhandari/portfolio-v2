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
});