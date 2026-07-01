export function initCertificates() {
  const certificatesSection = document.getElementById('certificates-section');
  if (!certificatesSection) return;

  const certificateModal = document.getElementById('certificateModal');
  const modalImage = document.getElementById('certificateModalImage');
  const closeButton = document.getElementById('closeCertificateModal');

  const openCertificateModal = (src) => {
    if (!modalImage || !certificateModal) return;

    modalImage.src = src;
    certificateModal.classList.remove('hidden');

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.classList.add('overflow-hidden');
  };

  const closeCertificateModal = () => {
    if (!certificateModal) return;

    certificateModal.classList.add('hidden');
    if (modalImage) modalImage.src = '';
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = '';
  };

  certificatesSection.querySelectorAll('.certificate-card').forEach((card) => {
    card.addEventListener('click', () => {
      const image = card.querySelector('img');
      if (image && image.getAttribute('src')) {
        openCertificateModal(image.getAttribute('src'));
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeCertificateModal);
  }

  if (certificateModal) {
    certificateModal.addEventListener('click', (event) => {
      if (event.target === certificateModal) {
        closeCertificateModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certificateModal && !certificateModal.classList.contains('hidden')) {
      closeCertificateModal();
    }
  });
}
