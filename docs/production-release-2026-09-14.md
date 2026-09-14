# 正式发布准备与决定执行 — 2026-09-14

仅 TopPerfume。用户已授权合并及 Production；最终实际附件为 `TopPerfume_发布决定答案 (3).json`，其答案及 SHA-256 记录于 final-release-decisions.json、final-publication-scope.json。没有使用旧 (1) 文件，没有操作 MELODY。

## 已落实

- 公开 38 页（香水 14、护肤 12、彩妆 12）；14 个已有页面按原建议逐项检查后暂缓，另 5 个候选继续不创建页面。完整编号、图片、原因见 final-publication-scope.md/json。未改已确认容量、价格、MOQ，未删记录或合并候选，原有 444 mL 与 BC-04 保留。
- 隐私客户正文 `/privacy`、footer 与询盘告知链接。公开地址只到白云区；本人业务访问及每周处理申请；询盘不构成订单或营销订阅。
- 未成交询盘从最后一次实质业务联系起 12 个月，到期人工复核删除。R-02 选择“后续配置自动提醒与人工复核”；提醒与邮箱记录连接仍为内部后续实施项，当前没有自动删除程序，不能声称已自动执行。
- 成交资料按财务分别确定期限。客户正文写订单、会计、适用义务和争议处理的必要性标准，不编造数字，不发布“待财务确认”等内部备注。
- GA4 基础同意：所有访客默认关闭；明确允许后才加载现有唯一标签；拒绝不发送无 Cookie 测量。广告相关同意始终 denied。可从 footer/隐私页重新选择，撤回立即设置 GA 禁发标记、清理可访问 GA Cookie 并重新加载。Preview/localhost 即使允许仍不加载。
- 营销保持关闭、无订阅入口、无营销名单导入、无营销邮件。已批准未来方案：独立默认不勾选 + 二次邮件确认；每月最多 2 封；无需登录退订 + 公开邮箱备用入口；退订后 12 个月复核同意记录；营销持续期间保留最小阻止记录。复用 Resend 前仍需实现和验证整套能力，不采购、不换密钥。
- Production 构建删除所有内部 previews 产物，未公开页面返回 404，不进入 sitemap；内部带图验收页只在 Preview 提供。

## 本轮必要验证

- 类型检查通过。
- 9 项新增定向自动测试通过：公开范围保留/排除、444 mL/BC-04 保留、同意前拒绝、允许后单次加载、广告拒绝、撤回、Preview/localhost/noindex 保护、存储失败安全处理。测试模拟 DOM/传输，没有访问 GA4 或 Resend。
- Production 本地构建通过；原有 bundle 大小提示为非阻塞提示，没有扩展重构。
- 浏览器 375px 和 1440px：隐私内容、两种选择、重新打开、选择保存、刷新及 localhost 禁统计通过；无横向溢出、按钮完整。
- 复用既有产品、表单模拟端成功/失败/防重复、真实邮件送达记录；本轮不重复这些测试，不发送任何邮件。
- GA4 开发过滤器已 Active、调试事件接收曾验证；过滤传播后的正式报表效果仍待核对，不能写为已通过。

## 配置与回退

正式项目 `winnie9/topperfume-b2b-site`，`prj_4bTtZO7MSea1AHlXqvtYApYr5qBE`，域名 `topperfume.cn`。

发布前 main：`bab3a9eb6fa99e0cdb3371ba54ca84ae858a76fc`（本轮 GitHub 连接器重新核实）。发布前正式部署：`dpl_7KZmhScqdBDfLezr43kqLCHjdvjk` / `topperfume-b2b-site-aw643r50a-winnie9.vercel.app`，发布前再次核对平台实际指向。

新增普通配置：Production SITE_INDEXABLE=true、INQUIRY_ENABLED=true、INQUIRY_TO_EMAIL=melody888666@yeah.net；Preview SITE_INDEXABLE=false、INQUIRY_ENABLED=false。原有 RESEND_API_KEY / INQUIRY_FROM_EMAIL 保留且同时用于两环境，没有读取或显示密钥值、没有替换密钥。代码另有 Preview 禁发保护。原站部署在新发布前不会因配置保存自动改变。

回退时在 Vercel 恢复发布前 Ready 的 Production 部署并确认正式域名；配置不保证随部署回退，必要时恢复本轮新增开关（发布前这些三个 Production 开关未配置）。Git 用 revert 发布合并提交恢复源码，不 reset/强推。无数据库迁移。未执行回退演练，不声称已实际验证回退。

## 后续不阻塞当前限定范围发布

1. 财务按成交资料类型给出具体期限；到期提醒与实际邮箱记录的连接/执行核对。
2. 暂缓的 14 页补真实匹配规格/宣传依据，5 个候选补香味与各自图片；逐项满足后才恢复。
3. 营销全流程实现及独立验收后才启用，仍不自动向旧询盘客户发送。
4. GA4 开发过滤报表传播效果核对。技术依据：[Google 基础同意模式](https://developers.google.com/tag-platform/security/concepts/consent-mode)。

本文件记录准备及验证；最终部署 URL、提交和在线冒烟结果见发布回执，不以准备记录替代上线成功证据。
