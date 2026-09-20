// Optional authoring tool; the deployed site has no runtime dependencies.
// Set MYDY_PLAYWRIGHT_MODULE to an installed Playwright module path if needed.
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.MYDY_PLAYWRIGHT_MODULE || 'playwright');
const site = new URL('../site/', import.meta.url);
const english = process.argv.includes('--en');
const homepage = await readFile(new URL('index.html', site), 'utf8');
const drawing = homepage.match(/<div class="doodle">(<svg[\s\S]*?<\/svg>)<\/div>/)?.[1];
if (!drawing) throw new Error('The family illustration was not found.');
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.route(/^https?:/, route => route.abort());
  let html = `<!doctype html><html lang="ko"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;background:#faf7f0;color:#393a33;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",sans-serif}
    .frame{width:1200px;height:630px;position:relative;padding:49px 66px;overflow:hidden}
    header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ddd7c9;padding-bottom:24px}
    .logo{font:bold 47px/1 Georgia,serif;letter-spacing:-3px}.logo span{font-size:30px;color:#ad4c38;vertical-align:top;margin-left:7px}
    .url{font:15px monospace;color:#706e63;letter-spacing:2px}
    .copy{position:absolute;left:66px;top:179px}.eyebrow{font-size:16px;color:#706e63;letter-spacing:1px;margin:0 0 21px}
    h1{font-size:59px;line-height:1.35;letter-spacing:-3px;margin:0;font-weight:650}h1 span{color:#ad4c38}
    .description{font-size:21px;color:#706e63;line-height:1.8;margin-top:22px}
    .back{position:absolute;right:91px;top:176px;width:302px;height:317px;background:#e1e7d9;transform:rotate(-7deg);border:1px solid #d2d8c9}
    .note{position:absolute;right:79px;top:162px;width:314px;height:332px;padding:27px;background:#fffdf8;transform:rotate(5deg);border:1px solid #dfd9cc;box-shadow:2px 7px 13px #493d2510}
    .tape{position:absolute;top:-14px;left:97px;width:113px;height:30px;background:#e3ce9eaa;transform:rotate(-9deg)}
    .label{font:11px monospace;letter-spacing:2px;color:#706e63;margin:0}
    svg{display:block;width:242px;height:137px;margin:10px auto 7px;fill:none;stroke:#746650;stroke-width:2.3;stroke-linecap:round;stroke-linejoin:round}
    .note-title{font-size:23px;line-height:1.5;margin:0 0 15px;letter-spacing:-1px}.names{border-top:1px dashed #d2caba;padding-top:13px;font-size:17px;color:#706e63;margin:0;letter-spacing:2px}
    .sticker{position:absolute;right:42px;top:443px;display:grid;place-content:center;text-align:center;width:106px;height:106px;border:5px solid #faf7f0;background:#ebc9b7;border-radius:50%;transform:rotate(-12deg);font:italic 17px/1.3 Georgia,serif}
    footer{position:absolute;bottom:34px;left:66px;right:66px;border-top:1px solid #ddd7c9;padding-top:17px;display:flex;justify-content:space-between;color:#706e63;font-size:13px}footer span:last-child{font:11px monospace;letter-spacing:1.5px}
  </style><div class="frame"><header><div class="logo">mydy<span>✳</span></div><span class="url">mydy.kr</span></header>
  <div class="copy"><p class="eyebrow">우리 가족의 작은 작업실</p><h1>함께 살며,<br><span>이것저것</span> 만듭니다.</h1><p class="description">필요해서 만들고, 재미있어서 해보는 것들.<br>우리 일상에서 시작된 사이드 프로젝트.</p></div>
  <div class="back"></div><div class="note"><span class="tape"></span><p class="label">A LITTLE BIT OF US</p>${drawing}<p class="note-title">우리에게 필요한 것,<br>우리 손으로 하나씩.</p><p class="names">민영 · 대열 · 백호</p></div><div class="sticker">made<br>together ♡</div>
  <footer><span>완성한 것도, 아직 만들어 가는 것도.</span><span>OUR FAMILY, OUR PROJECTS</span></footer></div></html>`;
  if (english) {
    const translations = [
      ['lang="ko"', 'lang="en"'],
      ['우리 가족의 작은 작업실', 'Our little family workshop'],
      ['함께 살며,<br><span>이것저것</span> 만듭니다.', 'Making <span>little things,</span><br>as we go.'],
      ['필요해서 만들고, 재미있어서 해보는 것들.<br>우리 일상에서 시작된 사이드 프로젝트.', 'Things we need. Ideas we enjoy.<br>Side projects from our everyday life.'],
      ['우리에게 필요한 것,<br>우리 손으로 하나씩.', 'Little things we need,<br>made with our own hands.'],
      ['민영 · 대열 · 백호', 'Minyoung · Daeyeol · Baekho'],
      ['완성한 것도, 아직 만들어 가는 것도.', 'Some finished. Some still taking shape.'],
      ['mydy.kr</span>', 'mydy.kr/en/</span>'],
    ];
    for (const [from, to] of translations) html = html.replace(from, to);
    html = html.replace('</style>', 'h1{font-size:54px;letter-spacing:-2px}.names{font-size:14px;letter-spacing:0}.note-title{font-size:20px}</style>');
  }
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await mkdir(site, { recursive: true });
  const output = fileURLToPath(new URL(english ? 'og-image-en.png' : 'og-image.png', site));
  await page.screenshot({ path: output, type: 'png' });
  console.log(`Created ${output} (1200 × 630)`);
} finally {
  await browser.close();
}
