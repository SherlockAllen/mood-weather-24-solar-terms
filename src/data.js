/**
 * @typedef {Object} SolarTerm
 * @property {number} id - 1-24
 * @property {string} name - e.g. "立春"
 * @property {string} poem - e.g. "春风如贵客"
 * @property {string} subtitle - e.g. "一夜东风起，万物竞生辉"
 * @property {string} description - e.g. "立春是二十四节气之首..."
 */

export const solarTerms = [
  {
    id: 1,
    name: "立春",
    poem: "春风如贵客",
    subtitle: "一夜东风起，万物竞生辉",
    description: "立春是二十四节气之首，标志着冬季结束、春季开始，万物复苏，生机勃发。"
  },
  {
    id: 2,
    name: "雨水",
    poem: "好雨知时节",
    subtitle: "随风潜入夜，润物细无声",
    description: "雨水时节，气温回升，冰雪融化，降水增多，万物开始萌动。"
  },
  {
    id: 3,
    name: "惊蛰",
    poem: "微雨众卉新",
    subtitle: "一雷惊蛰始，蛰虫惊而出走",
    description: "春雷始鸣，惊醒蛰伏于地下越冬的昆虫，春耕正式开始。"
  },
  {
    id: 4,
    name: "春分",
    poem: "春分雨脚落声微",
    subtitle: "柳岸斜风带客归，昼夜均而寒暑平",
    description: "春分昼夜平分，阴阳平衡，燕子归来，百花盛开。"
  },
  {
    id: 5,
    name: "清明",
    poem: "清明时节雨纷纷",
    subtitle: "路上行人欲断魂，借问酒家何处有",
    description: "清明既是节气又是节日，气清景明，万物皆显，适宜踏青祭祖。"
  },
  {
    id: 6,
    name: "谷雨",
    poem: "杨花落尽子规啼",
    subtitle: "落絮游丝三月候，风吹雨洗一城花",
    description: "雨生百谷，是春季最后一个节气，寒潮结束，气温回升加快。"
  },
  {
    id: 7,
    name: "立夏",
    poem: "立夏将离春去也",
    subtitle: "几枝蕙草正芳舒，万物至此皆长大",
    description: "立夏标志夏季开始，万物进入生长旺季，青蛙鸣，蚯蚓出。"
  },
  {
    id: 8,
    name: "小满",
    poem: "小满田塍寻草药",
    subtitle: "农闲莫问动三车，麦穗初齐稚子娇",
    description: "小满指夏熟作物籽粒开始饱满，但尚未成熟，是谓小满。"
  },
  {
    id: 9,
    name: "芒种",
    poem: "时雨及芒种",
    subtitle: "四野皆插秧，家家麦饭美",
    description: "芒种意为有芒的麦子快收，有芒的稻子可种，是农耕最忙时节。"
  },
  {
    id: 10,
    name: "夏至",
    poem: "东边日出西边雨",
    subtitle: "道是无晴却有晴，昼晷已云极",
    description: "夏至是北半球白昼最长的一天，阳气至极，阴气始生。"
  },
  {
    id: 11,
    name: "小暑",
    poem: "荷风送香气",
    subtitle: "竹露滴清响，小暑不足畏",
    description: "小暑表示季夏时节正式开始，天气开始炎热，但未到最热。"
  },
  {
    id: 12,
    name: "大暑",
    poem: "赤日几时过",
    subtitle: "清风无处寻，经书聊枕籍",
    description: "大暑是一年中最热的时期，高温酷热，雷暴频繁，万物狂长。"
  },
  {
    id: 13,
    name: "立秋",
    poem: "空山新雨后",
    subtitle: "天气晚来秋，明月松间照",
    description: "立秋标志秋季开始，暑去凉来，梧桐叶落，禾谷成熟。"
  },
  {
    id: 14,
    name: "处暑",
    poem: "离离原上草",
    subtitle: "一岁一枯荣，处暑无三日",
    description: "处暑表示炎热暑天结束，气温逐渐下降，秋意渐浓。"
  },
  {
    id: 15,
    name: "白露",
    poem: "露从今夜白",
    subtitle: "月是故乡明，鸿雁来，玄鸟归",
    description: "白露时节天气转凉，清晨露水加厚，鸿雁南飞，百鸟储食。"
  },
  {
    id: 16,
    name: "秋分",
    poem: "秋分客尚在",
    subtitle: "竹露夕微微，燕将明日去",
    description: "秋分昼夜再次平分，全球无极昼极夜，秋高气爽，丹桂飘香。"
  },
  {
    id: 17,
    name: "寒露",
    poem: "袅袅凉风动",
    subtitle: "凄凄寒露零，兰衰花始白",
    description: "寒露气温更低，露水更冷，即将凝结成霜，菊花盛开。"
  },
  {
    id: 18,
    name: "霜降",
    poem: "霜降水痕收",
    subtitle: "浅碧鳞鳞露远洲，酒力渐消风力软",
    description: "霜降是秋季最后一个节气，天气渐冷，初霜出现，万物毕成。"
  },
  {
    id: 19,
    name: "立冬",
    poem: "冻笔新诗懒写",
    subtitle: "寒炉美酒时温，立冬犹十日",
    description: "立冬标志冬季开始，万物收藏，规避寒冷，水始冰，地始冻。"
  },
  {
    id: 20,
    name: "小雪",
    poem: "晚来天欲雪",
    subtitle: "能饮一杯无，荷尽已无擎雨盖",
    description: "小雪气温下降，开始降雪，但雪量不大，大地封冻，万物休眠。"
  },
  {
    id: 21,
    name: "大雪",
    poem: "大雪满弓刀",
    subtitle: "欲将轻骑逐，千树万树梨花开",
    description: "大雪标志仲冬时节开始，雪量增多，地面可能积雪，银装素裹。"
  },
  {
    id: 22,
    name: "冬至",
    poem: "天时人事日相催",
    subtitle: "冬至阳生春又来，刺绣五纹添弱线",
    description: "冬至白昼最短，阴气至极，阳气始生，是重要传统节日。"
  },
  {
    id: 23,
    name: "小寒",
    poem: "小寒连大吕",
    subtitle: "欢鹊垒新巢，拾食寻河曲",
    description: "小寒进入一年中最寒冷的日子，但还未到达极点，梅花始开。"
  },
  {
    id: 24,
    name: "大寒",
    poem: "旧雪未及消",
    subtitle: "新雪又拥户，阶前冻银床",
    description: "大寒是一年中最冷的时期，天寒地冻，春之气息已在酝酿之中。"
  }
];
