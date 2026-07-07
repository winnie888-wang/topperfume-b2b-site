# Cloudflare R2 素材库配置指南

R2 不建议放网站代码，网站代码部署在 Vercel。R2 更适合放：

- 产品图片
- 目录册 PDF
- 工厂视频
- 产品规格书
- 客户案例图片
- 大尺寸宣传图

## 推荐结构

Bucket 名称：

```text
topperfume-assets
```

R2 内目录：

```text
brand/favicon.svg
brand/topperfume-logo.svg
img/hero-veloria-beauty.svg
img/p01-veloria-bloom-edp.svg
catalog/topperfume-catalog.pdf
video/factory-tour.mp4
```

## 绑定公开素材域名

推荐域名：

```text
assets.topperfume.cn
```

在 Cloudflare：

```text
R2 → 选择 bucket → Settings → Custom Domains → Add
```

添加 `assets.topperfume.cn`。

## 在网站启用 R2 素材域名

上传 `assets/img` 和 `assets/brand` 里的文件到 R2 后，打开：

```text
assets/js/config.js
```

把：

```js
r2AssetBase: ""
```

改成：

```js
r2AssetBase: "https://assets.topperfume.cn"
```

网站会自动把页面上的 `assets/img/...` 图片切换到 R2 地址：

```text
https://assets.topperfume.cn/img/xxx.svg
```

## 第一版是否必须用 R2？

不必须。第一版产品图不多时，直接放在 GitHub/Vercel 就可以。等后续你上传大量产品图片、目录册、视频，再迁移到 R2 更合适。
