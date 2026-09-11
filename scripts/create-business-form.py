from pathlib import Path
import json,html,base64
root=Path(__file__).resolve().parent.parent
audit=json.loads((root/'docs/final-product-audit.json').read_text(encoding='utf-8'))
rows=[]
def add(id,group,name,known,question,impact,images=[]):
 rows.append(dict(id=id,group=group,name=name,known=known,question=question,impact=impact,images=images))
allrows=audit['allProductMissingInformation']
for item in sorted(audit['capacity'],key=lambda i:i['ids'][0]):
 id=item['ids'][0]; batch=id[:3]
 price=3 if id.startswith('B02') else 5 if id.startswith('PF') else 2.99
 moq=2 if id.startswith('PF') else 6
 add(id,'容量',item['name'],f'USD {price:.2f}/件；MOQ {moq}件。价格和MOQ已确认，不用重填。','请填净含量及单位（mL/g），并注明背标或供应商资料依据。','仅此产品规格/最终报价；B05-01暂不新增页面。',[item['image']])
for item in audit['pendingMatches']:
 old=next(i for i in allrows if item['possibleExistingId'] in i['ids'])
 known=f"新图 USD 2.99/件、MOQ 6；{item.get('format') or '新图容量另见容量行'}。原记录报价保留。"
 if item['possibleExistingId']=='BC-01':known+=' BC-01独立确认为500mL、USD2.99、MOQ6。'
 add('MATCH-'+item['intakeId'],'同款关系',item['name']+'：'+item['intakeId']+' ↔ '+item['possibleExistingId'],known,'请填：同款 / 不同款 / 暂无法确认；附供应商SKU或背标依据。'+item['reason'],'仅对应候选产品；确认前不合并、不覆盖价格、不新建重复页面。',[item['gallery'][0]['thumbnail'],old['image']])
