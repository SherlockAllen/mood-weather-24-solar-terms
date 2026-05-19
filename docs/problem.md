# 情绪天气 — 问题追踪与开发任务清单

> **项目**: Mood Weather — 24 Solar Terms Dynamic Wallpaper  
> **生成日期**: 2026-05-19  
> **文档版本**: v1.2  
> **状态**: 🔴 待处理 (8 项移动端缺陷待修复)

---

## 目录

1. [构建与配置问题](#1-构建与配置问题)
2. [代码质量问题](#2-代码质量问题)
3. [文档一致性问题](#3-文档一致性问题)
4. [性能与优化问题](#4-性能与优化问题)
5. [测试与可维护性问题](#5-测试与可维护性问题)
6. [用户体验问题](#6-用户体验问题)

---

## 1. 构建与配置问题

### TASK-001: 修复 package.json 构建路径错误

| 属性 | 内容 |
|------|------|
| **问题描述** | `package.json` 中的 CSS 构建脚本引用了错误的路径 `./src/input.css` 和 `./src/main.css`，而实际文件位于 `./styles/` 目录下。这会导致 Tailwind CSS 构建失败，项目无法正确编译样式。 |
| **优先级** | 🔴 **高** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [package.json](file:///home/sherlockallen/MeDoHackathon/package.json#L5-L8) |
| **验收标准** | 1. 执行 `npm run build:css` 成功生成 `./styles/main.css`<br>2. 执行 `npm run watch:css` 正常启动监听模式<br>3. 构建产物路径与 `index.html` 中引用的 `styles/main.css` 一致 |
| **修复方案** | 将脚本路径从 `./src/input.css` / `./src/main.css` 修改为 `./styles/input.css` / `./styles/main.css` |

---

## 2. 代码质量问题

### TASK-002: 补充 data.js JSDoc 类型定义中的 `nameEn` 字段

| 属性 | 内容 |
|------|------|
| **问题描述** | `data.js` 中的 JSDoc `@typedef` 定义缺少 `nameEn` 字段，而实际数据对象中每个节气都包含该字段。这会导致类型检查工具（如 TypeScript 语言服务或 JSDoc 检查器）报错或无法提供准确的智能提示。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [src/data.js](file:///home/sherlockallen/MeDoHackathon/src/data.js#L1-L15) |
| **验收标准** | 1. JSDoc 中完整定义 `nameEn` 字段的类型和描述<br>2. 所有 24 个节气的数据对象与类型定义一致<br>3. IDE 中悬停显示正确的类型提示 |
| **修复方案** | 在 `@typedef` 中添加 `@property {string} nameEn - 节气英文名 e.g. "Beginning of Spring"` |

### TASK-003: 删除 visuals.js 中冬至配置的死代码

| 属性 | 内容 |
|------|------|
| **问题描述** | `visuals.js` 中 id 为 22（冬至）的视觉配置对象包含 `effect: "snow"` 属性，但该属性从未被使用。实际特效由 `data.js` 中的 `term.effect` 字段控制，并通过 `effectVariant` 指定变体。死代码会增加维护负担并可能导致混淆。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [src/visuals.js](file:///home/sherlockallen/MeDoHackathon/src/visuals.js#L323-L339) |
| **验收标准** | 1. 移除 `effect: "snow"` 行<br>2. 冬至节气的视觉效果（雪 + 月光变体）正常显示<br>3. 其他节气不受影响 |
| **修复方案** | 删除第 337 行 `effect: "snow",`，保留 `effectVariant: "moonlight"` |

### TASK-004: 优化 Carousel 调试体验 — 将实例挂载到 window 对象

| 属性 | 内容 |
|------|------|
| **问题描述** | 当前 `Carousel` 实例在 `index.html` 的模块脚本中创建，但未暴露到全局作用域。这在开发调试时非常不便，无法通过浏览器控制台直接调用 `carousel.next()` 或查看当前状态。 |
| **优先级** | 🟢 **低** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [index.html](file:///home/sherlockallen/MeDoHackathon/index.html#L163-L177) |
| **验收标准** | 1. 在浏览器控制台中可通过 `window.carousel` 访问实例<br>2. 支持调用 `window.carousel.next()`、`window.carousel.prev()`、`window.carousel.goTo(index)` 等方法<br>3. 生产环境构建时可选择移除（如有需要） |
| **修复方案** | 在实例化后添加 `window.carousel = carousel;`（仅在开发环境） |

---

## 3. 文档一致性问题

### TASK-005: 更新 README.md 文件结构描述

| 属性 | 内容 |
|------|------|
| **问题描述** | 项目 README.md（如有）或文档中关于文件结构的描述可能未包含新增的 `src/effects/` 目录、`src/decorations.js` 和 `src/visuals.js` 等核心模块。这会导致新团队成员难以快速理解项目架构。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 1 小时 |
| **负责人** | 技术文档工程师 |
| **相关模块/文件** | `README.md`（如存在）、`docs/` 目录下相关文档 |
| **验收标准** | 1. 文件结构树完整包含所有源码目录和文件<br>2. 每个核心模块有 1-2 句功能描述<br>3. 新增模块（effects/、decorations.js、visuals.js）有专门说明 |
| **修复方案** | 补充以下内容：<br>- `src/effects/` — 6 种节气特效（雨、雪、雾、霜、露、草/麦浪）<br>- `src/decorations.js` — 29 种装饰元素创建器和统一调度器<br>- `src/visuals.js` — 每个节气的独特视觉配置（山脉轮廓 + 装饰元素 + 特效参数） |

---

## 4. 性能与优化问题

### TASK-006: 添加 favicon.ico 或设置空 favicon 消除 404 错误

| 属性 | 内容 |
|------|------|
| **问题描述** | 当前 `index.html` 未设置 favicon，浏览器会自动请求 `/favicon.ico`，导致 404 错误。虽然不影响功能，但会在 Network 面板中产生不必要的错误记录，影响调试体验，且在某些场景下可能触发额外的性能分析噪音。 |
| **优先级** | 🟢 **低** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [index.html](file:///home/sherlockallen/MeDoHackathon/index.html#L1-L10) |
| **验收标准** | 1. 浏览器不再产生 `/favicon.ico` 404 请求<br>2. 方案轻量，不引入额外 HTTP 请求（如使用 data URI）<br>3. 页面标签显示自定义图标或空白图标 |
| **修复方案** | 在 `<head>` 中添加 `<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>❄️</text></svg>">` 或生成静态 favicon 文件 |

### TASK-007: 评估并优化动画性能 — 减少重排/重绘

| 属性 | 内容 |
|------|------|
| **问题描述** | 项目中使用了大量 SVG 动画（水墨晕染、雨滴、雪花、飘叶等）。虽然当前主要使用 `transform` 和 `opacity` 属性（GPU 加速友好），但部分装饰元素的创建和销毁（如 `_renderSeasonalEffects` 中清空 `innerHTML`）可能导致布局抖动。在低端设备或高负载场景下，动画帧率可能下降。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 3 小时 |
| **负责人** | 前端性能工程师 |
| **相关模块/文件** | [src/carousel.js](file:///home/sherlockallen/MeDoHackathon/src/carousel.js#L146-L173)、[src/decorations.js](file:///home/sherlockallen/MeDoHackathon/src/decorations.js) |
| **验收标准** | 1. 使用 Chrome DevTools Performance 面板录制，动画帧率稳定在 55fps+<br>2. 切换节气时无明显的布局抖动（Layout Shift ≈ 0）<br>3. 内存占用稳定，无持续增长（排除内存泄漏） |
| **优化方向** | 1. 使用 `DocumentFragment` 批量操作 DOM（已部分实现）<br>2. 考虑对象池复用 SVG 元素，减少创建/销毁开销<br>3. 对 `innerHTML = ''` 操作进行性能评估，必要时改用 `removeChild` 逐个清理 |

---

## 5. 测试与可维护性问题

### TASK-008: 建立 Playwright MCP 并行测试套件

| 属性 | 内容 |
|------|------|
| **问题描述** | 当前项目缺乏系统性的自动化测试。虽然已通过 Playwright MCP 进行了手动验证（导航、P0 震撼效果、P2 彩蛋），但尚未建立可重复执行的测试脚本。随着功能迭代，回归测试成本将显著增加。 |
| **优先级** | 🔴 **高** |
| **预计工时** | 8 小时 |
| **负责人** | 测试工程师 / 前端开发工程师 |
| **相关模块/文件** | `tests/` 目录（待创建）、所有 `src/` 模块 |
| **验收标准** | 1. 使用 Playwright MCP 实现并行测试（Multiple Context Parallelism）<br>2. 覆盖核心功能：导航切换、键盘交互、触摸滑动、季节过渡动画<br>3. 覆盖 P0 震撼效果：夏至无影、冬至极光、清明烟雨<br>4. 覆盖 P2 彩蛋：立春春风、清明雨巷、夏至日食、秋分满月、冬至极光<br>5. 测试报告输出到 `tests/reports/` 目录 |
| **测试场景** | - 导航测试：点击箭头、点击圆点、键盘左右键、Home/End 键<br>- 响应式测试：不同视口尺寸下的布局适配<br>- 无障碍测试：ARIA 属性、焦点管理、屏幕阅读器兼容性<br>- 性能测试：动画帧率、内存占用、加载时间 |

### TASK-009: 添加 ESLint / Prettier 代码规范检查

| 属性 | 内容 |
|------|------|
| **问题描述** | 项目中缺少统一的代码风格检查工具。不同文件中的引号风格（单引号/双引号）、缩进、分号使用等存在不一致（如 `data.js` 使用双引号，`carousel.js` 使用单引号）。这会影响代码可读性和团队协作效率。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 2 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | 所有 `.js`、`.html`、`.css` 文件 |
| **验收标准** | 1. 配置 ESLint（推荐 `eslint:recommended` + 自定义规则）<br>2. 配置 Prettier（统一格式化规则）<br>3. 添加 `npm run lint` 和 `npm run format` 脚本<br>4. 所有现有代码通过 lint 检查（或统一格式化一次） |
| **注意** | 避免过度严格的规则，保持与现有代码风格的基本一致性 |

---

## 6. 用户体验问题

### TASK-010: 优化移动端触摸交互体验

| 属性 | 内容 |
|------|------|
| **问题描述** | 当前触摸滑动逻辑在 `touchmove` 事件中调用了 `e.preventDefault()` 以阻止水平滚动的默认行为。虽然这能防止页面左右滑动，但在某些浏览器中可能会影响垂直滚动的流畅性（如快速滑动时的卡顿）。此外，`touchend` 后的滑动判断阈值（50px）在高分屏设备上可能过于敏感。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 2 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [src/interactions.js](file:///home/sherlockallen/MeDoHackathon/src/interactions.js#L84-L120) |
| **验收标准** | 1. 垂直滚动流畅，无卡顿或误触发轮播切换<br>2. 水平滑动切换响应灵敏，阈值适配不同设备像素比<br>3. 在 iOS Safari 和 Android Chrome 上测试通过 |
| **优化方向** | 1. 考虑使用 `touch-action: pan-y` CSS 属性替代 JS 阻止默认行为<br>2. 根据 `window.devicePixelRatio` 动态调整滑动阈值<br>3. 添加滑动距离和速度的复合判断 |

### TASK-011: 所有字号使用固定 px，无法随视口自适应缩放

| 属性 | 内容 |
|------|------|
| **问题描述** | 当前所有文本字号（`.term-name` 18px、`.term-name-en` 16px、`.term-poem` 40px、`.term-subtitle` 18px、`.desc-card p` 17px）均使用固定 `px` 单位。在小屏笔记本（1440×900）上内容尚可接受，但在 2K 显示器（2560×1440）上文字显得极小，像手机页面被放大，严重影响阅读体验。`letter-spacing` 同样使用固定值，字号放大后间距比例失调。 |
| **优先级** | 🔴 **高** |
| **预计工时** | 2 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L72-L110) |
| **验收标准** | 1. 在 320px–2560px 视口范围内，字号平滑缩放<br>2. 最小字号不低于移动端可读阈值（≥14px）<br>3. 最大字号不超过桌面端合理上限（≤48px）<br>4. `letter-spacing` 与字号联动缩放<br>5. 在 390×844、768×1024、1440×900、2560×1440 四个典型视口下视觉均衡 |
| **优化方向** | 1. 使用 CSS `clamp()` 函数替代固定 px，如 `clamp(16px, 0.8vw + 13px, 24px)`<br>2. `letter-spacing` 同样改用 `clamp()` 实现联动<br>3. 保留移动端 `@media (max-width: 767px)` 断点作为兜底 |

### TASK-012: 缺少 ≥1024px 桌面端响应式断点

| 属性 | 内容 |
|------|------|
| **问题描述** | 当前响应式断点仅有 `≤767px`（移动端）和 `768px–1023px`（平板），缺少 `≥1024px` 桌面端断点。在桌面浏览器中，导航箭头固定 44px、键盘提示固定 10px、描述卡片最大宽度固定 320px，均无法适配大屏。2K 屏幕下描述卡片仅占视口宽度的 12.5%，留白严重失衡。 |
| **优先级** | 🔴 **高** |
| **预计工时** | 1.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L253-L297) |
| **验收标准** | 1. 新增 `@media (min-width: 1024px)` 断点<br>2. 导航箭头放大至 52px，左右边距增至 32px<br>3. `.desc-card` 最大宽度放宽至 480px 或使用 `clamp()`<br>4. 键盘提示字号增至 12px<br>5. 在 1440×900 和 2560×1440 视口下布局均衡 |
| **优化方向** | 1. 添加桌面端媒体查询，调整导航元素尺寸与间距<br>2. `.desc-card` 的 `max-width` 改用 `clamp(300px, 80vw, 480px)`<br>3. 可考虑增加桌面端横向留白的视觉平衡处理 |

### TASK-014: 清明 poem 文本拼写错误 — 缺少空格

| 属性 | 内容 |
|------|------|
| **问题描述** | `data.js` 中清明（id=5）的 `poem` 字段 "During Qingming, the rain fallsincessantly" 中 `falls` 和 `incessantly` 之间缺少空格，拼写为 `fallsincessantly`，属于文本拼接错误。这在页面上直接显示为错误文本，影响用户阅读体验。 |
| **优先级** | 🔴 **高** |
| **预计工时** | 0.25 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [src/data.js](file:///home/sherlockallen/MeDoHackathon/src/data.js#L72) |
| **验收标准** | 1. 诗中显示为 "falls incessantly"（两个独立单词）<br>2. 清明页面文本正常可读 |
| **修复方案** | 将 `'During Qingming, the rain fallsincessantly'` 改为 `'During Qingming, the rain falls incessantly'` |

---

### TASK-015: 底部圆点指示器溢出移动端屏幕

| 属性 | 内容 |
|------|------|
| **问题描述** | 24 个圆点指示器（每节气 1 个，24px × 24px + 8px 间距）总宽度为 760px，在 375px 宽度的移动端视口中严重溢出。圆点容器使用 `left: 50%; transform: translateX(-50%)` 居中，导致左右各溢出约 192.5px，24 个圆点中仅有约 12 个可见。用户无法通过圆点跳转到两端的节气。 |
| **优先级** | 🔴 **高** |
| **预计工时** | 1 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L175-L225) |
| **验收标准** | 1. 在 375px 视口中所有圆点完整可见或可滚动<br>2. 当前激活圆点始终可见<br>3. 视觉上不拥挤 |
| **优化方向** | 1. 缩小圆点尺寸至 12-16px，减小间距至 4-6px<br>2. 或使用横向滚动容器 + 渐变遮罩<br>3. 或仅显示当前附近的 5-7 个圆点（类似 iOS 轮播指示器）<br>4. 优先方案 1 + 2 组合，保留全部圆点可访问性 |

---

### TASK-016: 副标题与描述卡片内容重叠

| 属性 | 内容 |
|------|------|
| **问题描述** | 多个节气的副标题文字（`.term-subtitle`）与描述卡片（`.desc-card`）在移动端发生重叠。卡片使用 `position: absolute; bottom: 70px` 固定定位，而上方 slide 内容为 flex 居中布局。当诗词和副标题文字较长时，内容向下延伸进入卡片区域。实测重叠量：春分 4.7px、立夏 27.1px、小满 30.9px。 |
| **优先级** | 🔴 **高** |
| **预计工时** | 1.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L53-L134) |
| **验收标准** | 1. 所有 24 个节气在 375×812 视口中副标题与卡片间距 ≥ 16px<br>2. 不存在文字遮挡或重叠<br>3. 诗词和副标题超长时应触发滚动而非溢出到卡片区域 |
| **优化方向** | 1. 将 slide 布局从 `justify-content: center` 改为 `justify-content: flex-start` + `padding-top`，避免内容被挤到下方<br>2. 或为 `.slide-content` 设置 `max-height` 并 `overflow-y: auto`<br>3. 调整 `.desc-card` 的 `bottom` 值，使用 `clamp()` 动态适配 |

---

### TASK-017: 长诗词文本在移动端换行过多

| 属性 | 内容 |
|------|------|
| **问题描述** | 部分诗词文本过长，在 375px 移动端屏幕上换行严重。小满 poem（56 字符）换行至 5 行，立夏 poem（52 字符）换行至 4 行，占据过多垂直空间，压缩了副标题和描述的显示区域。此外清明和春分的副标题也各占 3-4 行，加剧了 TASK-016 的重叠问题。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 1 小时 |
| **负责人** | 前端开发工程师 / 内容编辑 |
| **相关模块/文件** | [src/data.js](file:///home/sherlockallen/MeDoHackathon/src/data.js)、[styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L93-L101) |
| **验收标准** | 1. 移动端 poem 最多换行 3 行<br>2. 超长文本有截断或自适应缩小字号<br>3. 所有节气文本完整可读 |
| **优化方向** | 1. 缩短过长的 poem 文本（精简至 25-35 字符）<br>2. 或对 `.term-poem` 添加 `max-height` 和 `overflow: hidden`<br>3. 或使用 `clamp()` 动态缩小超长文本的字号 |

---

### TASK-018: 移动端导航箭头可见性不足

| 属性 | 内容 |
|------|------|
| **问题描述** | 导航箭头使用 `opacity: 0.6` + `border: 1px solid #d5d0ca`，在移动端作为主要的触摸交互目标过于隐蔽。用户可能无法第一时间注意到箭头存在，尤其是从桌面端转向移动端的用户。箭头的视觉权重低于它作为核心导航控件的重要性。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L136-L173) |
| **验收标准** | 1. 箭头在移动端默认 opacity ≥ 0.75<br>2. 边框颜色与背景有足够对比度<br>3. 不改动 hover 状态的行为 |
| **修复方案** | 1. 移动端断点中将 `opacity` 从 0.6 改为 0.8-0.85<br>2. 或添加浅色半透明背景增加可点击区域感知<br>3. 桌面端保持原 opacity 逻辑 |

---

### TASK-019: 中文字体在非 Mac 系统上回退风险

| 属性 | 内容 |
|------|------|
| **问题描述** | 项目使用 `"Songti SC", "SimSun", serif` 字体栈，其中 Songti SC 是 macOS/iOS 系统字体，SimSun 是 Windows 旧版宋体。在 Linux 和 Android 设备上，这两种字体均不可用，将回退到通用 `serif`，视觉效果与设计意图差异显著。此外 `"Kaiti SC"` 楷体同样面临此问题。`document.fonts` API 返回空数组，确认无自定义字体加载。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 1 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L3-L12)、[index.html](file:///home/sherlockallen/MeDoHackathon/index.html#L15-L23) |
| **验收标准** | 1. 在 Linux 和 Windows 上字体渲染接近 macOS 效果<br>2. 不引入过大字体文件影响加载速度<br>3. 中文和英文文本均有对应的 Web Font 回退 |
| **优化方向** | 1. 引入 Google Fonts `Noto Serif SC` (serif) 和 `Noto Sans SC` (sans-serif) 作为 Web Font<br>2. 楷体可使用 `ZCOOL XiaoWei` 或 `Ma Shan Zheng` 替代<br>3. 使用 `font-display: swap` 避免 FOIT<br>4. 字体子集化以减小体积（仅包含 24 个节气名所需汉字） |

---

### TASK-020: SVG 背景 `preserveAspectRatio="none"` 导致拉伸变形

| 属性 | 内容 |
|------|------|
| **问题描述** | SVG 水墨背景使用 `preserveAspectRatio="none"`，视图框为 `0 0 400 320`（比例 1.25:1）。在移动端竖屏（375×812，比例约 0.46:1）和超宽桌面屏幕上，山峰和水墨元素会被严重拉伸或压缩，破坏水墨画的自然美学。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [index.html](file:///home/sherlockallen/MeDoHackathon/index.html#L48-L53) |
| **验收标准** | 1. 在 375×812、768×1024、1920×1080 三种视口下山峰比例自然<br>2. 水墨元素无可见变形<br>3. 背景填充完整无留白 |
| **修复方案** | 1. 将 `preserveAspectRatio` 改为 `xMidYMid slice`（居中裁剪，保持比例）<br>2. 或将 `viewBox` 调整为更接近移动端竖屏比例（如 `0 0 400 700`）<br>3. 配合 CSS `object-fit: cover` 确保填充 |

---

### TASK-021: 触摸滑动缺少视觉反馈

| 属性 | 内容 |
|------|------|
| **问题描述** | 当前触摸滑动切换节气时，用户手指移动过程中无任何视觉反馈（如 slide 跟随手指平移、滑动进度指示器）。`touchend` 事件结束后直接触发切换动画，用户无法感知滑动是否被识别、需要滑多远才能触发切换。这在用户体验上显得生硬，缺乏"跟手"感。 |
| **优先级** | 🟢 **低** |
| **预计工时** | 2 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [src/interactions.js](file:///home/sherlockallen/MeDoHackathon/src/interactions.js#L84-L131) |
| **验收标准** | 1. 滑动过程中 slide 跟随手指平移（translateX）<br>2. 松开后若超过阈值则完成切换，否则回弹<br>3. 过渡动画流畅，无卡顿<br>4. 不影响垂直滚动体验 |
| **优化方向** | 1. 在 `touchmove` 中动态更新 slide `transform: translateX()`<br>2. 添加 `transition` 仅在释放时启用（避免拖动中动画延迟）<br>3. 参考原生 swipe 组件的交互模式

| 属性 | 内容 |
|------|------|
| **问题描述** | `.term-name-en` 使用 `color: #8a8a86`（`--color-ink-light`）和 `font-weight: 300`，在浅色背景 `#f8f6f2` 上对比度较低。在笔记本和桌面大屏上，英文名称几乎难以辨识，尤其对于视力不佳的用户。 |
| **优先级** | 🟡 **中** |
| **预计工时** | 0.5 小时 |
| **负责人** | 前端开发工程师 |
| **相关模块/文件** | [styles/input.css](file:///home/sherlockallen/MeDoHackathon/styles/input.css#L83-L91) |
| **验收标准** | 1. WCAG AA 对比度达标（≥4.5:1 for normal text）<br>2. 桌面端可适当加深颜色或增加字重<br>3. 不破坏整体水墨风格的视觉统一性 |
| **优化方向** | 1. 桌面端断点中将 `color` 调整为 `#6a6a6a`（`--color-ink-mid`）<br>2. 或将 `font-weight` 从 300 增至 400<br>3. 保持移动端原有轻量风格不变 |

---

## 附录：问题统计汇总

| 分类 | 数量 | 高优先级 | 中优先级 | 低优先级 |
|------|------|----------|----------|----------|
| 构建与配置 | 1 | 1 | 0 | 0 |
| 代码质量 | 3 | 0 | 2 | 1 |
| 文档一致性 | 1 | 0 | 1 | 0 |
| 性能与优化 | 2 | 0 | 1 | 1 |
| 测试与可维护性 | 2 | 1 | 1 | 0 |
| 用户体验 | 4 | 2 | 1 | 1 |
| 移动端缺陷 (v1.2) | 8 | 3 | 4 | 1 |
| **合计** | **21** | **7** | **10** | **4** |

---

## 变更日志

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-05-19 | v1.0 | 初始版本，基于全面代码审查和 Playwright MCP 测试结果创建 |
| 2026-05-19 | v1.1 | 基于 Playwright 跨设备视觉测试，追加 TASK-011/012/013 响应式与可读性问题 |
| 2026-05-19 | v1.2 | 基于 375×812 移动端真机模拟测试，追加 TASK-014–021 移动端缺陷 |
