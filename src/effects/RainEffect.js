/**
 * 雨效
 * @param {DocumentFragment} fragment
 * @param {string} variant - 'drizzle' | 'shower' | 'downpour' | 'storm'
 */
export function createRainEffect(fragment, variant = 'shower') {
  const configs = {
    drizzle: {
      count: 12,
      opacity: 0.35,
      color: '#6a7a7a',
      speedBase: 1.4,
      lenBase: 18,
      angleBase: -2,
    },
    shower: {
      count: 16,
      opacity: 0.45,
      color: '#5a6a6a',
      speedBase: 1.1,
      lenBase: 25,
      angleBase: -3,
    },
    downpour: {
      count: 22,
      opacity: 0.5,
      color: '#4a5a5a',
      speedBase: 0.85,
      lenBase: 32,
      angleBase: -4,
    },
    storm: {
      count: 20,
      opacity: 0.55,
      color: '#3a4a4a',
      speedBase: 0.75,
      lenBase: 35,
      angleBase: -5,
    },
    qingming: {
      count: 28,
      opacity: 0.3,
      color: '#7a8a8a',
      speedBase: 1.6,
      lenBase: 14,
      angleBase: -1,
    },
  };
  const cfg = configs[variant] || configs.shower;

  for (let i = 0; i < cfg.count; i++) {
    const x = 10 + (i / cfg.count) * 380 + (Math.random() - 0.5) * 20;
    const len = cfg.lenBase + Math.random() * 10;
    const angle = cfg.angleBase + (Math.random() - 0.5) * 3;
    const speed = cfg.speedBase + (Math.random() - 0.5) * 0.4;
    const width = 0.5 + Math.random() * 0.7;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(x));
    line.setAttribute('y1', '0');
    line.setAttribute('x2', String(x + angle));
    line.setAttribute('y2', String(len));
    line.setAttribute('stroke', cfg.color);
    line.setAttribute('stroke-width', String(width));
    line.setAttribute('opacity', String(cfg.opacity));
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('class', 'rain-drop');
    line.style.animationDelay = `${i * 0.1}s`;
    line.style.animationDuration = `${speed}s`;
    fragment.appendChild(line);
  }

  // 水波涟漪
  if (variant !== 'drizzle') {
    const rippleCount = variant === 'downpour' || variant === 'storm' ? 6 : 4;
    for (let i = 0; i < rippleCount; i++) {
      const cx = 40 + (i / rippleCount) * 320 + Math.random() * 30;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(cx));
      circle.setAttribute('cy', String(298 + Math.random() * 10));
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', cfg.color);
      circle.setAttribute('stroke-width', '0.4');
      circle.setAttribute('opacity', String(cfg.opacity * 0.6));
      circle.setAttribute('class', 'rain-ripple');
      circle.style.animationDelay = `${i * 0.6 + Math.random() * 0.5}s`;
      fragment.appendChild(circle);
    }
  }
}
