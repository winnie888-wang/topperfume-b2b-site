# TopPerfume 最终预览交付 · 2026-09-11

状态：本地未提交修改 + 本地生产构建预览。未 push、未云端部署、未正式上线。分支：`feat/website-optimization-body-lotion`。保留已有修改与 Git 远程关联。

## 预览

- [最终图文验收表：五组对照、12 条容量、全部资料缺项及35张图片用途](http://localhost:3001/previews/final-acceptance.html)
- [首页](http://localhost:3001/)
- [香水](http://localhost:3001/collections/fragrance/) / [护肤](http://localhost:3001/collections/skincare/) / [彩妆](http://localhost:3001/collections/makeup/)
- [BC-01 500 mL](http://localhost:3001/products/daily-niacinamide-body-lotion/) / [BC-02 500 mL](http://localhost:3001/products/luminous-glow-body-wash/)
- [502 mL 维C身体乳](http://localhost:3001/products/vitamin-c-body-lotion-502ml/) / [Qahwa 香水](http://localhost:3001/products/lattafa-khamrah-qahwa/)
- [联系页](http://localhost:3001/contact/)

以上地址用于当前电脑。手机验收截图为浏览器模拟390px视口，不是已部署的手机外网地址。关闭本地服务后需重启，不能在另一台设备直接用 localhost 打开。

PowerShell 重启已有构建预览（在项目目录中）：
```powershell
$env:NODE_ENV='production'
$env:PORT='3001'
$env:INQUIRY_ENABLED='false'
$env:SITE_INDEXABLE='false'
node dist/index.js
```

## 本轮完成

- BC-01、BC-02：500 mL、USD 2.99/件、MOQ 6；BC-03：500 mL、USD 2.99/件、MOQ 6；BC-04：283 g、USD 4.99/件、MOQ 6；BC-05：473 mL、USD 4.99/件、MOQ 6。
- BC-01 的规格和 MOQ 独立生效，不依赖 B05-01 同款关系。原有23产品保留；当前52个产品/系列页。502 mL 维C仍为 USD 2.99/瓶、MOQ 2，原444 mL独立保留。
- 五批35图哈希及用途已核实，图片数5/11/7/5/7，对应页面数5/11/7/2/4；最后两批待确认2/3条。多瓶合照以单品或容量选择处理，未误建套装。
- 采购数量组件复用原产品已确认价格和 MOQ，保留原详情规格；WhatsApp与邮件摘要包含规格、单价、数量、小计。服务端重新从产品目录核对参数，拒绝低于MOQ、非整数或未选规格的请求。
- 完成首页与低MOQ页面贸易/采购措辞，增加联系入口，补首页图标链接的可访问名称，保留正常设计。
- 预览HTML、robots和本地响应头禁止索引；正式canonical保留topperfume.cn；联系页进入预渲染与sitemap；本地缺失页面/图片返回404。
- 复用GA4 G-4BX79STS9F；预览不发送统计。WhatsApp仅为点击事件；表单仅在服务接受后记录inquiry_submit_success，不把它当真实有效询盘，也不发送个人联系信息到统计事件。

## 验证与边界

- TypeScript与最终生产构建通过；58个公开预渲染页面（52产品+6公共页），另有404页。
- 复用中断前41项完整回归与7项新增测试结果；最后措辞落盘后重跑受影响的4文件23项测试，全部通过。未运行真实邮件凭据测试。
- 复用手机375/390/430、平板768/1024、桌面1440px共54组布局检查：未发现横向溢出或按钮越界。本次保存首页、香水分类、BC-01详情的桌面/手机6张最终截图。
- 本次只针对8个重点页面补验：HTTP/元数据/原始正文/noindex/404通过；61个图片与脚本资源、23个站内链接无缺失。报告：`final-preview-validation.json`。未重复全站扫描。
- 实际浏览器草稿：BC-01 6件17.94美元、12件35.88美元；5件按钮禁用；表单默认继承12件且最小值6；600mL选项/12件35.88美元；Qahwa2件10美元且容量待确认、无伪造选择项；502mL2瓶5.98美元。均标明小计不含运费税费。记录：`final-inquiry-browser-checks.json`。
- 邮件缺配置、停用、服务失败和成功反馈逻辑用模拟响应测试，未发送真实邮件/WhatsApp；真实送达、垃圾箱、回复路由尚未验证。
- 构建保留主JS约582kB（gzip约167kB）体积提示，不影响构建；不在本轮追加性能重做。

## 最终待确认与发布影响

图片、编号和逐项资料缺项见最终验收页及 `final-product-audit.json`（含原产品共46条有已记录缺项的页面记录）。以下12条仅指本次总包容量，不表示旧产品所有资料都齐全。总包MOQ缺项为0。

| 编号 | 产品 | 缺项 / 发布影响 |
|---|---|---|
| B02-02 | Khadlaj Hareem Al Sultan | 主瓶容量；剂型另需确认。仅影响该产品规格/最终报价 |
| B02-06 | HOBBY Fresh Care Pure Orchid Shower Gel | 容量；仅影响该产品 |
| B02-08 | St. Ives Soothing Oatmeal & Shea Butter Body Lotion | 清晰容量标签；仅影响该产品 |
| B02-09 | St. Ives Softening Coconut & Orchid Body Lotion | 清晰容量标签；仅影响该产品 |
| B02-10 | Garnier Bright Complete Vitamin C Body Serum Lotion | 容量；仅影响该产品 |
| PF-02 | Lattafa Bade’e Al Oud Sublime | 容量；浓度/香调另待资料。仅影响该产品 |
| PF-03 | Lattafa Khamrah Qahwa | 容量；浓度/香调另待资料。仅影响该产品 |
| PF-04 | Lattafa Khamrah | 容量；浓度/香调另待资料。仅影响该产品 |
| PF-07 | French Avenue Liquid Brun | 容量；浓度/香调另待资料。仅影响该产品 |
| B05-01 | Daily Niacinamide Body Lotion（粉瓶） | 容量和同款关系，暂不新增页面；不阻塞BC-01 |
| B05-02 | Cocoa Radiant Body Gel Oil | 容量；仅影响该产品 |
| B05-07 | Calm Healing Body Lotion | 容量；仅影响该产品 |

| 新记录 ↔ 原记录 | 产品 | 待确认 |
|---|---|---|
| B04-03 ↔ B02-01-05 | Gluta Ceramide | 品牌/确切类型/背标/SKU |
| B04-04 ↔ B02-01-03 | Sunlit Glow Gel Oil / Body Oil | 剂型、包装、SKU是否同款 |
| B05-01 ↔ BC-01 | Daily Niacinamide | 粉瓶与白瓶是否同款；粉瓶容量 |
| B05-04 ↔ B02-01-01 | Vitamin B3 Body Oil | 品牌/背标/SKU |
| B05-05 ↔ B02-01-02 | Cocoa Radiant Body Oil | 新旧瓶型/标签/品牌/SKU |

这五组只阻止对应新候选页发布/合并，不阻止原记录或其他已确认产品。新报价保留USD2.99、MOQ6，不覆盖原USD3系列。容量未知的已接入商品可保留明确待确认的询价展示，但不承诺未确认规格。供应图片中的未证明功效/UV等声明需证明材料或替换图片后再正式发布相关产品，尤其BC-01–03及502mL供应素材；原资料未补造。

| 范围 | 发布前待完成事项 | 影响 |
|---|---|---|
| 整站发布 | 用户统一验收与正式上线授权；确认Vercel项目、topperfume.cn域名/DNS、Production环境；正式构建索引配置 | 当前不能直接当作已上线正式站 |
| 整站业务内容 | 未发现现有隐私、运输、退换及交易政策页面；需业务方提供适用政策/联系资料，并确认公开联系方式 | 正式发布前内容待办；本轮未编造政策 |
| 邮件表单 | RESEND_API_KEY、已验证发件域/INQUIRY_FROM_EMAIL、收件邮箱与投递验证；当前本地均无邮件凭据，INQUIRY_ENABLED=false | 阻止邮件表单正式收件；不阻止商品浏览或WhatsApp草稿 |
| 联系账号 | WhatsApp +86 190 6678 2710、邮箱 melody888666@yeah.net 的归属与销售接收确认 | 影响询盘接收的运营可靠性；本轮只保留并核对代码配置 |
| 统计 | GA4账号访问、数据流、增强型衡量/后台转化口径核对；真实有效询盘需销售判定 | 不阻止页面上线，但阻止声称统计/有效线索已验证 |
| 产品资料 | 12容量、5同款、SKU/INCI/香调/库存/交期/样品/定制和图片声明资料 | 仅影响对应商品的最终规格、报价或宣传发布 |

## 后续发布步骤（本轮未执行）

1. 用户统一验收，集中处理需要先解决的政策、账号及相关产品素材问题。
2. 审阅现有分支全部差异与生成的api/index.js，提交并按仓库流程合并；部署前保留可回滚版本。
3. 在Vercel Preview环境继续保持SITE_INDEXABLE=false、INQUIRY_ENABLED=false。在Production环境单独配置域名、邮件服务；仅确认正式上线时SITE_INDEXABLE=true重新构建，邮件配置验证后才启用INQUIRY_ENABLED=true。
4. 正式构建产物移除内部`previews`验收页面；noindex不是访问权限控制。核对现有Vercel SPA回退（当前仍回退首页）与正式404策略；本轮只验证了本地404，没有声称云端404已验证。
5. 正式部署后核对DNS/HTTPS、canonical、robots/noindex解除、sitemap、产品数据、GA4后台与邮件收发；真实测试邮件另取得明确授权。本轮没有执行任何正式部署或发送。

本轮停止修改，等待统一验收。
