# V2 Prototype 执行清单

## Phase 2.1 — Prototype Refinement

### Prototype Sync & QA（仅同步与核验）

- [x] 将 Homepage 主 H1 固定为 `Beauty products built for your brand.`，把 Editorial 表达降为次级文案。
- [x] 确认首屏明确显示 Fragrance / Skincare / Makeup、Private Label / OEM / ODM、Beauty Product Development & Manufacturing。
- [x] 复核 Homepage、三个 Collection 与 Product Detail 的 Desktop / Mobile Preview。
- [x] 对比当前 Preview 工作树、GitHub `v2-prototype` 最新 Commit 与远端分支，确认一致后完整 Push；不修改或 Merge `main`。

### Homepage Hero — Visual Art Direction Refinement（仅视觉重构）

- [x] 将 Hero 改为单一真实香水主视觉，移除三品类叠放和电商海报式构图。
- [x] 以 Warm Ivory / Porcelain、石材、半透明玻璃、自然定向光、接触阴影与留白建立利基香氛编辑式场景。
- [x] 降低 Mineral Rose 面积，移除或大幅减少粉色拱门、圆形、轨道线和非必要说明；保留 Plum Ink 识别与小面积 Mineral Rose 强调。
- [x] 保留现有商业标题及首屏 B2B 信息，并让 Fragrance / Skincare / Makeup 在第二屏获得同等真实视觉权重。
- [x] 核验 Homepage Hero 的 Desktop / Mobile 构图并更新独立 Preview；不新增产品、不 Merge main、不正式发布。

### Phase 2.2 — Hero Art Direction Only（严格冻结其他页面）

- [x] 只保留一款授权 Fragrance 作为右侧 Iconic Hero Product；不在 Hero 呈现 Skincare、Makeup 或叠放产品。
- [x] 用 Porcelain Ivory、自然洞石、柔和定向日光、真实玻璃反射、接触阴影与大留白建立单品 campaign 摄影感。
- [x] 保持瓶身、瓶盖、标签和比例不变；只优化背景、光影、反射、阴影、构图、裁切与比例。
- [x] 完全移除 orbit circles、粉色拱门、重叠卡片、图形装饰、大型 caption 和非必要线条；Mineral Rose 仅保留细小 accent。
- [x] 保留已批准的商业标题与 B2B 信息；冻结 Collection、Product Card、Product Detail、产品数据与其余页面。
- [x] 核验 Hero Desktop / Mobile，更新独立 Preview；不 Merge main、不发布。

### Hero Sync Check（仅 Preview 与 GitHub v2-prototype）

- [x] 确认当前 Preview Hero 为一款真实香水主视觉，且主标题为 `Beauty products built for your brand.`。
- [x] 确认旧 Fragrance / Skincare / Makeup 三产品叠放、`hero-orbit-one`、`hero-orbit-two`、装饰圆形及重叠产品视觉均未在 Hero 输出。
- [x] 将当前 Hero 完整同步并推送至 GitHub `v2-prototype`，不修改或 Merge `main`。
- [x] 比对 Preview 源码、当地 `v2-prototype` 与远端 GitHub SHA，明确确认 `Preview Hero = GitHub v2-prototype`。

### Phase 2.3 — Hero Final Polish（仅 Homepage Hero）

- [x] 为单一真实香水 Hero 视觉建立集中、可替换的图片接口，不虚构或变更最终可售瓶型。
- [x] Desktop 将方框标签降重为 `FRAGRANCE · SKINCARE · MAKEUP`，不重复展示 Private Label / OEM / ODM。
- [x] Mobile 将 H1 降低约 15–20%、缩短文案与 CTA 间距，移除六个独立标签，并让产品图在首屏或轻微下滑内出现。
- [x] 保留 Porcelain Ivory、自然光、洞石、单一香水、Plum Ink 排版及已批准 B2B 商业文案。
- [x] 冻结 Collection、Product Detail、Inquiry Logic、产品数据与其他页面；不 Merge main。
- [x] 完成 Desktop 与 Mobile Hero 完整截图，供用户视觉审核。

## Phase 3 — Real Business Content & Conversion Setup

- [x] 保持已批准 Homepage Hero 和整体 Maison Mercantile 视觉系统不变；不重新设计首页。
- [x] 优化 Fragrance、Skincare、Makeup Collection 的 B2B 浏览、筛选、产品说明与采购决策信息。
- [x] 完善 Product Detail 的 MOQ、Lead Time、Packaging、Private Label、Logo Customization、Formula / Fragrance / Shade 字段；无真实资料均标注 `[TO CONFIRM]`。
- [x] 将 Request Sample、Get Quote、WhatsApp 设计为可用的、自动携带产品名称、URL 与分类上下文的询盘流程。
- [x] 不编造认证、工厂数据、MOQ、交期、配方、包装或联系人信息；真实收件邮箱与 WhatsApp 号码缺失时明确标注 `[TO CONFIRM]`。
- [x] 验证 Homepage、三个 Collection、Product Detail 与 Inquiry Flow 的 Desktop / Mobile；不 Merge main、不正式发布、不开始 SEO。

### Phase 3 — Business Trust & Real Conversion（仅 v2-prototype）

- [x] 仅使用已确认的 Guiqi Technology Co., Ltd. 公司名称、`melody888666@yeah.net` 邮箱与 `+86 190 6678 2710` WhatsApp 号码接通询盘动作。
- [x] 将 Standard Order 写为 MOQ 2 pcs、约 7 天交期与可申请免费样品；将 Custom Order 写为 Logo、Packaging、Fragrance 自定义起订 100 pcs。
- [x] 在 Product Detail 清楚区分 Standard Order 与 Custom Order，保留产品上下文、样品、报价、项目和 WhatsApp 的转换路径。
- [x] 在首页加入克制、产品不让位的 Buyer Trust Section，覆盖 Product Development、Packaging Development、Quality Control、R&D、Production 与 Certifications。
- [x] 仅将用户提供的工厂、研发、包装、质检图片标记为 `Illustrative / Concept Visual`，不将其表述为 Guiqi Technology Co., Ltd. 的真实设施、团队或产线。
- [x] 对未提供的真实认证使用高级占位布局与 `[CERTIFICATE TO CONFIRM]`，不虚构 ISO、GMP、FDA、厂房、产能、人数、出口市场或合作品牌。
- [x] 已完成 Homepage Trust Section 与 Product Detail 的 Desktop / Mobile 核验；待保存检查点后将本轮修改推送至 GitHub `v2-prototype`，绝不修改、合并或发布 `main`。

### 本轮真实素材与公开命名保护

