export function initNavbar() {
  const navBar = document.querySelector('nav');
  const getNavOffset = () => (navBar ? navBar.offsetHeight : 0);

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
}
