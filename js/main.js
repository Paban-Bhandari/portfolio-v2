import { initAnimations } from './animations.js';
import { initNavbar } from './navbar.js';
import { initParticles } from './particles.js';
import { initCertificates } from './certificates.js';
import { initContact } from './contact.js';

window.addEventListener('load', () => {
  initAnimations();
  initNavbar();
  initParticles();
  initCertificates();
  initContact();
});