- [x] 将新增护肤与彩妆真实产品照片作为用户已授权展示的实物验证素材导入独立 Preview。
- [x] 对任何可识别为第三方品牌的公开产品标题保留为 `[NAME TO CONFIRM]`，不以原始品牌名作为 TopPerfume 的公开产品标题。
- [x] 强化 Hero 的 Beauty Product Development & Manufacturing 商业定位，并保留编辑型品牌表达。
- [x] 确保 Fragrance、Skincare、Makeup 获得平衡产品入口和同等视觉权重。
- [x] 将 Collection 保持为一屏内可进入产品 Grid 的 Product-First 浏览体验。
- [x] 复核 Product Card、Product Detail、分意图询盘与 Trust 模块均符合本轮 B2B 决策需求。
- [x] 重新验证五个页面的 Desktop/Mobile Preview；不批量上架、不做 SEO 扩张、不合并 main。

- [x] 重新核对五页原型与 Phase 2.1 的商业定位、产品浏览和询盘要求。
- [x] 将首页第一屏明确为 Fragrance / Skincare / Makeup 的 Private Label、OEM、ODM Beauty B2B Partner 定位。
- [x] 在首页以均衡、真实可见的产品入口呈现三大品类，并增加不虚构数据的 Trust 层。
- [x] 压缩 Collection 首屏与主推模块，让用户更快进入可扩展的 Product Grid。
- [x] 将 Product Card 升级为 Product Name、Type、Customizable、Private Label Available 与双询盘动作。
- [x] 在 Product Detail 加入 Available Size、Customization、Packaging、MOQ 与 Lead Time 等 B2B Decision Module。
- [x] 将询盘动作区分为 Request Sample、Get Quote、Start Your Project、WhatsApp，并自动携带产品上下文。
- [x] 验证五页 Desktop/Mobile，并记录缺失的真实护肤和彩妆素材：每款需正面白底主图、45°包装图、局部包装/质地图；可选补充成组或上架场景图。
- [x] 创建本轮独立 Preview 审核检查点并交付链接；不批量上架，不做大量 Blog 或 SEO 扩张，不正式上线，不合并 main。（历史交付记录见 `historical_catalog_decisions.md`。）

- [x] 验证 `winnie888-wang/topperfume-b2b-site` GitHub 写入权限。
- [x] 将本地 `v2-prototype` 分支推送至远端；不修改、覆盖或合并 `main`。
- [x] 将用户提供的真实产品图片迁移为可部署的 V2 原型资产。
- [x] 建立 Maison Mercantile 设计系统、共享导航、询盘抽屉与响应式框架。
- [x] 完成 Homepage。
- [x] 完成 Fragrance Collection。
- [x] 完成 Skincare Collection。
- [x] 完成 Makeup Collection。
- [x] 完成 Product Detail Page。
- [x] 验证 Desktop 与 Mobile 页面、产品浏览、筛选与询盘路径。
- [x] 创建独立 Preview 检查点并提交审核链接、截图、设计系统及缺失素材清单。（历史交付记录见 `historical_catalog_decisions.md`。）
- [x] 不批量上架全部产品，不做 SEO 规模化工作，不正式上线，不合并 main。

## Phase 4 — Final Commercial QA（仅 v2-prototype）

- [x] 以当前真实性边界为基线审计 Homepage、Fragrance、Skincare、Makeup、Product Detail 的内容、真实订单条款与公开英文。
- [x] 核验 Standard Order（MOQ 2 pcs、约 7 天、免费样品）与 Custom Order（Logo、Packaging、Fragrance 100 pcs 起）在页面和询盘摘要中一致。
- [x] 核验 Request Sample、Get Quote、Start Your Project、WhatsApp、Email、移动端 CTA、全部链接、按钮和表单路径。
- [x] 核验 Desktop / Mobile 响应式、页面加载、可读性、产品上下文传递及产品名称保护标记。
- [x] 审计所有 `[TO CONFIRM]`、`[CERTIFICATE TO CONFIRM]` 与 `Illustrative / Concept Visual` 披露，不将概念图或未证实事实表述为真实公司资料。
- [x] 检查并修复不会引入未证实事实的 placeholder、prototype 残留、失效 CTA、错误链接、重复内容与不专业英文。
- [x] 保存 QA 检查点、仅推送 GitHub `v2-prototype` 并交付剩余待确认/概念视觉清单与 Final QA Report；绝不修改、合并或发布 `main`。

## Phase 5 — First 5 Fragrance SKU Data（仅 v2-prototype）

- [x] 锁定累积规则：每张新上传的不同产品图按 Product 01、02、03… 顺序新增 SKU；只有用户明确标注为补充图、侧面图、包装图、细节图或场景图时才归属既有 SKU，绝不覆盖或删除前序产品。
- [x] 接收并建立 Product 01–05 的原始资料清单；Product 01 已确认 Category: Fragrance、Size: 250 ml、Private Label: Yes，其余字段暂为 `[TO CONFIRM]`；Product 02 已确认类别为 Fragrance Layering Discovery Set、图片可公开展示 GUIQI 品牌、容量为 7 × 1.7 mL，公开名称待确认。
- [x] 仅以用户提供的真实产品图作为 SKU 视觉参考；不将图片中的任何第三方品牌名称、标识或香型名称用作正式公开产品名。（后续以用户逐 SKU 明确授权与目录核验政策为准。）
- [x] 为每个未确认公开名称的 SKU 提供 3 个无明显第三方品牌指向的中性英文命名候选，等待用户确认后再写入数据模型。（三项候选与后续不发布决定见 `historical_catalog_decisions.md`。）
- [x] 对已确认名称的 SKU 逐项建立 Product Card、Product Detail 与自动携带 Product Name / Product URL / Category 的 Sample、Quote、WhatsApp 询盘上下文。
- [x] 使用确认的 Standard MOQ 2 pcs、约 7 天交期、免费样品，以及 Logo / Packaging / Fragrance 100 pcs 起；未确认 Formula / Shade customization MOQ 保留 `[TO CONFIRM]`。（后续已由 SKU 级 MOQ 与公开待确认字段政策取代。）
- [x] 完成首批 5 个 Fragrance SKU 的 Desktop / Mobile 核验、保存检查点并仅同步 GitHub `v2-prototype`；不扩展至 15 SKU、不合并或发布 main。

### Product 01 — Dior Sauvage Parfum Spray for Men（已明确授权）

- [x] 记录用户明确允许本轮公开使用 Dior 品牌和 `Sauvage Parfum Spray for Men` 产品名称；替代先前未确认的 Product 01 参考资料，不影响独立的 Product 02。
- [x] 接入已确认 SKU `FR-DI-SAU-100`、100 ml / 3.4 oz、Parfum、Men、Earthy & Woody、Bergamot / Pepper / Amber Wood、Private Label、建议 B2B 价格 US$20.00 / pc 与深色瓶身/礼盒展示信息。
- [x] 仅展示 B2B 产品卡、产品详情、Sample / Quote / WhatsApp 询盘与已确认商业规则；不复制截图中的零售价 US$165、Shop Pay、Add to Cart、Shipping calculated at checkout 或原零售网站界面。

### Product 02 — Carolina Herrera Good Girl Blush Tweed Talk（已明确授权）

