/**
 * @typedef {Object} SolarTerm
 * @property {number} id - 1-24
 * @property {string} name - 节气中文名 e.g. "立春"
 * @property {string} nameEn - 节气英文名 e.g. "Beginning of Spring"
 * @property {string} poem - 英文翻译 e.g. "The spring breeze is like an honored guest"
 * @property {string} subtitle - 英文翻译 e.g. "The east wind rises overnight, all things compete to shine"
 * @property {string} description - 英文翻译 e.g. "Beginning of Spring is the first of the 24 solar terms..."
 * @property {string} season - spring/summer/autumn/winter
 * @property {string} effect - none/rain/mist/sway/dew/snow/frost
 * @property {Object} theme - ink-wash theme colors
 * @property {string} theme.paper - paper background color
 * @property {string} theme.ink - ink main color
 * @property {string} theme.mountain - distant mountain color
 * @property {string} theme.mist - mist color
 */

export const solarTerms = [
  {
    id: 1,
    name: '立春',
    nameEn: 'Beginning of Spring',
    poem: 'The spring breeze is like an honored guest',
    subtitle: 'The east wind rises overnight, all things compete to shine',
    description:
      'Beginning of Spring is the first of the 24 solar terms, marking the end of winter and the start of spring when all things revive and vitality flourishes.',
    season: 'spring',
    effect: 'none',
    theme: { paper: '#f4f2e8', ink: '#2a3a1a', mountain: '#b8b4a0', mist: '#d8d4c4' },
  },
  {
    id: 2,
    name: '雨水',
    nameEn: 'Rain Water',
    poem: 'Good rain knows its season',
    subtitle: 'Stealing into the night with the wind, silently moistening all things',
    description:
      'Rain Water signals rising temperatures as ice and snow melt. Precipitation increases, and all things begin to stir with new life.',
    season: 'spring',
    effect: 'rain',
    theme: { paper: '#eae6d8', ink: '#2a3a1a', mountain: '#a8a490', mist: '#c4c8b8' },
  },
  {
    id: 3,
    name: '惊蛰',
    nameEn: 'Awakening of Insects',
    poem: 'Light rain renews the flowers',
    subtitle: 'One thunderclap awakens the insects, hibernating creatures startle and emerge',
    description:
      'Awakening of Insects marks the arrival of spring thunder. Insects hibernating underground through winter are awakened; spring plowing officially begins.',
    season: 'spring',
    effect: 'mist',
    theme: { paper: '#ece8d8', ink: '#2a3a1a', mountain: '#a8a490', mist: '#c0c8b0' },
  },
  {
    id: 4,
    name: '春分',
    nameEn: 'Spring Equinox',
    poem: 'The spring rain falls with faint sound',
    subtitle:
      'Slanting wind by the willow shore brings travelers home; day and night are equal, cold and heat balanced',
    description:
      'Spring Equinox divides day and night equally. Yin and yang are in balance, swallows return, and a hundred flowers bloom in their full glory.',
    season: 'spring',
    effect: 'none',
    theme: { paper: '#f0ece0', ink: '#2a3a1a', mountain: '#b4b098', mist: '#d4d0c0' },
  },
  {
    id: 5,
    name: '清明',
    nameEn: 'Pure Brightness',
    poem: 'During Qingming, the rain falls incessantly',
    subtitle:
      'Travelers on the road feel their souls about to break; they ask where a tavern might be found',
    description:
      'Qingming is both a solar term and a traditional festival. The air is clear and scenery bright; all things are visible. It is a time for spring outings and ancestor worship.',
    season: 'spring',
    effect: 'rain',
    theme: { paper: '#e6e8d8', ink: '#2a3a1a', mountain: '#9ca888', mist: '#b8c0a8' },
  },
  {
    id: 6,
    name: '谷雨',
    nameEn: 'Grain Rain',
    poem: 'Poplar blossoms fall and the cuckoo sings',
    subtitle:
      "Floating catkins and gossamer threads in the third month; wind blows and rain washes the city's flowers",
    description:
      'Grain Rain gives birth to a hundred grains. It is the last solar term of spring; cold waves end and temperatures rise quickly.',
    season: 'spring',
    effect: 'rain',
    theme: { paper: '#e4e6d6', ink: '#2a3a1a', mountain: '#98a480', mist: '#b4bc9c' },
  },
  {
    id: 7,
    name: '立夏',
    nameEn: 'Beginning of Summer',
    poem: 'Beginning of Summer means spring is about to depart',
    subtitle: 'Several orchid grasses are blooming gracefully; by now all things have grown large',
    description:
      'Beginning of Summer marks the start of summer. All things enter their peak growing season; frogs croak and earthworms emerge from the soil.',
    season: 'summer',
    effect: 'none',
    theme: { paper: '#e8e4d8', ink: '#1a3a2a', mountain: '#9c9888', mist: '#c4c0b0' },
  },
  {
    id: 8,
    name: '小满',
    nameEn: 'Lesser Fullness',
    poem: 'During Lesser Fullness, seek medicinal herbs along the field ridges',
    subtitle:
      'In farming leisure, no need to ask about the three wheels; the wheat ears are just full and the children are adorable',
    description:
      "Lesser Fullness means the grains of summer crops begin to fill but are not yet mature—hence it is called 'lesser fullness.'",
    season: 'summer',
    effect: 'sway',
    theme: { paper: '#e2ddd0', ink: '#1a3a2a', mountain: '#949070', mist: '#bab6a0' },
  },
  {
    id: 9,
    name: '芒种',
    nameEn: 'Grain in Ear',
    poem: 'The timely rain reaches at Grain in Ear',
    subtitle:
      'Rice seedlings are planted across the fields; every household enjoys delicious wheat meals',
    description:
      'Grain in Ear means it is time to quickly harvest the awned wheat and plant the awned rice. It is the busiest farming season of the year.',
    season: 'summer',
    effect: 'sway',
    theme: { paper: '#e0dccc', ink: '#1a3a2a', mountain: '#908c68', mist: '#b8b498' },
  },
  {
    id: 10,
    name: '夏至',
    nameEn: 'Summer Solstice',
    poem: 'Sunrise in the east and rain in the west',
    subtitle: "One says it's not fine but it is fine; the sundial has reached its extreme",
    description:
      'Summer Solstice is the day with the longest daylight in the Northern Hemisphere. Yang energy reaches its peak and yin energy begins to emerge.',
    season: 'summer',
    effect: 'none',
    theme: { paper: '#e6e2d4', ink: '#1a3a2a', mountain: '#989480', mist: '#c0bcac' },
  },
  {
    id: 11,
    name: '小暑',
    nameEn: 'Lesser Heat',
    poem: 'The lotus wind delivers fragrance',
    subtitle: 'Bamboo dew drips with clear sound; Lesser Heat is nothing to fear',
    description:
      'Lesser Heat marks the official beginning of midsummer. The weather starts to get hot but has not yet reached its hottest point.',
    season: 'summer',
    effect: 'none',
    theme: { paper: '#e6e2d4', ink: '#1a3a2a', mountain: '#989480', mist: '#c0bcac' },
  },
  {
    id: 12,
    name: '大暑',
    nameEn: 'Greater Heat',
    poem: 'When will the blazing sun pass',
    subtitle: 'Cool breeze is nowhere to be found; scriptures serve as a pillow',
    description:
      'Greater Heat is the hottest period of the year. High temperatures are scorching, thunderstorms are frequent, and all things grow wildly.',
    season: 'summer',
    effect: 'none',
    theme: { paper: '#ded8c8', ink: '#1a3a2a', mountain: '#908868', mist: '#b8b298' },
  },
  {
    id: 13,
    name: '立秋',
    nameEn: 'Beginning of Autumn',
    poem: 'After fresh rain in the empty mountains',
    subtitle: 'The weather turns to autumn in the evening; bright moon shines among the pines',
    description:
      'Beginning of Autumn marks the start of autumn. Summer heat departs and coolness arrives; phoenix tree leaves fall and grains ripen in the fields.',
    season: 'autumn',
    effect: 'none',
    theme: { paper: '#ece4d0', ink: '#4a2e10', mountain: '#b4a880', mist: '#d0c8ac' },
  },
  {
    id: 14,
    name: '处暑',
    nameEn: 'End of Heat',
    poem: 'The lush grass on the plain',
    subtitle:
      'Each year it withers and flourishes; End of Heat brings no more than three days of heat',
    description:
      'End of Heat means the end of hot summer days. Temperatures gradually decline and the feeling of autumn deepens.',
    season: 'autumn',
    effect: 'none',
    theme: { paper: '#ece4d0', ink: '#4a2e10', mountain: '#b4a880', mist: '#d0c8ac' },
  },
  {
    id: 15,
    name: '白露',
    nameEn: 'White Dew',
    poem: 'From tonight the dew turns white',
    subtitle:
      "The moon is brightest over one's homeland; wild geese arrive and swallows return home",
    description:
      'White Dew marks the weather turning cool. Morning dew thickens, wild geese fly south, and birds store food for winter.',
    season: 'autumn',
    effect: 'dew',
    theme: { paper: '#e4dcd0', ink: '#4a2e10', mountain: '#a89c78', mist: '#c8c0a0' },
  },
  {
    id: 16,
    name: '秋分',
    nameEn: 'Autumn Equinox',
    poem: 'The traveler remains at Autumn Equinox',
    subtitle: 'Bamboo dew glistens faintly at dusk; the swallows will depart tomorrow',
    description:
      'Autumn Equinox again divides day and night equally. There are no polar days or nights globally. The autumn air is crisp and osmanthus fragrance fills the air.',
    season: 'autumn',
    effect: 'none',
    theme: { paper: '#eae2cc', ink: '#4a2e10', mountain: '#b0a478', mist: '#ccc4a4' },
  },
  {
    id: 17,
    name: '寒露',
    nameEn: 'Cold Dew',
    poem: 'The cool breeze stirs gently',
    subtitle: 'Cold Dew falls desolately; orchids wither and flowers turn white',
    description:
      'Cold Dew brings even lower temperatures and colder dew, about to freeze into frost. Chrysanthemums bloom in their full glory.',
    season: 'autumn',
    effect: 'dew',
    theme: { paper: '#ddd6c4', ink: '#3e2e18', mountain: '#9c9070', mist: '#b8b094' },
  },
  {
    id: 18,
    name: '霜降',
    nameEn: "Frost's Descent",
    poem: "As Frost's Descent arrives, water traces recede",
    subtitle: "Pale green ripples reveal distant isles; wine's strength fades and the wind softens",
    description:
      "Frost's Descent is the last solar term of autumn. The weather turns colder, the first frost appears, and all things reach completion.",
    season: 'autumn',
    effect: 'frost',
    theme: { paper: '#d6d0c0', ink: '#3a2e20', mountain: '#948c70', mist: '#b0a890' },
  },
  {
    id: 19,
    name: '立冬',
    nameEn: 'Beginning of Winter',
    poem: 'The frozen brush is too lazy to write new poems',
    subtitle: 'Warm wine by the cold stove; Beginning of Winter is still ten days away',
    description:
      'Beginning of Winter marks the start of winter. All things go into storage to escape the cold. Water begins to freeze and the ground starts to harden.',
    season: 'winter',
    effect: 'none',
    theme: { paper: '#e0e0d8', ink: '#2a2a2a', mountain: '#a0a098', mist: '#b8b8b0' },
  },
  {
    id: 20,
    name: '小雪',
    nameEn: 'Lesser Snow',
    poem: 'Evening comes and the sky threatens snow',
    subtitle: 'Can I offer you a drink? The lotus leaves are gone, no more rain umbrellas',
    description:
      'Lesser Snow brings dropping temperatures and light snowfall. The earth freezes and all things go dormant for the winter.',
    season: 'winter',
    effect: 'snow',
    theme: { paper: '#d8d8d0', ink: '#2a2a2a', mountain: '#989890', mist: '#b0b0a4' },
  },
  {
    id: 21,
    name: '大雪',
    nameEn: 'Greater Snow',
    poem: 'Heavy snow covers the bow and blade',
    subtitle:
      'Ready to pursue with light cavalry; on a thousand trees, ten thousand trees, pear blossoms open',
    description:
      'Greater Snow marks the beginning of midwinter. Snowfall increases and accumulates, dressing the world in silver white.',
    season: 'winter',
    effect: 'snow',
    theme: { paper: '#d0d0c8', ink: '#2a2a2a', mountain: '#8e8e88', mist: '#a8a8a0' },
  },
  {
    id: 22,
    name: '冬至',
    nameEn: 'Winter Solstice',
    poem: "Nature's timing and human affairs press on day by day",
    subtitle:
      'At Winter Solstice yang is born and spring returns again; the five-colored embroidery adds a thin new thread',
    description:
      'Winter Solstice has the shortest daylight of the year. Yin energy reaches its extreme and yang energy begins to emerge. It is an important traditional festival.',
    season: 'winter',
    effect: 'snow',
    theme: { paper: '#cecec6', ink: '#2a2a2a', mountain: '#8c8c84', mist: '#a4a49c' },
  },
  {
    id: 23,
    name: '小寒',
    nameEn: 'Lesser Cold',
    poem: 'Lesser Cold connects to the great pitch pipe',
    subtitle: 'Joyful magpies build new nests; searching for food along the river bend',
    description:
      'Lesser Cold enters the coldest days of the year but has not yet reached the extreme. Plum blossoms begin to bloom.',
    season: 'winter',
    effect: 'snow',
    theme: { paper: '#d4d4cc', ink: '#2a2a2a', mountain: '#94948c', mist: '#acaca4' },
  },
  {
    id: 24,
    name: '大寒',
    nameEn: 'Greater Cold',
    poem: 'The old snow has not yet melted',
    subtitle: 'New snow piles against the door again; the silver bed freezes before the steps',
    description:
      'Greater Cold is the coldest period of the year. The sky is freezing and the earth is solid; yet the breath of spring is already brewing.',
    season: 'winter',
    effect: 'snow',
    theme: { paper: '#ccccc4', ink: '#2a2a2a', mountain: '#8a8a82', mist: '#a0a098' },
  },
];