items=[
('CONTACT-WA','联系接收','WhatsApp','+86 190 6678 2710，当前所有入口沿用此号码。','请确认号码归公司/销售使用且可收客户消息；如需更换请填正确公开号码。','影响WhatsApp实际接收'),
('CONTACT-MAIL','联系接收','销售邮箱','melody888666@yeah.net，当前公开地址及默认收件地址。','请确认可正常收件并有人处理；如更换，填新的公开销售邮箱。','影响邮箱实际接收'),
('SHIP-ORIGIN','发货与费用','发货地及地区','未承诺统一发货地点。','请填发货国家/城市、支持和不支持的目的地；不同SKU有差异请说明。','整站发货说明及相关订单'),
('SHIP-TIME','发货与费用','处理时间与交期','部分原SKU保留约7天说明；新品没有已确认库存或交期。','请说明哪些SKU适用现有交期；新品备货/发出时间如何确认，是否统一按订单报价。','相关产品交期承诺'),
('SHIP-FREIGHT','发货与费用','运输及运费','页面商品小计不含运费和税费，最终到货报价待确认。','请填运输方式、运费计价或询价规则、运费由谁承担；是否有包邮条件（没有可填无）。','整站运输政策及最终报价'),
('SHIP-TAX','发货与费用','税费与清关','未承诺含税、包清关或具体贸易术语。','请说明关税/进口税/清关责任及实际可用贸易术语；不固定可写按订单确认。','整站交易说明及跨境报价'),
('RETURN','退换与交易','退换货、破损和错发','尚无已确认退换政策。','请填适用情形、申请期限、证据要求、退货运费、退款方式/时间；批发/定制品规则如有差异请说明。','整站政策发布前完成'),
('PAYMENT','退换与交易','付款及订单成立','网站询盘不等于下单或支付。','请填支持的付款方式、币种、订金/尾款比例、订单确认节点；不要填银行密码或账号密钥。','整站交易政策发布前完成'),
('QUOTE','退换与交易','报价、取消及变更','已确认产品价格各自保留；无统一报价有效期或取消条件。','请填报价有效期、订单取消/变更条件；价格调整是否需重新书面确认。','整站交易政策发布前完成'),
('PRIVACY','政策','隐私与询盘资料处理','表单收集姓名、市场、邮箱、可选WhatsApp、数量和备注，用于回复询盘。','请提供适用隐私政策或确认业务主体联系地址、资料保存期限、处理/删除请求渠道及服务商使用说明。','整站隐私政策发布前完成'),
('SAMPLES','产品与素材','样品及定制范围','新品未默认可定制；原SKU的既有已确认条款保留。','请列出新增SKU可否提供样品、费用/运费、可定制范围及MOQ；无定制可填不支持。','只影响相关产品的样品/定制承诺'),
('CLAIMS','产品与素材','供应图片与功效声明','BC-01–03及502mL等供应图含未独立证明的功效文字；页面未扩展承诺。','请提供支持资料或无相关宣传文字的真实产品图；按编号注明适用产品。','相关产品宣传正式发布前完成'),
('MAIL-SERVICE','邮件配置','Resend及发件域','现有实现使用Resend；本地无凭据，Preview禁止真实发送。','请在Resend确认账号/发件域验证状态；表格仅填已配置/待配置及公开发件邮箱，不填API Key。','影响表单实际发信，不阻塞目录预览'),
('MAIL-ENV','邮件配置','正式环境配置','变量：RESEND_API_KEY、INQUIRY_FROM_EMAIL、INQUIRY_TO_EMAIL、INQUIRY_ENABLED。','请由账号持有人在Vercel Production环境配置；这里只填写完成状态。收件邮箱如沿用销售邮箱无需重复填写。','影响正式邮件表单'),
('MAIL-TEST','邮件配置','真实收发验证','成功/失败逻辑仅经模拟测试，未验证真实送达、垃圾箱及回复。','配置完成后请填可用于验证的接收安排及是否授权发送一封测试邮件；本轮不发送。','影响正式邮件链路验收'),
('GA4','统计配置','GA4账号与数据流','G-4BX79STS9F；预览不发送；复用现有标签，不另装Vercel Analytics。','请在Google Analytics确认可访问对应数据流，并核对增强型衡量、转化事件是否重复；仅填写核对状态。','仅影响统计验收'),
('LEADS','统计配置','有效询盘的业务口径','whatsapp_click是点击；inquiry_submit_success是服务接受；均不等于真实有效询盘。','请说明销售如何判定有效询盘、谁记录/跟进；如果只需人工登记请注明。','仅影响有效询盘统计'),
]
for row in items:add(*row)
# Keep every currently recorded product-specific documentation gap visible, without asking for confirmed capacities/MOQs again.
for item in allrows:
 fields=[s for s in item['missing'] if not any(t in s.lower() for t in ['capacity','net contents','容量','moq'])]
 if not fields:continue
 add('DOC-'+item['ids'][0],'其他产品资料',item['name'], '编号：'+', '.join(item['ids'])+'；已有容量、价格和MOQ按目录保留。','仅补尚缺资料：'+'；'.join(fields)+'。可填写资料文件名及对应编号；未取得可填待供应商提供。','对应产品的规格/宣传/最终报价，不阻塞其他产品。',[item['image']])
def img(src):
 if not src.startswith('/assets/'):return ''
 data=base64.b64encode((root/'client/public'/src.lstrip('/')).read_bytes()).decode()
 return '<img alt="产品参考图" src="data:image/webp;base64,'+data+'">'
e=html.escape
body=''
for row in rows:
 body+=f'<tr data-id="{e(row["id"])}"><td><small>{e(row["group"])}</small><strong>{e(row["id"])}</strong>{e(row["name"])}<div class="images">'+''.join(img(s) for s in row['images'])+f'</div></td><td>{e(row["known"])}</td><td>{e(row["question"])}<p class="impact">影响：{e(row["impact"])}</p></td><td><textarea aria-label="{e(row["id"])} 填写内容" placeholder="在此填写；未知可填待确认。不要填写密码、API Key或令牌。"></textarea></td></tr>'
