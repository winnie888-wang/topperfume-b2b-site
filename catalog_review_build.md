# Latest Catalog Sync & Review Build

> **审核状态：** 新增 SKU 与 SEO 工作已暂停。本报告仅覆盖当前对话中已确认的正式产品目录；全部改动限定在 `v2-prototype`，不修改、不合并 `main`，也不正式发布。

## 审核入口与验证范围

| 项目 | 结果 |
|---|---|
| Preview URL | `https://3000-iqckto115tmtxd8ojbs9c-0d2fc275.us4.manus.computer` |
| 正式 SKU 总数 | **22** |
| Fragrance | **6** |
| Skincare / Body Care | **4** |
| Makeup | **12** |
| 旧 Prototype / `[NAME TO CONFIRM]` | 已从公开 `products` 数据、三类目录与相关映射中移除；公开目录扫描结果为 **0**。 |
| 检查结果 | `pnpm run check` 与 `pnpm run build` 通过；仅保留既有 Vite chunk-size 警告。 |
| 已复核画面 | Homepage Desktop、Homepage Mobile、Fragrance Collection、Skincare / Body Care Collection、Makeup Collection，以及 Fragrance、Skincare / Body Care、Makeup 各一个正式 PDP。 |

## 当前正式目录

| 类别 | SKU | 正式产品名称 |
|---|---|---|
| Fragrance | `FR-DI-SAU-100` | Dior Sauvage Parfum Spray for Men |
| Fragrance | `FR-CH-GGBT-080` | Carolina Herrera Good Girl Blush Tweed Talk Eau de Parfum for Women |
| Fragrance | `FR-CH-VGGG-080` | Carolina Herrera Very Good Girl Glam Eau de Parfum for Women |
| Fragrance | `FR-YSL-MP-001` | Yves Saint Laurent Mon Paris Parfum for Women |
| Fragrance | `FR-VS-BV-250` | Victoria’s Secret Bare Vanilla Body Fragrance Mist |
| Fragrance | `FR-SET-PS-250236` | Pure Seduction Fragrance Mist & Lotion Set |
| Skincare / Body Care | `SK-BL-VC-444` | Vitamin C + Niacinamide Brightening Body Lotion |
| Skincare / Body Care | `SK-BL-RET-444` | Retinol + Ferulic Acid Firming Body Lotion |
| Skincare / Body Care | `SK-BL-OLAY-AHA-502` | Olay Dark Spot Correcting Body Lotion |
| Skincare / Body Care | `SK-BL-JER-UH-946` | Jergens Ultra Healing Body Lotion |
| Makeup | `MU-LIP-OIL-001` | Vegan Hydrating Lip Oil Gloss |
| Makeup | `MU-LG-002` | Hydrating Mirror-Shine Lip Glaze |
| Makeup | `MU-EYE-MOCHA-009` | Mocha Chocolate 9-Shade Eyeshadow Palette |
| Makeup | `MU-LIP-GLOSS-003` | Radiant Glow Moisturizing Lip Gloss |
| Makeup | `MU-LIP-BRACELET-004` | 2-in-1 Bracelet Lip Gloss Palette with Mirror |
| Makeup | `MU-EYE-ULT-016` | 16-Shade Vegan Pressed Powder Eyeshadow Palette |
| Makeup | `MU-FACE-CON-008` | 8ml Lightweight Hydrating Liquid Concealer |
| Makeup | `MU-BROW-SET-003` | 3-in-1 Deluxe Brow Definition Set |
| Makeup | `MU-FACE-PAL-016` | 16-Color Multi-Use Complexion Palette |
| Makeup | `MU-FACE-BLUSH-002` | 2-in-1 Blush Duo Palette |
| Makeup | `MU-FACE-STICK-005` | Creamy Contour & Foundation Stick |
| Makeup | `MU-FACE-CONTOUR-012` | 12-Color Face Contour & Correcting Palette |

## 商业与询盘路径

每个正式 SKU 都已保留已确认的产品名称、SKU、类别、真实目录视觉、价格、MOQ、交期、已确认时的规格/容量、卖点及产品详情。产品卡与 PDP 均通过既有的 **Request Sample、Get Quote、Start Project 和 WhatsApp** 路径传递产品名称、产品 URL、类别及 SKU 专属商业资料。所有未确认字段继续明确显示为 `[TO CONFIRM]`，不以默认值或概括性描述替代。

## Remaining `[TO CONFIRM]` List

| 范围 | 仍待确认资料 |
|---|---|
| Fragrance | Good Girl Blush Tweed Talk 的 Key Notes；Very Good Girl Glam 与 Bare Vanilla 的 Remaining Notes；Mon Paris 的 Size / Volume；Pure Seduction Set 的 Fragrance Notes、Ingredients、Private Label、Custom Logo、Custom Packaging、Custom Fragrance 与全部 Customization MOQ。 |
| Skincare / Body Care | Vitamin C + Niacinamide Lotion 的 Texture、Skin Type、Fragrance、SPF；Retinol + Ferulic Lotion 的 Price、MOQ、Texture、Skin Type、Fragrance；Olay Lotion 的 MOQ、Fragrance；Jergens Lotion 的 Price、MOQ、Fragrance。 |
| Makeup — 通用 | 多数 SKU 的 Net Weight / Volume 或 Format、Ingredients、精确 Shade Names / Codes、Private Label / Custom Logo / Custom Packaging / Custom Shades、Customization MOQ 仍需逐 SKU 书面确认。 |
| Makeup — 妆效与认证 | 需要确认的项目包括 Concealer、Complexion Palette、Blush Duo、Contour Stick 与 12-Color Contour Palette 的 Finish / Coverage / Texture（按 SKU 适用）；各盘类的 Individual Pan Weight；两款 Vegan 定位产品的 Vegan Certification。 |
| Product 22 特别边界 | Formula Structure、Finish、Coverage、Texture、Individual Pan Weight、Ingredients、Shade Names / Codes、Vegan Certification、Custom Logo、Custom Outer Packaging、Custom Shade Combination 与 Customization MOQ 均继续为 `[TO CONFIRM]`；不得定义底部三格的统一配方或用途。 |

## 最终审核前状态

正式目录现已只呈现已确认产品，并维持 Maison Mercantile 的象牙目录版画、采购层级和真实视觉边界。此次是审核构建，不构成发布；等待最终审核指示后再决定是否进入下一阶段。