- [x] 记录用户明确允许本轮公开使用 Carolina Herrera、Good Girl Blush Tweed Talk 和 GUIQI 的相关信息；图片为 Product 02 独立 SKU，不覆盖 Product 01。
- [x] 接入已确认 SKU `FR-CH-GGBT-080`、80 ml / 2.7 oz、Eau de Parfum、Women、Oriental Floral、2025 Edition、Private Label、建议 B2B 价格 US$20.00 / pc 与高跟鞋瓶身/格纹礼盒展示信息。
- [x] 将 Key Notes、配方与截图未确认的信息保持 `[TO CONFIRM]`；仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘，不复制 US$140 零售价、Shop Pay、Add to Cart、运费、社交分享或原零售网站界面。

### Product 03 — Carolina Herrera Very Good Girl Glam（已明确授权）

- [x] 记录用户明确允许本轮公开使用 Carolina Herrera、Very Good Girl Glam 与 GUIQI 相关信息；图片为 Product 03 独立 SKU，不覆盖 Product 01 或 Product 02。
- [x] 接入已确认 SKU `FR-CH-VGGG-080`、80 ml / 2.7 fl oz、Eau de Parfum、Women、Citrus · Aromatic · Woody、Bergamot / Mandarin / Cherry Character、Private Label、建议 B2B 价格 US$20.00 / pc 与深粉闪粉高跟鞋瓶身/礼盒展示信息。
- [x] 将其余香调、成分、功效及截图未确认信息保持 `[TO CONFIRM]`；仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘，不复制 US$150 零售价、Shop Pay、Add to Cart、运费、分期或原零售网站界面。

### Product 04 — Yves Saint Laurent Mon Paris（已明确授权）

- [x] 记录用户明确允许本轮公开使用 Yves Saint Laurent、Mon Paris 与 GUIQI 相关信息；图片为 Product 04 独立 SKU，不覆盖 Product 01 至 Product 03。
- [x] 接入已确认 SKU `FR-YSL-MP-001`、Women、Parfum、2016、Sweet · Fruity · Floral、完整 Top / Heart / Base Notes、Private Label、建议 B2B 价格 US$20.00 / pc 与粉色液体/黑色蝴蝶结瓶身展示信息。
- [x] 将 Size / Volume 继续保持 `[TO CONFIRM]`；仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘，不复制 US$155 零售价、Shop Pay、Add to Cart、运费、分期、社交分享或原零售网站界面。

### Product 05 — MEDIX Vitamin C + Niacinamide Brightening Body Lotion

- [x] 以用户提供截图中的单一琥珀橙色泵头瓶为独立 Skincare / Body Care SKU 裁切并上传；不得覆盖 Product 01 至 Product 04。
- [x] 接入确认资料：SKU `SK-BL-VC-444`、444 ml / 15 fl oz、Unisex、Vitamin C / Niacinamide / Turmeric、建议 B2B 价格 US$3.99 / pc、MOQ 12 pcs、约 7 天交期与泵头包装信息。
- [x] 将 Texture、Skin Type、Fragrance 与 SPF 均保留为 `[TO CONFIRM]`；不在公开页面作 SPF30、SPF50、Broad Spectrum、UVA / UVB Protection 或 Sunscreen 声明。
- [x] 仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘；不复制 Amazon rating、Amazon’s Choice、评价数量、店铺界面、原 Amazon 标题或 UI。
- [x] 已完成 TypeScript、生产构建及 Skincare Collection / Product Detail 的桌面与移动端核验；SKU 专属 MOQ 12 pcs 已在产品卡、详情、标准订单路径与询盘摘要中传递。

### Product 06 — Retinol + Ferulic Acid Firming Body Lotion

- [x] 以用户提供截图中的单一深粉色泵头身体乳瓶为独立 Skincare / Body Care SKU 裁切并上传；不得覆盖 Product 01 至 Product 05。
- [x] 接入确认资料：SKU `SK-BL-RET-444`、444 ml / 15 fl oz、Retinol / Ferulic Acid、Firming Body Lotion / Retinol Body Cream、约 7 天交期与白色泵头包装信息。
- [x] 将 B2B Price、MOQ、Texture、Skin Type 与 Fragrance 均保留为 `[TO CONFIRM]`；不得增加医学治疗、确定抗衰结果或未经确认的成分浓度。
- [x] 仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘；不复制 Amazon rating、Review count、Overall Pick、Amazon Store information、原 Amazon 标题或 UI。

### Product 07 — Olay Dark Spot Correcting Body Lotion

- [x] 以用户提供截图中的金橙色泵头身体乳瓶为独立 Skincare / Body Care SKU 裁切并上传；不得覆盖 Product 01 至 Product 06。
- [x] 接入确认资料：SKU `SK-BL-OLAY-AHA-502`、502 ml / 17 fl oz、AHA / Vitamin C / Niacinamide / Vitamin B3、Brightening / Tone-Enhancing Body Lotion、建议 B2B 价格 US$2.99 / pc、约 7 天交期与金橙/白色泵头包装信息。
- [x] 保留 MOQ 和 Fragrance 为 `[TO CONFIRM]`；仅使用“helps improve the appearance of...”等美容护理表达，不加入医学治疗承诺。
- [x] 仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘；不复制 Amazon rating、Review count、Amazon Store information、原 Amazon 标题或 UI。
- [x] 已完成 Product 06 与 Product 07 的 TypeScript、生产构建及 Skincare Collection / Product Detail 桌面与移动端核验；各自产品上下文会传递至 Sample、Quote 与 WhatsApp。

### Product 08 — Jergens Ultra Healing Body Lotion

- [x] 以用户提供截图中的大尺寸白色泵头身体乳瓶为独立 Skincare / Body Care SKU 裁切并上传；不得覆盖 Product 01 至 Product 07。
- [x] 接入确认资料：SKU `SK-BL-JER-UH-946`、946 ml / 32 fl oz、Vitamin C / Vitamin E / Vitamin B5、Intensive Moisturizing Body Lotion、Extra Dry Skin、Fast-absorbing lotion、Dermatologist Tested 与约 7 天交期。
- [x] 保留 B2B Price、MOQ 与 Fragrance 为 `[TO CONFIRM]`；正文仅采用保湿、滋润、柔滑及改善干燥肌肤感受的非医疗描述，不将 Ultra Healing 扩大为疾病治疗功效。
- [x] 仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘；不复制 Amazon rating、Review count、Amazon’s Choice、Amazon Store information、原 Amazon 标题或 UI。
- [x] 已完成 TypeScript、生产构建及 Skincare Collection / Product Detail 的桌面与移动端核验；产品上下文会传递至 Sample、Quote 与 WhatsApp。

### Product 10 — Victoria’s Secret Bare Vanilla Body Fragrance Mist