data=json.dumps([{k:v for k,v in r.items() if k!='images'} for r in rows],ensure_ascii=False).replace('</','<\\/')
page='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>TopPerfume 业务信息填写表</title><style>body{margin:0;background:#faf7f3;color:#35283b;font:16px/1.6 system-ui}main{max-width:1280px;padding:24px;margin:auto}h1{font-size:30px}nav{position:sticky;top:0;background:#faf7f3;padding:12px 0;display:flex;gap:10px;flex-wrap:wrap;z-index:2}button,select{font:inherit;padding:10px 16px;border:1px solid #6b4b67;border-radius:4px;background:white;color:#35283b}button{cursor:pointer}#export{background:#35203f;color:white}table{width:100%;border-collapse:collapse;background:white}td,th{border:1px solid #d8ccd6;vertical-align:top;padding:14px;text-align:left}th{background:#e9e0e8}td:nth-child(1){width:22%}td:nth-child(2){width:20%}td:nth-child(3){width:30%}strong,small{display:block}small,.impact{color:#6f606d;font-size:14px}.images{display:flex;flex-wrap:wrap;gap:6px}img{width:110px;height:110px;object-fit:contain}textarea{box-sizing:border-box;width:100%;min-height:160px;font:inherit;padding:10px;border:2px solid #b9a4b4;border-radius:4px;background:#fffcf2;resize:vertical}#status{font-size:14px}a{color:#623956}@media(max-width:760px){main{padding:14px}thead{display:none}tr,td{display:block;width:auto!important}tr{margin-bottom:22px;border:1px solid #d8ccd6}td{border:0;border-bottom:1px solid #eee}td:nth-child(2):before{content:'已知信息：';font-weight:bold}td:nth-child(3):before{content:'需要补充：';font-weight:bold}textarea{min-height:120px}}@media print{nav{display:none}textarea{border:1px solid #aaa;min-height:80px}tr{break-inside:avoid}}</style></head><body><main><h1>TopPerfume 业务信息填写表</h1><p>已确认：BC-01/02/03 均500 mL、USD2.99/件、MOQ6；BC-04为283g、USD4.99/件、MOQ6；BC-05为473mL、USD4.99/件、MOQ6。502mL维C身体乳USD2.99/瓶、MOQ2，原444mL保留。</p><p>12条容量、5组同款关系和其他发布资料集中在这一张表。只填写最后一列。答案保存在当前浏览器，不会自动上传；请导出答案后再分享给项目负责人。不同设备不会自动同步。账号授权、密码和密钥只在对应平台处理。</p><nav><button id="export" type="button">导出已填答案 JSON</button><button id="text" type="button">导出可读答案 TXT</button><select id="filter" aria-label="筛选填写类别"><option value="">显示全部</option>FILTERS</select><span id="status" role="status"></span></nav><table><thead><tr><th>编号 / 产品或事项</th><th>已知信息</th><th>仅需补充内容 / 影响</th><th>请填写</th></tr></thead><tbody>ROWS</tbody></table></main><script>const rows=DATA;const key='topperfume-business-answers-v1';let answers={};const status=document.getElementById('status');try{answers=JSON.parse(localStorage.getItem(key)||'{}')}catch{}function update(){status.textContent='已填写 '+Object.values(answers).filter(v=>String(v).trim()).length+' / '+rows.length+' 项'}document.querySelectorAll('tr[data-id]').forEach(tr=>{const id=tr.dataset.id;const field=tr.querySelector('textarea');field.value=answers[id]||'';field.addEventListener('input',()=>{answers[id]=field.value;try{localStorage.setItem(key,JSON.stringify(answers));update()}catch{status.textContent='浏览器无法保存，请及时导出答案'}})});function download(ext,content,type){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download='TopPerfume_业务信息答案.'+ext;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}document.getElementById('export').onclick=()=>download('json',JSON.stringify({formVersion:1,exportedAt:new Date().toISOString(),responses:rows.map(r=>({...r,answer:answers[r.id]||''}))},null,2),'application/json');document.getElementById('text').onclick=()=>download('txt',rows.map(r=>r.id+' '+r.name+'\\n已知：'+r.known+'\\n待补：'+r.question+'\\n填写：'+(answers[r.id]||'未填')+'\\n').join('\\n'),'text/plain;charset=utf-8');document.getElementById('filter').onchange=e=>document.querySelectorAll('tr[data-id]').forEach(tr=>tr.hidden=!!e.target.value&&rows.find(r=>r.id===tr.dataset.id).group!==e.target.value);update();</script></body></html>'''.replace('FILTERS',''.join('<option>'+e(g)+'</option>' for g in dict.fromkeys(r['group'] for r in rows))).replace('ROWS',body).replace('DATA',data)
for target in ['client/public/previews/business-information-form.html','docs/TopPerfume_业务信息填写表.html']:(root/target).write_text(page,encoding='utf-8')
(root/'docs/business-information-form-fields.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'rows':len(rows),'capacity':12,'matches':5,'fileBytes':len(page.encode())}))
