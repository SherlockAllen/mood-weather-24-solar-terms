/**
 * 草/麦浪效果
 * @param {DocumentFragment} fragment
 * @param {string} variant - 'grass' | 'wheatField'
 */
export function createGrassEffect(fragment, variant = 'grass') {
  if (variant === 'wheatField') {
    // 麦田：更高、金黄、更密
    for (let i = 0; i < 18; i++) {
      const x = 15 + (i / 18) * 370 + (Math.random() - 0.5) * 10;
      const h = 35 + Math.random() * 20;
      const r = (Math.random() - 0.5) * 5;
      const tipX = x + r * 2;
      const tipY = 320 - h;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x},320 Q${x + r},${320 - h / 2} ${tipX},${tipY}`);
      path.setAttribute('stroke', '#b8a840');
      path.setAttribute('stroke-width', '1.1');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', '0.4');
      path.setAttribute('class', 'grass-stem');
      path.style.animationDelay = `${i * 0.2}s`;
      fragment.appendChild(path);

      // 麦穗
      if (i % 2 === 0) {
        const grain = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        grain.setAttribute('cx', String(tipX));
        grain.setAttribute('cy', String(tipY));
        grain.setAttribute('rx', '3');
        grain.setAttribute('ry', '7');
        grain.setAttribute('fill', '#c8b850');
        grain.setAttribute('opacity', '0.35');
        grain.setAttribute('class', 'grass-grain');
        grain.style.animationDelay = `${i * 0.2 + 0.15}s`;
        fragment.appendChild(grain);
      }
    }
  } else {
    // 标准草
    for (let i = 0; i < 12; i++) {
      const x = 20 + (i / 12) * 360 + (Math.random() - 0.5) * 15;
      const h = 22 + Math.random() * 20;
      const r = (Math.random() - 0.5) * 4;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x},320 Q${x + r},${320 - h / 2} ${x + r * 1.5},${320 - h}`);
      path.setAttribute('stroke', '#4a6a3a');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', '0.3');
      path.setAttribute('class', 'grass-stem');
      path.style.animationDelay = `${i * 0.25}s`;
      fragment.appendChild(path);
    }
  }
}
