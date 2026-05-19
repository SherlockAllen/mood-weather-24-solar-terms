/**
 * 雾效
 * @param {DocumentFragment} fragment
 * @param {string} variant - 'morning' | 'thunder'
 */
export function createMistEffect(fragment, variant = 'morning') {
  const configs = {
    morning: {
      clouds: [
        {
          d: 'M20,260 Q60,235 100,250 T180,242 T260,252 T340,245 T400,260 L400,320 L0,320 Z',
          fill: '#c4c0b0',
          blur: 'softMist',
        },
        {
          d: 'M0,270 Q80,250 160,262 T280,252 T400,268 L400,320 L0,320 Z',
          fill: '#b8b4a0',
          blur: 'heavyMist',
        },
      ],
      lightning: false,
    },
    thunder: {
      clouds: [
        {
          d: 'M0,250 Q70,220 140,240 T280,225 T400,245 L400,320 L0,320 Z',
          fill: '#a8a498',
          blur: 'heavyMist',
        },
        {
          d: 'M30,265 Q100,245 170,258 T310,248 T400,265 L400,320 L0,320 Z',
          fill: '#b0aca0',
          blur: 'softMist',
        },
        {
          d: 'M50,275 Q120,260 190,272 T330,262 T400,278 L400,320 L0,320 Z',
          fill: '#9c9890',
          blur: 'heavyMist',
        },
      ],
      lightning: true,
    },
  };
  const cfg = configs[variant] || configs.morning;

  cfg.clouds.forEach((c, i) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', c.d);
    path.setAttribute('fill', c.fill);
    path.setAttribute('filter', `url(#${c.blur})`);
    path.setAttribute('class', 'mist-cloud');
    path.style.animationDelay = `${i * 1.5}s`;
    fragment.appendChild(path);
  });

  if (cfg.lightning) {
    const bolts = [
      { x1: 100, y1: 70, x2: 120, y2: 120, x3: 110, y3: 170 },
      { x1: 260, y1: 55, x2: 280, y2: 110, x3: 270, y3: 160 },
    ];
    bolts.forEach((b, i) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${b.x1},${b.y1} L${b.x2},${b.y2} L${b.x3},${b.y3}`);
      path.setAttribute('stroke', '#908878');
      path.setAttribute('stroke-width', '0.7');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0');
      path.setAttribute('class', 'mist-lightning');
      path.style.animationDelay = `${2 + i * 3}s`;
      fragment.appendChild(path);
    });
  }
}
