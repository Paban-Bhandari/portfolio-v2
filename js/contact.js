const EMAILJS_PUBLIC_KEY = 'Jy04q4eVfNerskfqF';
const EMAILJS_SERVICE_ID = 'service_dwnmjzs';
const EMAILJS_TEMPLATE_ID = 'template_ds7q5ek';

export function initContact() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const contactForm = document.querySelector('.contact-form');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
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

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this, EMAILJS_PUBLIC_KEY)
      .then(function () {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      }, function (error) {
        showNotification('Failed to send message. Please try again.', 'error');
        console.log('EmailJS Error:', error);
      })
      .finally(function () {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}

export function showNotification(message, type = 'success') {
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
