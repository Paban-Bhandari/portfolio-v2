export function initAnimations() {
  const loader = document.getElementById('loadingScreen');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  }

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
  window.addEventListener('resize', updateMarqueeDistance, { passive: true });

  if (animateMarquee) {
    const setMarqueePaused = (paused) => {
      animateMarquee.style.animationPlayState = paused ? 'paused' : 'running';
    };

    document.querySelectorAll('.tech-item').forEach((item) => {
      item.addEventListener('pointerenter', () => setMarqueePaused(true));
      item.addEventListener('pointerleave', () => setMarqueePaused(false));
    });
  }

  const cursor = document.getElementById('customCursor');
  const updateCursor = (event) => {
    if (!cursor || window.innerWidth < 1024) return;
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  };

  if (cursor) {
    window.addEventListener('mousemove', updateCursor, { passive: true });

    document.querySelectorAll('a, button, input, textarea, select, .certificate-card').forEach((element) => {
      element.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }
}