- [x] 以用户提供截图中的透明裸米色香氛喷雾瓶为独立 Fragrance / Body Mist SKU 裁切并上传；不得覆盖 Product 01 至 Product 08。
- [x] 接入确认资料：SKU `FR-VS-BV-250`、250 ml / 8.4 fl oz、Women、Warm / Sweet / Vanilla、Vanilla scent identity、建议 B2B 价格 US$2.00 / pc、MOQ 2 pcs、约 7 天交期、免费样品与金色瓶盖包装信息。
- [x] 将 Additional Notes 保留为 `[TO CONFIRM]`；不得自行增加额外香调、功效或未确认产品资料。
- [x] 仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘；不复制 Amazon rating、Review count、Amazon Store information、原 Amazon 标题或 UI。
- [x] 已完成 TypeScript、生产构建及 Fragrance Collection / Product Detail 的桌面与移动端核验；确认 US$2.00 / pc、MOQ 2 pcs、约 7 天交期与免费样品会传递至产品上下文询盘。

### Product 11 — Vegan Hydrating Lip Oil Gloss

- [x] 将用户提供的四支粉色、玫瑰色与蜜桃色挤压式唇油管图作为独立 Makeup / Lip Care SKU 裁切并上传；不得覆盖既有 Product 10 Fragrance SKU 或其他前序产品。
- [x] 接入确认资料：SKU `MU-LIP-OIL-001`、Lip Oil / Lip Gloss、Mirror Shine / Glossy、Watery / Smooth、Moisturizing / Hydrating、Vegan（按用户提供信息）、多色可选、建议 B2B 价格 US$2.00 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用通用公开名称 `Vegan Hydrating Lip Oil Gloss`；不将图片上的 Rejiu / Rejiu LIP GLOSS 作为公开品牌或产品名称。
- [x] 将 Net Weight / Volume、Ingredients、Shade Codes、认证文件、Private Label、Custom Logo、Custom Packaging、Custom Shades 与所有定制 MOQ 均保留为 `[TO CONFIRM]`；色彩仅描述为 Deep Berry Pink、Rose Pink、Peach Nude、Soft Pink 等可见选项。
- [x] 仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘；不得增加未确认配方、净含量、色号、认证或定制能力。
- [x] 已完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；确认产品上下文传递至 Sample、Quote 与 WhatsApp，且询盘摘要会保留该 SKU 的定制范围待确认边界。

### Product 12 — Hydrating Mirror-Shine Lip Glaze

- [x] 将用户提供的透明唇釉管与银色反光瓶盖组合图作为独立 Makeup / Lip SKU 裁切并上传；不得覆盖既有 Product 11 唇油 SKU 或其他前序产品。
- [x] 接入确认资料：SKU `MU-LG-002`、Lip Glaze / Lip Jelly / High-Shine Lip Color、Mirror Shine / High Gloss、Smooth Jelly、Moisturizing / Long-Lasting、多色可选、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `Hydrating Mirror-Shine Lip Glaze`；不得采用原 Alibaba 关键词堆砌标题作为正式网站产品名。
- [x] 仅将可见色彩方向描述为 Rose Pink、Berry Red、Deep Wine、Warm Brown、Coral Red、Bright Pink；Net Weight、Ingredients、Shade Codes、Private Label、Custom Logo、Custom Packaging、Custom Shades 与所有定制 MOQ 均保持 `[TO CONFIRM]`。
- [x] 仅展示 B2B 产品卡、产品详情和 Sample / Quote / WhatsApp 询盘；不得增加未确认净含量、成分、色号、认证或定制能力。
- [x] 已完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；确认产品上下文传递至 Sample、Quote 与 WhatsApp，且询盘摘要会保留该 SKU 的定制范围待确认边界。

### Product 13 — Mocha Chocolate 9-Shade Eyeshadow Palette

- [x] 将用户提供的透明盖九色暖棕眼影盘实拍图作为独立 Makeup / Eyes SKU 裁切并上传；不得覆盖既有 Product 12 唇釉 SKU 或其他前序产品。
- [x] 接入确认资料：SKU `MU-EYE-MOCHA-009`、9-Color Eyeshadow Palette、Mocha / Chocolate / Warm Brown / Neutral、Matte + Shimmer、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `Mocha Chocolate 9-Shade Eyeshadow Palette`；不得使用原 Alibaba 关键词堆砌标题，且正文不将 “for Black Girls” 用作主标题或不必要的人群标签。
- [x] 仅呈现确认的色彩与妆效方向：Matte Nude、Matte Beige、Warm Caramel、Mocha Brown、Deep Chocolate、Bronze Shimmer、Champagne / Gold Shimmer，以及适合 medium-to-deep skin tones 的专业表述。
- [x] 将 Net Weight、Individual Pan Weight、Ingredients、Shade Names / Codes、Private Label、Custom Logo、Custom Outer Packaging、Custom Shade Combination 与所有定制 MOQ 保持 `[TO CONFIRM]`。
- [x] 已完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘；未添加未确认净含量、配方、色号、认证或定制能力。
- [x] 已完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；确认产品上下文传递至 Sample、Quote 与 WhatsApp，且询盘摘要会保留该 SKU 的定制范围待确认边界。

### Product 14 — Radiant Glow Moisturizing Lip Gloss

- [x] 将用户提供的八色粉色管装唇彩组合图作为独立 Makeup / Lip SKU 裁切并上传；不得覆盖既有 Product 13 眼影盘 SKU 或其他前序产品。
- [x] 接入确认资料：SKU `MU-LIP-GLOSS-003`、Lip Gloss / Gloss Gel、Glossy / Radiant、Silky Smooth、Moisturizing / Hydrating、8 色可选、US$1.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `Radiant Glow Moisturizing Lip Gloss`；未采用原 Alibaba 关键词堆砌标题，且未使用 “Chemical Gel” 作为公开产品表述。
- [x] 仅呈现确认的色彩方向：Clear / Milky White、Ice Blue、Peach Nude、Soft Pink、Bright Red、Rose Pink、Warm Nude Brown、Deep Berry；Net Weight、Ingredients、Shade Codes、Private Label、Custom Logo、Custom Packaging、Custom Shades 与所有定制 MOQ 均保持 `[TO CONFIRM]`。
- [x] 已完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘；未增加未确认净含量、成分、色号、认证或定制能力。
- [x] 已完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；确认产品上下文传递至 Sample、Quote 与 WhatsApp，且询盘摘要会保留该 SKU 的定制范围待确认边界。

### Product 15 — 2-in-1 Bracelet Lip Gloss Palette with Mirror

- [x] 将用户提供的银色手链式双格唇彩盘产品图作为独立 Makeup / Lip SKU 裁切并上传；不得覆盖既有 Product 14 唇彩 SKU 或其他前序产品。
- [x] 接入确认资料：SKU `MU-LIP-BRACELET-004`、2-in-1 Lip Gloss Palette / Bracelet Makeup、双唇色、内置镜子、手链式链条、Glossy / Water-Gloss、4 个可见色彩组合、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `2-in-1 Bracelet Lip Gloss Palette with Mirror`；未采用原 Alibaba 关键词堆砌标题。
- [x] 仅呈现确认的可见色彩组合：Mauve / Rose Pink、Brick Red / Coral Pink、Berry / Rose、Warm Nude / Coral Red；Net Weight、Ingredients、Shade Codes、Private Label、Custom Logo、Custom Outer Packaging、Custom Shade Combination 与所有定制 MOQ 均保持 `[TO CONFIRM]`。
- [x] 已完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘，突出 Bracelet + Mirror + Dual Lip Color + Portable Beauty；未增加未确认净含量、配方、色号、认证或定制能力。
- [x] 已完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；确认产品上下文传递至 Sample、Quote 与 WhatsApp，且询盘摘要会保留该 SKU 的定制范围待确认边界。

