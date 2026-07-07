# TopPerfume Beauty Labs 独立站网站包

这是一个适合 GitHub + Vercel + Cloudflare R2 + Namecheap 的静态 B2B 独立站。

## 网站定位

**不是普通工厂网站，而是有国际美妆品牌感的 B2B 定制官网。**

主营方向：

- Perfume 香水批发与定制
- Makeup 彩妆批发与定制
- Skincare 护肤品批发与定制
- Gift Sets 礼盒套装定制
- Private Label / OEM / ODM

## 已配置资料

- 域名：`topperfume.cn`
- WhatsApp：`+86 190 6678 2710`
- WhatsApp 跳转号码：`8619066782710`
- 邮箱占位：`sales@topperfume.cn`
- 站点类型：静态 HTML/CSS/JS，可直接部署 Vercel
- R2：支持后期把图片、目录册、视频等大文件放到 Cloudflare R2

## 文件结构

```text
.
├── index.html              # 首页
├── collections.html        # 产品集合页
├── custom-service.html     # 定制服务页
├── factory.html            # 工厂实力页
├── case-studies.html       # B2B案例页
├── contact.html            # WhatsApp询盘页
├── assets/
│   ├── brand/              # Logo与favicon
│   ├── css/styles.css      # 全站样式
│   ├── img/                # 原创SVG产品图/案例图
│   └── js/
│       ├── config.js       # WhatsApp与R2配置
│       └── main.js         # WhatsApp跳转、筛选、表单逻辑
├── data/products.json      # 产品数据参考
├── r2-assets-manifest.json # R2素材规划
├── vercel.json             # Vercel配置
├── robots.txt
├── sitemap.xml
└── CNAME
```

## 修改 WhatsApp

打开：

```text
assets/js/config.js
```

修改：

```js
window.TOPPERFUME_CONFIG = {
  whatsappNumber: "8619066782710",
  r2AssetBase: ""
};
```

## 本地预览

```bash
python3 -m http.server 3000
```

然后打开：

```text
http://localhost:3000
```

## 部署步骤

详细见：`DEPLOYMENT.md`

## R2 使用建议

第一版可以直接用本地 `assets/img` 图片部署到 Vercel。后期产品图、目录册 PDF、视频变多后，再把这些大文件上传到 Cloudflare R2，并用 `assets.topperfume.cn` 作为素材域名。

详细见：`CLOUDFLARE_R2_GUIDE.md`


## Latest product update

Added 11 private-label perfume product concepts with reference wholesale price **US$15 / pc** and WhatsApp inquiry buttons. The uploaded luxury-brand references were converted into original TopPerfume-style private-label concepts; third-party brand names/logos are not used as public product names.


## Latest skincare product update

Added 7 original private-label skincare/makeup product concepts based on the latest reference styles, with reference wholesale price **US$1.50 / pc** or **US$1.50 / pack**. Perfume concepts remain **US$15 / pc** or **US$15 / set**.

Public website assets do not use third-party brand names/logos from the reference photos; they are converted into TopPerfume-style private-label concepts for safer B2B presentation.


## Product Price Update
- Perfume reference price: US$15 / pc
- Skincare reference price: US$1.50 / pc or pack
- Lipstick and eyeshadow reference price: US$8 / pc or palette


## Updated pages

This package includes enhanced `about.html`, `contact.html` and `faq.html` pages for a B2B private label beauty website. The contact form opens WhatsApp directly and includes name, company, email, phone, product category, quantity, target market and custom requirement.


## Latest page additions

This package now includes a dynamic `product-detail.html` page and support policy pages:

- `product-detail.html?id=tp-perfume-01` — dynamic product detail page for all products in `data/products.json`
- `support.html` — support center for catalog, samples, customization and order questions
- `warranty.html` — B2B product quality support policy
- `shipping-policy.html` — sample and bulk order shipping policy
- `returns-policy.html` — customized order returns and replacement support policy

Product cards on the homepage and Collections page automatically show a **View Details** button and a **Get Quote on WhatsApp** button.


## Google SEO Upgrade

This package includes static product pages, SEO landing pages, blog/resource pages, structured data, canonical tags, sitemap.xml, image-sitemap.xml and robots.txt. See `GOOGLE_SEO_GUIDE.md` for deployment and Google Search Console steps.
