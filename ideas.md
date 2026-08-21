# TopPerfume Beauty B2B V2 Prototype — 视觉方向

## 三个方向

### 方向一：Maison Mercantile
**Very Brief Intro：** 以国际香氛画册与现代奢侈品买手目录为灵感，使用暖象牙白、墨梅色与产品色彩建立静谧、细腻且可采购的高级感。页面强调真实产品、包装细节与采购信息之间的节奏。

**Probability：** 0.07

### 方向二：Laboratory Bloom
**Very Brief Intro：** 以护肤实验室和植物标本为基调，用柔雾绿色、米白和半透明材质突出配方、质地与质量能力。视觉更偏清洁美容与研发可信度。

**Probability：** 0.04

### 方向三：Chromatic Atelier
**Very Brief Intro：** 用大面积色块、现代美术馆排版和高饱和产品色彩表达彩妆开发的创意自由度。视觉更大胆，适合强调色号、包装和趋势方向。

**Probability：** 0.08

## 选定方向：Maison Mercantile

### Design Movement

国际香氛画册（editorial fragrance publishing）与现代精品买手目录（contemporary luxury buying catalogue）的结合。产品不是普通电商缩略图，而是整个页面的艺术主角；采购信息以精确、克制、可验证的方式出现。

### Core Principles

1. **真实物件优先：** 用户提供的真实香水、护肤和彩妆产品图承担核心浏览和成交任务；生成图仅用于抽象纸张纹理、材料氛围与辅助场景，不替代产品本身。
2. **编辑感与采购感并存：** 大比例产品画面、留白、层叠文字带来高级美容品牌感；规格、样品、可定制范围和询盘动作必须快速可见。
3. **克制的奢华：** 避免中国工厂站常见的大面积金色、深红渐变、夸张认证墙和低价信息；以暖象牙、深梅黑、纸张肌理和小面积金属色制造品质感。
4. **成熟买家路径：** 每个界面都让买家自然从产品浏览进入 Request Sample、Request Quote 或 Start Custom Project，而非被强行推向即时聊天。

### Color Philosophy

主背景采用纸张般的 **Porcelain Ivory**，让红、粉、蓝和金色的真实产品图成为自然焦点；**Plum Ink** 承担文字与结构，传达专业、安静和可靠；**Rose Mineral** 与 **Soft Gold** 只作为局部提示，既与香氛图的色彩共鸣，也避免全站甜腻。Skincare 和 Makeup 使用克制的区域色温变化，而不建立割裂的三套配色。

### Layout Paradigm

采用“**Editorial Spine**”纵向策展结构：页面像一本打开的品牌目录，左侧或上方始终有一个内容锚点，产品图、标题、采购摘要和 CTA 以不对称并列关系展开。Collection 页以可浏览的商品轨道为主，首页以大幅产品叙事穿插采购证明，不使用单一的居中卡片瀑布流。

### Signature Elements

1. **香调/配方索引线：** 细线、序号和分类小字贯穿 Hero、产品卡与详情页，形成精品目录感。
2. **产品色彩切片：** 从真实产品图中提取粉、蓝、酒红等颜色，只用于卡片角标、筛选状态和局部底色。
3. **采购标尺：** 用短横线、编号和字段矩阵表达 Format、Sample、Customization 等采购信息，避免厚重图标墙。

### Interaction Philosophy

交互应像翻阅一本高端产品目录。图片悬停时只有轻微放大和信息上移；筛选器、样品清单和移动端菜单快速、清晰、可逆。所有未实现的后端行为应如实提示为 Preview action，不制造虚假的下单或报价完成状态。

### Animation

页面加载时只让标题、索引文字和产品卡以 30–80ms 的轻微错位淡入；卡片 hover 使用 180ms 的 `transform` 与 `opacity`；筛选和抽屉使用 220ms 的自定义 ease-out；尊重 `prefers-reduced-motion`。不使用大面积漂浮、循环发光或长时间视差，以保护产品图和采购任务的注意力。

### Typography System

展示字体使用 **Cormorant Garamond**（600/700）营造编辑性和香氛质感；正文、规格与控制项使用 **Manrope**（400/500/600/700）确保国际 B2B 信息易读。Hero 使用 64–96px 桌面级展示字，Section title 使用 40–56px，产品名 18–22px，采购字段 11–13px 全大写追踪字；移动端按比例缩小但保持强对比层级。

### Brand Essence

**TopPerfume 为国际品牌、零售商和分销商提供可被真实看见、可被专业定制、可被快速推进的 Beauty B2B 产品与开发路径。**

品牌人格：**精致、可靠、国际化。**

### Brand Voice

标题应短、准确、带有产品和采购双重含义；CTA 采用邀请式动词，不用泛化口号。示例：

> “Products your brand can make its own.”

