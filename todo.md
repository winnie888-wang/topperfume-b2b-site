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
- [ ] 强化 Hero 的 Beauty Product Development & Manufacturing 商业定位，并保留编辑型品牌表达。
- [ ] 确保 Fragrance、Skincare、Makeup 获得平衡产品入口和同等视觉权重。
- [ ] 将 Collection 保持为一屏内可进入产品 Grid 的 Product-First 浏览体验。
- [ ] 复核 Product Card、Product Detail、分意图询盘与 Trust 模块均符合本轮 B2B 决策需求。
- [ ] 重新验证五个页面的 Desktop/Mobile Preview；不批量上架、不做 SEO 扩张、不合并 main。

- [x] 重新核对五页原型与 Phase 2.1 的商业定位、产品浏览和询盘要求。
- [x] 将首页第一屏明确为 Fragrance / Skincare / Makeup 的 Private Label、OEM、ODM Beauty B2B Partner 定位。
- [x] 在首页以均衡、真实可见的产品入口呈现三大品类，并增加不虚构数据的 Trust 层。
- [x] 压缩 Collection 首屏与主推模块，让用户更快进入可扩展的 Product Grid。
- [x] 将 Product Card 升级为 Product Name、Type、Customizable、Private Label Available 与双询盘动作。
- [x] 在 Product Detail 加入 Available Size、Customization、Packaging、MOQ 与 Lead Time 等 B2B Decision Module。
- [x] 将询盘动作区分为 Request Sample、Get Quote、Start Your Project、WhatsApp，并自动携带产品上下文。
- [x] 验证五页 Desktop/Mobile，并记录缺失的真实护肤和彩妆素材：每款需正面白底主图、45°包装图、局部包装/质地图；可选补充成组或上架场景图。
- [ ] 创建本轮独立 Preview 审核检查点并交付链接；不批量上架，不做大量 Blog 或 SEO 扩张，不正式上线，不合并 main。

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
- [ ] 创建独立 Preview 检查点并提交审核链接、截图、设计系统及缺失素材清单。
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
- [ ] 接收并建立 Product 01–05 的原始资料清单；Product 01 已确认 Category: Fragrance、Size: 250 ml、Private Label: Yes，其余字段暂为 `[TO CONFIRM]`；Product 02 已确认类别为 Fragrance Layering Discovery Set、图片可公开展示 GUIQI 品牌、容量为 7 × 1.7 mL，公开名称待确认。
- [ ] 仅以用户提供的真实产品图作为 SKU 视觉参考；不将图片中的任何第三方品牌名称、标识或香型名称用作正式公开产品名。
- [ ] 为每个未确认公开名称的 SKU 提供 3 个无明显第三方品牌指向的中性英文命名候选，等待用户确认后再写入数据模型。
- [ ] 对已确认名称的 SKU 逐项建立 Product Card、Product Detail 与自动携带 Product Name / Product URL / Category 的 Sample、Quote、WhatsApp 询盘上下文。
- [ ] 使用确认的 Standard MOQ 2 pcs、约 7 天交期、免费样品，以及 Logo / Packaging / Fragrance 100 pcs 起；未确认 Formula / Shade customization MOQ 保留 `[TO CONFIRM]`。
- [ ] 完成首批 5 个 Fragrance SKU 的 Desktop / Mobile 核验、保存检查点并仅同步 GitHub `v2-prototype`；不扩展至 15 SKU、不合并或发布 main。

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
