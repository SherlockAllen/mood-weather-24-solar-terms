/**
 * 情绪天气 — 24节气独特视觉配置
 * Mood Weather — Unique Visual Configurations for the 24 Solar Terms
 * 每个节气拥有：独特山脉轮廓 + 专属装饰元素 + 差异化特效参数
 * Each solar term features: unique mountain silhouettes + exclusive decorative elements + differentiated effect parameters
 */

export const termVisuals = {
  // ========== 春 / Spring ==========
  1: {
    // 立春 — 春山初醒，柔柳嫩芽
    // English: Beginning of Spring — Spring mountains awaken, willow buds emerge
    mountains: {
      back: 'M0,230 Q100,170 200,190 T400,180 L400,320 L0,320 Z',
      front: 'M0,270 Q130,230 250,250 Q350,220 400,240 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'willow', x: 20, length: 70, curve: 18 },
      { type: 'willow', x: 360, length: 55, curve: -12 },
      { type: 'willow', x: 380, length: 45, curve: -8 },
    ],
    effectVariant: 'none',
  },
  2: {
    // 雨水 — 烟雨朦胧，润物无声
    // English: Rain Water — Misty rain blur, silently nourishing all things
    mountains: {
      back: 'M0,220 Q80,190 160,200 T320,185 T400,195 L400,320 L0,320 Z',
      front: 'M0,260 Q110,240 220,250 T400,240 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'mistCloud', x: 50, y: 200, scale: 1.2 },
      { type: 'mistCloud', x: 280, y: 210, scale: 0.9 },
    ],
    effectVariant: 'drizzle',
  },
  3: {
    // 惊蛰 — 春雷乍动，蛰虫惊出
    // English: Awakening of Insects — Spring thunder strikes, hibernating creatures startle awake
    mountains: {
      back: 'M0,240 Q120,150 240,180 T400,160 L400,320 L0,320 Z',
      front: 'M0,280 Q140,230 280,250 T400,230 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'worm', x: 120, y: 295 },
      { type: 'sprout', x: 200, y: 290 },
      { type: 'sprout', x: 280, y: 295 },
    ],
    effectVariant: 'thunder',
  },
  4: {
    // 春分 — 燕子归来，昼夜均分
    // English: Spring Equinox — Swallows return, day and night equally divided
    mountains: {
      back: 'M0,225 Q100,180 200,195 T400,185 L400,320 L0,320 Z',
      front: 'M0,265 Q120,235 240,250 T400,240 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'swallow', x: 80, y: 70, direction: 'right' },
      { type: 'swallow', x: 260, y: 55, direction: 'right' },
      { type: 'swallow', x: 180, y: 90, direction: 'left' },
    ],
    effectVariant: 'none',
  },
  5: {
    // 清明 — 断魂细雨，纸鸢断线
    // English: Qingming — Soul-stirring drizzle, kite string broken
    mountains: {
      back: 'M0,215 Q90,185 180,195 T360,180 L400,190 L400,320 L0,320 Z',
      front: 'M0,255 Q100,235 200,245 T400,235 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'kite', x: 300, y: 40 },
      { type: 'willow', x: 10, length: 50, curve: 10 },
    ],
    effectVariant: 'qingming',
  },
  6: {
    // 谷雨 — 牡丹盛开，雨生百谷
    // English: Grain Rain — Peonies in full bloom, rain nourishes a hundred grains
    mountains: {
      back: 'M0,220 Q80,175 160,185 T320,170 T400,180 L400,320 L0,320 Z',
      front: 'M0,260 Q100,230 200,240 T400,230 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'peony', x: 70, y: 270 },
      { type: 'peony', x: 320, y: 260 },
      { type: 'sprout', x: 150, y: 295 },
      { type: 'sprout', x: 250, y: 292 },
    ],
    effectVariant: 'downpour',
  },

  // ========== 夏 / Summer ==========
  7: {
    // 立夏 — 蛙鸣池塘，万物长大
    // English: Beginning of Summer — Frogs croak by the pond, all things grow large
    mountains: {
      back: 'M0,210 Q100,160 200,175 T400,165 L400,320 L0,320 Z',
      front: 'M0,250 Q120,220 240,235 T400,225 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'frog', x: 180, y: 285 },
      { type: 'frog', x: 260, y: 290 },
      { type: 'lilypad', x: 120, y: 295 },
      { type: 'lilypad', x: 300, y: 298 },
    ],
    effectVariant: 'none',
  },
  8: {
    // 小满 — 麦浪起伏，金色渐满
    // English: Lesser Fullness — Wheat waves undulate, golden fullness approaches
    mountains: {
      back: 'M0,205 Q90,155 180,170 T360,160 L400,170 L400,320 L0,320 Z',
      front: 'M0,245 Q100,215 200,230 T400,220 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'wheat', x: 40 },
      { type: 'wheat', x: 100 },
      { type: 'wheat', x: 180 },
      { type: 'wheat', x: 260 },
      { type: 'wheat', x: 340 },
    ],
    effectVariant: 'wheatField',
  },
  9: {
    // 芒种 — 忙收忙种，麦芒锋芒
    // English: Grain in Ear — Busy harvesting and planting, wheat awns sharp and keen
    mountains: {
      back: 'M0,200 Q100,150 200,165 T400,155 L400,320 L0,320 Z',
      front: 'M0,240 Q120,210 240,225 T400,215 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'wheat', x: 30 },
      { type: 'wheat', x: 70 },
      { type: 'wheat', x: 110 },
      { type: 'wheat', x: 150 },
      { type: 'wheat', x: 200 },
      { type: 'wheat', x: 250 },
      { type: 'wheat', x: 300 },
      { type: 'wheat', x: 350 },
    ],
    effectVariant: 'wheatField',
  },
  10: {
    // 夏至 — 日影最短，烈日蝉鸣
    // English: Summer Solstice — Shortest shadow, cicadas chirp under blazing sun
    mountains: {
      back: 'M0,195 Q80,145 160,160 T320,150 T400,155 L400,320 L0,320 Z',
      front: 'M0,235 Q90,205 180,220 T400,210 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'sun', x: 340, y: 55, rays: 12 },
      { type: 'cicada', x: 140, y: 110 },
      { type: 'cicada', x: 220, y: 95 },
    ],
    effectVariant: 'none',
  },
  11: {
    // 小暑 — 荷风送香，竹露清响
    // English: Lesser Heat — Lotus wind delivers fragrance, bamboo dew drips clearly
    mountains: {
      back: 'M0,200 Q100,155 200,170 T400,160 L400,320 L0,320 Z',
      front: 'M0,240 Q120,215 240,230 T400,220 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'lotus', x: 90, y: 275 },
      { type: 'lotus', x: 310, y: 280 },
      { type: 'lotusLeaf', x: 150, y: 290 },
      { type: 'lotusLeaf', x: 250, y: 295 },
    ],
    effectVariant: 'none',
  },
  12: {
    // 大暑 — 赤日炎炎，雷雨突至
    // English: Greater Heat — Scorching red sun, sudden thunderstorm arrives
    mountains: {
      back: 'M0,190 Q90,140 180,155 T360,145 L400,150 L400,320 L0,320 Z',
      front: 'M0,230 Q100,200 200,215 T400,205 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'sun', x: 350, y: 50, rays: 10 },
      { type: 'thunderBolt', x: 150, y: 60 },
      { type: 'thunderBolt', x: 280, y: 80 },
    ],
    effectVariant: 'storm',
  },

  // ========== 秋 / Autumn ==========
  13: {
    // 立秋 — 一叶知秋，梧桐叶落
    // English: Beginning of Autumn — One leaf heralds autumn, phoenix tree leaves fall
    mountains: {
      back: 'M0,205 Q100,160 200,175 T400,165 L400,320 L0,320 Z',
      front: 'M0,245 Q120,220 240,235 T400,225 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'fallingLeaf', count: 4, color: '#b87040' },
      { type: 'branch', x: 320, y: 0, length: 60 },
    ],
    effectVariant: 'none',
  },
  14: {
    // 处暑 — 离离原草，一岁一枯
    // English: End of Heat — Lush grass on the plain, withers and flourishes each year
    mountains: {
      back: 'M0,210 Q80,170 160,180 T320,170 T400,175 L400,320 L0,320 Z',
      front: 'M0,250 Q100,225 200,235 T400,230 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'dryGrass', x: 30 },
      { type: 'dryGrass', x: 100 },
      { type: 'dryGrass', x: 200 },
      { type: 'dryGrass', x: 300 },
      { type: 'dryGrass', x: 370 },
    ],
    effectVariant: 'none',
  },
  15: {
    // 白露 — 鸿雁南飞，露从今夜白
    // English: White Dew — Wild geese fly south, from tonight the dew turns white
    mountains: {
      back: 'M0,215 Q90,175 180,185 T360,175 L400,180 L400,320 L0,320 Z',
      front: 'M0,255 Q110,230 220,240 T400,235 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'goose', x: 60, y: 75 },
      { type: 'goose', x: 95, y: 65 },
      { type: 'goose', x: 130, y: 75 },
      { type: 'goose', x: 180, y: 60 },
      { type: 'goose', x: 215, y: 50 },
      { type: 'goose', x: 250, y: 60 },
    ],
    effectVariant: 'morningDew',
  },
  16: {
    // 秋分 — 平分秋色，明月当空
    // English: Autumn Equinox — Autumn colors equally shared, bright moon hangs in the sky
    mountains: {
      back: 'M0,200 Q100,165 200,175 T400,170 L400,320 L0,320 Z',
      front: 'M0,240 Q120,220 240,230 T400,225 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'moon', x: 330, y: 65, phase: 'full' },
      { type: 'fallingLeaf', count: 3, color: '#c89050' },
    ],
    effectVariant: 'none',
  },
  17: {
    // 寒露 — 菊有黄华，凉风习习
    // English: Cold Dew — Chrysanthemums show yellow blooms, cool breeze blows gently
    mountains: {
      back: 'M0,210 Q80,175 160,185 T320,175 T400,180 L400,320 L0,320 Z',
      front: 'M0,250 Q100,230 200,240 T400,235 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'chrysanthemum', x: 60, y: 265 },
      { type: 'chrysanthemum', x: 140, y: 275 },
      { type: 'chrysanthemum', x: 340, y: 260 },
    ],
    effectVariant: 'eveningDew',
  },
  18: {
    // 霜降 — 初霜降临，柿红枝头
    // English: Frost's Descent — First frost arrives, persimmons redden on the branches
    mountains: {
      back: 'M0,215 Q90,180 180,190 T360,180 L400,185 L400,320 L0,320 Z',
      front: 'M0,255 Q110,235 220,245 T400,240 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'persimmon', x: 90, y: 140 },
      { type: 'persimmon', x: 115, y: 155 },
      { type: 'persimmon', x: 105, y: 125 },
      { type: 'branch', x: 80, y: 0, length: 80 },
    ],
    effectVariant: 'windowFrost',
  },

  // ========== 冬 / Winter ==========
  19: {
    // 立冬 — 水始结冰，万物收藏
    // English: Beginning of Winter — Water begins to freeze, all things go into storage
    mountains: {
      back: 'M0,220 Q100,190 200,200 T400,195 L400,320 L0,320 Z',
      front: 'M0,260 Q120,240 240,250 T400,245 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'icicle', x: 40, length: 18 },
      { type: 'icicle', x: 55, length: 25 },
      { type: 'icicle', x: 340, length: 22 },
      { type: 'icicle', x: 358, length: 16 },
    ],
    effectVariant: 'none',
  },
  20: {
    // 小雪 — 雪花初飘，寒梅欲绽
    // English: Lesser Snow — First snowflakes drift, cold plum blossoms about to open
    mountains: {
      back: 'M0,225 Q90,195 180,205 T360,195 L400,200 L400,320 L0,320 Z',
      front: 'M0,265 Q110,245 220,255 T400,250 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'plum', x: 70, y: 115 },
      { type: 'plum', x: 95, y: 95 },
      { type: 'plumBranch', x: 50, y: 0, length: 90 },
    ],
    effectVariant: 'flurry',
  },
  21: {
    // 大雪 — 漫天飞雪，银装素裹
    // English: Greater Snow — Snow flies across the sky, the world dressed in silver white
    mountains: {
      back: 'M0,230 Q100,200 200,210 T400,205 L400,320 L0,320 Z',
      front: 'M0,270 Q120,250 240,260 T400,255 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'snowPile', x: 80, y: 310 },
      { type: 'snowPile', x: 200, y: 312 },
      { type: 'snowPile', x: 320, y: 308 },
    ],
    effectVariant: 'snowfall',
  },
  22: {
    // 冬至 — 一阳初生，寒梅傲雪
    // English: Winter Solstice — First yang is born, plum blossoms proudly defy the snow
    mountains: {
      back: 'M0,235 Q90,205 180,215 T360,205 L400,210 L400,320 L0,320 Z',
      front: 'M0,275 Q110,255 220,265 T400,260 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'plum', x: 85, y: 120 },
      { type: 'plum', x: 110, y: 100 },
      { type: 'plum', x: 75, y: 140 },
      { type: 'plumBranch', x: 60, y: 0, length: 100 },
      { type: 'moon', x: 340, y: 70, phase: 'slim' },
    ],
    effectVariant: 'moonlight',
  },
  23: {
    // 小寒 — 喜鹊垒巢，梅花始开
    // English: Lesser Cold — Magpies build nests, plum blossoms begin to bloom
    mountains: {
      back: 'M0,240 Q100,210 200,220 T400,215 L400,320 L0,320 Z',
      front: 'M0,280 Q120,260 240,270 T400,265 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'nest', x: 200, y: 95 },
      { type: 'magpie', x: 170, y: 70 },
      { type: 'magpie', x: 240, y: 65 },
      { type: 'plum', x: 330, y: 130 },
    ],
    effectVariant: 'flurry',
  },
  24: {
    // 大寒 — 坚冰深处，春水生
    // English: Greater Cold — Deep within solid ice, spring water is already forming
    mountains: {
      back: 'M0,245 Q90,215 180,225 T360,215 L400,220 L400,320 L0,320 Z',
      front: 'M0,285 Q110,265 220,275 T400,270 L400,320 L0,320 Z',
    },
    decorations: [
      { type: 'iceCrack', x: 100, y: 300 },
      { type: 'iceCrack', x: 250, y: 305 },
      { type: 'icicle', x: 30, length: 30 },
      { type: 'icicle', x: 50, length: 22 },
      { type: 'icicle', x: 350, length: 28 },
      { type: 'icicle', x: 370, length: 20 },
    ],
    effectVariant: 'heavyFrost',
  },
};