### Product 16 — 16-Shade Vegan Pressed Powder Eyeshadow Palette

- [x] 将用户提供的两种十六色眼影盘陈列图作为独立 Makeup / Eyes SKU 裁切并上传；不得覆盖既有 Product 15 手链式唇彩盘 SKU 或其他前序产品。
- [x] 接入确认资料：SKU `MU-EYE-ULT-016`、Pressed Powder Eyeshadow Palette、16 色、Matte + Shimmer、Warm Neutrals / Vintage Jean Baby、High-Pigment Positioning、Vegan positioning according to supplied product information、OEM / ODM Available、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `16-Shade Vegan Pressed Powder Eyeshadow Palette`；未采用原 Alibaba 关键词堆砌标题，也未使用 “Chemical”、“Fair Skin Tone” 或 “Wholesale” 作为公开标题表述。
- [x] 仅呈现确认的色彩方向：Warm Neutrals 的 Beige、Nude、Caramel、Warm Brown、Chocolate、Bronze、Copper，以及 Vintage Jean Baby 的 Silver、Cool Nude、Taupe、Rose、Blue、Denim-inspired tones；Exact shade names / codes 保持 `[TO CONFIRM]`。
- [x] 将 Net Weight、Individual Pan Weight、Ingredients、Shade Names / Codes、Private Label、Custom Logo、Custom Outer Packaging、Custom Shade Combination 与所有定制 MOQ 均保持 `[TO CONFIRM]`；未声称 Vegan Certified。
- [x] 已完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘；产品面向不同妆容风格和多种肤色，未增加未确认净含量、配方、色号、认证或定制能力。
- [x] 已完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；确认产品上下文传递至 Sample、Quote 与 WhatsApp，且询盘摘要会保留该 SKU 的定制范围待确认边界。

### Product 17 — 8ml Lightweight Hydrating Liquid Concealer

- [x] 将用户提供的六支粉盖透明液体遮瑕管实拍图作为独立 Makeup / Face SKU 裁切并上传；不得覆盖既有 Product 16 十六色眼影盘 SKU 或其他前序产品。
- [x] 接入确认资料：SKU `MU-FACE-CON-008`、Liquid Concealer、8 ml、约 6 个可见肤色方向、Lightweight Liquid / Cream、Moisturizing / Hydrating、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `8ml Lightweight Hydrating Liquid Concealer`；不使用原 Alibaba 标题中的 “Isolation Repair”、关键词堆砌或夸大的修复/治疗性表达。
- [x] 以 “YOUR LOGO” 仅呈现确认的 Custom Logo 与 Private Label 可用性（according to supplied product information）；Custom Packaging、Custom Shade Range、Customization MOQ、Coverage Level、Finish、Ingredients、Exact Shade Names / Codes 均保持 `[TO CONFIRM]`。
- [x] 完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘上下文，不增加未确认配方、遮盖力、妆效、色号、认证或定制 MOQ。
- [x] 完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；保存隔离检查点，不合并 main、不推送 GitHub、不发布。

### Product 18 — 3-in-1 Deluxe Brow Definition Set

- [x] 将用户提供的眉笔、眉胶及礼盒实拍图作为独立 Makeup / Brow SKU 裁切并上传；不得覆盖现有 Product 17 液体遮瑕或其他前序 SKU。
- [x] 接入确认资料：SKU `MU-BROW-SET-003`、3-in-1 Eyebrow Makeup Kit、Brow Definer 0.2 g / 0.007 oz、Precision Brow Pencil 0.085 g / 0.003 oz、Clear Brow Gel 6 ml、3 件套、US$2.99 / set、MOQ 12 sets 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `3-in-1 Deluxe Brow Definition Set`；不使用原 Alibaba 式关键词堆砌标题或夸大修复/持久性表达。
- [x] 突出 Shape + Define + Set 与 Brow Definer + Precision Brow Pencil + Clear Brow Gel；眉笔色号、Ingredients、Private Label、Custom Logo、Custom Retail Box、Custom Brow Shades 与 Customization MOQ 均保持 `[TO CONFIRM]`。
- [x] 完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘上下文，不增加未确认配方、色号、认证、定制能力或定制 MOQ。
- [x] 完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；保存隔离检查点，不合并 main、不推送 GitHub、不发布。

### Product 19 — 16-Color Multi-Use Complexion Palette

- [x] 将用户提供的十六色肤色盘与包装实拍图作为独立 Makeup / Face SKU 裁切并上传；不得覆盖现有 Product 18 眉部三件套或其他前序 SKU。
- [x] 接入确认资料：SKU `MU-FACE-PAL-016`、16-Color Multi-Use Complexion Palette、16 色、Conceal / Correct / Contour / Highlight、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `16-Color Multi-Use Complexion Palette`；不采用原 Alibaba 关键词堆砌标题，也不使用 Wholesale、No Brand 或未确认的 Foundation 表述作为公开产品命名。
- [x] 仅呈现确认的 Light-to-Deep complexion range、橙/绿/薰衣草校正方向及紧凑多格结构；Before / After 及示例妆容不得作为确定功效保证，且不得加入治疗色素、痘印或其他皮肤问题的描述。
- [x] 仅以 “according to supplied product information” 呈现 Private Label / Own Brand 与 Custom Logo；Finish、Coverage、Texture、Net Weight、Individual Pan Weight、Ingredients、Shade Codes、Custom Outer Packaging、Custom Shade Combination 与 Customization MOQ 均保持 `[TO CONFIRM]`。
- [x] 完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘上下文，不增加未确认配方、色号、认证、妆效或定制能力。
- [x] 完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；保存隔离检查点，不合并 main、不推送 GitHub、不发布。

### Product 20 — 2-in-1 Blush Duo Palette

