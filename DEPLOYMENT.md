# GitHub + Vercel + Namecheap 部署指南

## 1. 上传到 GitHub

1. 登录 GitHub。
2. 新建仓库，例如：`topperfume-b2b-site`。
3. 上传本网站包中的全部文件，不要只上传 zip。
4. 确保根目录可以看到：`index.html`、`vercel.json`、`assets/`。

## 2. Vercel 部署

1. 登录 Vercel。
2. 点击 **Add New Project**。
3. 选择你的 GitHub 仓库。
4. Framework Preset 选择 **Other** 或默认静态站。
5. Build Command 可以留空，或使用：`npm run build`。
6. Output Directory 留空或填 `.`。
7. 点击 Deploy。

## 3. Vercel 绑定域名

在 Vercel 项目中进入：

```text
Settings → Domains
```

添加：

```text
topperfume.cn
www.topperfume.cn
```

Vercel 会提示你需要添加的 DNS 记录。以 Vercel 后台显示为准。

## 4. Namecheap DNS 设置

如果你的 DNS 仍然由 Namecheap 管理：

进入：

```text
Namecheap → Domain List → topperfume.cn → Manage → Advanced DNS
```

常见配置如下：

| Host | Type | Value |
|---|---|---|
| @ | A Record | 76.76.21.21 |
| www | CNAME Record | cname.vercel-dns.com 或按 Vercel 后台提示 |

注意：最终值以 Vercel 项目 Domains 页面提示为准。

## 5. 推荐：把 Namecheap Nameserver 改到 Cloudflare

因为你还要用 Cloudflare R2，推荐后期把域名 DNS 托管到 Cloudflare：

1. 在 Cloudflare 添加 `topperfume.cn`。
2. Cloudflare 会给你 2 条 nameserver。
3. 到 Namecheap 的 Nameservers 里改成 Cloudflare 提供的 nameserver。
4. 在 Cloudflare DNS 里添加 Vercel 的 A / CNAME 记录。
5. 后期添加 R2 素材域名 `assets.topperfume.cn`。

## 6. 上线后检查

- 首页是否打开：`https://topperfume.cn`
- `www.topperfume.cn` 是否能跳转或正常打开
- WhatsApp 按钮是否打开你的号码
- 表单提交后是否跳转 WhatsApp
- 手机端底部 WhatsApp 悬浮按钮是否正常
- `https://topperfume.cn/sitemap.xml` 是否可访问
- `https://topperfume.cn/robots.txt` 是否可访问
