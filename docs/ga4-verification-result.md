# GA4 验收状态

现有账号 TopPerfume，资源 TopPerfume Website（551154847），数据流 G-4BX79STS9F。现有账号权限可完成本轮操作，无需提供密码或密钥。

TopPerfume Developer QA 开发者过滤器已获授权并启用，运算为排除，唯一匹配条件是已填充 debug_mode 或 debug_event 的事件。当前网站标签和事件构造代码没有设置这两个字段；普通访客不因 IP、地区或域名而被该规则排除。原 Internal Traffic 规则仍为测试，未启用。

后台状态已核实“已启用”。Google 说明过滤规则可需 24–36 小时传播；配置启用不等于已证明所有后续报表完成排除。传播后的普通报表排除核对仍保留为技术待办，不需要用户提供业务资料。

2026-09-13 17:24:24（中国时间，09:24:24 UTC），本地工具复用当前 shared/analytics.ts 的事件构造函数，仅发送一次四个合成事件。DebugView 已实际显示 page_view、view_item、whatsapp_click、inquiry_submit_success 各 1 次；另有 Google 自动 session_start 1 次。已展开询盘成功测试事件，看到 debug_mode 参数及 qa_run_id = tp-qa-20260913。本次询盘意图为 qa_synthetic_no_email；没有客户资料，没有真实表单提交、WhatsApp 跳转或邮件调用。当前事件构造、标签加载及 Google 接收链路通过；不把该结果冒充网站 Production 实际客户全流程通过。

普通事件构造未含 debug_mode/debug_event；本地测试单独附加 debug_mode=true。相同路径和标题的去重结果为首次 true、重复 false。测试页面有单次发送限制，之后不自动重试；不打包进 Preview 或 Production。

后台自定义事件规则和事件修改规则均为空。关键事件仍有历史 generate_lead、qualify_lead、close_convert_lead，以及平台 purchase；本轮不改历史数据。当前分支不发送 generate_lead，也不把两个联系事件设为有效商机。现有 Production 的历史 generate_lead 不能直接当作经过业务确认的有效询盘；正式发布后的业务成效应由负责人实际跟进核实。

Preview 和普通 localhost 保持不加载 GA4；开发事件验证使用单独的本地调试工具，不改正式站或客户表单，不发送邮件。只发送明确标记的合成事件，不能算作真实有效询盘。

现有手动 page_view 去重保留；后台历史路由自动页面变化关闭。自动出站点击和表单互动已关闭，以避免重复统计以及采集 WhatsApp 草稿链接中的输入。whatsapp_click 表示点击；inquiry_submit_success 表示服务接受，均不证明有效询盘、邮件收件或订单。

GA4 当前事件数据保留 2 个月、用户数据 14 个月、新活动重置开启，沿用现状。这不替代询盘邮件或交易资料的保存规则。

隐私配置只读核对：Google Signals 未启用，用户提供的数据收集未启用，代码未发送 User-ID；精细位置和设备数据收集开关开启。Google Ads 关联为 0。本轮未开启广告功能或接受数据收集确认书。

实际未完成项：后台“用户意见征求设置”提示缺少 EEA 访客同意信号，显示 15–20% 流量来自 EEA；analytics_storage、ad_storage、ad_user_data、ad_personalization 信号均未启用。源代码也未实现访客 Cookie 同意控制。A-01 请决定基础或高级同意方式；建议基础方式，同意前不加载 GA4，拒绝者不统计。决定后由开发实现并验证，不能直接宣布 GA4 全部上线验收通过。当前账号已可访问该设置，无需重新登录。

技术依据：https://support.google.com/analytics/answer/13296662 （过滤器传播），https://support.google.com/analytics/answer/7201382 （DebugView），https://developers.google.com/tag-platform/security/concepts/consent-mode （同意模式）。
