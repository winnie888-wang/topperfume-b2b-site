const TOPPERFUME_DEFAULT_CONFIG = {
  whatsappNumber: "8619066782710",
  r2AssetBase: ""
};
const TOPPERFUME_CONFIG = Object.assign({}, TOPPERFUME_DEFAULT_CONFIG, window.TOPPERFUME_CONFIG || {});

function buildWhatsAppLink(message){
  return `https://wa.me/${TOPPERFUME_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function applyWhatsAppLinks(){
  document.querySelectorAll('[data-wa]').forEach(el=>{
    const msg = el.getAttribute('data-wa') || 'Hello, I am interested in custom perfume, makeup and skincare products. Please send me more details.';
    el.setAttribute('href', buildWhatsAppLink(msg));
    el.setAttribute('target','_blank');
    el.setAttribute('rel','noopener');
  });
}

function mobileMenu(){
  const btn=document.querySelector('.mobile-menu');
  const nav=document.querySelector('.nav-links');
  if(btn && nav){btn.addEventListener('click',()=>nav.classList.toggle('open'));}
}

function filters(){
  const buttons=document.querySelectorAll('.filter-btn');
  const cards=document.querySelectorAll('[data-category]');
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    cards.forEach(card=>{
      card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
    });
  }));
}

function contactFormToWhatsApp(){
  const form=document.querySelector('#quoteForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    const msg=`Hello, I want to start a custom beauty project.

Name: ${data.name||''}
Company: ${data.company||''}
Email: ${data.email||''}
WhatsApp / Phone: ${data.phone||''}
Product Category: ${data.category||''}
Quantity: ${data.quantity||''}
Target Market: ${data.market||''}
Requirement: ${data.requirement||''}`;
    window.open(buildWhatsAppLink(msg),'_blank','noopener');
  });
}

function applyR2Assets(){
  const base = (TOPPERFUME_CONFIG.r2AssetBase || '').replace(/\/$/, '');
  if(!base) return;
  document.querySelectorAll('img[src^="assets/img/"], img[src^="../assets/img/"]').forEach(img=>{
    const file = img.getAttribute('src').split('/').pop();
    img.setAttribute('src', `${base}/img/${file}`);
  });
  document.querySelectorAll('link[rel="icon"][href^="assets/brand/"], link[rel="icon"][href^="../assets/brand/"]').forEach(link=>{
    const file = link.getAttribute('href').split('/').pop();
    link.setAttribute('href', `${base}/brand/${file}`);
  });
}




function productCategoryLabel(product){
  const map={perfume:'Perfume',skincare:'Skincare',makeup:'Makeup',sets:'Gift Sets'};
  return map[product.category] || product.category || 'Beauty Product';
}

function productHighlights(product){
  const common=['Private label logo and carton packaging available','Sample support before bulk order','Flexible OEM/ODM customization for B2B clients','WhatsApp-first quotation and fast sales follow-up'];
  if(product.category==='perfume'||product.category==='sets'){
    return ['Custom fragrance direction: floral, fruity, woody, musk, amber or oud','Bottle, cap, spray pump, label and gift box can be customized','Suitable for wholesalers, gift distributors and beauty brand launches',...common];
  }
  if(product.category==='skincare'){
    return ['Formula, texture, fragrance-free option and packaging style can be customized','Tube, pump, jar, stick, patch and pouch formats are available','Suitable for skincare starter lines, beauty salons and retail chains',...common];
  }
  if(product.category==='makeup'){
    return ['Shade range, finish, carton style and tube color can be customized','Matte, glossy, balm, liquid lip and eye palette options are available','Suitable for private label makeup collections and seasonal color launches',...common];
  }
  return common;
}

function productWhatsAppMessage(product){
  return product.whatsapp_message || `Hello, I am interested in ${product.name}. Please send MOQ, sample cost, packaging options and quotation.`;
}

async function loadProducts(){
  const res = await fetch('data/products.json');
  if(!res.ok) throw new Error('Cannot load product data');
  return await res.json();
}

async function enhanceProductCards(){
  const cards=document.querySelectorAll('.product-card');
  if(!cards.length) return;
  try{
    const products=await loadProducts();
    const byName=new Map(products.map(p=>[p.name,p]));
    cards.forEach(card=>{
      if(card.querySelector('.detail-link')) return;
      const title=card.querySelector('h3')?.textContent?.trim();
      const product=byName.get(title);
      const quote=card.querySelector('a[data-wa]');
      if(!product || !quote) return;
      const detail=document.createElement('a');
      detail.className='btn detail-link';
      detail.href=`products/${encodeURIComponent(product.id)}.html`;
      detail.textContent='View Details';
      quote.parentNode.insertBefore(detail, quote);
    });
  }catch(e){console.warn(e)}
}

async function renderProductDetail(){
  const mount=document.getElementById('productDetail');
  if(!mount) return;
  try{
    const products=await loadProducts();
    const params=new URLSearchParams(location.search);
    const id=params.get('id') || products[0].id;
    const product=products.find(p=>p.id===id) || products[0];
    const cat=productCategoryLabel(product);
    const highlights=productHighlights(product);
    const msg=productWhatsAppMessage(product);
    document.title=`${product.name} | Product Detail | TopPerfume Beauty Labs`;
    const meta=document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute('content', `${product.name} product detail for B2B wholesale and private label customization. Reference price ${product.reference_price}. Contact TopPerfume on WhatsApp for MOQ, samples and packaging options.`);
    mount.innerHTML=`
      <div class="detail-layout">
        <div class="detail-gallery"><img src="${product.image}" alt="${product.name}"></div>
        <div class="detail-info">
          <div class="eyebrow">${cat} Product Detail</div>
          <h1>${product.name}</h1>
          <div class="detail-price">${product.reference_price}<small> reference wholesale price</small></div>
          <p class="lead">${product.description}</p>
          <div class="detail-grid">
            <div class="detail-cell"><small>Category</small><b>${cat}</b></div>
            <div class="detail-cell"><small>Specification</small><b>${product.spec || 'Custom specification available'}</b></div>
            <div class="detail-cell"><small>Branding</small><b>Private Label / OEM / ODM</b></div>
            <div class="detail-cell"><small>Inquiry</small><b>Direct WhatsApp quotation</b></div>
          </div>
          <div class="hero-actions"><a class="btn rose" data-wa="${msg}">Get Quote on WhatsApp</a><a class="btn light" data-wa="Hello, I want to request a sample of ${product.name}. Please send sample cost, lead time and shipping options.">Request Sample</a></div>
        </div>
      </div>
      <section class="section"><div class="section-head"><div><h2 class="section-title">Product information.</h2><p class="section-copy">Built for B2B wholesale, private label and custom beauty brand projects.</p></div></div>
        <div class="split">
          <div class="panel"><h3>Key Selling Points</h3><ul class="bullet-list">${highlights.map(x=>`<li>${x}</li>`).join('')}</ul></div>
          <div class="panel"><h3>Customizable Options</h3><table class="spec-table"><tbody>
            <tr><th>Logo</th><td>Your brand logo on bottle, tube, palette, label or carton</td></tr>
            <tr><th>Packaging</th><td>Color box, gift box, label sticker, display set and sample kit</td></tr>
            <tr><th>Product</th><td>Fragrance, formula, shade, texture, color and size can be discussed</td></tr>
            <tr><th>MOQ</th><td>Confirm by product type, packaging and customization level</td></tr>
            <tr><th>Sample</th><td>Available before bulk order; sample details confirmed by WhatsApp</td></tr>
          </tbody></table></div>
        </div>
      </section>
      <section class="section soft-section"><div class="container"><div class="section-head"><div><h2 class="section-title">How the project works.</h2><p class="section-copy">Simple B2B process from product selection to customized production.</p></div></div><div class="steps"><div class="step"><b>Select product</b><p>Choose an existing style or send your reference.</p></div><div class="step"><b>Confirm quotation</b><p>We confirm MOQ, sample cost, packaging and lead time.</p></div><div class="step"><b>Sample & artwork</b><p>Logo, label and packaging artwork are prepared for approval.</p></div><div class="step"><b>Bulk production</b><p>Production, QC, packing and shipping are arranged after approval.</p></div></div></div></section>
    `;
    renderRelatedProducts(products, product);
    applyR2Assets();
    applyWhatsAppLinks();
  }catch(e){
    mount.innerHTML='<div class="panel"><h2>Product detail is temporarily unavailable.</h2><p>Please contact us on WhatsApp for catalog and quotation.</p><a class="btn rose" data-wa="Hello, please send me the TopPerfume product catalog and quotation.">Contact WhatsApp</a></div>';
    applyWhatsAppLinks();
  }
}

function renderRelatedProducts(products, current){
  const mount=document.getElementById('relatedProducts');
  if(!mount) return;
  const related=products.filter(p=>p.id!==current.id && p.category===current.category).slice(0,4);
  const list=(related.length?related:products.filter(p=>p.id!==current.id).slice(0,4));
  mount.innerHTML=list.map(p=>`<a class="related-card" href="products/${encodeURIComponent(p.id)}.html"><img src="${p.image}" alt="${p.name}"><div><p>${productCategoryLabel(p)} · ${p.reference_price}</p><h3>${p.name}</h3><p>${p.description}</p></div></a>`).join('');
}

document.addEventListener('DOMContentLoaded',()=>{
  applyR2Assets();
  applyWhatsAppLinks();
  mobileMenu();
  filters();
  contactFormToWhatsApp();
  enhanceProductCards();
  renderProductDetail();
});
