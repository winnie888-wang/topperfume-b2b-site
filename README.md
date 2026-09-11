# TopPerfume Beauty B2B

本轮最终交付（2026-09-11）见 `docs/final-handoff.md`。最新图文验收表：`http://localhost:3001/previews/final-acceptance.html`。当前仅为本地修改和本地生产构建预览，未提交、推送或正式上线；此前文档中的旧验证数量按历史记录保留。

预览构建默认 `noindex,nofollow`，robots 禁止抓取。邮件发送默认关闭（`INQUIRY_ENABLED` 未明确设为 `true` 时不发送）。正式发布必须在单独的 Production 配置中核对 `SITE_INDEXABLE=true`、邮件服务、政策和账号，不能直接将预览配置当正式配置。

现有网站使用 React 19、TypeScript、Vite 7、Wouter、Express 和 tRPC。部署配置沿用 Vercel。当前工作分支已接入五批产品资料及 502 mL 身体乳，仅供本地预览，尚未发布。

## 开发与验证

使用 Node.js 22.12+ 或 24，以及项目指定的 pnpm 10.4.1。保留 `pnpm-lock.yaml` 和 Wouter 补丁。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm exec vitest run --exclude server/resend.credentials.test.ts
pnpm build
```

`pnpm dev` / `pnpm start` 的现有环境变量写法适用于 POSIX shell。Windows PowerShell 使用：

```powershell
$env:NODE_ENV = 'development'
node --import tsx server/_core/index.ts
```

构建后在 PowerShell 查看生产产物：

```powershell
$env:NODE_ENV = 'production'
node dist/index.js
```

默认端口为 3000，以终端实际输出地址为准。开发环境使用 Vite 中间件；生产构建生成 `dist/public`、`dist/index.js` 和受版本控制的 `api/index.js`。构建会重写 `api/index.js`，提交前应检查其差异。

`server/resend.credentials.test.ts` 需要实际邮件服务凭据并访问外部服务，不能当作普通离线单元测试。产品浏览无需这些凭据。可选服务配置按对应服务器模块设置，密钥仅放在部署环境或被 Git 忽略的本地配置中。

## 页面和数据

| 页面 | 路径 |
|---|---|
| 首页 | `/` |
| 香水、护肤、彩妆目录 | `/collections/fragrance`、`/collections/skincare`、`/collections/makeup` |
| 身体乳筛选入口 | `/collections/skincare?type=body-lotion` |
| 低起订量香水 | `/low-moq-perfume-manufacturer` |
| 新品 | `/products/vitamin-c-body-lotion-502ml` |

- `client/src/data/products.ts`：52 个产品／系列页面（含 16 个身体乳页面）；`slug` 为路由标识，供应商 SKU 未知时省略。原有 444 mL 维C身体乳独立保留。
- `client/src/data/business.ts`：联系方式、产品商业类型、采购条件和 WhatsApp 文本。库存、样品与定制能力不应从分类自动推断。
- `client/src/components/ProductGallery.tsx`：图库、缩略图和可访问的放大对话框。
- `client/src/components/ProductPurchase.tsx`：有数值价格的产品数量询价，支持件／瓶、款式及规格选择、已知 MOQ 校验和未知 MOQ 的可选数量；502 mL 身体乳每瓶 US$2.99、2 瓶起订。小计不包含待确认的运费与税费。
- `client/public/assets/products/vitamin-c-body-lotion-502ml/`：四张供应图片的 WebP 尺寸版本，保持画面内容、瓶身和标签完整，不裁切；160 px 缩略图、480/800/1254 px 正图。事实与素材来源记录见 `docs/vitamin-c-502ml-product-facts.json`。
- 原有产品图片继续使用 `client/src/data/publicAssets.ts` 的 Vercel Blob 路径。新品采用已有 `client/public/assets` 静态文件管线，无需增加 Blob 上传配置。

## 询价、SEO 和素材说明

主要采购入口打开现有 WhatsApp 联系方式的预填草稿，不代表已下单或已收到询盘。点击只记录 `whatsapp_click`，不再同时发送 `generate_lead`。相关报表应将历史点击口径与实际收到的线索分开。GA4 网络加载仅在正式域名启用，本地和 Vercel 预览不向生产统计发送浏览数据。

`shared/seo.ts` 统一 canonical 为 `https://topperfume.cn`。`scripts/generate-seo-pages.mts` 生成页面元数据、站点地图及 robots；`scripts/prerender.tsx` 复用页面组件生成正文，使构建后的页面在 JavaScript 执行前已有可读产品内容。客户端挂载后接管交互，沿用现有 SPA 架构。

整体风格沿用 Maison Mercantile 的奶油白、深梅色与现有字体。四张新品图属于同一产品，双瓶图不是套装报价；主图为基于供应图片的数字处理图，附图中的成分、质地和功效文字没有独立证明材料，页面不据此扩展承诺。历史原型说明保留在 `docs/original-prototype-readme.md`，其页面范围和“表单不发送”描述不代表当前实现。

五批产品的逐项接入清单、5 处同款待确认、缺失参数与验证结果见 `docs/combined-listing-preview.md`。前一轮 502 mL 交付记录保留在 `docs/preview-changes.md`。

新增资料分别位于 `client/src/data/combinedListing.ts`（前三批）及 `client/src/data/latestListing.ts`（后两批可确认的不同产品），通过主产品数组加载。5 条疑似同款只进入 `docs/pending-listing-matches.json` 和 `client/public/previews/combined-listing-review.html`，确认身份之前不能机械导入或覆盖报价。

当前本地生产构建预览端口为 3001，开发预览为 3000。查看 `/previews/combined-listing-review.html` 可按五批核对全部 35 张图片。核对页标记 noindex，不属于客户产品目录，正式发布前需另行处理预览资料。