- [x] 将用户提供的五色腮红盘实拍图作为独立 Makeup / Cheek SKU 裁切并上传；不得覆盖现有 Product 19 十六色肤色盘或其他前序 SKU。
- [x] 接入确认资料：SKU `MU-FACE-BLUSH-002`、2-in-1 Blush Duo Palette、每盘 2 个协调腮红色、5 个可见色彩组合、Buildable Cheek Color、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `2-in-1 Blush Duo Palette`；不采用原 Alibaba 关键词堆砌标题，也不将 Cream / Powder 作为确认配方结构。
- [x] 仅呈现 Soft Rose Nude、Baby Pink、Mocha Rose、Berry Pink、Coral Red 五个可见颜色方向；精确色名/色号、Finish、Formula Format、Net Weight、Individual Pan Weight、Ingredients 与所有未确认妆效保持 `[TO CONFIRM]`。
- [x] 仅以 “according to supplied product information” 呈现 Custom Logo；Private Label、Custom Outer Packaging、Custom Color Combination 和 Customization MOQ 均保持 `[TO CONFIRM]`。图片中的 Before / After 仅作为颜色效果参考，不作为效果保证。
- [x] 完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘上下文，不增加未确认配方、色号、认证、妆效或定制能力。
- [x] 完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；保存隔离检查点，不合并 main、不推送 GitHub、不发布。

### Product 21 — Creamy Contour & Foundation Stick

- [x] 将用户提供的五支双头修容粉底棒实拍图作为独立 Makeup / Face SKU 裁切并上传；不得覆盖现有 Product 20 腮红盘或其他前序 SKU。
- [x] 接入确认资料：SKU `MU-FACE-STICK-005`、Creamy Contour & Foundation Stick、Contour Stick / Foundation Stick、5 个可见色彩方向、Creamy Stick、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `Creamy Contour & Foundation Stick`；不采用原 Alibaba 关键词堆砌标题，且不使用 Black Makeup Stick 等不适合公开站点的来源表达。
- [x] 仅呈现 Fair、Light、Medium、Tan、Medium Dark 五个可见色彩方向；Finish、Coverage、Net Weight、Ingredients、Shade Codes 及未确认妆效保持 `[TO CONFIRM]`，不得将肤色示例扩展成适用性或效果保证。
- [x] 仅以 “according to supplied product information” 呈现 Private Label；Custom Logo、Custom Packaging、Custom Shade Range 与 Customization MOQ 均保持 `[TO CONFIRM]`。
- [x] 完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘上下文，不增加未确认配方、色号、认证、妆效或定制能力。
- [x] 完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；保存隔离检查点，不合并 main、不推送 GitHub、不发布。

### Product 22 — 12-Color Face Contour & Correcting Palette

- [x] 将用户提供的紫色十二色面部彩妆盘实拍图作为独立 Makeup / Face SKU 裁切并上传；不得覆盖现有 Product 21 修容粉底棒或其他前序 SKU。
- [x] 接入确认资料：SKU `MU-FACE-CONTOUR-012`、12-Color Face Contour & Correcting Palette、12 色、Sculpting / Contouring / Correcting、US$2.99 / pc、MOQ 12 pcs 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `12-Color Face Contour & Correcting Palette`；不采用原 Alibaba 关键词堆砌标题，也不使用 Vegan Certified 表述。
- [x] 仅呈现可见的 Light Beige、Soft Sand、Warm Beige、Honey Beige、Golden Tan、Taupe Brown、Medium Brown、Deep Brown、Rich Chocolate Brown、Bright Orange、Red、Deep Red / Burgundy 颜色方向；精确色号、妆效、净含量、重量、成分、配方结构与所有未确认表现均保持 `[TO CONFIRM]`。
- [x] 仅按供货资料表述 Vegan positioning 与 Private Label；不得定义底部三格为统一配方，Custom Logo、Outer Packaging、Shade Combination 与 Customization MOQ 均保持 `[TO CONFIRM]`。
- [x] 完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘上下文，不增加未确认配方、色号、认证、妆效或定制能力。
- [x] 完成 TypeScript、生产构建及 Makeup Collection / Product Detail 的桌面与移动端核验；保存隔离检查点，不合并 main、不推送 GitHub、不发布。

### Product 23 — Pure Seduction Fragrance Mist & Lotion Set

- [x] 将用户提供的粉色 Fragrance Mist 与 Lotion 套装图作为独立 Fragrance / Body Care / Gift Set SKU 裁切并上传；该图片虽附带 Product 22 文案，但因已存在 Product 22 修容校正盘，按累计规则作为 Product 23，不覆盖任何既有 SKU。
- [x] 接入确认资料：SKU `FR-SET-PS-250236`、Pure Seduction Fragrance Mist & Lotion Set、2 件套、Fragrance Mist 250 ml / 8.4 fl oz、Fragrance Lotion 236 ml / 8 fl oz、Women、US$3.99 / set、MOQ 12 sets 与约 7 天交期。
- [x] 使用用户确认的公开主名称 `Pure Seduction Fragrance Mist & Lotion Set`；不采用原 Alibaba 关键词堆砌标题，且不自行扩展香调、配方、认证或具体功效。
- [x] 仅呈现确认的 Body Mist + Lotion、Fragrance Layering、Gift Ready、协调粉色包装和两件套礼赠方向；Fragrance Notes / Scent Profile、Ingredients、Private Label、Custom Logo、Custom Packaging、Custom Fragrance 与 Customization MOQ 均保持 `[TO CONFIRM]`。
- [x] 完成 B2B 产品卡、产品详情及 Sample / Quote / WhatsApp 询盘上下文，不增加未确认产品资料。
- [x] 完成 TypeScript、生产构建及 Fragrance Collection / Product Detail 的桌面与移动端核验；保存隔离检查点，不合并 main、不推送 GitHub、不发布。

### Latest Catalog Sync & Review Build

- [x] 盘点当前已确认的正式 Fragrance、Skincare / Body Care 与 Makeup SKU，并识别所有旧 Prototype、Reference 与 `[NAME TO CONFIRM]` 占位产品。
- [x] 仅在 `v2-prototype` 清理或隐藏旧测试/占位产品，保留全部用户确认正式 SKU、产品图、商业资料与产品上下文询盘路径。
- [x] 运行类型检查与生产构建；复核 Homepage 桌面/移动端、三类正式 Collection，以及 Fragrance、Skincare / Body Care、Makeup 各一个正式 PDP。
- [x] 保存隔离审核检查点并同步至 GitHub `v2-prototype` 分支；不修改、合并或推送 `main`，不正式发布，也不开始 SEO。
- [x] 汇总 Preview URL、GitHub Commit SHA、SKU 总量和按类数量，以及剩余 `[TO CONFIRM]` 清单后停止等待最终审核。

### Final Catalog Correction — Before SEO

