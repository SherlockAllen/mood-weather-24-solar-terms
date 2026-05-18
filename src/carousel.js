import { solarTerms } from './data.js';

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

    this.slidesContainer = this.container.querySelector('.slides-container');
    this.dotsContainer = this.container.querySelector('.dots-container');

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
        <p class="term-poem">${term.poem}</p>
        <p class="term-subtitle">${term.subtitle}</p>
      </div>
      <div class="desc-card">
        <p>${term.description}</p>
      </div>
    `;

    // Replace current slide
    this.slidesContainer.innerHTML = '';
    this.slidesContainer.appendChild(slide);
  }

  _renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = this.terms.map((term, i) => `
      <button
        class="dot ${i === this.currentIndex ? 'active' : ''}"
        data-index="${i}"
        role="tab"
        aria-selected="${i === this.currentIndex}"
        aria-label="${term.name}"
        tabindex="${i === this.currentIndex ? '0' : '-1'}"
      ></button>
    `).join('');
  }

  goTo(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    if (index < 0 || index >= this.terms.length) return;

    this.isAnimating = true;
    const direction = index > this.currentIndex ? 1 : -1;

    // Remove first-load class after initial render
    this.container.classList.remove('first-load');

    // Animate out current
    const currentSlide = this.slidesContainer.querySelector('.slide.active');
    if (currentSlide) {
      currentSlide.classList.add('slide-exit');
      currentSlide.classList.remove('active');
    }

    // Update index
    this.currentIndex = index;

    // Create and animate in new slide
    const term = this.terms[index];
    const newSlide = document.createElement('div');
    newSlide.className = 'slide slide-enter';
    newSlide.setAttribute('role', 'group');
    newSlide.setAttribute('aria-roledescription', 'slide');
    newSlide.setAttribute('aria-label', `${term.name} — ${term.poem}`);
    newSlide.innerHTML = `
      <div class="slide-content">
        <h2 class="term-name">${term.name}</h2>
        <p class="term-poem">${term.poem}</p>
        <p class="term-subtitle">${term.subtitle}</p>
      </div>
      <div class="desc-card">
        <p>${term.description}</p>
      </div>
    `;

    this.slidesContainer.appendChild(newSlide);

    // Update dots
    this._renderDots();

    // Notify
    this.onChange(this.currentTerm, this.currentIndex);

    // Cleanup after transition
    setTimeout(() => {
      if (currentSlide && currentSlide.parentNode) {
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
}
