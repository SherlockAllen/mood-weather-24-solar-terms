# 情绪天气 — 24节气动态壁纸

> MeDo Hackathon 参赛作品 · 项目8「情绪天气」

## 简介

「情绪天气」是一个以传统水墨美学呈现的24节气动态壁纸网站。通过 CSS + SVG 动画营造水墨意境，配合诗词与节气描述，打造沉浸式的文化体验。

## 技术栈

- HTML5 语义化结构
- Tailwind CSS v4 (JIT 编译)
- SVG 水墨背景动效
- Vanilla JavaScript (ES Modules)
- 系统字体栈（无需外部字体加载）

## 特性

- 24 节气完整数据，每节气配有诗句与描述
- 四层水墨动效：远山、墨迹、墨点、飘雾
- 多种导航方式：点击箭头、键盘 (← → Esc)、触摸滑动、底部圆点
- 完整的无障碍支持：ARIA、键盘导航、Focus 状态、Reduced Motion
- 响应式设计：桌面 / 平板 / 移动端自适应
- 零外部图片，纯 CSS + SVG 实现

## 本地运行

```bash
# 安装依赖
npm install

# 构建 CSS（开发时可用 watch 模式）
npm run build:css

# 启动本地服务器（任意静态服务器均可）
npx serve .
# 或
python3 -m http.server 8080
```

然后打开浏览器访问 `http://localhost:8080`。

## 交互指南

| 操作 | 效果 |
|------|------|
| 点击左右箭头 | 切换节气 |
| 点击底部圆点 | 跳转到对应节气 |
| ← / → 键 | 切换节气 |
| Esc 键 | 返回立春（第一页） |
| 触摸滑动 | 左右滑动切换节气 |

## 文件结构

```
/
├── index.html              # 主页面
├── package.json            # 项目配置与构建脚本
├── styles/
│   ├── input.css           # Tailwind v4 入口 + 自定义主题
│   ├── main.css            # 编译后的 CSS
│   └── animations.css      # 水墨动画关键帧
└── src/
    ├── data.js             # 24节气数据（含 JSDoc 类型定义）
    ├── carousel.js         # 轮播核心逻辑（渲染、过渡、状态管理）
    ├── interactions.js     # 事件处理（键盘、触摸、点击导航）
    ├── visuals.js          # 每个节气的独特视觉配置（山脉轮廓 + 装饰元素 + 特效参数）
    ├── decorations.js      # 29 种装饰元素创建器和统一调度器
    └── effects/            # 6 种节气特效模块
        ├── index.js        # 特效模块统一导出
        ├── RainEffect.js   # 雨滴特效
        ├── SnowEffect.js   # 雪花特效
        ├── MistEffect.js   # 雾气特效
        ├── FrostEffect.js  # 霜冻特效
        ├── DewEffect.js    # 露珠特效
        └── GrassEffect.js  # 草/麦浪特效
```

### 核心模块说明

- **`src/data.js`** — 24 节气完整数据源，包含中英文名、诗句、描述、季节分类、特效类型和水墨主题色。
- **`src/carousel.js`** — 轮播核心引擎，负责 SVG 场景渲染、节气切换动画、状态管理与 DOM 更新。
- **`src/interactions.js`** — 用户交互层，统一处理键盘（←→/Esc）、触摸滑动、箭头点击和底部圆点导航。
- **`src/visuals.js`** — 视觉配置中心，为每个节气定义山脉 SVG 路径、装饰元素布局、特效变体参数。
- **`src/decorations.js`** — 装饰元素工厂，提供 29 种 SVG 装饰（花、叶、月、鸟、虫等）的创建器和统一调度。
- **`src/effects/`** — 特效模块集合，包含雨、雪、雾、霜、露、草/麦浪 6 种节气专属动画效果，按需加载。

## Hackathon 演示要点

1. 首屏「立春」诗句淡入，背景墨迹缓缓流动
2. 演示键盘切换 (←→)、触摸滑动、圆点跳转
3. 提及纯 CSS+SVG 实现、零图片、60fps、无障碍支持
4. 每节气配有诗句与描述，体现传统文化底蕴
