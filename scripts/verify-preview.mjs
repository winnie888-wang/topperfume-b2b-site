import fs from 'node:fs/promises';
import path from 'node:path';
const base='http://localhost:3001';
const sitemap=await fs.readFile('dist/public/sitemap.xml','utf8');
const paths=process.argv.length>2 ? process.argv.slice(2) : [...sitemap.matchAll(/<loc>https:\/\/topperfume.cn([^<]+)<\/loc>/g)].map(m=>m[1]);
const assets=new Set(), links=new Set(), issues=[], checks=[];
for(const route of paths){
 const response=await fetch(base+route);const html=await response.text();
 const text=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,'');
 const h1=(html.match(/<h1(?:\s|>)/g)||[]).length;
 const schemas=[...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 if(response.status!==200||h1!==1||!html.includes('content="noindex,nofollow"')||!response.headers.get('x-robots-tag')?.includes('noindex')||text.includes('[TO CONFIRM]'))issues.push({route,status:response.status,h1,placeholder:text.includes('[TO CONFIRM]')});
 for(const m of html.matchAll(/(?:src|poster)="([^"]+)"/g)) assets.add(m[1].replace(/&amp;/g,'&'));
 for(const m of html.matchAll(/srcSet="([^"]+)"/gi))for(const a of m[1].split(','))assets.add(a.trim().split(' ')[0]);
 for(const m of html.matchAll(/href="([^"]+)"/g)){const href=m[1].replace(/&amp;/g,'&');if(href.startsWith('/')&&!href.startsWith('//'))links.add(href.split(/[?#]/)[0]||'/');if(href.startsWith('#')&&!html.includes(`id="${href.slice(1)}"`))issues.push({route,missingAnchor:href});}
 checks.push({route,status:response.status,h1,title:html.match(/<title>(.*?)<\/title>/)?.[1],canonical:html.match(/rel="canonical" href="([^"]+)"/)?.[1],schemas:schemas.length,noindex:true});
}
const assetResults=[];const queue=[...assets];
await Promise.all(Array.from({length:6},async()=>{while(queue.length){const asset=queue.shift();if(!asset)continue;try{const r=await fetch(asset.startsWith('/')?base+asset:asset,{method:'HEAD',signal:AbortSignal.timeout(15000)});assetResults.push({asset,status:r.status,type:r.headers.get('content-type')});if(!r.ok)issues.push({asset,status:r.status});}catch(e){issues.push({asset,error:e.message});}}}));
for(const route of links){if(route.startsWith('/assets/'))continue;try{await fs.access(path.join('dist/public',route,'index.html'));}catch{issues.push({link:route,missingPrerender:true});}}
const missing=await fetch(base+'/qa-missing-page');const missingAsset=await fetch(base+'/assets/qa-missing-image.webp');
if(missing.status!==404||missingAsset.status!==404)issues.push({notFound:[missing.status,missingAsset.status]});
const robots=await(await fetch(base+'/robots.txt')).text();
if(!robots.includes('Disallow: /'))issues.push({robots});
const report={checkedAt:new Date().toISOString(),pageCount:checks.length,assetCount:assetResults.length,internalLinkCount:links.size,notFoundStatus:missing.status,missingAssetStatus:missingAsset.status,robots,checks,assetResults,issues};
await fs.writeFile('docs/final-preview-validation.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:checks.length,assets:assetResults.length,links:links.size,issues}));
if(issues.length)process.exitCode=1;
