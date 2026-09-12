# 发布候选与回退方案

候选标识：TopPerfume-RC-2026-09-12。分支 `feat/website-optimization-body-lotion`。本轮 Git 提交及 Preview 部署编号记录在 `cloud-preview-handoff.md` 最新条目。候选已通过类型检查、13 项受影响测试、生产模式构建及模拟网页表单验收；仍需隐私答案和正式展示范围确认后才能作为最终上线版本。

## 保留的回退基线

- 修改前分支源提交：`a3921bad340b72ec2d6b439d5af9ecb4f6de182b`。
- 原正式 main：`bab3a9eb6fa99e0cdb3371ba54ca84ae858a76fc`。
- 原正式部署：`dpl_7KZmhScqdBDfLezr43kqLCHjdvjk`，`topperfume-b2b-site-aw643r50a-winnie9.vercel.app`。
- 现有项目：`winnie9/topperfume-b2b-site`；正式域名 `topperfume.cn`。
- 本轮不改这些正式状态，不新建/替换 Resend 密钥，无数据库迁移。

## 本轮 Preview

仅部署当前分支到已有 Vercel 项目的 Preview，保持 `SITE_INDEXABLE=false`、`INQUIRY_ENABLED=false`。代码另有 `VERCEL_ENV=preview` 禁发保护；沿用现有访问登录限制。发布资料只存仓库 docs，不加入公开客户导航。QA 模拟脚本只允许显式本地启动，不成为线上接口。

## 未来上线步骤（本轮不执行）

1. 接入经用户填写确认的隐私事实；落实逐项产品暂缓范围。保存未发布产品及旧规格历史，不删除或混合 SKU。
2. 用户统一批准最终候选。使用正常 GitHub 权限审核、合并至 main；只有明确授权才进行 Production 部署。
3. 在 Vercel 项目 Settings → Environment Variables 留存发布前配置清单/版本。密钥值仅留在平台，禁止放入文档或聊天。复用已验证邮件配置；正式开启表单时才设 Production 的 `INQUIRY_ENABLED=true`，收件仍为已确认销售邮箱。仅正式环境设可索引，Preview 继续双重禁发及 noindex。
4. 按用户统计选择启用已有 GA4 或关闭统计；不重新安装。区分按钮点击、表单接受与业务有效询盘。
5. 发布后只做部署相关冒烟检查：域名/关键页面、robots/canonical、静态资源、配置生效。不自动重发已验证的 TEST 邮件；新增真实发送仍需明确授权。

## 回退触发与操作

触发：关键页面无法访问、正式资料明显错配、询盘异常或误启用不应开放的功能。

1. 若涉及邮件/隐私风险，先在 Production 关闭 `INQUIRY_ENABLED` 并使变更部署生效；不要影响 Preview 禁发状态。
2. 在 Vercel Deployments 对发布前保留的正式部署执行平台回退/恢复正式域名指向，目标为上述 `dpl_7KZ...`。回退是未来正式操作，执行前按实际授权确认。
3. 环境变量可能不随部署回退自动恢复，按发布前平台记录逐项恢复；不创建或替换密钥。确认正式域名指向、索引和邮件开关符合回退方案。
4. Git 使用针对发布提交的 `git revert` 生成反向提交并走原审批流程，不用 reset/强推覆盖历史；旧 main 和本轮候选都保留。
5. 检查回退后的关键入口及错误恢复，记录部署编号和时间。无需再次发送真实 TEST 邮件。

平台回退本轮只准备步骤，没有执行演练或修改正式环境；不能声称已验证真实 Production 回退。已删除的临时真实邮件测试部署不得用作发布/回退目标。