> “Start with a sample. Build toward a launch.”

### Wordmark & Logo

Logo 使用无文字图形标记：两个相交的细线拱门围合一个抽象的香水滴/瓶身轮廓，作为“产品”与“品牌开发路径”的象征。图形配合定制化窄体 serif 字标 TOPPERFUME；原型阶段优先使用图形 mark 和排版字标组合。

### Signature Brand Color

**Mineral Rose — `#B86C6B`**。它来自香水产品的红粉液体与玫瑰纸张色，是品牌用于选择状态、主 CTA 悬停和采购关键信息的唯一高识别色。

## Style Decisions

- 每个 Collection 在产品网格前都先呈现一个编辑化主推方向和细线采购字段矩阵，字段统一包含 Format、Sample、Customization 与 Brief Readiness。
- Mineral Rose 只用于选中状态、序号、采购字段标签和买家就绪信号，保持三大品类仍属于一个品牌系统。
- 用户提供的真实产品图统一标注为 `Real visual`；未确认的素材统一标注为 `Concept visual` 或 `Art-directed material study`，不会伪装成真实产品摄影。
- 每个 Collection 另加入紧凑的编辑化采购脊柱：主推产品、序号与采购字段矩阵打断商品网格，但不延迟商品浏览。
- Mineral Rose 用于活跃状态、数值锚点、字段标签、概念状态与买家就绪信号；大面积粉色仅服务产品图本身。
- 过渡模块必须直接命名下一步：样品、报价、定制化或项目规划，避免泛化的代理式表述。
- 获授权的真实产品图必须统一经过“目录版画”处理：象牙纸框、受控裁切、产品色彩切片与小型目录标题共同作用，使原始供应商参考图也呈现为被策展的买手视觉，而非直接贴入页面。
- `[NAME TO CONFIRM]` 与 `[TO CONFIRM]` 只作为 Mineral Rose 的采购注释出现。产品类别、通用格式与功能描述保持主要叙事位置，避免未确认标记成为页面情绪中心。
- “采购脊柱”是全站核心识别：编号细线、全大写字段标签与紧凑买家矩阵应贯穿产品卡、Collection 导览与产品决策模块，而不只用于单个 Collection 的顶部说明。
- **Homepage Hero Art Direction（2026-08-20）：** Hero 只使用一款获授权香水作为主视觉。使用 Warm Ivory / Porcelain、洞石、半透明玻璃、自然定向光、真实接触阴影和大量留白建立编辑式摄影感；不得回退为粉色拱门、轨道线、圆形装饰或三品类叠放。
- **Colour restraint：** Plum Ink 负责品牌识别；Mineral Rose 只用于细小的编辑强调、hover 或确认注释，不作为 Hero 背景大面积使用。
- **Hero hierarchy：** 主 H1 始终为 `Beauty products built for your brand.`，B2B 范围在首屏立即明确；`Make the product the reason to begin.` 仅作为次级编辑文案。Fragrance、Skincare、Makeup 的三类同权真实产品入口留在下一屏。
- **Evidence, not icon grids：** Buyer trust must appear as numbered verification fields, documentation notes and fine-line procurement rows. Avoid generic SaaS-style capability icon cards. Every real product reference is treated as a curated catalogue plate through controlled crop, ivory framing, editorial captioning and a single product-colour accent.
- **Confirmation hierarchy：** `[TO CONFIRM]` and `[NAME TO CONFIRM]` remain mandatory truth markers, but must appear as small Mineral Rose procurement annotations after a verified-neutral field description—not inside a product name, descriptor or headline-sized message.
- **Catalogue plate consistency：** Every product card uses an ivory mount, a restrained product-colour edge, controlled image treatment and a small reference caption. The field row beneath repeats the same fine-line buyer grammar across Fragrance, Skincare and Makeup.
- **Decision-first product language：** Reference format, product type, customization and private-label availability lead the decision surface; confirmation status stays visually secondary while no unsupported claim is introduced.
- **Catalogue plate hierarchy（2026-08-21）：** 所有真实 SKU 图必须通过受控裁切、暖象牙载台、细小产品色彩边与目录说明成为统一的 Catalogue Plate；供应商式背景、手持/台面语境不得以 Hero 级原图主导页面。
- **Procurement spine priority（2026-08-21）：** Collection 优先展示精简 Buyer Readiness 与产品网格，Buying Note 作为网格后的采购锚点；字段矩阵以编号、细线、全大写标签重复出现，避免多个小标签在首屏同时竞争。
- **Decision-first PDP spread（2026-08-21）：** 详情页首屏先呈现产品目录版画、标题、可扫描决策字段和询盘动作；产品叙述移为次级说明。Mineral Rose 只作为状态、选择与买家提示的持续品牌信号，产品提取色仅用于低调的目录注释。
