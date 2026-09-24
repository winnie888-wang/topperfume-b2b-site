# TP-SEO-006 ARTICLE BRIEF

Research date: 2026-09-24. Version: Brief V1.0. Status: **BRIEF READY FOR REVIEW — NOT BODY / NOT PUBLICATION**.

Scope: First-Order Perfume Supplier Verification. Only TP-SEO-006 is addressed. No article body, publication package, route, metadata registry, sitemap, Production code, business-fact matrix or deployment is changed. TP-SEO-005 remains PUBLISHED / LOCKED; TP-SEO-007 is not started.

核心编辑判断：保留为**有条件的独立文章方向**。目标读者已经有候选供应商或正在询价，需要判断“哪些资料对应同一家公司、产品与订单，哪些条件还没有确认”。不重讲开品牌、首单选品、MOQ原理或样品比较。外部已有相当完整的核验指南，不能声称这是空白主题，或仅靠增加一张清单就有独特价值。

## Research baseline / 本轮已对照

- `content/buyer-guides/TP-SEO-001.md` 至 `TP-SEO-005.md`，以及 `shared/buyer-guides.json` 的当前文章身份、路径与关联信息。
- [REDDIT_GOOGLE_AI_CONTENT_INTELLIGENCE](REDDIT_GOOGLE_AI_CONTENT_INTELLIGENCE.md)：尤其 R10/R11/R12/R14、006候选和报价比较归002补充的决定。
- [Business Facts说明](BUSINESS_FACTS_SOURCE_OF_TRUTH.md)与[字段矩阵](BUSINESS_FACTS_SOURCE_OF_TRUTH.json)：当前 `rules`、`companyFacts`、`confirmedServiceTerms`。历史Phase 2.5未知值不能覆盖后续明确确认，服务数字也不覆盖SKU未知字段。
- 当前 Fragrance Category：`client/src/pages/Collection.tsx` 与 `client/src/components/PerfumeCommercial.tsx`。
- 当前 Low MOQ：`client/src/pages/LowMoqPerfume.tsx`；条款来源 `shared/perfumeCommercialTerms.ts`、`shared/businessPolicy.ts`。
- Sample-related Buyer Guide：TP-SEO-003全文。公司/交易入口对照 `client/src/data/business.ts`、`client/src/pages/Contact.tsx`。

页面内容以当前仓库源码为核对对象；本轮不宣称重新完成线上HTTP验收，也不把网站自述作为独立公司登记、品牌授权或收款账户证明。所有外部资料只服务选题与核验方法研究，不能升级为TopPerfume资质。

## 1. Working Title

**How to Verify a Perfume Supplier Before Your First Order**

工作副题方向：**Company Identity, Product Scope and Written Order Terms for Wholesale and Private Label**。

主标题同时容纳批发和独立私标项目。不要加入“best suppliers”“verified manufacturer”“100% safe”或“avoid every scam”等承诺。本轮不锁定发布用SEO Title、slug或meta。

## 2. Primary Keyword

**how to verify a perfume supplier**

这是根据查询意图与现有内容分工选择的工作关键词，不代表已验证搜索量、排名难度或流量预测。批发限定词作为第二层意图，避免标题把私标读者完全排除。

## 3. Secondary Keywords

- perfume supplier verification checklist
- verify wholesale perfume supplier
- private label perfume supplier verification
- questions to ask a perfume supplier before ordering
- perfume supplier company identity
- perfume quotation checklist
- wholesale perfume invoice checks
- perfume wholesaler vs authorized distributor
- perfume order confirmation checklist

正文围绕采购步骤自然使用，不逐词创建章节或同义页面。`wholesale perfume supplier`继续由Fragrance Category主承接；`private label perfume MOQ`继续由Low MOQ商业页承接。

## 4. Search Intent

**Commercial investigation / pre-order verification**：在选择交易对象、确认项目或接受报价前，核对身份、商品/项目范围、报价及收款/订单记录是否相互对应。

读者完成后的交付物应是一份“已经核对什么、证据在哪里、仍需谁答复”的记录，而不是“供应商已认证”的印章。

包含：公司与业务角色、品牌关系声明、SKU/版本、项目资格、报价包含项、时间起点、付款信息变更和书面确认。

排除：供应商排名/推荐目录、仿品鉴定教程、行业平均价格、企业信用评级、逐国合规教程、支付保障推荐、开品牌教程、收到货后的完整验货/索赔流程。

