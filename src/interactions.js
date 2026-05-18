/**
 * @param {Carousel} carousel
 * @param {HTMLElement} container
 */
export function initInteractions(carousel, container) {
  // --- Keyboard ---
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        carousel.prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        carousel.next();
        break;
      case 'Escape':
        e.preventDefault();
        carousel.reset();
        break;
    }
  });

  // --- Mouse / Click ---
  const prevBtn = container.querySelector('.nav-prev');
  const nextBtn = container.querySelector('.nav-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => carousel.prev());
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => carousel.next());
  }

  // Dots click delegation
  const dotsContainer = container.querySelector('.dots-container');
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot');
      if (!dot) return;
      const index = parseInt(dot.dataset.index, 10);
      if (!Number.isNaN(index)) {
        carousel.goTo(index);
      }
    });

    // Keyboard navigation for dots (tablist pattern)
    dotsContainer.addEventListener('keydown', (e) => {
      const activeDot = dotsContainer.querySelector('.dot[aria-selected="true"]');
      if (!activeDot) return;
      const currentIdx = parseInt(activeDot.dataset.index, 10);
      let newIdx = currentIdx;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newIdx = currentIdx > 0 ? currentIdx - 1 : carousel.terms.length - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIdx = currentIdx < carousel.terms.length - 1 ? currentIdx + 1 : 0;
          break;
        case 'Home':
          e.preventDefault();
          newIdx = 0;
          break;
        case 'End':
          e.preventDefault();
          newIdx = carousel.terms.length - 1;
          break;
      }

      if (newIdx !== currentIdx) {
        carousel.goTo(newIdx);
        // Focus the new dot after render
        setTimeout(() => {
          const newDot = dotsContainer.querySelector(`.dot[data-index="${newIdx}"]`);
          if (newDot) newDot.focus();
        }, 0);
      }
    });
  }

  // --- Touch / Swipe ---
  let touchStartX = 0;
  let touchStartY = 0;
  let isTouching = false;
  const SWIPE_THRESHOLD = 50;

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    isTouching = true;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    // Let vertical scroll pass through; prevent horizontal default only
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  }, { passive: false });

  container.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;
    const touchEndX = e.changedTouches[0].clientX;
    const dx = touchEndX - touchStartX;

    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      if (dx > 0) {
        carousel.prev();
      } else {
        carousel.next();
      }
    }
  }, { passive: true });

  // --- Reduced Motion ---
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotionChange() {
    container.classList.toggle('reduced-motion', motionQuery.matches);
  }
  motionQuery.addEventListener('change', handleMotionChange);
  handleMotionChange();
}
