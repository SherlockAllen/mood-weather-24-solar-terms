import { solarTerms } from './data.js';
import { termVisuals } from './visuals.js';
import { renderDecoration } from './decorations.js';
import * as effects from './effects/index.js';

export class Carousel {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Carousel container #${containerId} not found`);
    }

    this.terms = solarTerms;
    this.currentIndex = 0;
    this.isAnimating = false;
    this.transitionDuration = options.transitionDuration || 350;
    this.onChange = options.onChange || (() => {});

    // P2: Rapid switch tracking for 夏至日食 easter egg
    this._switchHistory = [];
    this._eclipseActive = false;

    this.slidesContainer = this.container.querySelector('.slides-container');
    this.dotsContainer = this.container.querySelector('.dots-container');

    // SVG element refs for theme updates
    this.svg = this.container.querySelector('.ink-background');
    this.mountainBack = this.svg?.querySelector('#mountain-back');
    this.mountainFront = this.svg?.querySelector('#mountain-front');
    this.inkBlur1 = this.svg?.querySelector('#ink-blur-1');
    this.inkBlur2 = this.svg?.querySelector('#ink-blur-2');
    this.mistFlow = this.svg?.querySelector('#mist-flow');
    this.seasonalEffects = this.svg?.querySelector('#seasonal-effects');
    this.skyLayer = this.svg?.querySelector('#sky-layer');

    this._renderInitial();
  }

  /** @returns {SolarTerm} */
  get currentTerm() {
    return this.terms[this.currentIndex];
  }

  _renderInitial() {
    this._renderSlide(this.currentIndex);
    this._renderDots();
    this.container.classList.add('first-load');
    this._applyTheme(this.terms[0]);
  }

  _renderSlide(index) {
    const term = this.terms[index];
    const slide = document.createElement('div');
    slide.className = 'slide active';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${term.name} — ${term.poem}`);
    slide.innerHTML = `
      <div class="slide-content">
        <h2 class="term-name">${term.name}</h2>
        <p class="term-name-en">${term.nameEn}</p>
        <p class="term-poem">${term.poem}</p>
        <p class="term-subtitle">${term.subtitle}</p>
      </div>
      <div class="desc-card">
        <p>${term.description}</p>
      </div>
    `;

    this.slidesContainer.innerHTML = '';
    this.slidesContainer.appendChild(slide);
  }

  _renderDots() {
    if (!this.dotsContainer) return;
    const existing = this.dotsContainer.querySelectorAll('.dot');
    if (existing.length === this.terms.length) {
      existing.forEach((dot, i) => {
        const isActive = i === this.currentIndex;
        dot.className = `dot ${isActive ? 'active' : ''}`;
        dot.setAttribute('aria-selected', String(isActive));
        dot.setAttribute('tabindex', isActive ? '0' : '-1');
      });
      return;
    }
    this.dotsContainer.innerHTML = this.terms
      .map(
        (term, i) => `
      <button
        class="dot ${i === this.currentIndex ? 'active' : ''}"
        data-index="${i}"
        role="tab"
        aria-selected="${i === this.currentIndex}"
        aria-label="${term.name}"
        tabindex="${i === this.currentIndex ? '0' : '-1'}"
      ></button>
    `
      )
      .join('');

    // Scroll active dot into view (TASK-015)
    const activeDot = this.dotsContainer.querySelector('.dot.active');
    if (activeDot && activeDot.scrollIntoView) {
      activeDot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  /**
   * Apply season theme colors, unique mountains, decorations, and effects
   * @param {SolarTerm} term
   */
  _applyTheme(term) {
    const theme = term.theme;
    const effect = term.effect;
    const visual = termVisuals[term.id];

    // Update body background for smooth transition
    document.body.className = `season-${term.season}`;

    // Update carousel container effect class (preserve transition classes)
    const preserve = Array.from(this.container.classList).filter((c) =>
      c.startsWith('transition-')
    );
    this.container.className = `carousel season-${term.season} effect-${effect}`;
    preserve.forEach((c) => this.container.classList.add(c));
    if (this.currentIndex === 0) {
      this.container.classList.add('first-load');
    }

    // P0: Special solar term shock moments
    this.container.classList.remove('solstice-summer', 'solstice-winter', 'qingming');
    if (term.id === 10) {
      this.container.classList.add('solstice-summer');
    } else if (term.id === 22) {
      this.container.classList.add('solstice-winter');
    } else if (term.id === 5) {
      this.container.classList.add('qingming');
    }

    // Update SVG colors
    if (this.mountainBack) this.mountainBack.setAttribute('fill', theme.mountain);
    if (this.mountainFront) this.mountainFront.setAttribute('fill', theme.mist);
    if (this.inkBlur1) this.inkBlur1.setAttribute('fill', theme.ink);
    if (this.inkBlur2) this.inkBlur2.setAttribute('fill', theme.ink);
    if (this.mistFlow) this.mistFlow.setAttribute('fill', theme.paper);

    // Update unique mountain paths per term
    if (visual?.mountains) {
      if (this.mountainBack) this.mountainBack.setAttribute('d', visual.mountains.back);
      if (this.mountainFront) this.mountainFront.setAttribute('d', visual.mountains.front);
    }

    // Queue decorations for render in _renderSeasonalEffects
    this._decorationQueue = visual?.decorations || [];

    // Inject or update seasonal effects with variant
    this._renderSeasonalEffects(effect, visual?.effectVariant);

    // P1: Render dynamic sky layer
    this._renderSkyLayer(term.season, term.id);
  }

  /**
   * Render seasonal effect SVG elements with variant support
   * @param {string} effect
   * @param {string} variant
   */
  _renderSeasonalEffects(effect, variant) {
    if (!this.seasonalEffects) return;

    while (this.seasonalEffects.firstChild) {
      this.seasonalEffects.removeChild(this.seasonalEffects.firstChild);
    }
    const fragment = document.createDocumentFragment();

    // Render decorations first (behind weather effects)
    if (this._decorationQueue?.length) {
      this._decorationQueue.forEach((item) => renderDecoration(item, fragment));
      this._decorationQueue = null;
    }

    // Effect mapping
    const effectMap = {
      rain: (frag, variant) => effects.rain(frag, variant || 'shower'),
      mist: (frag, variant) => effects.mist(frag, variant || 'morning'),
      sway: (frag, variant) => effects.grass(frag, variant || 'grass'),
      dew: (frag, variant) => effects.dew(frag, variant || 'morningDew'),
      snow: (frag, variant) => effects.snow(frag, variant || 'snowfall'),
      frost: (frag, variant) => effects.frost(frag, variant || 'window'),
    };

    if (effect !== 'none' && effectMap[effect]) {
      effectMap[effect](fragment, variant);
    }

    this.seasonalEffects.appendChild(fragment);
  }

  /**
   * P1: Render dynamic sky layer (clouds, stars, aurora)
   * @param {string} season
   * @param {number} termId
   */
  _renderSkyLayer(season, termId) {
    if (!this.skyLayer) return;
    while (this.skyLayer.firstChild) {
      this.skyLayer.removeChild(this.skyLayer.firstChild);
    }
    const fragment = document.createDocumentFragment();
    const ns = 'http://www.w3.org/2000/svg';

    function el(tag, attrs) {
      const e = document.createElementNS(ns, tag);
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
      return e;
    }

    if (season === 'spring') {
      // 白云朵朵，缓慢飘动
      const clouds = [
        { cx: 60, cy: 45, rx: 50, ry: 18, delay: '0s', dur: '28s' },
        { cx: 280, cy: 35, rx: 40, ry: 14, delay: '-8s', dur: '22s' },
        { cx: 380, cy: 55, rx: 35, ry: 12, delay: '-15s', dur: '30s' },
      ];
      clouds.forEach((c) => {
        const cloud = el('ellipse', {
          cx: String(c.cx),
          cy: String(c.cy),
          rx: String(c.rx),
          ry: String(c.ry),
          fill: '#f0ece0',
          opacity: '0.35',
          filter: 'url(#softMist)',
          class: 'sky-cloud',
        });
        cloud.style.animationDelay = c.delay;
        cloud.style.animationDuration = c.dur;
        fragment.appendChild(cloud);
      });
    } else if (season === 'summer') {
      // 夏季薄云，较高较快
      const clouds = [
        { cx: 100, cy: 30, rx: 45, ry: 12, delay: '0s', dur: '20s' },
        { cx: 320, cy: 40, rx: 38, ry: 10, delay: '-6s', dur: '24s' },
      ];
      clouds.forEach((c) => {
        const cloud = el('ellipse', {
          cx: String(c.cx),
          cy: String(c.cy),
          rx: String(c.rx),
          ry: String(c.ry),
          fill: '#e8e4d8',
          opacity: '0.25',
          filter: 'url(#softMist)',
          class: 'sky-cloud-thin',
        });
        cloud.style.animationDelay = c.delay;
        cloud.style.animationDuration = c.dur;
        fragment.appendChild(cloud);
      });
    } else if (season === 'autumn') {
      // 秋季淡淡高云 + 初星
      const cloud = el('ellipse', {
        cx: '200',
        cy: '40',
        rx: '80',
        ry: '16',
        fill: '#e4ddd0',
        opacity: '0.15',
        filter: 'url(#heavyMist)',
        class: 'sky-cloud-faint',
      });
      fragment.appendChild(cloud);
      // 几颗早星
      const stars = [
        { cx: 50, cy: 25, r: 0.8 },
        { cx: 120, cy: 18, r: 1 },
        { cx: 280, cy: 22, r: 0.7 },
        { cx: 350, cy: 30, r: 0.9 },
        { cx: 180, cy: 15, r: 0.6 },
      ];
      stars.forEach((s, i) => {
        const star = el('circle', {
          cx: String(s.cx),
          cy: String(s.cy),
          r: String(s.r),
          fill: '#d8d0c0',
          opacity: '0.5',
          class: 'sky-star',
        });
        star.style.animationDelay = `${i * 0.6}s`;
        fragment.appendChild(star);
      });
    } else if (season === 'winter') {
      // 冬季星空
      const stars = [
        { cx: 30, cy: 20, r: 0.8 },
        { cx: 70, cy: 35, r: 0.6 },
        { cx: 110, cy: 15, r: 1 },
        { cx: 150, cy: 40, r: 0.7 },
        { cx: 190, cy: 22, r: 0.9 },
        { cx: 230, cy: 12, r: 0.6 },
        { cx: 270, cy: 38, r: 0.8 },
        { cx: 310, cy: 18, r: 1.1 },
        { cx: 350, cy: 32, r: 0.7 },
        { cx: 380, cy: 14, r: 0.9 },
        { cx: 55, cy: 50, r: 0.5 },
        { cx: 165, cy: 8, r: 0.6 },
        { cx: 295, cy: 48, r: 0.5 },
        { cx: 365, cy: 26, r: 0.7 },
      ];
      stars.forEach((s, i) => {
        const star = el('circle', {
          cx: String(s.cx),
          cy: String(s.cy),
          r: String(s.r),
          fill: '#e0e0e8',
          opacity: '0.6',
          class: 'sky-star',
        });
        star.style.animationDelay = `${i * 0.4}s`;
        fragment.appendChild(star);
      });
      // 冬至极光
      if (termId === 22) {
        const aurora = el('path', {
          d: 'M0,60 Q80,20 160,55 T320,35 T400,50 L400,0 L0,0 Z',
          fill: '#a8c8a0',
          opacity: '0',
          filter: 'url(#heavyMist)',
          class: 'sky-aurora',
        });
        fragment.appendChild(aurora);
      }
    }

    this.skyLayer.appendChild(fragment);
  }

  goTo(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    if (index < 0 || index >= this.terms.length) return;

    this.isAnimating = true;
    this.container.classList.remove('first-load');

    // Animate out current
    const currentSlide = this.slidesContainer.querySelector('.slide.active');
    if (currentSlide) {
      currentSlide.classList.add('slide-exit');
      currentSlide.classList.remove('active');
    }

    // P1: Detect season transition
    const prevTerm = this.terms[this.currentIndex];
    const term = this.terms[index];
    if (prevTerm.season !== term.season) {
      this.container.classList.remove(
        'transition-winter-spring',
        'transition-spring-summer',
        'transition-summer-autumn',
        'transition-autumn-winter'
      );
      this.container.classList.add(`transition-${prevTerm.season}-${term.season}`);
      setTimeout(() => {
        this.container.classList.remove(`transition-${prevTerm.season}-${term.season}`);
      }, 2500);
    }

    // P2: Rapid switch detection for 夏至日食
    const now = Date.now();
    this._switchHistory.push(now);
    this._switchHistory = this._switchHistory.filter((t) => now - t < 3000);
    if (this._switchHistory.length >= 3 && term.id === 10) {
      this._triggerEclipse();
    }

    // Update index and apply theme
    this.currentIndex = index;
    this._applyTheme(term);

    // Create and animate in new slide
    const newSlide = document.createElement('div');
    newSlide.className = 'slide slide-enter';
    newSlide.setAttribute('role', 'group');
    newSlide.setAttribute('aria-roledescription', 'slide');
    newSlide.setAttribute('aria-label', `${term.name} — ${term.poem}`);
    newSlide.innerHTML = `
      <div class="slide-content">
        <h2 class="term-name">${term.name}</h2>
        <p class="term-name-en">${term.nameEn}</p>
        <p class="term-poem">${term.poem}</p>
        <p class="term-subtitle">${term.subtitle}</p>
      </div>
      <div class="desc-card">
        <p>${term.description}</p>
      </div>
    `;

    this.slidesContainer.appendChild(newSlide);
    this._renderDots();
    this.onChange(this.currentTerm, this.currentIndex);

    // Cleanup after transition
    setTimeout(() => {
      if (currentSlide?.parentNode) {
        currentSlide.parentNode.removeChild(currentSlide);
      }
      newSlide.classList.remove('slide-enter');
      newSlide.classList.add('active');
      this.isAnimating = false;
    }, this.transitionDuration);
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.terms.length;
    this.goTo(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.terms.length) % this.terms.length;
    this.goTo(prevIndex);
  }

  reset() {
    this.goTo(0);
  }

  /**
   * P2: Trigger 夏至日食 easter egg — solar eclipse animation
   */
  _triggerEclipse() {
    if (this._eclipseActive) return;
    this._eclipseActive = true;

    const svg = this.container.querySelector('.ink-background');
    if (svg) {
      const ns = 'http://www.w3.org/2000/svg';
      const mask = document.createElementNS(ns, 'circle');
      mask.setAttribute('cx', '340');
      mask.setAttribute('cy', '55');
      mask.setAttribute('r', '22');
      mask.setAttribute('fill', '#1a1a2e');
      mask.setAttribute('opacity', '0');
      mask.classList.add('eclipse-mask');
      svg.appendChild(mask);
      setTimeout(() => {
        mask.remove();
        this._eclipseActive = false;
      }, 4000);
    }
  }
}
