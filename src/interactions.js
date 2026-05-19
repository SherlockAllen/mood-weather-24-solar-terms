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
  let touchStartTime = 0;
  let isTouching = false;

  // Dynamic threshold: higher DPR screens need proportionally larger swipe distance
  const getSwipeThreshold = () => Math.round(50 / window.devicePixelRatio);
  // Minimum velocity in px/ms — prevents slow accidental drags from triggering
  const MIN_SWIPE_VELOCITY = 0.3;

  container.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length !== 1) return;
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    },
    { passive: true }
  );

  // touchmove listener removed — CSS touch-action: pan-y handles scroll behavior natively.
  // The browser now decides scroll vs swipe without waiting for JS, eliminating scroll jank.

  container.addEventListener(
    'touchend',
    (e) => {
      if (!isTouching) return;
      isTouching = false;
      const touchEndX = e.changedTouches[0].clientX;
      const dx = touchEndX - touchStartX;
      const elapsed = Date.now() - touchStartTime;

      // Composite judgment: distance + velocity
      const threshold = getSwipeThreshold();
      if (Math.abs(dx) >= threshold && elapsed > 0) {
        const velocity = Math.abs(dx) / elapsed;
        if (velocity >= MIN_SWIPE_VELOCITY) {
          if (dx > 0) {
            carousel.prev();
          } else {
            carousel.next();
          }
        }
      }
    },
    { passive: true }
  );

  // --- Reduced Motion ---
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotionChange() {
    container.classList.toggle('reduced-motion', motionQuery.matches);
  }
  motionQuery.addEventListener('change', handleMotionChange);
  handleMotionChange();

  // P2: Easter eggs
  initEasterEggs(carousel, container);
}

/**
 * P2: Interactive easter eggs
 * - 立春春风: hover 5s → willow sway + petal fall
 * - 清明雨巷: long press 1s → ripple spread
 * - 夏至日食: rapid switch 3× (handled in carousel.js)
 * - 秋分满月: hover 10s → moon enlarge
 * - 冬至极光: mouse shake → aurora intensify
 */
function initEasterEggs(carousel, container) {
  const hoverTimers = new Map();
  let longPressTimer = null;
  const mousePositions = [];
  let shakeTriggered = false;

  // Clear all hover timers
  const clearHoverTimers = () => {
    hoverTimers.forEach((t) => clearTimeout(t));
    hoverTimers.clear();
  };

  // --- Hover detection (立春 5s, 秋分 10s) ---
  container.addEventListener('mouseenter', () => {
    clearHoverTimers();
    const term = carousel.currentTerm;

    // 立春春风: hover 5s
    if (term.id === 1) {
      const timer = setTimeout(() => {
        container.classList.add('easter-egg-spring-wind');
        setTimeout(() => container.classList.remove('easter-egg-spring-wind'), 6000);
      }, 5000);
      hoverTimers.set('spring', timer);
    }

    // 秋分满月: hover 10s
    if (term.id === 16) {
      const timer = setTimeout(() => {
        container.classList.add('easter-egg-autumn-moon');
        setTimeout(() => container.classList.remove('easter-egg-autumn-moon'), 8000);
      }, 10000);
      hoverTimers.set('autumn', timer);
    }

    // Reset shake detection for 冬至
    if (term.id === 22) {
      shakeTriggered = false;
      mousePositions.length = 0;
    }
  });

  container.addEventListener('mouseleave', () => {
    clearHoverTimers();
    clearLongPress();
    mousePositions.length = 0;
  });

  // --- Long press detection (清明 1s) ---
  const startLongPress = (clientX, clientY) => {
    if (carousel.currentTerm.id !== 5) return;
    longPressTimer = setTimeout(() => {
      triggerQingmingRipple(container, clientX, clientY);
    }, 1000);
  };

  const clearLongPress = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  container.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    startLongPress(e.clientX, e.clientY);
  });

  container.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      startLongPress(t.clientX, t.clientY);
    },
    { passive: true }
  );

  container.addEventListener('mouseup', clearLongPress);
  container.addEventListener('touchend', clearLongPress);

  // --- Mouse shake detection (冬至) ---
  container.addEventListener('mousemove', (e) => {
    if (carousel.currentTerm.id !== 22 || shakeTriggered) return;

    const now = Date.now();
    mousePositions.push({ x: e.clientX, y: e.clientY, t: now });

    // Keep last 500ms of positions
    while (mousePositions.length > 0 && now - mousePositions[0].t > 500) {
      mousePositions.shift();
    }

    if (mousePositions.length >= 6) {
      let directionChanges = 0;
      for (let i = 2; i < mousePositions.length; i++) {
        const dx1 = mousePositions[i - 1].x - mousePositions[i - 2].x;
        const dx2 = mousePositions[i].x - mousePositions[i - 1].x;
        if (dx1 * dx2 < 0 && Math.abs(dx1) > 5 && Math.abs(dx2) > 5) {
          directionChanges++;
        }
      }
      if (directionChanges >= 3) {
        shakeTriggered = true;
        container.classList.add('easter-egg-winter-aurora');
        setTimeout(() => {
          container.classList.remove('easter-egg-winter-aurora');
          shakeTriggered = false;
        }, 5000);
      }
    }
  });
}

/**
 * Create ripple SVG elements for 清明雨巷 easter egg
 */
function triggerQingmingRipple(container, clientX, clientY) {
  const svg = container.querySelector('.ink-background');
  if (!svg) return;

  const rect = svg.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 400;
  const y = ((clientY - rect.top) / rect.height) * 320;
  const ns = 'http://www.w3.org/2000/svg';

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const ripple = document.createElementNS(ns, 'ellipse');
      ripple.setAttribute('cx', String(x));
      ripple.setAttribute('cy', String(y));
      ripple.setAttribute('rx', '2');
      ripple.setAttribute('ry', '1');
      ripple.setAttribute('fill', 'none');
      ripple.setAttribute('stroke', '#8ca888');
      ripple.setAttribute('stroke-width', '0.5');
      ripple.setAttribute('opacity', '0.4');
      ripple.classList.add('easter-ripple');
      svg.appendChild(ripple);
      setTimeout(() => ripple.remove(), 2500);
    }, i * 400);
  }
}
