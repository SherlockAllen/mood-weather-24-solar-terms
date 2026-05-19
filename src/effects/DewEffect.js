/**
 * 露珠效果
 * @param {DocumentFragment} fragment
 * @param {string} variant - 'morningDew' | 'eveningDew'
 */
export function createDewEffect(fragment, variant = 'morningDew') {
  const configs = {
    morningDew: { count: 10, opacity: 0.6, color: '#6a8a9a', glistenColor: '#ffffff' },
    eveningDew: { count: 8, opacity: 0.5, color: '#5a7a8a', glistenColor: '#e8e0d0' },
  };
  const cfg = configs[variant] || configs.morningDew;

  for (let i = 0; i < cfg.count; i++) {
    const cx = 35 + (i / cfg.count) * 330 + Math.random() * 20;
    const cy = 250 + Math.random() * 30;
    const r = 1.5 + Math.random() * 2;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'dew-drop-group');
    g.style.animationDelay = `${i * 0.5}s`;

    // 露珠主体
    const drop = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    drop.setAttribute(
      'd',
      `M${cx},${cy - r * 1.4} ` +
        `C${cx + r},${cy - r * 0.3} ${cx + r},${cy + r * 0.8} ${cx},${cy + r} ` +
        `C${cx - r},${cy + r * 0.8} ${cx - r},${cy - r * 0.3} ${cx},${cy - r * 1.4}Z`
    );
    drop.setAttribute('fill', cfg.color);
    drop.setAttribute('opacity', String(cfg.opacity));
    g.appendChild(drop);

    // 反光点
    const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    highlight.setAttribute('cx', String(cx - r * 0.3));
    highlight.setAttribute('cy', String(cy - r * 0.2));
    highlight.setAttribute('rx', String(r * 0.35));
    highlight.setAttribute('ry', String(r * 0.25));
    highlight.setAttribute('fill', cfg.glistenColor);
    highlight.setAttribute('opacity', '0.4');
    highlight.setAttribute('class', 'dew-glisten');
    highlight.style.animationDelay = `${i * 0.5 + 0.2}s`;
    g.appendChild(highlight);

    fragment.appendChild(g);
  }
}
