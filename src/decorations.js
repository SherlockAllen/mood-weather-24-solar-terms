/**
 * 情绪天气 — 节气专属装饰元素渲染
 * Mood Weather — Solar Term Exclusive Decorative Element Rendering
 * 每个装饰类型对应一种独特的SVG绘制逻辑
 * Each decoration type corresponds to a unique SVG drawing logic
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs = {}) {
  const e = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

// ========== 春 / Spring ==========

export function createWillow({ x, length, curve }, fragment) {
  const group = el('g', { class: 'deco-wind' });
  const path = el('path', {
    d: `M${x},0 Q${x + curve},${length / 2} ${x + curve * 0.6},${length}`,
    stroke: '#5a7a4a',
    'stroke-width': '0.9',
    fill: 'none',
    opacity: '0.35',
  });
  group.appendChild(path);
  // 嫩芽 / New buds
  for (let i = 0; i < 4; i++) {
    const ly = 15 + i * (length / 5);
    const lx = x + curve * (ly / length);
    const bud = el('ellipse', {
      cx: String(lx + (i % 2 === 0 ? 3 : -3)),
      cy: String(ly),
      rx: '2.5',
      ry: '1.2',
      fill: '#7a9a5a',
      opacity: '0.25',
      class: 'deco-bloom',
    });
    bud.style.animationDelay = `${i * 0.3}s`;
    group.appendChild(bud);
  }
  fragment.appendChild(group);
}

export function createMistCloud({ x, y, scale }, fragment) {
  const cloud = el('ellipse', {
    cx: String(x + 30 * scale),
    cy: String(y),
    rx: String(40 * scale),
    ry: String(18 * scale),
    fill: '#c8c4b4',
    opacity: '0.25',
    filter: 'url(#softMist)',
    class: 'deco-float',
  });
  fragment.appendChild(cloud);
}

export function createWorm({ x, y }, fragment) {
  const g = el('g', { class: 'deco-bloom' });
  g.appendChild(
    el('ellipse', {
      cx: String(x),
      cy: String(y),
      rx: '3',
      ry: '1.5',
      fill: '#8a7a5a',
      opacity: '0.4',
    })
  );
  g.appendChild(
    el('ellipse', {
      cx: String(x + 4),
      cy: String(y - 1),
      rx: '2.5',
      ry: '1.2',
      fill: '#8a7a5a',
      opacity: '0.4',
    })
  );
  fragment.appendChild(g);
}

export function createSprout({ x, y }, fragment) {
  const g = el('g', { class: 'deco-bloom' });
  g.appendChild(
    el('path', {
      d: `M${x},${y} Q${x + 3},${y - 8} ${x},${y - 14} Q${x - 3},${y - 8} ${x},${y}`,
      fill: '#6a9a4a',
      opacity: '0.35',
    })
  );
  g.appendChild(
    el('ellipse', {
      cx: String(x),
      cy: String(y - 14),
      rx: '2',
      ry: '3',
      fill: '#7aaa5a',
      opacity: '0.3',
    })
  );
  fragment.appendChild(g);
}

export function createSwallow({ x, y, direction }, fragment) {
  const g = el('g', { class: 'deco-swallow-fly' });
  const dir = direction === 'left' ? -1 : 1;
  // 身体
  g.appendChild(
    el('ellipse', {
      cx: String(x),
      cy: String(y),
      rx: '6',
      ry: '2',
      fill: '#3a3a3a',
      opacity: '0.5',
    })
  );
  // 翅膀（上）
  const wingY1 = y - 5;
  const wingY2 = y + 5;
  const wing1 = el('path', {
    d: `M${x},${y} Q${x + dir * 12},${wingY1} ${x + dir * 18},${y}`,
    stroke: '#4a4a4a',
    'stroke-width': '0.8',
    fill: 'none',
    opacity: '0.4',
    class: 'swallow-wing-top',
  });
  wing1.style.transformOrigin = `${x}px ${y}px`;
  g.appendChild(wing1);
  // 翅膀（下）
  const wing2 = el('path', {
    d: `M${x},${y} Q${x + dir * 12},${wingY2} ${x + dir * 18},${y}`,
    stroke: '#4a4a4a',
    'stroke-width': '0.8',
    fill: 'none',
    opacity: '0.4',
    class: 'swallow-wing-bottom',
  });
  wing2.style.transformOrigin = `${x}px ${y}px`;
  g.appendChild(wing2);
  // 尾羽
  g.appendChild(
    el('path', {
      d: `M${x - dir * 5},${y} L${x - dir * 12},${y - 3} M${x - dir * 5},${y} L${x - dir * 12},${y + 3}`,
      stroke: '#3a3a3a',
      'stroke-width': '0.6',
      opacity: '0.45',
    })
  );
  g.style.animationDelay = `${Math.random() * 2}s`;
  fragment.appendChild(g);
}

export function createKite({ x, y }, fragment) {
  const g = el('g', { class: 'deco-float' });
  // 菱形风筝
  g.appendChild(
    el('path', {
      d: `M${x},${y} L${x + 10},${y + 14} L${x},${y + 28} L${x - 10},${y + 14} Z`,
      fill: '#c85050',
      opacity: '0.35',
      stroke: '#a03030',
      'stroke-width': '0.5',
    })
  );
  // 飘带
  g.appendChild(
    el('path', {
      d: `M${x},${y + 28} Q${x - 5},${y + 40} ${x + 3},${y + 52}`,
      stroke: '#c85050',
      'stroke-width': '0.6',
      fill: 'none',
      opacity: '0.3',
    })
  );
  g.appendChild(
    el('path', {
      d: `M${x},${y + 28} Q${x + 6},${y + 42} ${x - 2},${y + 55}`,
      stroke: '#c85050',
      'stroke-width': '0.5',
      fill: 'none',
      opacity: '0.25',
    })
  );
  // 线
  g.appendChild(
    el('path', {
      d: `M${x},${y} Q${x + 30},${y - 20} ${x + 60},${y - 10}`,
      stroke: '#8a8a8a',
      'stroke-width': '0.3',
      fill: 'none',
      opacity: '0.3',
    })
  );
  fragment.appendChild(g);
}

export function createPeony({ x, y }, fragment) {
  const g = el('g', { class: 'deco-fall' });
  for (let i = 0; i < 5; i++) {
    const angle = ((i * 72 - 90) * Math.PI) / 180;
    const px = x + Math.cos(angle) * 5;
    const py = y + Math.sin(angle) * 5;
    g.appendChild(
      el('ellipse', {
        cx: String(px),
        cy: String(py),
        rx: '3',
        ry: '4',
        fill: '#c06070',
        opacity: '0.25',
      })
    );
  }
  g.appendChild(
    el('circle', { cx: String(x), cy: String(y), r: '2.5', fill: '#e0a050', opacity: '0.3' })
  );
  g.style.animationDelay = `${Math.random() * 3}s`;
  fragment.appendChild(g);
}

// ========== 夏 / Summer ==========

export function createFrog({ x, y }, fragment) {
  const g = el('g', { class: 'deco-bob' });
  // 身体 / Body
  g.appendChild(
    el('ellipse', {
      cx: String(x),
      cy: String(y),
      rx: '7',
      ry: '5',
      fill: '#4a7a4a',
      opacity: '0.4',
    })
  );
  // 眼 / Eyes
  g.appendChild(
    el('circle', { cx: String(x - 3), cy: String(y - 4), r: '2', fill: '#3a6a3a', opacity: '0.5' })
  );
  g.appendChild(
    el('circle', { cx: String(x + 3), cy: String(y - 4), r: '2', fill: '#3a6a3a', opacity: '0.5' })
  );
  // 腿 / Legs
  g.appendChild(
    el('path', {
      d: `M${x - 5},${y + 2} L${x - 10},${y + 6} M${x + 5},${y + 2} L${x + 10},${y + 6}`,
      stroke: '#4a7a4a',
      'stroke-width': '0.8',
      opacity: '0.35',
    })
  );
  fragment.appendChild(g);
}

export function createLilypad({ x, y }, fragment) {
  const pad = el('ellipse', {
    cx: String(x),
    cy: String(y),
    rx: '14',
    ry: '5',
    fill: '#4a7a4a',
    opacity: '0.2',
    class: 'deco-float',
  });
  fragment.appendChild(pad);
  // 缺口 / Notch
  fragment.appendChild(
    el('path', {
      d: `M${x + 10},${y} L${x + 14},${y - 2} L${x + 12},${y + 2} Z`,
      fill: '#f4f2e8',
      opacity: '1',
    })
  );
}

export function createWheat({ x }, fragment) {
  const g = el('g', { class: 'deco-sway' });
  const h = 30 + Math.random() * 15;
  const tipX = x + (Math.random() - 0.5) * 8;
  // 茎
  g.appendChild(
    el('path', {
      d: `M${x},320 Q${x + 2},${320 - h / 2} ${tipX},${320 - h}`,
      stroke: '#b8a840',
      'stroke-width': '1',
      fill: 'none',
      opacity: '0.4',
    })
  );
  // 芒刺 / Awns (barbs)
  for (let i = 0; i < 6; i++) {
    const my = 320 - h + i * 3;
    const mx = tipX + (my - (320 - h)) * 0.3;
    g.appendChild(
      el('line', {
        x1: String(mx),
        y1: String(my),
        x2: String(mx + 4),
        y2: String(my - 2),
        stroke: '#c8b850',
        'stroke-width': '0.4',
        opacity: '0.35',
      })
    );
  }
  g.style.animationDelay = `${Math.random() * 2}s`;
  fragment.appendChild(g);
}

export function createSun({ x, y, rays }, fragment) {
  const g = el('g', { class: 'deco-pulse' });
  // 光晕 / Glow
  g.appendChild(
    el('circle', {
      cx: String(x),
      cy: String(y),
      r: '22',
      fill: '#e8c860',
      opacity: '0.12',
      filter: 'url(#softMist)',
    })
  );
  // 本体 / Main body
  g.appendChild(
    el('circle', {
      cx: String(x),
      cy: String(y),
      r: '14',
      fill: '#d8b840',
      opacity: '0.25',
    })
  );
  // 光芒 / Sun rays
  for (let i = 0; i < rays; i++) {
    const angle = (((i * 360) / rays) * Math.PI) / 180;
    g.appendChild(
      el('line', {
        x1: String(x + Math.cos(angle) * 16),
        y1: String(y + Math.sin(angle) * 16),
        x2: String(x + Math.cos(angle) * 24),
        y2: String(y + Math.sin(angle) * 24),
        stroke: '#d8b840',
        'stroke-width': '0.5',
        opacity: '0.2',
      })
    );
  }
  fragment.appendChild(g);
}

export function createCicada({ x, y }, fragment) {
  const g = el('g', { class: 'deco-cicada-vibrate' });
  // 翅（右） / Right wing
  const wingR = el('path', {
    d: `M${x},${y} Q${x + 8},${y - 6} ${x + 12},${y} Q${x + 8},${y + 6} ${x},${y}`,
    fill: '#8a8a7a',
    opacity: '0.25',
    class: 'cicada-wing-right',
  });
  wingR.style.transformOrigin = `${x}px ${y}px`;
  g.appendChild(wingR);
  // 翅（左） / Left wing
  const wingL = el('path', {
    d: `M${x},${y} Q${x - 8},${y - 6} ${x - 12},${y} Q${x - 8},${y + 6} ${x},${y}`,
    fill: '#8a8a7a',
    opacity: '0.25',
    class: 'cicada-wing-left',
  });
  wingL.style.transformOrigin = `${x}px ${y}px`;
  g.appendChild(wingL);
  // 身 / Body
  g.appendChild(
    el('ellipse', {
      cx: String(x),
      cy: String(y),
      rx: '3',
      ry: '5',
      fill: '#5a5a4a',
      opacity: '0.35',
    })
  );
  fragment.appendChild(g);
}

export function createLotus({ x, y }, fragment) {
  const g = el('g', { class: 'deco-bloom' });
  for (let i = 0; i < 6; i++) {
    const angle = ((i * 60 - 90) * Math.PI) / 180;
    const px = x + Math.cos(angle) * 6;
    const py = y + Math.sin(angle) * 6;
    g.appendChild(
      el('ellipse', {
        cx: String(px),
        cy: String(py),
        rx: '3',
        ry: '6',
        fill: '#c87080',
        opacity: '0.25',
      })
    );
  }
  g.appendChild(
    el('circle', { cx: String(x), cy: String(y), r: '3', fill: '#e0c040', opacity: '0.3' })
  );
  fragment.appendChild(g);
}

export function createLotusLeaf({ x, y }, fragment) {
  const leaf = el('ellipse', {
    cx: String(x),
    cy: String(y),
    rx: '18',
    ry: '7',
    fill: '#4a7a4a',
    opacity: '0.15',
    class: 'deco-float',
  });
  fragment.appendChild(leaf);
}

export function createThunderBolt({ x, y }, fragment) {
  const bolt = el('path', {
    d: `M${x},${y} L${x + 6},${y + 18} L${x - 2},${y + 22} L${x + 8},${y + 45}`,
    stroke: '#a0a090',
    'stroke-width': '1.2',
    fill: 'none',
    opacity: '0',
    class: 'deco-flash',
  });
  bolt.style.animationDelay = `${Math.random() * 3}s`;
  fragment.appendChild(bolt);
}

// ========== 秋 / Autumn ==========

export function createFallingLeaf({ count, color }, fragment) {
  for (let i = 0; i < count; i++) {
    const lx = 30 + Math.random() * 340;
    const leaf = el('path', {
      d: `M${lx},${-10} Q${lx + 8},${15} ${lx},${30} Q${lx - 6},${15} ${lx},${-10}`,
      fill: color,
      opacity: '0.35',
      class: 'deco-fall',
    });
    leaf.style.animationDelay = `${i * 1.2 + Math.random()}s`;
    leaf.style.animationDuration = `${4 + Math.random() * 3}s`;
    fragment.appendChild(leaf);
  }
}

export function createBranch({ x, y, length }, fragment) {
  const g = el('g', { class: 'deco-sway' });
  g.appendChild(
    el('path', {
      d: `M${x + 20},${y} Q${x + 10},${y + length / 2} ${x + 30},${y + length}`,
      stroke: '#5a3a20',
      'stroke-width': '1.5',
      fill: 'none',
      opacity: '0.3',
    })
  );
  // 分叉 / Branch forks
  g.appendChild(
    el('path', {
      d: `M${x + 18},${y + length * 0.6} L${x - 5},${y + length * 0.8} M${x + 22},${y + length * 0.5} L${x + 45},${y + length * 0.7}`,
      stroke: '#5a3a20',
      'stroke-width': '0.8',
      fill: 'none',
      opacity: '0.25',
    })
  );
  fragment.appendChild(g);
}

export function createDryGrass({ x }, fragment) {
  const g = el('g', { class: 'deco-sway' });
  const h = 20 + Math.random() * 15;
  const tipX = x + (Math.random() - 0.5) * 6;
  g.appendChild(
    el('path', {
      d: `M${x},320 Q${x + 1},${320 - h / 2} ${tipX},${320 - h}`,
      stroke: '#a89860',
      'stroke-width': '0.9',
      fill: 'none',
      opacity: '0.35',
    })
  );
  g.style.animationDelay = `${Math.random() * 2}s`;
  fragment.appendChild(g);
}

export function createGoose({ x, y }, fragment) {
  const g = el('g', { class: 'deco-fly' });
  // 简笔大雁（人字形的鸟）/ Simple stroke wild goose (V-shaped bird)
  g.appendChild(
    el('path', {
      d: `M${x},${y} L${x - 8},${y - 5} M${x},${y} L${x + 8},${y - 5} M${x},${y} L${x},${y + 6}`,
      stroke: '#5a5a5a',
      'stroke-width': '0.7',
      fill: 'none',
      opacity: '0.35',
    })
  );
  g.style.animationDelay = `${Math.random() * 2}s`;
  fragment.appendChild(g);
}

export function createMoon({ x, y, phase }, fragment) {
  const g = el('g', { class: 'deco-pulse' });
  g.appendChild(
    el('circle', {
      cx: String(x),
      cy: String(y),
      r: '18',
      fill: '#e8e0c8',
      opacity: '0.12',
      filter: 'url(#softMist)',
    })
  );
  g.appendChild(
    el('circle', {
      cx: String(x),
      cy: String(y),
      r: '12',
      fill: '#f0e8d0',
      opacity: '0.2',
    })
  );
  if (phase === 'slim') {
    // 月牙遮罩效果 / Crescent moon mask effect
    g.appendChild(
      el('circle', {
        cx: String(x + 4),
        cy: String(y),
        r: '11',
        fill: '#ece4d0',
        opacity: '0.15',
      })
    );
  }
  fragment.appendChild(g);
}

export function createChrysanthemum({ x, y }, fragment) {
  const g = el('g', { class: 'deco-bloom' });
  for (let i = 0; i < 10; i++) {
    const angle = ((i * 36 - 90) * Math.PI) / 180;
    const px = x + Math.cos(angle) * 7;
    const py = y + Math.sin(angle) * 7;
    g.appendChild(
      el('ellipse', {
        cx: String(px),
        cy: String(py),
        rx: '2.5',
        ry: '6',
        fill: '#d8b840',
        opacity: '0.3',
      })
    );
  }
  g.appendChild(
    el('circle', { cx: String(x), cy: String(y), r: '3', fill: '#c8a830', opacity: '0.4' })
  );
  fragment.appendChild(g);
}

export function createPersimmon({ x, y }, fragment) {
  const g = el('g', { class: 'deco-hang' });
  // 果实 / Fruit
  g.appendChild(
    el('circle', { cx: String(x), cy: String(y), r: '6', fill: '#c85020', opacity: '0.4' })
  );
  // 蒂 / Stem (calyx)
  g.appendChild(
    el('path', {
      d: `M${x},${y - 6} L${x - 2},${y - 10} M${x},${y - 6} L${x + 2},${y - 10} M${x},${y - 6} L${x},${y - 11}`,
      stroke: '#5a3a20',
      'stroke-width': '0.6',
      opacity: '0.4',
    })
  );
  fragment.appendChild(g);
}

// ========== 冬 / Winter ==========

export function createIcicle({ x, length }, fragment) {
  const g = el('g', { class: 'deco-drip' });
  g.appendChild(
    el('path', {
      d: `M${x},0 L${x + 5},0 L${x + 3},${length} L${x + 2.5},${length + 3} L${x + 2},${length} Z`,
      fill: '#c8d0e0',
      opacity: '0.3',
    })
  );
  g.style.animationDelay = `${Math.random() * 3}s`;
  fragment.appendChild(g);
}

export function createPlum({ x, y }, fragment) {
  const g = el('g', { class: 'deco-bloom deco-plum-sway' });
  // 五瓣梅花 / Five-petal plum blossom
  for (let i = 0; i < 5; i++) {
    const angle = ((i * 72 - 90) * Math.PI) / 180;
    const px = x + Math.cos(angle) * 4;
    const py = y + Math.sin(angle) * 4;
    g.appendChild(
      el('ellipse', {
        cx: String(px),
        cy: String(py),
        rx: '2.5',
        ry: '3.5',
        fill: '#c87080',
        opacity: '0.35',
      })
    );
  }
  g.appendChild(
    el('circle', { cx: String(x), cy: String(y), r: '1.5', fill: '#e8d040', opacity: '0.4' })
  );
  fragment.appendChild(g);
}

export function createPlumBranch({ x, y, length }, fragment) {
  const g = el('g', { class: 'deco-sway' });
  g.appendChild(
    el('path', {
      d: `M${x + 15},${y} Q${x + 5},${y + length / 2} ${x + 25},${y + length} Q${x + 35},${y + length * 0.7} ${x + 40},${y + length * 0.4}`,
      stroke: '#4a3020',
      'stroke-width': '1.2',
      fill: 'none',
      opacity: '0.3',
    })
  );
  // 小分枝 / Small branches
  g.appendChild(
    el('path', {
      d: `M${x + 20},${y + length * 0.6} L${x + 5},${y + length * 0.75} M${x + 22},${y + length * 0.5} L${x + 38},${y + length * 0.65}`,
      stroke: '#4a3020',
      'stroke-width': '0.7',
      fill: 'none',
      opacity: '0.25',
    })
  );
  fragment.appendChild(g);
}

export function createNest({ x, y }, fragment) {
  const g = el('g', { class: 'deco-still' });
  // 巢体 / Nest body
  g.appendChild(
    el('ellipse', {
      cx: String(x),
      cy: String(y),
      rx: '14',
      ry: '6',
      fill: '#6a5a40',
      opacity: '0.3',
    })
  );
  // 枝条纹理 / Nest twig texture
  for (let i = 0; i < 5; i++) {
    const nx = x - 10 + i * 5;
    g.appendChild(
      el('line', {
        x1: String(nx),
        y1: String(y - 2),
        x2: String(nx + 3),
        y2: String(y + 3),
        stroke: '#5a4a30',
        'stroke-width': '0.5',
        opacity: '0.35',
      })
    );
  }
  fragment.appendChild(g);
}

export function createMagpie({ x, y }, fragment) {
  const g = el('g', { class: 'deco-fly' });
  // 身体 / Body
  g.appendChild(
    el('ellipse', {
      cx: String(x),
      cy: String(y),
      rx: '7',
      ry: '3',
      fill: '#3a3a3a',
      opacity: '0.45',
    })
  );
  // 白翅 / White wing
  g.appendChild(
    el('path', {
      d: `M${x},${y} Q${x + 14},${y - 8} ${x + 20},${y} Q${x + 14},${y + 8} ${x},${y}`,
      fill: '#e8e8e8',
      opacity: '0.3',
    })
  );
  // 长尾 / Long tail
  g.appendChild(
    el('path', {
      d: `M${x - 5},${y} L${x - 18},${y - 6} L${x - 15},${y} L${x - 18},${y + 6} Z`,
      fill: '#3a3a3a',
      opacity: '0.4',
    })
  );
  g.style.animationDelay = `${Math.random() * 2}s`;
  fragment.appendChild(g);
}

export function createSnowPile({ x, y }, fragment) {
  const pile = el('path', {
    d: `M${x - 20},${y} Q${x - 10},${y - 8} ${x},${y - 5} Q${x + 10},${y - 10} ${x + 20},${y} Z`,
    fill: '#e0e0e0',
    opacity: '0.2',
    class: 'deco-still',
  });
  fragment.appendChild(pile);
}

export function createIceCrack({ x, y }, fragment) {
  const crack = el('path', {
    d: `M${x},${y} L${x + 8},${y - 3} L${x + 15},${y + 2} L${x + 22},${y - 1} M${x + 8},${y - 3} L${x + 5},${y - 8}`,
    stroke: '#c0c8d8',
    'stroke-width': '0.5',
    fill: 'none',
    opacity: '0',
    class: 'deco-crack',
  });
  crack.style.animationDelay = `${Math.random() * 2}s`;
  fragment.appendChild(crack);
}

// ========== 统一调度 / Unified Dispatch ==========

export function renderDecoration(item, fragment) {
  const { type, ...params } = item;
  switch (type) {
    case 'willow':
      createWillow(params, fragment);
      break;
    case 'mistCloud':
      createMistCloud(params, fragment);
      break;
    case 'worm':
      createWorm(params, fragment);
      break;
    case 'sprout':
      createSprout(params, fragment);
      break;
    case 'swallow':
      createSwallow(params, fragment);
      break;
    case 'kite':
      createKite(params, fragment);
      break;
    case 'peony':
      createPeony(params, fragment);
      break;
    case 'frog':
      createFrog(params, fragment);
      break;
    case 'lilypad':
      createLilypad(params, fragment);
      break;
    case 'wheat':
      createWheat(params, fragment);
      break;
    case 'sun':
      createSun(params, fragment);
      break;
    case 'cicada':
      createCicada(params, fragment);
      break;
    case 'lotus':
      createLotus(params, fragment);
      break;
    case 'lotusLeaf':
      createLotusLeaf(params, fragment);
      break;
    case 'thunderBolt':
      createThunderBolt(params, fragment);
      break;
    case 'fallingLeaf':
      createFallingLeaf(params, fragment);
      break;
    case 'branch':
      createBranch(params, fragment);
      break;
    case 'dryGrass':
      createDryGrass(params, fragment);
      break;
    case 'goose':
      createGoose(params, fragment);
      break;
    case 'moon':
      createMoon(params, fragment);
      break;
    case 'chrysanthemum':
      createChrysanthemum(params, fragment);
      break;
    case 'persimmon':
      createPersimmon(params, fragment);
      break;
    case 'icicle':
      createIcicle(params, fragment);
      break;
    case 'plum':
      createPlum(params, fragment);
      break;
    case 'plumBranch':
      createPlumBranch(params, fragment);
      break;
    case 'nest':
      createNest(params, fragment);
      break;
    case 'magpie':
      createMagpie(params, fragment);
      break;
    case 'snowPile':
      createSnowPile(params, fragment);
      break;
    case 'iceCrack':
      createIceCrack(params, fragment);
      break;
    default:
      break;
  }
}
