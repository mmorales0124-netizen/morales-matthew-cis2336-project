// ArtConnect — gallery.js
// Handles: click-to-enlarge lightbox for the artwork gallery.
// Reads artwork info straight from each card's data attributes,
// so adding a 7th, 8th, etc. artwork later needs no JS changes.

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.art-card'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbMeta = document.getElementById('lightboxMeta');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lightbox || cards.length === 0) return;

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const card = cards[currentIndex];
    const data = card.dataset;

    lbImg.src = data.image;
    lbImg.alt = data.title;
    lbTitle.textContent = data.title;
    lbMeta.innerHTML = `by ${data.artist} &nbsp;·&nbsp; <span class="cat">${data.category}</span> &nbsp;·&nbsp; ${data.price}`;

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext(step) {
    currentIndex = (currentIndex + step + cards.length) % cards.length;
    openLightbox(currentIndex);
  }

  cards.forEach((card, index) => {
    const frame = card.querySelector('.art-frame');
    if (!frame) return;
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('role', 'button');
    frame.setAttribute('aria-label', `Enlarge ${card.dataset.title}`);

    frame.addEventListener('click', () => openLightbox(index));
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
});
