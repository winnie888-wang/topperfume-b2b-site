# 分类页布局预览验收

状态：本地代码修改与本地生产构建预览，未推送、未云端部署、未正式上线。保留此前所有产品上架与网站优化工作。

## 本轮修改

- `client/src/pages/Collection.tsx`：分类页标题、介绍、主图和结果数量跟随筛选；区分当前结果数与分类总数。香水、彩妆筛选写入 URL，刷新可保留。筛选标签显示各自匹配数量。彩妆的 26 个筛选项支持展开、收起，收起仍展示已选项。
- `client/src/catalogue.css`：消除分类标题区内外重复留白及窄窗口残留的双列标题布局；价格 18px、MOQ 16px、筛选和卡片按钮 14px；按钮最小高度 46px、独占一行。分类产品网格 <=620px 一列、621–1099px 两列、>=1100px 三列。
- `client/src/components/ProductCard.tsx`：图片响应式尺寸提示跟随网格断点。图片容器统一正方形、16px 内边距、contain 居中；取消叠加边框、图片滤色及悬停放大，完整保留原图瓶身和标签。共用卡片改动也作用于首页和详情页相关推荐。
- 没有修改任何产品数据文件、价格、MOQ、未知规格或疑似同款记录。

## 溢出判断与验证

用户提及的五张截图没有作为当前消息附件提供，因此不能判定原截图是否裁切。实测原页面在 624px 当前窗口，以及 375、430px 下，产品和按钮没有越过右边界；实际问题是旧样式覆盖导致卡片询价文字只有 8px、价格和 MOQ 12px，标题区高度过大。

修改后香水分类在 375、390、430、624、1440px 全部通过边界检查。窗口包含 15px 滚动条，页面内容宽度分别为 360、375、415、609、1425px，文档 scrollWidth 与内容宽度相等。所有产品卡及按钮均未超出边界，图片保持 contain、无缩放裁切。

- 香水标题区：375px 下约 402 → 234px；624px 下约 431 → 209px。
- 护理／身体乳筛选：375、390、430、624、1440px 通过；七种筛选的标题、介绍和数量分别匹配 16、3、1、2、2、1、1 个结果，总分类 26 个产品／系列。
- 彩妆：375、390、430、624px 通过；展开／收起正常，选择 PRIVATE LABEL 后显示 3 / 12，收起后仍保留已选筛选。身体乳 A–Z 排序正确。
- 香水 Parfum 筛选显示 2 / 14；刷新后筛选保留。
- 首页及 502 mL 身体乳、Qahwa 详情页中的共用卡片无横向溢出；新品详情也复查了 375px。浏览器错误日志为空。
- TypeScript 通过；相关 3 个回归测试文件、15 项测试通过，覆盖产品保留、各批报价、未知参数、疑似同款和 WhatsApp 内容。沿用此前其他未受影响测试结果。
- 本地生产构建成功。原有约 570 kB 主 JS 体积警告保留。发现彩妆筛选过多后，仅为这一补充调整更新了一次构建。

截图位于 `docs/screenshots/layout-review/`，原始浏览器测量记录位于 `docs/layout-preview-validation.json`。初次手机记录中的未加载图片来自 CSS 隐藏的标题区主图（宽高为 0），可见产品图没有加载失败。

## 预览

- [首页](http://localhost:3001/)
- [香水分类](http://localhost:3001/collections/fragrance/)
- [护理分类](http://localhost:3001/collections/skincare/)
- [身体乳筛选](http://localhost:3001/collections/skincare/?type=body-lotion)
- [彩妆分类](http://localhost:3001/collections/makeup/)
- [502 mL 身体乳](http://localhost:3001/products/vitamin-c-body-lotion-502ml/)
- [Qahwa 香水](http://localhost:3001/products/lattafa-khamrah-qahwa/)
- [五批图片与疑似同款核对](http://localhost:3001/previews/combined-listing-review.html)

后续数据确认：BC-01 至 BC-05 的 MOQ 均已独立确认 6 pieces，价格不变。五组疑似同款仍未合并，当前容量待确认记录共 12 条，本次总包已无 MOQ 缺项。详见 `pending-listing-matches.json` 与 `combined-listing-preview.md`。502 mL 维 C 身体乳仍为 US$2.99／瓶、2 瓶起订，原 444 mL 独立保留。
