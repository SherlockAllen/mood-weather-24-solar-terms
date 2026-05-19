/**
 * 雪花效果
 * @param {DocumentFragment} fragment
 * @param {string} variant - 'flurry' | 'snowfall' | 'blizzard'
 */
export function createSnowEffect(fragment, variant = 'snowfall') {
  const configs = {
    flurry: { count: 10, opacity: 0.6, speedBase: 4 },
    snowfall: { count: 16, opacity: 0.7, speedBase: 3.5 },
    blizzard: { count: 24, opacity: 0.8, speedBase: 2.5 },
    moonlight: { count: 20, opacity: 0.85, speedBase: 4.5, glisten: true },
  };
  const cfg = configs[variant] || configs.snowfall;

  for (let i = 0; i < cfg.count; i++) {
    const cx = 10 + Math.random() * 380;
    const size = 1.2 + Math.random() * 2.5;
    const type = ['circle', 'hex', 'star'][Math.floor(Math.random() * 3)];
    const drift = 15 + Math.random() * 35;
    const _speed = cfg.speedBase + Math.random() * 2;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', cfg.glisten ? 'snow-flake snow-glisten' : 'snow-flake');
    g.style.animationDelay = `${i * 0.3}s`;
    g.style.setProperty('--drift', `${drift}px`);

    if (type === 'circle') {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(cx));
      circle.setAttribute('cy', '0');
      circle.setAttribute('r', String(size));
      circle.setAttribute('fill', '#a0a0a0');
      circle.setAttribute('opacity', String(cfg.opacity));
      g.appendChild(circle);
    } else if (type === 'hex') {
      let d = '';
      for (let j = 0; j < 6; j++) {
        const angle = ((j * 60 - 30) * Math.PI) / 180;
        const px = cx + Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        d += (j === 0 ? 'M' : 'L') + `${px},${py} `;
      }
      d += 'Z';
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', '#a8a8a8');
      path.setAttribute('opacity', String(cfg.opacity * 0.85));
      g.appendChild(path);
    } else {
      for (let j = 0; j < 6; j++) {
        const angle = (j * 60 * Math.PI) / 180;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', String(cx));
        line.setAttribute('y1', '0');
        line.setAttribute('x2', String(cx + Math.cos(angle) * size));
        line.setAttribute('y2', String(Math.sin(angle) * size));
        line.setAttribute('stroke', '#a0a0a0');
        line.setAttribute('stroke-width', '0.6');
        line.setAttribute('opacity', String(cfg.opacity * 0.75));
        g.appendChild(line);
      }
    }

    fragment.appendChild(g);
  }

  // 积雪
  const groundSnow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  groundSnow.setAttribute('d', 'M0,315 Q100,308 200,312 T400,310 L400,320 L0,320 Z');
  groundSnow.setAttribute('fill', '#d0d0cc');
  groundSnow.setAttribute('opacity', '0.25');
  groundSnow.setAttribute('class', 'snow-ground');
  fragment.appendChild(groundSnow);
}
