# TopPerfume Beauty B2B — V2 Prototype

这是 **TopPerfume Beauty B2B V2.0 的独立视觉原型**，用于在不影响 `main` 与正式网站的前提下，审核新的产品浏览、B2B 询盘与 Desktop/Mobile 体验。

## 原型范围

本分支仅包含以下五个可浏览页面：

| 页面 | 路径 | 目的 |
|---|---|---|
| Homepage | `/` | 产品主导的品牌叙事、三大品类入口与项目询盘。 |
| Fragrance Collection | `/collections/fragrance` | 以用户提供的真实香水产品图验证商品浏览体验。 |
| Skincare Collection | `/collections/skincare` | 验证护肤品类结构、采购字段与素材方向。 |
| Makeup Collection | `/collections/makeup` | 验证彩妆品类结构、采购字段与素材方向。 |
| Product Detail | `/products/jam-spill-fragrance-mist` | 验证产品参考、香调信息与项目询盘路径。 |

## 视觉与素材原则

网站采用 **Maison Mercantile** 方向：Porcelain Ivory 纸张底色、Plum Ink 结构色、Mineral Rose `#B86C6B` 采购信号，搭配 Cormorant Garamond 与 Manrope 字体。

Fragrance 使用用户已提供的真实产品摄影。Skincare 和 Makeup 当前仅使用已有包装方向视觉及生成的材料场景作为 **Concept visual**，页面已经明确标识；在下一步批量上架之前，应替换为各 SKU 的授权真实产品摄影。

## 交互边界

所有 “Request” / “Start a project” 操作均为**预览交互**。表单不会发送、保存或处理联系人信息。此阶段不包含产品批量上架、SEO 扩展、生产询盘对接或正式发布。

## 本地运行

```bash
pnpm install
pnpm dev
```

生产验证：

```bash
pnpm check
pnpm build
```