- [x] 核对此前提交的 Vaseline Cocoa Radiant Intensive Care Body Lotion；如曾因目录清理遗漏，则恢复其真实 SKU、图片与已确认资料，并重新统计正式 SKU 数量。
- [x] 将 Retinol + Ferulic Acid Firming Body Lotion 修正为 US$3.99 / pc、MOQ 12 pcs、Approx. 7 days；不再显示该 SKU 的价格或 MOQ 待确认状态。
- [x] 移除 Homepage、Collection、Buyer Guide 与 Footer 中任何“所有产品 MOQ 2 pcs”的暗示，统一改为 SKU 级 MOQ 逻辑与用户指定的说明。
- [x] 确保 Product Card、Product Detail、Collection、Buyer Guide 与 Customization Module 不显示原始 `[TO CONFIRM]`；隐藏可选未确认字段，必要时显示 “Contact us for details”。
- [x] 为产品数据建立 Branded Wholesale 与 Private Label / OEM ODM 两种商业类型；未经用户确认的第三方品牌成品不得展示 Private Label Available。
- [x] 保留 prototype Email / Quote draft 流程，但在公开流程和内部审核中记录 “MUST FIX BEFORE LAUNCH：直接表单提交至 melody888666@yeah.net”；保留 WhatsApp +86 190 6678 2710。
- [x] 完成 MOQ、公开字段、SKU 数量与跨端核验；保存隔离检查点并仅同步 GitHub `v2-prototype`，不修改、合并 main，不发布，不开始 SEO。

### Phase 7 — Real Inquiry Submission Before SEO

- [x] 确认真实询盘投递架构与安全约束：邮件收件人 `melody888666@yeah.net`、WhatsApp `+86 190 6678 2710`、不在前端公开敏感密钥、不中断现有 22 个 SKU 或启动 SEO。
- [x] 建立可实际投递邮件的安全后端提交端点，并支持 Homepage Project Inquiry、Product Request Sample、Product Get Quote 与 Start Your Project 的统一提交。
- [x] 确保每项询盘携带 Product Name、SKU、Product URL、Category、Quantity、Country / Market、Customer Name、Customer Email、Customer WhatsApp、Customization Requirement 与 Notes。
- [x] 实现必填校验、加载、成功、失败、移动端可用性与基础反垃圾保护；成功文案为 “Thank you. Your inquiry has been received. Our team will contact you shortly.”
- [x] 保留 WhatsApp 作为辅助快捷入口；在不替代表单提交的前提下保持原有产品上下文。
- [x] 实际测试 Homepage Project Inquiry、Product Request Sample、Product Get Quote 的桌面和移动端提交，以及成功状态截图。
- [x] 保存隔离检查点并仅同步 GitHub `v2-prototype`；不修改、合并 main，不发布，不开始 SEO，交付预览、提交 SHA、实现方式、测试结果和成功状态截图。

### Phase 7 Follow-up — GitHub Verification Before Mail Diagnostics

- [x] 验证已重新授权的 `winnie888-wang/topperfume-b2b-site` 可读取，且仅可安全写入 GitHub `v2-prototype` 分支；不得修改、合并或推送 main，不开始 SEO。
- [x] 仅同步已保存的 Phase 7 询盘提交审核版本至 GitHub `v2-prototype`，记录最终 Commit SHA 与远端 main 不变的核验结果。
- [x] GitHub 验证通过后诊断 Resend 邮件实际收件路径；如有失败，仅报告状态码与错误信息，不修改其他页面。

### Controlled Website Inquiry Email Test

- [x] 仅从 `inquiry@mail.topperfume.cn` 向 `melody888666@yeah.net` 发送一封主题为 `TopPerfume Website Inquiry Test`、正文为 `This is a controlled website inquiry email test.` 的受控 QA 邮件。
- [x] 安全记录并交付 Resend request ID、HTTP 状态与 accepted 结果；不显示 API Key，不开始 SEO，不修改 main，不正式发布。

### Phase 8 — Final Pre-Launch Website QA

- [x] 审核 Homepage Desktop / Mobile、Fragrance、Skincare / Body Care、Makeup Collection、Product Card 与 Product Detail 的加载、内容、图片与导航完整性。
- [x] 审核 Request Sample、Get Quote、Start Your Project、WhatsApp 与 Email Inquiry Submission 的产品上下文、校验、成功/失败状态及移动端可用性。
- [x] 审核 Navigation / Footer、404 / broken links、响应式行为、产品 Price / MOQ / Lead Time 一致性与 Customer-facing `[TO CONFIRM] = 0`。
- [x] 仅修复阻断上线的 RED 问题，并复验类型检查、单元测试、生产构建与核心路由。（本轮未发现需修复的 RED 阻断问题。）
- [x] 生成 Homepage Desktop / Mobile、三类 Collection、一个 PDP 与 Inquiry success-state 截图，归类 RED / YELLOW / GREEN 审核结论。
- [x] 保存隔离检查点并仅同步 GitHub `v2-prototype`；不修改、合并 main，不发布，不开始 SEO，交付 Preview、SHA 与最终审核结果。

### Final Review Materials — No Site Changes

- [x] 仅整理现有 Preview、GitHub SHA、Homepage Desktop / Mobile、三类 Collection、Fragrance / Skincare / Makeup PDP，以及 Request Sample / Get Quote 成功状态截图；不修改网站页面、数据、main、SEO 或发布状态。

### Phase 9 — Production Deployment Readiness Check

- [x] 审计并移除所有客户可见的 Prototype、V2 Prototype 与 Visual Prototype 文案；更新正式页面 Title 与 Meta Description。
- [x] 将未知 URL 从 Homepage SPA fallback 调整为真实 NotFound 页面，不影响已确认的 Product、Collection 与 `/api/trpc` 路由。
- [x] 在不修改 main 的前提下连接并验证 `v2-prototype` 的 Vercel Preview；确认 Homepage、Collection、Product Detail、`/api/trpc` 与全部询盘路径可用。
- [x] 确认 Vercel Preview / Production 的服务器端 `RESEND_API_KEY` 与 `INQUIRY_FROM_EMAIL=inquiry@mail.topperfume.cn` 安全配置，且不暴露到前端。
- [x] 在 Vercel Preview 进行一次真实询盘 QA，验证 HTTP 成功、Resend accepted、邮件实际收到、成功状态和桌面/移动端流程。
- [x] 保存隔离检查点并仅同步 GitHub `v2-prototype`；不修改、合并 main，不开始 SEO，不正式发布，交付部署就绪结果。

### Phase 9A — Vercel Preview Platform 404 Recovery

- [x] 审计 Vercel Framework Preset、Root Directory、Build Command、Output Directory、现有部署日志与 `v2-prototype` 分支产物，定位平台级 `404: NOT_FOUND` 原因。
- [x] 仅为当前 Vite React + Express + tRPC 结构添加最小、安全的 Vercel 构建、函数入口与路由重写配置；不改变现有业务逻辑。
- [x] 验证 Vercel Preview 的 `/`、`/collections/fragrance`、有效 Product Detail、`/api/trpc` 和真实 Inquiry Submission，不以 Dashboard Ready 代替 HTTP 验证。
- [x] 保存隔离检查点并仅同步 GitHub `v2-prototype`；交付新的 SHA、Preview URL、构建日志摘要、根路由/API 状态与询盘测试结果，不修改 main、不发布、不开始 SEO。

### Phase 9B — Production Image Asset Migration（仅 v2-prototype）

