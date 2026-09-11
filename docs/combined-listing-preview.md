# TopPerfume 五批产品预览交付

当前状态：**本地代码修改 + 本地生产构建预览**，未云端部署、未正式上线、未推送 GitHub。保留 `feat/website-optimization-body-lotion` 分支及全部既有改动。

- 五批图文核对与完整清单：[打开核对预览](http://localhost:3001/previews/combined-listing-review.html)
- 客户目录：[身体／面部护理](http://localhost:3001/collections/skincare)、[香水](http://localhost:3001/collections/fragrance)
- 规格选择示例：[GlutaGlow 400 / 600 mL](http://localhost:3001/products/glutaglow-body-lotion-400ml-600ml)
- 仍可使用原开发预览 `http://localhost:3000/`。上述 localhost 地址供当前电脑打开，服务需要保持运行。

## 本次附件与接入数量

实际使用 `C:/Users/Administrator/Downloads/TopPerfume_Combined_Listing_Pack (2).zip`。旧的无后缀压缩包只有前三批 23 张图；新版有完整五批 35 张图。逐张校验 SHA-256，与各自 product_intake.json 一致；清单见 `combined-listing-source-manifest.json`。前三批图片完全一致，新版为前两批补充了同款待核对指针，未改变其已确认报价。

| 批次 | 图片 | 本次客户目录接入 | 合并／保留处理 | 待确认同款 |
|---|---:|---|---|---|
| Batch01 | 5 | 5 个产品页 | 各自独立；五款 MOQ 已由用户确认 6 pieces，价格不变 | BC-01 与 B05-01 |
| Batch02 | 11 | 11 个产品／系列页，17 个款式 | 六款 Vaseline 保留系列选款；OLAY 普通／Night 两款分别选款；Simple 重复上传只保留包内一张 | 四个身体油系列款式与 B04／B05 对应关系 |
| Batch03 | 7 | 7 个香水页 | Khamrah / Qahwa 与 Ameer / Safeer 分开；瓶＋盒不作多件套 | 无跨批同款疑点，四款容量待补 |
| Batch04 | 5 | 2 个页面，3 条容量记录 | GlutaGlow 400 / 600 mL 独立选规格；不覆盖原 500 mL。Sunlit 两张图归为一条待确认资料 | B04-03、B04-04 |
| Batch05 | 7 | 4 个产品页 | Cocoa Radiant Gel Oil 保持独立格式；其余三条疑似同款未重复创建 | B05-01、B05-04、B05-05 |

合计：总包 41 条原始产品／容量记录中，36 条接入 29 个新产品／系列页面，5 条待同款确认。保留此前 23 个产品，目前网站共 **52 个产品／系列页面**，包含 14 个香水、26 个护肤／身体护理页面、12 个彩妆页面。原有 23 条记录逐字段、逐图库回归核对一致，本轮没有可确认覆盖更新的旧产品。

## 五批逐项清单

所有价格均为单件价，系列或合照不代表套装；没有承诺混款凑 MOQ。


### Batch01

| 编号 | 实际接入产品／系列 | 价格 | MOQ | 状态 |
|---|---|---|---|---|
| BC-01 | [Daily Niacinamide Body Lotion](http://localhost:3001/products/daily-niacinamide-body-lotion) | US$2.99 / piece | 6 pieces | 已接入产品 |
| BC-02 | [Luminous Glow Body Wash](http://localhost:3001/products/luminous-glow-body-wash) | US$2.99 / piece | 6 pieces | 已接入产品 |
| BC-03 | [Gluta Glow Body Lotion — 500 mL](http://localhost:3001/products/gluta-glow-body-lotion-500ml) | US$2.99 / piece | 6 pieces | 已接入产品 |
| BC-04 | [Vanilla Cashmere Whipped Oil Body Butter — 283 g](http://localhost:3001/products/vanilla-cashmere-whipped-oil-body-butter-283g) | US$4.99 / piece | 6 pieces | 已接入产品 |
| BC-05 | [Vanilla Cashmere Body Wash — 473 mL](http://localhost:3001/products/vanilla-cashmere-body-wash-473ml) | US$4.99 / piece | 6 pieces | 已接入产品 |

### Batch02

| 编号 | 实际接入产品／系列 | 价格 | MOQ | 状态 |
|---|---|---|---|---|
| B02-01 | [Vaseline Body Care Series — 200 mL](http://localhost:3001/products/vaseline-body-care-series-200ml) | US$3.00 / piece | 6 pieces per selected variant | 已接入系列／规格选择 |
| B02-02 | [Khadlaj Hareem Al Sultan](http://localhost:3001/products/khadlaj-hareem-al-sultan) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-03 | [OLAY Regenerist Cream — 50 g](http://localhost:3001/products/olay-regenerist-cream-50g) | US$3.00 / piece | 6 pieces per selected variant | 已接入系列／规格选择 |
| B02-04 | [NIVEA Q10 Anti-Wrinkle Power Multi Protective Day Cream](http://localhost:3001/products/nivea-q10-day-cream) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-05 | [The Ordinary Glycolic Acid 7% Exfoliating Toner](http://localhost:3001/products/the-ordinary-glycolic-toner) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-06 | [HOBBY Fresh Care Pure Orchid Shower Gel](http://localhost:3001/products/hobby-pure-orchid-shower-gel) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-07 | [Dr Teal's Lavender Body Lotion](http://localhost:3001/products/dr-teals-lavender-body-lotion) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-08 | [St. Ives Soothing Oatmeal & Shea Butter Body Lotion](http://localhost:3001/products/st-ives-oatmeal-shea-body-lotion) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-09 | [St. Ives Softening Coconut & Orchid Body Lotion](http://localhost:3001/products/st-ives-coconut-orchid-body-lotion) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-10 | [Garnier Bright Complete Vitamin C Body Serum Lotion](http://localhost:3001/products/garnier-vitamin-c-body-serum-lotion) | US$3.00 / piece | 6 pieces | 已接入产品 |
| B02-11 | [Simple Moisturising Facial Wash](http://localhost:3001/products/simple-moisturising-facial-wash) | US$3.00 / piece | 6 pieces | 已接入产品 |

### Batch03

| 编号 | 实际接入产品／系列 | 价格 | MOQ | 状态 |
|---|---|---|---|---|
| PF-01 | [Lattafa Al Noble Ameer](http://localhost:3001/products/lattafa-al-noble-ameer) | US$5.00 / piece | 2 pieces | 已接入产品 |
| PF-02 | [Lattafa Bade’e Al Oud Sublime](http://localhost:3001/products/lattafa-badee-al-oud-sublime) | US$5.00 / piece | 2 pieces | 已接入产品 |
| PF-03 | [Lattafa Khamrah Qahwa](http://localhost:3001/products/lattafa-khamrah-qahwa) | US$5.00 / piece | 2 pieces | 已接入产品 |
| PF-04 | [Lattafa Khamrah](http://localhost:3001/products/lattafa-khamrah) | US$5.00 / piece | 2 pieces | 已接入产品 |
| PF-05 | [Lattafa Al Noble Safeer](http://localhost:3001/products/lattafa-al-noble-safeer) | US$5.00 / piece | 2 pieces | 已接入产品 |
| PF-06 | [KAYALI Oudgasm Café Oud / 19](http://localhost:3001/products/kayali-oudgasm-cafe-oud-19) | US$5.00 / piece | 2 pieces | 已接入产品 |
| PF-07 | [French Avenue Liquid Brun](http://localhost:3001/products/french-avenue-liquid-brun) | US$5.00 / piece | 2 pieces | 已接入产品 |

### Batch04

| 编号 | 实际接入产品／系列 | 价格 | MOQ | 状态 |
|---|---|---|---|---|
| B04-01 | [GlutaGlow Body Lotion — 400 mL / 600 mL](http://localhost:3001/products/glutaglow-body-lotion-400ml-600ml) | US$2.99 / piece | 6 pieces per selected size | 已接入系列／规格选择 |
| B04-02 | [Healthy White Body Lotion — 400 mL](http://localhost:3001/products/healthy-white-body-lotion-400ml) | US$2.99 / piece | 6 pieces | 已接入产品 |
| B04-03 | [Gluta Ceramide Body Care](http://localhost:3001/previews/combined-listing-review.html#matches) | US$2.99 / piece | 6 pieces（本批报价） | 待确认同款 · 未加入客户目录 |
| B04-04 | [Sunlit Glow Body Gel Oil](http://localhost:3001/previews/combined-listing-review.html#matches) | US$2.99 / piece | 6 pieces（本批报价） | 待确认同款 · 未加入客户目录 |

### Batch05

| 编号 | 实际接入产品／系列 | 价格 | MOQ | 状态 |
|---|---|---|---|---|
| B05-01 | [Daily Niacinamide Body Lotion](http://localhost:3001/previews/combined-listing-review.html#matches) | US$2.99 / piece | 6 pieces（本批报价） | 待确认同款 · 未加入客户目录 |
| B05-02 | [Cocoa Radiant Body Gel Oil](http://localhost:3001/products/cocoa-radiant-body-gel-oil) | US$2.99 / piece | 6 pieces | 已接入产品 |
| B05-03 | [Essential Healing Body Lotion — 725 mL](http://localhost:3001/products/essential-healing-body-lotion-725ml) | US$2.99 / piece | 6 pieces | 已接入产品 |
| B05-04 | [Vitamin B3 Body Oil](http://localhost:3001/previews/combined-listing-review.html#matches) | US$2.99 / piece | 6 pieces（本批报价） | 待确认同款 · 未加入客户目录 |
| B05-05 | [Cocoa Radiant Body Oil](http://localhost:3001/previews/combined-listing-review.html#matches) | US$2.99 / piece | 6 pieces（本批报价） | 待确认同款 · 未加入客户目录 |
| B05-06 | [Advanced Repair Body Lotion — 725 mL](http://localhost:3001/products/advanced-repair-body-lotion-725ml) | US$2.99 / piece | 6 pieces | 已接入产品 |
| B05-07 | [Calm Healing Body Lotion](http://localhost:3001/products/calm-healing-body-lotion) | US$2.99 / piece | 6 pieces | 已接入产品 |

## 五处同款待确认

以下记录已保存原始资料、优化图片和最新报价，在核对预览中展示新旧图对照；未放入客户目录重复上架，也未把报价写入未经确认的旧记录。确认后只更新匹配产品／款式。请提供供应商 SKU、背标或明确说明是否同款。

- **B04-03 ↔ B02-01-05**：Gluta Ceramide 名称、粉盖和 200 mL 相符，但新图品牌被遮盖，标签细节不同，确切产品类型也未确认。 新图对应报价为 USD 2.99／件、MOQ 6。
- **B04-04 ↔ B02-01-03**：Sunlit Glow 名称和 200 mL 相符，但新图写 Gel Oil，旧图写 Body Oil，标签与包装外观不同。第四批两张新图可确认为同一候选款的两个视角。 新图对应报价为 USD 2.99／件、MOQ 6。
- **B05-01 ↔ BC-01**：Daily Brightening / Niacinamide 与蓝泵相似，但瓶身颜色和标签细节不同；BC-01 已确认 500 mL，B05-01 容量仍未知，缺少 SKU 或背标证据。 新图对应报价为 USD 2.99／件、MOQ 6。
- **B05-04 ↔ B02-01-01**：Vitamin B3、粉盖、200 mL 相符，但主品牌被遮盖，未提供可核对的 SKU / 背标。 新图对应报价为 USD 2.99／件、MOQ 6。
- **B05-05 ↔ B02-01-02**：Cocoa Radiant Body Oil 与 200 mL 相符，但新旧瓶型及标签差异明显，品牌被遮盖；不能凭名称自动合并。 新图对应报价为 USD 2.99／件、MOQ 6。

另：B05-02 Cocoa Radiant **Body Gel Oil** 与 B05-05 **Body Oil** 的标签、剂型文字和容量可读性不同，暂不合并；Gel Oil 容量未填写。

## 待补充参数

当前容量／MOQ 缺项涉及 **12 条资料记录**，均为容量待确认；本次总包没有尚未确认的 MOQ。BC-01 至 BC-05 已移出这项清单，其他规格缺项仍保留。

| 批次 | 容量待确认记录 |
|---|---|
| Batch01 | 无容量缺项；BC-01、BC-02 均已确认 500 mL |
| Batch02 | B02-02 Khadlaj Hareem Al Sultan（主瓶）；B02-06 HOBBY Pure Orchid Shower Gel；B02-08 St. Ives Oatmeal & Shea Butter；B02-09 St. Ives Coconut & Orchid；B02-10 Garnier Vitamin C Body Serum Lotion |
| Batch03 | PF-02 Sublime；PF-03 Qahwa；PF-04 Khamrah；PF-07 Liquid Brun |
| Batch05 | B05-01 Daily Niacinamide Body Lotion（粉瓶）；B05-02 Cocoa Radiant Body Gel Oil；B05-07 Calm Healing Body Lotion |

- Batch01：BC-01、BC-02 容量均已确认 500 mL。BC-01 至 BC-05 的 MOQ 已由用户独立确认均为 6 pieces，价格不变；BC-01 的 MOQ 不依赖与 B05-01 的同款关系。BC-03 的 UV 图片声明需要资料或替换图片，BC-01–03 建议补干净主图。
- Batch02：Hareem Al Sultan 主瓶容量／剂型，HOBBY、Garnier 容量，两款 St. Ives 的清晰容量标签；Vaseline 第五款 Gluta Ceramide 的确切类型；系列单品图。红色 SAMPLE NOT FOR SALE 不作为商品或赠品。
- Batch03：PF-02 Sublime、PF-03 Qahwa、PF-04 Khamrah、PF-07 Liquid Brun 的容量／浓度；全部七款的真实香调及配方。未凭同名常见商品补容量。
- Batch04：两处同款关系、Gluta Ceramide 类型；400／600 mL 独立单品图；品牌与完整配方均未据外观推断。
- Batch05：B05-01、B05-02、B05-07 容量及三处同款关系。725 mL 仅用于 Essential Healing 和 Advanced Repair。
- 通用：供应商 SKU、INCI、保质期／使用说明、库存、装箱数量／尺寸／重量、发货与运费税费、样品和定制条件、图片功效声明的支持资料。
- 前一轮 502 mL 身体乳待补项继续保留在产品页及 `vitamin-c-502ml-product-facts.json`，原报价 **US$2.99／瓶、2 瓶起订**；原 444 mL 产品独立保留。

## 实际代码与图片改动

- 在 `combinedListing.ts` 和 `latestListing.ts` 分别维护前三批、后两批可接入产品；来源资料及比对结果保存在 `docs/intake` 和审计 JSON 中。
- 增加 Body Lotion、Body Wash、Body Butter、Body Oil、Face Cream、Toner、Facial Cleanser 筛选，Body Gel Oil 纳入 Body Oil 筛选且详情保留确切格式文字。
- 数量组件支持瓶／件、系列选款、容量选择及未知 MOQ 的可选估计数量。未选款或数量不足时不生成产品询价链接。已知数量显示单件价格乘数量的小计，未将运费税费编入金额。
- 35 张图片已全部接入客户产品页或待确认核对页；生成响应式 WebP 和缩略图，保留原图构图、比例与标签。未用生成图补造产品。完整单图可放大，Sunlit 两图作为同一条待确认记录的图库。
- 新增英文名称、详情、图片 alt、产品和系列结构化数据、规格对应 Offer、社交分享图、canonical 和预渲染正文。没有伪造库存、评分、认证或供应商 SKU。五批核对页设置 noindex，未放入客户导航或 sitemap。
- 桌面目录头图区缩短为 310 px，筛选后对应主图随分类更新；修复手机端长产品名面包屑横向滚动，保留先前布局优化。
- WhatsApp 草稿包含产品／款式、规格链接、单价、MOQ 与已选数量；未知价格不再输出内部占位符。没有发送真实 WhatsApp 消息或邮件。

## 验证结果

- TypeScript：`pnpm run check` 通过。
- 单元／回归测试：**11 个测试文件，41 项通过**。外部邮件凭据测试 `server/resend.credentials.test.ts` 按项目规则排除，未发送邮件。
- 生产构建：`pnpm run build` 成功，生成 **57 个预渲染页面**（52 产品＋5 公共页面）。保留现有主 JS 体积警告约 570 kB，不影响构建；未隐藏该警告。
- 本地生产服务：`http://localhost:3001`。57 条页面路由逐一 HTTP 200，原始响应与构建 HTML 一致；每页一个 H1、正式域名 canonical、产品 SEO 分享图、有效 schema。Sitemap 57 条，未含待确认核对页。
- 检查图片文件、响应式尺寸路径、核对页原图链接，无缺失；HTML 与解码后的 WhatsApp 链接无内部 `[TO CONFIRM]` 占位符。
- 390×844 手机及 1440×1000 桌面检查：产品图比例、分类筛选、选款／规格、数量输入、长标题与放大图正常；检查页面无水平溢出，未发现加载失败图片。
- 金额与限制实际浏览器验证：502 mL 2 瓶 US$5.98；GlutaGlow 6 件 US$17.94、12 件 US$35.88，5 件禁用；OLAY 12 件 US$36.00，5 件禁用；US$4.99 身体霜 12 件 US$59.88，MOQ 现已由用户确认 6 pieces；US$5 香水 2 件 US$10.00、12 件 US$60.00，1 件禁用。具体晚霜／600 mL 名称及数量正确进入 WhatsApp 草稿。

详细路由检查结果：`preview-validation.json`。该交付仅供预览，未执行正式发布。

