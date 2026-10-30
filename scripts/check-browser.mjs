// Run against the local static server. External requests are blocked before navigation.
import {readdir,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.MYDY_PLAYWRIGHT_MODULE || 'playwright');
const origin='http://127.0.0.1:5190';
async function routes(dir,prefix='/') {
 const result=[];
 for(const entry of await readdir(dir,{withFileTypes:true})) {
  if(entry.isDirectory())result.push(...await routes(new URL(entry.name+'/',dir),prefix+entry.name+'/'));
  else if(entry.name.endsWith('.html'))result.push(prefix+(entry.name==='index.html'?'':entry.name));
 }
 return result;
}
const paths=await routes(new URL('../site/',import.meta.url));
await mkdir(new URL('../tmp/',import.meta.url),{recursive:true});
const browser=await chromium.launch({headless:true});
try {
 const context=await browser.newContext({javaScriptEnabled:false});
 await context.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
 const page=await context.newPage();
 const failures=[];page.on('pageerror',e=>failures.push(e.message));
 for(const width of [1440,768,390,320]) {
  await page.setViewportSize({width,height:1000});
  for(const path of paths) {
   const response=await page.goto(origin+path);
   assert.equal(response.status(),200,path);
   assert.ok(await page.locator('h1').isVisible(),path);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${path} overflows at ${width}`);
   const english=path.startsWith('/en/');
   assert.equal(await page.locator('.language-switch a[aria-current="page"]').getAttribute('lang'),english?'en':'ko');
  }
 }
 assert.deepEqual(failures,[]);
 await page.setViewportSize({width:1440,height:1100});
 for(const [path,name]of [['/','home'],['/guides/','guides'],['/guides/translate-birth-certificate.html','birth-guide'],['/en/guides/','guides-en']]){
  await page.goto(origin+path);await page.screenshot({path:new URL('../tmp/'+name+'.png',import.meta.url).pathname,fullPage:true});
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto(origin+'/guides/translate-birth-certificate.html');await page.screenshot({path:new URL('../tmp/guide-mobile.png',import.meta.url).pathname,fullPage:true});
 // Also verify the normal JS-enabled browser with advertising intercepted.
 const live=await browser.newContext();
 await live.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
 const p=await live.newPage();await p.goto(origin+'/');
 await p.getByRole('link',{name:'사용 가이드',exact:true}).click();
 await p.getByRole('link',{name:/출생증명서 번역문 작성·PDF 출력 가이드/}).click();
 assert.equal(new URL(p.url()).pathname,'/guides/translate-birth-certificate.html');
 await p.locator('.language-switch a[lang="en"]').click();
 assert.equal(new URL(p.url()).pathname,'/en/guides/translate-birth-certificate.html');
 console.log(`PASS: ${paths.length} pages at 4 widths, no-JS reading, navigation and matching language switch; all external requests blocked`);
}finally{await browser.close();}
