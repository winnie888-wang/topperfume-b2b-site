import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { allProducts as products, type Product } from '../client/src/data/products';

// Internal review is generated only for local/Preview builds, never Production.
if (process.env.VERCEL_ENV === 'production') {
  console.log('Release decision review omitted from Production');
  process.exit(0);
}
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const read = (p: string) => readFileSync(resolve(p), 'utf8');
const md = (text: string) => text.split(/\r?\n\r?\n/).map(block => {
  if (block.startsWith('#')) { const m = block.match(/^(#{1,6}) (.*)/)!; return `<h${Math.min(m[1].length+1,6)}>${esc(m[2])}</h${Math.min(m[1].length+1,6)}>`; }
  return `<p>${esc(block).replace(/\n/g,'<br>')}</p>`;
}).join('');
const choice = (id: string, options: string[]) => `<label>决定 <select data-answer="${esc(id)}"><option value="">尚未决定</option>${options.map(o=>`<option>${esc(o)}</option>`).join('')}</select></label><label>补充说明<textarea data-answer="${esc(id)}-note" rows="2" placeholder="可填具体期限、素材安排或其他方案；不填密码或密钥"></textarea></label>`;
const image = (src: string, caption: string) => {
  if (!existsSync(resolve('client/public'+src))) throw new Error('Missing review image: '+src);
  return `<figure><a href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(caption)}" loading="lazy"></a><figcaption>${esc(caption)}</figcaption></figure>`;
};
const get = (id: string) => {
  const p = products.find(p=>p.slug===id||p.intakeIds?.includes(id));
  if(!p) throw new Error('Review product not found: '+id);
  return p;
};
const facts = (p: Product) => `${p.format} · USD ${p.unitPrice?.toFixed(2)} / ${p.orderUnit ?? 'piece'} · MOQ ${p.minimumOrderQuantity}`;
const holds: {id:string;missing:string;action:string}[] = [
  {id:'B04-01-400',missing:'现有图片标注 400/600 mL，缺 725 mL 真实包装正背面照。',action:'当前产品页暂缓；725 mL 仍是唯一现行规格，旧规格只保留历史。'},
  {id:'B04-02',missing:'现有图片标注 400 mL，缺 500 mL 真实包装照。',action:'当前产品页暂缓，待新规格图片补齐。'},
  {id:'B05-03',missing:'现有图片标注 725 mL，缺 500 mL 真实包装照。',action:'当前产品页暂缓，待新规格图片补齐。'},
  {id:'B05-06',missing:'现有图片标注 725 mL，缺 500 mL 真实包装照。',action:'当前产品页暂缓，待新规格图片补齐。'},
  {id:'B02-01-01',missing:'六瓶合照中的 Vitamin B3、Cocoa Radiant Body Oil、Sunlit Glow、Gluta Ceramide 已改为 237 mL，旧图仍为 200 mL；缺单款真实图片及 UV/量化宣传依据。',action:'建议当前系列页整体暂缓，补单款适用图后恢复充分资料款。Golden Glow、Cera Glow 仍为 200 mL；合照不是套装。'},
  {id:'BC-01',missing:'供应商功效图片缺相应依据或中性真实图；另有 B05-01 香味对应未明。',action:'暂缓未核实宣传素材；无适用替代主图时暂缓此页。不得用 B05-01 图或价格覆盖。'},
  {id:'BC-02',missing:'供应商功效声明的依据，或不含这些宣传的真实产品图。',action:'暂缓未核实宣传素材；无适用替代主图时暂缓此页。'},
  {id:'BC-03',missing:'功效及 UV 图文依据，或适用的中性真实产品图。',action:'暂缓未核实宣传素材；无适用替代主图时暂缓此页。'},
  {id:'BC-05',missing:'数值 pH、敏感肌适用声明的依据，或适用替代图。',action:'暂缓相应宣传素材；无适用替代主图时暂缓此页。'},
  {id:'vitamin-c-body-lotion-502ml',missing:'前图已有数字编辑说明；缺真实、未改标签的 502 mL 包装照及拟保留质地/功效依据。',action:'先补真实 502 mL 主图；不修改旧标签数字，不影响原 444 mL 产品。'},
  {id:'B02-04',missing:'图片/包装 SPF 宣传的适用依据或适用替代图。',action:'暂缓未经支持的 SPF 宣传；无合适主图时暂缓此页。'},
  {id:'B02-10',missing:'UV 或量化宣传的相应依据、清晰标签资料或中性真实图。',action:'暂缓相应宣传素材；无适用替代主图时暂缓此页。'},
  {id:'B05-02',missing:'供应商功效声明依据或中性真实产品图。',action:'暂缓相应素材；与 Cocoa Radiant Body Oil 保持独立。无主图则暂缓此页。'},
  {id:'B05-07',missing:'供应商功效声明依据或中性真实产品图。',action:'暂缓相应素材；无适用替代主图时暂缓此页。'},
];
const cards = holds.map(h=>{
  const p=get(h.id); return `<article class="card" id="product-${esc(h.id)}"><div class="tag">${esc(p.intakeIds?.join(' / ') || p.slug)}</div><h3>${esc(p.name)}</h3>${image(p.gallery?.[0].src||p.image,'现有参考图；不代表缺项已验证')}<p class="facts">${esc(facts(p))}</p><p><strong>缺少什么：</strong>${esc(h.missing)}</p><p><strong>建议处理：</strong>${esc(h.action)}</p><a href="/products/${esc(p.slug)}/">查看现有 Preview 产品页</a>${choice('PRODUCT-'+h.id,['同意建议处理','先暂缓整页','将补适用素材后再评估','其他：见补充说明'])}</article>`;
}).join('');
type Match={intakeId:string;possibleExistingId:string;name:string;format:string;priceUSD:number;moq:number;gallery:{src:string}[]};
const matches=JSON.parse(read('docs/pending-listing-matches.json')) as Match[];
const positions:Record<string,string>={'B02-01-01':'合照左起第 1 瓶','B02-01-02':'合照左起第 2 瓶','B02-01-03':'合照左起第 3 瓶','B02-01-05':'合照左起第 5 瓶'};
const pairs=matches.map(m=>{
  const p=get(m.possibleExistingId), v=p.variants?.find(v=>v.id===m.possibleExistingId);
  return `<article class="card pair-card"><h3>${esc(m.intakeId)} ↔ ${esc(m.possibleExistingId)}</h3><div class="pair"><div><h4>${esc(m.name)}</h4>${m.gallery.map(g=>image(g.src,m.intakeId+' 原批次参考图')).join('')}<p class="facts">${esc(m.format)} · USD ${m.priceUSD.toFixed(2)} / piece · MOQ ${m.moq}</p></div><div><h4>${esc(v?.name||p.name)}</h4>${image(p.gallery?.[0].src||p.image,positions[m.possibleExistingId]||m.possibleExistingId+' 原记录参考图')}<p class="facts">${esc(v?.format||p.format)} · USD ${(v?.unitPrice||p.unitPrice)?.toFixed(2)} / piece · MOQ ${v?.minimumOrderQuantity||p.minimumOrderQuantity}</p></div></div><p><strong>缺少什么：</strong>双方准确香味或 SKU 区分标识，以及各自图片对应关系。${m.intakeId==='B05-01'?'500 mL 已确认。':'双方 237 mL 已确认；仍需替换旧 200 mL 包装图。'}</p><p><strong>建议处理：</strong>候选记录继续暂缓创建页面；不合并、不混图、不覆盖独立报价。现有页的具体素材问题按上方清单处理。</p>${choice('MATCH-'+m.intakeId,['继续暂缓候选展示','将补双方香味与图片对应','其他：见补充说明'])}</article>`;
}).join('');
const optionRows=read('docs/privacy-options-review.md').split(/\r?\n/).filter(l=>/^\| [RMA]-\d/.test(l)).map(l=>l.split('|').slice(1,-1).map(s=>s.trim()));
const decisionOptions:Record<string,string[]>={
  'R-01':['A：6 个月','B：12 个月','C：自定期限与起算规则'],
  'R-02':['A：每月人工核对删除','B：自动提醒与人工复核','自定：见补充说明'],
  'R-03':['A：由财务分别确定期限','B：由财务确定统一期限'],
  'M-01':['采用独立、默认不勾选订阅','暂不开通营销订阅','自定：见补充说明'],
  'M-02':['A：二次邮件确认','B：单次明确同意','暂不开通'],
  'M-03':['A：每月最多 1 封','B：每月最多 2 封','C：自定每月上限'],
  'M-04':['采用无需登录退订链接及邮箱备用入口','暂不开通营销','自定：见补充说明'],
  'M-05':['A：退订后 12 个月复核删除','B：退订后 24 个月复核删除','C：自定记录期限'],
  'M-06':['A：营销持续期间保留最小阻止记录','B：自定期限并防止旧名单重导入'],
  'M-07':['先核对现有 Resend，不采购或导入','暂不选择平台','指定其他平台：见补充说明'],
  'A-01':['A：基础同意模式，选择同意后统计','B：高级同意模式，先进一步评估','暂不决定']
};
const decisions=optionRows.map(([id,title,detail])=>`<article class="card"><div class="tag">${esc(id)}</div><h3>${esc(title)}</h3><p>${esc(detail)}</p>${choice(id,decisionOptions[id])}</article>`).join('');
const privacy=md(read('docs/privacy-notice-draft.md'));
const analytics=md(read('docs/ga4-verification-result.md'));
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>TopPerfume｜隐私、营销与产品发布决定</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f3ef;color:#252a2c;font:16px/1.65 system-ui,sans-serif}main{max-width:1180px;margin:auto;padding:32px 22px}h1{font-size:clamp(26px,5vw,40px);line-height:1.2}h2{margin-top:44px}h3{font-size:20px;line-height:1.4}p,figcaption,a{overflow-wrap:anywhere}a{color:#235b56}nav,.actions{display:flex;flex-wrap:wrap;gap:12px}nav a,button{padding:11px 16px;background:#245a53;color:white;border:0;border-radius:6px;font:inherit;text-decoration:none;cursor:pointer}.notice{padding:18px;background:#e5eee9;border-left:4px solid #245a53}.grid,.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.card,.draft{background:white;padding:24px;border:1px solid #d7d9d5;border-radius:10px;min-width:0;margin-top:18px}.tag{font-weight:700;color:#445750}.facts{background:#f0f4f1;padding:10px;font-weight:650}figure{margin:16px 0}img{display:block;width:100%;height:300px;object-fit:contain;background:#fff}figcaption{font-size:14px;color:#595f5c}label{display:block;margin-top:16px;font-weight:600}select,textarea{display:block;width:100%;max-width:100%;padding:10px;font:inherit;border:1px solid #8e9892;border-radius:5px;background:white;color:#242a27}textarea{resize:vertical}summary{cursor:pointer;font-weight:700;padding:10px 0}.status{min-height:1.5em;color:#235b56}.pair-card{margin-bottom:24px}@media(max-width:650px){main{padding:22px 14px}.grid,.pair{grid-template-columns:1fr}.card,.draft{padding:18px}img{height:260px}nav a{padding:9px 12px}}@media print{nav,.actions,.status{display:none}.card{break-inside:avoid}}</style></head><body><main><p class="tag">TOPPERFUME · 仅供负责人验收 · 2026-09-13</p><h1>隐私、营销与产品发布决定</h1><p class="notice">此页为 Preview 决策草稿，禁止索引，Production 构建不包含此页。尚未改变正式网站或产品发布范围。填写仅保存在当前浏览器；请导出答案交回，不会发送邮件或提交订单。旧验收表中已完成项目不再作为待填项。</p><nav><a href="/">网站首页</a><a href="#decisions">隐私与营销选项</a><a href="#products">14 个现有页面</a><a href="#matches">5 组香味对照</a><a href="#privacy">隐私正文草稿</a><a href="#ga4">GA4 结果</a></nav><h2>已确认，无需重复填写</h2><p>公司公开地址：中国广东省广州市白云区；WhatsApp +86 190 6678 2710；销售与隐私申请邮箱 melody888666@yeah.net。目前业务上仅本人查看询盘，每周查看处理修改/删除申请，不承诺七天内完成删除。不把询盘当作营销同意。继续使用现有 GA4。</p><p>本次总包原 12 条容量已由此前答案补齐，容量及 MOQ 缺项为 0；目前待补的是素材和香味对应。已确认价格、容量、MOQ 以下直接引用现有数据。普通询盘、真实邮件送达和网页表单测试沿用已通过记录，本轮不重测、不发送真实邮件。</p><h2 id="decisions">需要决定的业务规则</h2><p>未成交与成交保存期限仍未确定。以下是可选业务方案，未自动采用，也不是法定期限结论。成交期限需财务给出实际规则。营销在方案批准且订阅/退订验证前保持关闭。</p><div class="grid">${decisions}</div><h2 id="products">产品编号、图片与建议处理</h2><p>共 14 个现有页面：5 个涉及规格图片（含 1 个六款系列页），另 9 个涉及真实图片或宣传依据。这里是正式展示范围建议，Preview 保留现有记录供验收。适用的中性真实图可以替代不准备使用的宣传，无须为不用的功效文案补证明。BC-04、原 444 mL 和其余充分资料产品不自动暂缓。</p><div class="grid">${cards}</div><h2 id="matches">五组同系列、不同香味对照</h2><p>五个候选目前没有独立产品页，继续保留独立记录。六瓶合照只用于定位原记录，不代表六瓶套装或图片已经与新规格一致。</p>${pairs}<h2 id="privacy">隐私说明草稿</h2><div class="draft">${privacy}</div><h2 id="ga4">GA4 配置与事件验证</h2><div class="draft">${analytics}</div><h2>保存本次决定</h2><p>选择和备注不直接修改网站。答案保存在本浏览器；跨手机/电脑请使用导出的 JSON 文件。导出前可一次检查所有选项。</p><div class="actions"><button id="export" type="button">导出答案 JSON</button><button id="print" type="button">打印 / 保存 PDF</button></div><p class="status" role="status" id="save-status"></p></main><script>
const key='topperfume-release-decisions-v1'; const fields=[...document.querySelectorAll('[data-answer]')]; const status=document.querySelector('#save-status');
function values(){return Object.fromEntries(fields.map(el=>[el.dataset.answer,el.value]));}
try{const saved=JSON.parse(localStorage.getItem(key)||'{}');fields.forEach(el=>{if(typeof saved[el.dataset.answer]==='string')el.value=saved[el.dataset.answer];});}catch{status.textContent='当前浏览器无法恢复本地答案，请填写后导出保存。';}
fields.forEach(el=>el.addEventListener('input',()=>{try{localStorage.setItem(key,JSON.stringify(values()));status.textContent='已保存到此浏览器；尚未提交或修改网站。';}catch{status.textContent='本地保存不可用，请导出答案保存。';}}));
document.querySelector('#export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({project:'topperfume-b2b-site',reviewVersion:'2026-09-13',createdAt:new Date().toISOString(),answers:values()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='TopPerfume_发布决定答案.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='已生成答案下载；请交回确认，网站尚未改变。';});document.querySelector('#print').addEventListener('click',()=>window.print());
</script></body></html>`;
mkdirSync(resolve('dist/public/previews'),{recursive:true});
writeFileSync(resolve('dist/public/previews/release-decisions.html'),html);
console.log(`Release review: ${holds.length} existing pages, ${matches.length} separate candidates, ${optionRows.length} business decisions; images resolved.`);