## 5. Target Buyer

| 买家 | 当前状态 | 本文帮助完成的决定 |
|---|---|---|
| 首次采购品牌成品的店主、转售商、小型批发商 | 有产品链接或社媒/聊天报价，尚未核对交易主体与SKU | 是否已获得对应这批货的身份、产品和交易说明 |
| 第一次做独立私标的品牌方/采购员 | 有Logo/香型/包装方向，尚未确认具体供给职责 | 谁负责销售、采购协调及项目各部分；什么范围已经被接受 |
| 负责首次跨境订单交接的采购人员 | 收集了网页、样品和报价，但信息分散 | 能否把同一订单的关键字段与批准版本连接起来 |

不将只想购买自有工厂直供的人自动定义为TopPerfume匹配客户。贸易/采购协调角色必须在前部说明；不将贸易商身份等同于风险，也不把制造身份等同于可靠性。

## 6. Funnel Stage

**Supplier shortlist → information verification → scope clarification → written quotation/order review**。

位于002的首单规划之后；可能在003样品评估前后往返。文章CTA只推动明确询盘，不暗示付款、订单成立或供应商已通过审核。

## 7. Reddit / Community Evidence

本轮只读公开讨论，未发帖、评论或联系任何人。发帖人的身份、报价和成交没有独立核验。相对时间与索引时间有不一致，本轮不复用旧票数，也不声称问题频率或市场规模。

