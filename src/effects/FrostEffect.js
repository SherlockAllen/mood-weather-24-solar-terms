/**
 * 霜花效果
 * @param {DocumentFragment} fragment
 * @param {string} variant - 'window' | 'heavyFrost'
 */
export function createFrostEffect(fragment, variant = 'window') {
  const configs = {
    window: { crystalCount: 8, overlayOpacity: 0.06 },
    heavyFrost: { crystalCount: 12, overlayOpacity: 0.1 },
  };
  const cfg = configs[variant] || configs.window;

  for (let i = 0; i < cfg.crystalCount; i++) {
    const cx = 30 + Math.random() * 340;
    const cy = 180 + Math.random() * 100;
    const r = 5 + Math.random() * 7;

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', 'frost-pattern');
    group.style.animationDelay = `${i * 0.6}s`;

    // 八角晶体
    for (let j = 0; j < 8; j++) {
      const angle = (j * 45 * Math.PI) / 180;
      const isCardinal = j % 2 === 0;
      const len = isCardinal ? r : r * 0.6;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(cx));
      line.setAttribute('y1', String(cy));
      line.setAttribute('x2', String(cx + Math.cos(angle) * len));
      line.setAttribute('y2', String(cy + Math.sin(angle) * len));
      line.setAttribute('stroke', '#b0b8c8');
      line.setAttribute('stroke-width', isCardinal ? '0.6' : '0.4');
      line.setAttribute('opacity', isCardinal ? '0.35' : '0.2');
      group.appendChild(line);
    }

    // 内部菱形
    const d = r * 0.35;
    const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    diamond.setAttribute(
      'd',
      `M${cx},${cy - d} L${cx + d},${cy} L${cx},${cy + d} L${cx - d},${cy} Z`
    );
    diamond.setAttribute('stroke', '#a8b0c0');
    diamond.setAttribute('stroke-width', '0.35');
    diamond.setAttribute('fill', 'none');
    diamond.setAttribute('opacity', '0.25');
    group.appendChild(diamond);

    fragment.appendChild(group);
  }

  // 窗上霜雾
  const frostOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  frostOverlay.setAttribute('class', 'frost-overlay');
  const corners = [
    { x: 0, y: 0, w: 80, h: 80 },
    { x: 320, y: 0, w: 80, h: 80 },
    { x: 0, y: 240, w: 60, h: 80 },
    { x: 340, y: 240, w: 60, h: 80 },
  ];
  corners.forEach((c, i) => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', String(c.x));
    rect.setAttribute('y', String(c.y));
    rect.setAttribute('width', String(c.w));
    rect.setAttribute('height', String(c.h));
    rect.setAttribute('fill', '#c8d0e0');
    rect.setAttribute('opacity', String(cfg.overlayOpacity));
    rect.setAttribute('filter', 'url(#softMist)');
    rect.style.animationDelay = `${i * 1.5}s`;
    frostOverlay.appendChild(rect);
  });
  fragment.appendChild(frostOverlay);
}