- [x] 在已配置 Vercel 环境变量的最新 `v2-prototype` Preview 中重新验证 Homepage、`/api/trpc`、Request Sample、Get Quote、Start Your Project 与 Resend 真实投递。
- [x] 将所有已批准且客户可见的 Homepage、Collection 与 Product Detail 图片迁移为生产安全、Vercel 支持的外部静态资产路径；不得重生成、重设计、替换产品图片或修改产品数据。
- [x] 移除客户可见代码中所有 `/manus-storage/...` 生产依赖，并在真实 Vercel Preview 逐页验证无破图。
- [x] 仅保存检查点并同步 GitHub `v2-prototype`，复核 main 未变；不发布 Production，不开始 SEO，交付迁移数量、破图数量与验证结果。

### Phase 9A Follow-up — Preview Inquiry Client Stability

- [x] 诊断并修复真实 Vercel Preview 中提交 Request Sample 后出现的 `removeChild` 客户端 DOM 异常，确保成功或失败状态均可安全渲染且不影响邮件提交。

### Phase 9B Follow-up — Repository-hosted Asset Feasibility

- [x] 精确统计 28 张已批准客户可见图片的总文件大小、单文件大小与类型，并评估 GitHub + Vercel 使用 `client/public/assets/` 托管的部署可行性。
- [x] 如仓库托管适合，则优先保持图片内容不变地迁移至 `client/public/assets/`；如不适合，则仅报告技术原因与预估 Vercel Blob 成本，等待用户批准后再行动。

### Phase 9B — Approved Public Vercel Blob Migration（仅 v2-prototype）

- [x] 创建仅供本项目使用的 Public Vercel Blob Store，并将 `BLOB_READ_WRITE_TOKEN` 仅配置在服务器端部署环境；不得写入前端、GitHub 或浏览器。
- [x] 仅通过已连接 `v2-prototype` Preview 的服务器端 `process.env.BLOB_READ_WRITE_TOKEN` 执行 Blob 上传；不得请求、读取、导出、记录或输出令牌明文。
- [x] 仅迁移经确认的 32 张客户可见网站图片，保持图片内容、尺寸比例与文件质量不变；不得上传证书、内部文件、私人资料或其他敏感文件。
- [x] 将所有客户可见 `/manus-storage/...` 依赖替换为 Public Vercel Blob URL；不得修改产品数据、重新生成图片或改变视觉系统。
- [x] 在真实 Vercel Preview 验证 Homepage、3 个 Collection、所有 Product Detail 的图片，确认 Broken image count = 0、客户可见 `/manus-storage/` remaining count = 0、路由和询盘无回归。
- [x] 保存隔离检查点并仅同步 GitHub `v2-prototype`，验证 main 不变；不发布 Production、不开始 SEO，交付 SHA、Preview URL、迁移数量、Blob 用量与验证结果。

### Phase 10A — Final Production Launch (Approved)

 - [x] 核对 `v2-prototype` 指定提交 `07455785c43a26cfc987742d9fafb8d5f55c9196`、main 基线、Production 服务器端邮件与 Blob 环境变量名称，以及不修改 `topperfume.cn` / `mail.topperfume.cn` DNS 的限制。
 - [x] 不引入任何设计、SKU、文案或功能变更，将已验证的 `v2-prototype` 合并至 main，并由 Git 连接的 Vercel 触发 Production 部署。
 - [x] 在实际 Vercel Production 验证 Homepage、三类 Collection、代表性 PDP、图片、Request Sample、Get Quote、Start Your Project、WhatsApp 与移动端；确认公开 `/manus-storage/` 和原始 `[TO CONFIRM]` 均为 0。
 - [x] 执行一次受控真实 Production 询盘，核对 HTTP 成功、Resend 接受和实际邮件送达；不得泄露任何密钥。
 - [x] 交付 Production URL、main SHA、根页面 HTTP 状态、图片与询盘验证结果；不改 DNS、不开始 SEO，并等待后续批准。

### Phase 10A — Approved Unrelated-History Release Procedure

 - [x] 将现有 main 提交 `30dee6671c518ddfb6c08021acaee2f7ea231ba4` 创建为远端备份分支 `backup-main-pre-v2-launch-20260823` 并核验 SHA。
 - [x] 不使用普通 merge，将 main 精确更新为已验收提交 `07455785c43a26cfc987742d9fafb8d5f55c9196`；不得引入任何额外代码、设计、SKU、SEO、DNS 或邮件 DNS 改动。
 - [x] 等待 Git 连接的 Vercel Production 自动部署并执行 Homepage、三类 Collection、Product Detail、图片、移动端、Request Sample、Get Quote、Start Your Project、WhatsApp 与真实 Resend 投递烟雾测试。
 - [x] 返回备份分支 SHA、最终 main SHA、Production URL、Production 状态、询盘测试与邮件送达结果；不连接 `topperfume.cn`，不修改 `mail.topperfume.cn` DNS，不开始 SEO。

### Phase 10B — WhatsApp-first Conversion Correction

- [x] 审计 Header、Mobile navigation、Product Detail、Order Pathways、Closing banner 与 Footer 中的主要销售 CTA 和 InquiryDrawer 调用点。
- [x] 将 Request Sample、Get Quote、Start Your Project 分别改为 Request Free Sample、Get Wholesale Quote、Customize / Private Label，并让所有主要销售 CTA 直接打开 WhatsApp，不再弹出 InquiryDrawer。
- [x] 为产品 CTA 自动拼接 Product Name、SKU、Product URL、Category、MOQ、Lead Time 与对应意图文本；不要求买家手动复制产品资料。
- [x] 保留 Resend、tRPC 与 InquiryDrawer 后端及代码，但从当前客户主要转化路径隐藏；不得修改 SKU、价格、MOQ、图片、Product Detail 内容、Blob、DNS、域名或 Resend 配置。
- [x] 完成桌面/移动端 CTA、WhatsApp 预填内容、零 InquiryDrawer 主路径、Production 图片无破图、Production 部署与 main 同步验证；交付 Production URL、GitHub SHA 和 CTA 验证结果。

### Phase 10B.1 — Canonical Product URL in WhatsApp

- [x] 审计所有 WhatsApp CTA 与产品上下文 URL 生成点，确认不再将 `window.location.origin` 或 `.vercel.app` 作为买家可见 Product URL。
- [x] 将 Request Free Sample、Get Wholesale Quote、Customize / Private Label 与通用产品 WhatsApp CTA 固定为 `https://topperfume.cn/products/{product-slug}`；保留其余行为不变。
- [x] 增加规范 URL 自动测试，部署 main Production 并验证实际 WhatsApp 链接不含 `.vercel.app`；不得修改 DNS、SKU、MOQ、价格、图片、Blob、Resend 或产品内容。

### Phase 10B.2 — WhatsApp Message Readability

- [x] 审计并优化 WhatsApp 预填消息，使 Product Name、SKU、Product URL、Category、MOQ 与 Lead Time 以清晰的逐行字段格式呈现。
- [x] 保持 WhatsApp 号码、规范公开 URL、产品数据、CTA 行为、DNS 与其他功能不变；更新自动测试并部署 main Production 验证。