| 来源与读取质量 | 实际买家信号 | 对Brief的影响 | 不可推出的结论 |
|---|---|---|---|
| R11：[Perfume wholesale supplier](https://www.reddit.com/r/smallbusiness/comments/1wfrhg5/perfume_wholesale_supplier/)；本轮读到原帖 | 小企业买家已获得社媒迷你香水报价，却不知道如何信任供货方 | 起点是“已经有报价，但还缺身份和商品信息”，不是供应商名单 | 原帖价格不是市场价格；不能判断该供应商真假或推荐回复中的公司 |
| R12：[Authentic fragrance supplier](https://www.reddit.com/r/wholesale_suppliers/comments/1wlpe9m/authentic_fragrance_supplier/)；本轮读到原帖 | 寻找designer/niche/Middle Eastern香水来源，关心真实性与供货方信誉 | 品牌关系与公司身份应分开核对 | 很多回复是供应商招揽；回复不能作为授权、真实性或独立口碑证据 |
| R14：[Private-label sourcing for Canada](https://www.reddit.com/r/Alibaba/comments/1w3p7h9/sourcing_lowmoq_privatelabel_perfume_for_canada/)；本轮读到原帖 | 首单研究者询问制造/贸易角色、整套报价范围、样品与批量对应资料；尚未取得工厂报价 | 006增加私标角色/责任分支；报价字段需对应项目版本 | 希望50–100件只是其目标；证件需求不是全球法定文件清单；明确不想要代理，与TopPerfume角色不完全匹配 |
| R10：[历史UK wholesaler讨论](https://www.reddit.com/r/smallbusiness/comments/1ghlez8/)；本轮正文抓取失败 | 旧情报记录有发票/转售凭证顾虑 | 仅作历史背景，不作为本轮新验证证据 | 不重复旧互动数、不把referral推荐算独立认可 |

R14及其跨版转帖只算一个需求。不得引用回复中的进口法律、样品表现或供应商资质作为已确认事实。社区支持的是“需要核验”，不证明TopPerfume拥有相应文件。

## 8. Google SERP Intent

**LIMITED_GOOGLE_SERP_EVIDENCE**：本轮使用普通网页搜索及直接竞争页面读取；尝试Google直接结果页未取得可读取结果。未固定国家/设备/登录状态，没有Google排名、PAA、搜索量、搜索难度或AI引用记录。

实际检索包括：

- `verify perfume wholesale supplier company invoice authenticity first order`
- `private label perfume supplier verification checklist quotation payment company`
- `site:reddit.com perfume wholesale supplier invoices authenticity first order`
- Google直接查询尝试：`how to verify a perfume supplier before first order`。

| 查询意图 | 本轮可见结果类型 | 编辑判断 |
|---|---|---|
| Wholesale supplier verification | 供应商核验文章、真实性清单、社区找货源帖子 | 信息核验意图明确，但有消费者验真和供应商推荐混入，需要B2B首单限定 |
| Private-label supplier verification | 制造商选择/审查指南、项目范围与文档问题 | 强项目准备意图；可以回答职责与范围，不能假冒制造商或照搬其能力 |
| Quote/payment/company checks | 付款前检查表、报价范围和交易资料内容 | 适合006单份订单信息核对；跨供应商A/B成本比较仍归002 |

这是基于结果样本的意图判断，**不是已证明的低竞争SEO机会**。未来发布前如需市场排名判断，应另外采集指定地区/设备SERP；本Brief不编造缺失数据。

## 9. Competitor Content Gap

| 页面 / 本轮证据 | 已经覆盖 | 006可争取的差异及边界 |
|---|---|---|
| [ARQUENOR：supplier verification](https://www.arquenor.com/blog/verify-authentic-perfume-wholesale-supplier/)；全文可读，页面标注更新2026-08-21 | 已讲身份、交易信息对应、商品细节、付款变化及品牌授权边界；普通核验链条并非本站首创 | 用TopPerfume已确认的贸易协调角色，明确分开品牌成品与独立项目，给买家逐字段记录未决事项的表；不声称竞品缺少身份/发票核验 |
| [Brandsamor：find a perfume manufacturer](https://www.brandsamor.com/knowledge-base/choose-private-label-perfume-manufacturer)；全文可读，页面标注更新2026-07-06 | 已覆盖项目需求、生产/外采职责、样品、文件与MOQ分项 | 006聚焦买家已选中的交易对象及单份订单信息核对；不做工厂能力清单，也不继承其生产设施/文件供应主张 |
| [ScentSource：before-payment checklist](https://www.scentsourceglobal.com/wholesale-perfume-buyer-checklist/)；只读到搜索摘要，正文cache miss | 摘要已列SKU/变体、包装、数量、价格、货运等字段 | 只能说明有直接竞争；不能据摘要断言它缺少完整表格或某一章节 |

**差异不是“别人没有checklist”，而是本文拟采用的组织方法：**为两种采购路线分别记录“卖方说法 → 适用商品/项目 → 对应资料 → 尚未确认项 → 下一步询问”。把相同字段在网页、样品引用、报价和订单记录中的差异显式留下，而不是给供应商一个笼统安全分数。

这属于编辑方案，不是已证实的竞争优势或供应商认证能力。当前没有获准公开的TopPerfume脱敏真实订单样本，因此不能宣传已有真实案例。若后续只写通用建议且不能完成该记录工具，独立文章价值不足，应降为002补充。

## 10. Buyer Questions

1. 网站品牌名、公司主体、报价主体和收款方分别是谁，如何解释它们之间的关系？
2. 对方是制造商、贸易商、批发商还是采购协调方？谁对本次供给和沟通负责？
3. 公司登记或一个联系账号能证明什么，为什么不能直接证明商品或履约能力？
4. “卖这个品牌”和“该品牌授权经销商”是否有分别对应的证据？
5. 网页、样品、报价中的产品名、SKU、容量、香型/版本、单位是否一致？
6. 产品页面存在、样品可申请或价格已标注，是否意味着目标数量已经有库存？
7. MOQ针对哪条采购路线、哪个SKU/版本或项目？私标资格是否明确获确认？
8. 样品供应什么、收多少样品费与运费，它代表拟购范围的哪些部分？
9. 瓶/盖/喷头/盒/标签、Logo及香味工作是否全部在本次报价范围内？
10. 哪些收费被包含、排除或仍待报价？未知费用是否被误当成零？
11. 谁支付运费，报价覆盖到哪里，还有哪些运输/税费责任需书面确认？
12. 所谓lead time从何时开始，指项目生产、发出还是到货？
13. 收款信息或币种突然改变时，如何通过独立核对的已有通路再确认？
14. 最终应保存哪份报价版本、书面确认、订单及付款记录？
15. 出现冲突时，是补充资料、修订范围，还是暂缓作出付款决定？

## 11. Recommended H2/H3 Outline

以下只定义结构与编辑任务，不是英文正文。建议主线围绕读者决策，避免每个关键词一个章节。样品、MOQ与成本解释合计保持为支持性短段，详情移交现有文章。

| 拟H2 | 拟H3 | 必须完成的编辑任务 / 边界 |
|---|---|---|
| Identify who you are buying from | Match the trading name to the company and sales contact; Separate the seller's role from its claims | 区分品牌、公司和业务角色；登记查询只用于对应身份，不能认证货物或TopPerfume资质 |
| Separate branded wholesale from a private-label project | Verify the claim about the brand relationship; Confirm who supplies and coordinates the custom scope | 两条路线各自要问什么；不把现成品牌SKU变成可改Logo的项目 |
| Tie the offer to one product or project version | Match the SKU, specification and sample reference; Record current availability and accepted customization scope | 从“看上去相同”变成明确引用；MOQ只核对适用范围，不重讲MOQ基础 |
| Check what the quotation actually covers | Identify included, excluded and unquoted items; Separate dispatch, production and delivery timing | 核对一份报价；Logo/香味/包装各自界定。不得写报价A/B比价教程 |
| Confirm the transaction details before payment | Verify the payee and any changed instructions; Keep the dated quote and written order terms together | 不推荐付款比例或保护计划，不公布银行资料；不承诺支付/退款保障 |
| Use a first-order verification record | Supplier verification checklist; Quote verification checklist; Resolve mismatches before committing | 下方两张表的精简可用版本；另用一个空白未决事项记录，避免重复表格 |
| Apply TopPerfume's confirmed terms to your request | Stock wholesale and independent projects; Paid samples, buyer-paid freight and conditional dispatch | 一个短业务事实区，所有条件归于TopPerfume而非行业标准；数值仅使用第18节 |
| Questions before a first perfume order | Does company registration prove the products are authentic?; Is a wholesaler automatically an authorized distributor?; Does a sample confirm the bulk order?; What should I do if payment details change? | 简明证据边界回答，链接相应正文，不发展鉴定教程或法律指南 |
| Send Your Product and Order Questions | 无需额外H3 | 联系TopPerfume讨论自身产品/项目；不能承诺审计第三方供应商 |

可在开头用一句采购任务限定读者“已经有候选对象/报价，需要补齐订单前信息”，但本轮不写引言。H2涉及sample只核对身份/批准范围；不加入闻香、持香或外观鉴真测试。

## 12. Supplier Verification Checklist

下表是拟用于正文的工具规格。记录核对日期、来源及适用SKU/项目；所有证据都是限定证据，不能按打勾数量输出“安全供应商”结论。

| 核验项 | 要取得或核对的资料 | 能支持什么 / 不能证明什么 | 未解决时的动作 |
|---|---|---|---|
| Company identity | 法定名称、经营名称、注册地区与可查询的公司信息，和提供方说明对应 | 对应登记主体；不自动证明供货能力、库存或商品真实性 | 缺地区/名称不一致时，请对方解释并重新核对 |
| Sales contact | 将联系账号、域名及销售联系人与独立取得的公司联系通路对应 | 支持核对联系人；头像、聊天名、网页Logo不是完整身份凭证 | 不只通过提出新要求的同一条消息核对 |
| Business role | 书面说明制造、贸易、批发或采购协调职责；列出本订单联络责任 | 明确谁做什么；贸易不等于不可靠，制造也不等于履约保证 | 无法解释的角色/职责先列为未决项 |
| Quote / seller / payee relationship | 报价方、销售/订单主体和收款方名称；不同主体的关系说明与对应记录 | 名称对应是核对起点；名称相同仍不是保证，不同也不自动等于欺诈 | 对无解释差异或突然变更先暂停付款步骤，再独立确认 |
| Brand relationship | 如有authorized/official/direct等声明，询问支持资料、适用品牌/范围/有效性及核验渠道 | 支持核对被提出的声明；普通发票、品牌图片或批号不能自动授予授权身份 | 未确认授权就不依赖或转述该授权声明；不将其反推为必然假货 |
| Product / SKU | 完整产品名、供应商引用、容量/单位、版本与包装状态；对照报价和样品 | 对应拟购对象；相似图片不证明同一商品 | 逐行澄清，禁止以猜测补齐规格 |
| Availability | 目标数量及确认时间；是否接受该订单/项目的书面答复 | 对该数量/时点的答复；网站在售或付费样品不代表库存被保留 | 未确认就不写“in stock”或默认七天发货 |
| Customization eligibility | 私标、Logo位置/对象、包装、香味分别确认适用性及执行范围 | 限定项目资格；全站服务不说明品牌SKU可直接改标 | 独立开列项目请求，不继承品牌成品条件 |
| Samples | 样品引用、供给内容、可用性、数量、收费及运费 | 说明申请/收到的样品范围；不证明整批一致或样品覆盖全部组件 | 明确样品与报价版本的差异，评估方法链接003 |
| Supporting documents | 若订单/市场需要资料，确认能否提供、出具方、版本、适用商品/配方/批次 | 检查文档是否对应请求；一般模板不是特定产品证据 | 不把文件名字视为认证；不给所有订单套统一资料清单 |
| Written approvals | 当前报价版本、已接受的规格和范围、剩余问题、双方答复日期 | 保存已明确的沟通内容；聊天一句“OK”不能补齐未描述范围 | 把未决项发回明确答复，修改后重核受影响字段 |

公开登记查询的举例可引用[Companies House官方查询说明](https://www.gov.uk/guidance/searching-the-companies-house-register)，仅说明英国登记查询能返回哪些公司信息，不把英国登记流程套用到其他国家，也不声称本轮查验了Guiqi的注册资料。公司记录不自动证明品牌商品或单笔订单的结论属于本文对证据范围的编辑判断。

付款指示变更的操作建议依据[FBI Business Email Compromise说明](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise)：通过独立查得/已核对的联系通路核实请求。本轮读到官方搜索结果摘录，直接正文读取失败；未来引用前可复核原页。不要声称TopPerfume已有某种银行核验、托管或赔付制度。

## 13. Quote Verification Checklist

定位：核对**当前供应商的一份报价**与拟购对象/最终订单是否一致。不新增“多个供应商报价谁更便宜”的比较框架。

| Quote field | 买家应确认 / 保存 | 常见误读与处理 |
|---|---|---|
| Quote identity | 报价编号（如提供）、版本/日期、有效期、报价主体与联系人 | 旧截图/旧附件不能自动视为当前报价；有效期未写则询问 |
| Buying route | 成品批发还是独立Private Label/Custom Project | 报价范围不因网站有定制服务自动扩展 |
| Product / version | SKU、容量/规格、香型/版本、数量单位，与拟购清单一致 | 一套/一瓶/一个组件不能混算；缺项保持未确认 |
| Quantity / MOQ | 数量按SKU/版本列出，MOQ与计算基础对应 | 不默认混SKU、混设计或统一全站MOQ；数量匹配详情链接005 |
| Unit price / subtotal | 币种、单价的单位、对应数量和小计、适用版本 | 网页参考价格不是含税运且长期有效的正式报价；异常先询问 |
| Packaging contents | bottle、sprayer、cap、label、carton及其他实际要求分别列出包含/不包含/待确认 | 只问本次报价范围，不承诺TopPerfume能供应每一种组件 |
| Logo / fragrance work | Logo的对象/位置/版本，香味方向与范围，相关收费是否计入 | Logo服务不必然包含包装印刷；定制香味不自动授予配方所有权或独家权 |
| Samples | 可用性、样品格式/数量、收费、运费、是否有任何抵扣安排的书面答复 | 无答复不写免费或可抵货款；样品付款不自动锁库存 |
| Other project charges | 若适用，图稿、设置、模具或其他工作的费用与是否包含 | 项目变量是询问清单，不是TopPerfume必收费用或现有能力承诺 |
| Freight / destination | 谁支付、目的地、运输范围、分开发货与相关排除项；税费等逐项确认 | Buyer-paid freight不等于某个Incoterm，也不能推出清关、风险或税费承担规则 |
| Timeline | 是否已确认现货、订单确认起点、项目范围批准条件、预计发出时间与运输时间分开 | 禁止把dispatch写成arrival；定制生产不继承现货七天 |
| Payment / order record | 经核对的收款指示、币种、双方书面商定的付款条件、所引用报价/订单 | 不设默认订金比例/可用支付方式；付款凭证不等于发货、送达或纠纷保障 |
| Changes / discrepancies | 替代品、版本变更需怎样确认；缺货/破损/不符时的联系和双方同意条件 | 不编造统一退换期、赔付或自动退款；询盘不成立订单 |

两张清单共享一个未决事项记录即可，避免多张重复“万能表”：**Field / Claimed value / Evidence reference and date / Applicable SKU or project / Unresolved difference / Question and responsible contact / Review outcome**。

Review outcome使用普通工作记录词“记录已对应／请求补充／暂缓决定”，不是供应商评级，也不替换Business Facts矩阵的五种正式Status。任何“已对应”只表示这一字段核对结果，不表示整个订单已安全或已被接受。

## 14. Related Money Page

**Primary：[Fragrance Category](https://topperfume.cn/collections/fragrance)**，服务成品采购读者，以选定产品引用继续询价。

**Secondary：[Low MOQ / Private Label](https://topperfume.cn/low-moq-perfume-manufacturer)**，服务独立项目读者，了解当前起订条件及项目确认边界。

**Conversion destination：[Contact / order terms](https://topperfume.cn/contact#order-terms)**。006不能取代这两个商业入口，也不为“verify supplier”再建认证服务页。

## 15. Internal Links

以下是正文阶段的推荐位置与锚文本，不是本轮已实施的链接变更。只推荐006向既有页面链接，不修改005或其他文章。

| 目的地 | 建议锚文本 | 放置语境 / 交接的内容 |
|---|---|---|
| `/collections/fragrance` | browse current wholesale perfume references | 品牌成品路线；查找具体SKU |
| `/low-moq-perfume-manufacturer` | TopPerfume's wholesale and private-label routes | 两条采购路线、服务级条件 |
| `/buyer-guides/custom-logo-perfume-buying-guide` | prepare a custom logo perfume brief | 从资格核对转到图稿/项目准备，006不展开001内容 |
| `/buyer-guides/first-wholesale-perfume-order` | plan your first wholesale perfume order | 选品、数量预算及费用比较，006不重做002 |
| `/buyer-guides/compare-perfume-samples-wholesale` | compare perfume samples before ordering | 样品观察方法和记录，006只说明批准范围 |
| `/buyer-guides/perfume-packaging-moq-order-quantities` | match packaging quantities to your order | MOQ计算与跨部件数量问题，005保持锁定 |
| `/contact#order-terms` | confirm your product and order terms | 最终CTA及交易边界 |

不强加004内链：彩妆首单与本主题没有必要的读者交接。暂不使用Khamrah作凭证或授权示范；如后续只需SKU引用，可链接其当前PDP，但不得暗示已取得品牌授权、库存或可改标证明。本轮不配置反向链接、Schema或sitemap。

## 16. CTA

**Working CTA：Send Your Product and Order Questions**。

建议买家提交：采购路线（现成批发/独立项目）、产品链接或项目引用、每款/版本数量、目的地、样品需求、Logo/包装/香味请求，以及仍未确认的条款。已有TopPerfume报价时可提供其编号/日期与需澄清字段，不要求客户发送银行敏感资料或第三方机密文件。

链接现有Contact；以后若实现按钮，可沿用已有询盘/WhatsApp机制和对应quote/project意图，不能在本轮新增功能。

不得使用“Verify Any Supplier With Us”“Get Guaranteed Authentic Stock”“Secure Your Payment”等含认证、鉴定或支付保障服务暗示的CTA。不承诺TopPerfume审计其他供应商、提供所有凭证、保证项目获批或自动生成订单。

## 17. Unique TopPerfume Value

**已经可用的真实基础：**公开说明贸易、采购及供应商协调角色；把品牌成品采购与独立定制项目分开；当前公司级服务条件明确，但SKU/项目适用性不被默认。

**拟新增的编辑价值：**把身份与订单核验问题写成两条采购路线的记录工具，要求每条“已确认”指向具体对象与资料。用未决事项记录让买家带着明确问题询盘，而非宣称TopPerfume已经验证所有供应商。

**尚不具备的证明：**未取得可公开的真实公司文件、报价/发票/收款主体对应样本、品牌关系资料或客户案例。不能把拟做的记录工具写成已上线功能或现行业务审计服务。

推荐正文评审时二选一：获准公开的脱敏真实资料对应示例；或明确标注 **illustrative example, not a TopPerfume order or customer case** 的假设字段差异示例。后者只显示“产品/版本引用未对齐，需要书面澄清”，不虚构公司、银行账户、认证或服务承诺。本轮只提出这个写作要求，不制作案例正文。

## 18. Business Facts that may safely be used

优先级：本轮用户明确确认 + 当前矩阵 `companyFacts` / `confirmedServiceTerms`；页面源码用于交叉核对。不得用历史矩阵段落、搜索结果或竞品MOQ替代当前确认。下表是本文允许复用的边界，不是新报价。

| 事实 | 允许表述 | 不可外推 | 当前依据 |
|---|---|---|---|
| Company / role | TopPerfume；运营主体Guiqi Technology Co., Ltd.；trading, sourcing and supplier coordination | 自有工厂、授权经销商、注册地区/号码、实际发票方/收款方已经核验 | 矩阵companyFacts；businessProfile；Contact |
| Private Label MOQ | 100 pcs | 每个SKU均可私标，或成品批发也统一100 | confirmedServiceTerms.privateLabelMoq；用户本轮确认 |
| Logo MOQ | 100 pcs | 品牌成品可以直接换标，所有Logo工艺/组件已经接受 | confirmedServiceTerms.logoMoq；用户确认 |
| Custom Fragrance MOQ | 100 pcs | 既定配方/所有香型都可执行，免费研发、配方所有权或独家权 | confirmedServiceTerms.customFragranceMoq；用户确认 |
| Custom Packaging MOQ | 300 pcs | 全行业标准、全部组件统一300、跨设计/SKU共享、必须买300件成品或剩余包装代存 | confirmedServiceTerms.packagingMoq；用户确认 |
| Samples / freight | Samples are charged, and shipping is paid by the buyer. | 所有SKU样品可用、固定收费、免费/抵扣、包邮、承运或税费规则 | samplePricingPolicy/freightPayer；shared/businessPolicy.ts |
| In-stock dispatch | For in-stock orders, dispatch is typically around 7 days after order confirmation. | 任一SKU现货已确认、七天到货、七天定制生产或保证期限 | stockDispatchPolicy；dispatchGuidance；用户确认 |
| Private-label/custom timing | Lead time depends on the customization scope and project requirements. | 数值定制生产/到货承诺 | shared/businessPolicy.ts/projectLeadTime |
| Inquiry / transaction | 网站用于展示/询盘，提交询盘不成立订单；具体交易条件逐单书面商定 | 固定支付方式、订金比例、统一退换/赔付或平台保护 | transactionGuidance；Contact |
| SKU facts | 本Brief不新增具体SKU价格、容量、MOQ数字；如正文确需示例，重新逐字段读取当前产品源与矩阵 | 用相似SKU、旧文档或用户帖子填参数空白 | Product Source of Truth复用规则 |

四项定制MOQ明确标为 **TopPerfume's current customization terms, not universal industry standards**。样品更完整表述沿用：**Sample availability can be confirmed for the selected product or project. Samples are charged, and shipping is paid by the buyer.**

## 19. NEED_USER_CONFIRMATION

以下只是在未来要公开具体主张或真实示例时的资料需求；本轮不推断答案，也不修改事实矩阵。一般“建议买家询问”的内容不等于声称TopPerfume有该资料。

| 待确认事项 | 为什么需要 | 未取得时的写作处理 |
|---|---|---|
| 可公开的注册地区、名称/号码、地址、登记核对资料 | 公司运营名称已确认不等于本轮做了登记核验 | 只使用已确认公司名和业务角色，不加“registry verified” |
| 报价方、销售/发票主体、收款方及任何第三方关系 | 不能默认它们全部同名或已有确定代收安排 | 写买家应核对这些关系，不展示实际账户或承诺某主体收款 |
| 可公开的脱敏报价、订单/发票和付款指示对应示例及使用许可 | 候选阶段提出过真实凭证示范，但当前未取得 | 使用空白记录；如要假设例子须明确标注并经正文审核 |
| 品牌授权/供货关系与可核对来源资料 | 不能从目录产品名/图片推导 | 不使用authorized distributor、official partner、brand owner或直接工厂关系主张 |
| SKU当前库存、完整规格、样品供给/收费/抵扣及保留库存条件 | 网站条目及服务级收费原则不等于具体承诺 | 每个产品/项目待确认；不默认免费、可抵款或七天发出 |
| 各项目Logo/包装/香味资格、具体工艺、费用与数量算法 | 服务MOQ不证明项目方案可行 | 请求逐项确认；不继承成品批发条件 |
| 可提供的文件及其出具方/适用版本 | IFRA、SDS、COA等名称出现于外部资料不表示本站具有 | 仅说按产品/目标市场确认所需资料及可用性，不写认证或全套文件承诺 |
| 支付方式、付款比例、币种、收款确认及记录流程 | 当前规则逐单商定 | 不列固定比例，不宣称托管、Trade Assurance、保险或付款保护 |
| 运输范围、贸易术语、税费/清关责任、订单生效及异常处理条件 | 买方承担运费不能回答全部交付问题 | 写成确认字段，不补造退款、补发或固定到货政策 |
| 私标配方/图稿权利、独家条件和项目时间起点 | Custom Fragrance不等于配方归买家或固定排期 | 不承诺所有权、独家或七天生产 |

制造商/自有工厂、授权身份、认证、客户案例、支付保护、行业统一MOQ、保证到货期限，没有证据一律不得作为正面宣传事实。

## 20. Cannibalization check against TP-SEO-001–005

| 已有内容 | 主任务 | 与006接触点 / 风险 | 006强制边界 |
|---|---|---|---|
| 001 Custom Logo Perfume | 定制路线、Logo位置、项目brief、图稿与批准准备 | 项目角色、资格及书面范围；中等 | 只核对“谁接受了哪份范围”，不教设计Logo或完整定制流程；深层准备链接001 |
| 002 First Wholesale Order | 新店选品、数量/费用规划、首单与复购记录 | 首单、条款、报价与记录；最高风险 | 006不选品、不做预算/总成本比较、不建议首单SKU数；002补充机会仍保留多报价A/B范围比较 |
| 003 Compare Samples | 样品身份、观察方法、表现边界及记录 | 样品与报价版本对应；中等 | 006只核验引用与代表范围，不增加闻香/持香、包装评分或样品对比表；链接003 |
| 004 First Makeup Collection | lip/eye选择、色号、首批组合 | 通用供应商/记录概念；低 | 006限定perfume，不扩展彩妆或复用其产品例子，不强制互链 |
| 005 Packaging MOQ | 不同组件最低量与首单数量对齐 | 包装范围、MOQ计算基础；中等 | 006只检查约定数量/单位是否被报价正确记录，不重做100/300案例、余料安排或数量规划表；链接005，原文锁定 |
| Fragrance Category | 现有成品商业采购 | wholesale supplier商业词 | 保留其商业主承接，006只提供核验方法 |
| Low MOQ | 私标与成品两路线、当前项目起订条件 | private label MOQ | 用简短事实框并回链，不写新MOQ基础文章 |

建议编辑检查：每个主H2都必须产出“核对对象、资料对应关系或未决项处理”。如果一段主要解释如何选产品、怎样闻样、为什么包装MOQ较高，应压缩为交接链接。不要把两条业务路线拆成两篇高度相似文章。

## 21. Should this remain a standalone article after full research?

**结论：YES — CONDITIONAL STANDALONE ARTICLE；仅批准进入Brief评审，不等于正文或发布获批。**

支持独立的理由：目标读者的决定是“当前候选供应商与拟购订单的信息是否核对清楚”，与001准备定制、002规划首单、003评样、005匹配数量不同；社区有实际疑问；普通搜索中有明确商业核验意图。

限制：外部已有相当接近的供应商核验文章，本轮Google地区/设备排名未知，没有搜索量或TopPerfume真实凭证案例。不能把独立性说成竞争空白、排名机会已验证或本品牌信任能力已证实。

保留独立文章的正文验收门槛：

1. 核心始终是身份、产品/项目、报价及交易记录的对应，不被MOQ/样品/开品牌内容占据。
2. 两张清单各有不同用途，配一份简洁未决项记录；不生成安全评分、认证结论或虚构政策。
3. 至少有一个经审核的资料对应演示：真实且获准脱敏，或明确假设的字段冲突示例；后者不宣称真实采购成效，也不解决未确认的业务条件。
4. 清楚分开TopPerfume当前事实与供应商普遍应被询问的变量，维持贸易身份与独立项目边界。
5. 正文完成后再次与001–005去重；尤其不新增多供应商费用比较主题，不改005锁定内容。

如果上述区分无法落实、只能产出通用可靠供应商建议，应退回002的供应商/订单信息补充机会，**不强行发布006**。目前Brief已完成；下一步仅等待用户审核，不开始英文正文、发布包或007。

## Research limitations / 来源使用说明

- 本轮外部来源均为公开只读研究。竞品页面是其内容与定位的第一手证据，不是其资质、交付表现或TopPerfume能力的验证。
- Google直接页面不可读，普通搜索结果只作意图代理；未取得AI Search实际回答/引用链，不声称AI可见度。
- R11/R12/R14原帖已读取；R10仅保留历史来源说明。推广回复、同作者重复贴、票数与相对时间不作需求规模证据。
- 公司核对引用官方查询说明；付款变更建议引用FBI官方摘要。不使用旧Companies House“无核查权”历史说明来描述当前制度，也不在本Brief展开国家法规。
- 所有链接是研究或推荐内链；没有抓取客户隐私、发送消息、修改Production、运行部署或新增正文。
