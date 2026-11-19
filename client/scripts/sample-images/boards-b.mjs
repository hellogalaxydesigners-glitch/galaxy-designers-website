/* Sample boards: Saffron & Sage, Brightnest Homes, Loomcraft, Quotient (all fictional brands). */
import { browser, page, sampleMark } from './shared.mjs';

export const boardsB = {};

/* ===================================================================== */
/* Saffron & Sage – tea brand identity                                    */
/* ===================================================================== */
const ssCss = `.ss{font-family:Cardo,serif;color:#2F4A3A} .ss-sans{font-family:'DM Sans'}
.tin{position:absolute;border-radius:18px 18px 22px 22px;overflow:hidden;box-shadow:0 40px 60px -25px rgba(0,0,0,.45),inset -18px 0 30px -10px rgba(0,0,0,.18),inset 14px 0 24px -12px rgba(255,255,255,.35)}
.tin .lid{position:absolute;left:-2px;right:-2px;top:0;height:46px;border-radius:16px 16px 4px 4px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18)}
.tin .band{position:absolute;left:0;right:0;background:#F6EEDF;text-align:center;padding:16px 10px}`;
const leaf = (color, op = 0.35) =>
  `<svg width="100%" height="100%" style="position:absolute;inset:0" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="${color}" stroke-opacity="${op}" stroke-width="2">${Array.from({ length: 6 }, (_, r) => Array.from({ length: 4 }, (_, c) => `<path d="M${c * 56 + (r % 2) * 28} ${r * 56 + 20} q14 -22 28 0 q-14 22 -28 0z M${c * 56 + (r % 2) * 28} ${r * 56 + 20} h28"/>`).join('')).join('')}</g></svg>`;
const tin = ({ x, y, w = 200, h = 300, color, name, note, pattern = '#fff' }) => `
  <div class="tin" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${color}">
    ${leaf(pattern)}
    <div class="lid" style="background:${color};filter:brightness(.88)"></div>
    <div class="band ss" style="top:${h * 0.42}px">
      <div style="font:700 ${w * 0.1}px Cardo;letter-spacing:.02em">Saffron &amp; Sage</div>
      <div class="ss-sans" style="font:700 ${w * 0.055}px 'DM Sans';letter-spacing:.14em;margin-top:6px;color:${color}">${name.toUpperCase()}</div>
      <div class="ss-sans" style="font:500 ${w * 0.05}px 'DM Sans';margin-top:4px;opacity:.7">${note}</div></div></div>`;

const saffron = {
  cover: () =>
    page(ssCss, `<div class="board ss" style="background:#F1E6D3">
      <div class="abs" style="left:110px;top:120px">
        <div style="font:400 26px Cardo;font-style:italic;opacity:.7">Brand identity</div>
        <div style="font:700 128px/0.95 Cardo;letter-spacing:-.02em;margin-top:18px">Saffron<br/>&amp; Sage</div>
        <div class="ss-sans" style="font:500 20px 'DM Sans';margin-top:28px;max-width:440px;line-height:1.5;opacity:.8">Single-estate teas, packed fresh. A warm, unhurried identity for a direct-to-consumer brand.</div></div>
      <div class="abs" style="left:110px;top:690px;display:flex;gap:14px">
        ${[['#E39B2D', 'Saffron'], ['#8FA889', 'Sage'], ['#2F4A3A', 'Forest'], ['#C46A4A', 'Clay'], ['#F6EEDF', 'Parchment']].map(([c, n]) => `<div><div style="width:108px;height:108px;border-radius:50%;background:${c};border:1px solid rgba(47,74,58,.15)"></div><div class="ss-sans" style="font:700 13px 'DM Sans';margin-top:10px">${n}</div><div class="ss-sans" style="font:500 12px 'DM Sans';opacity:.65">${c}</div></div>`).join('')}</div>
      <div class="abs" style="left:900px;top:120px;width:220px;height:220px;border-radius:50%;background:#2F4A3A;display:flex;align-items:center;justify-content:center;color:#F1E6D3;font:700 76px Cardo;letter-spacing:-.04em">S<span style="font-size:44px;font-style:italic;margin:0 2px;color:#E39B2D">&amp;</span>S</div>
      ${tin({ x: 1150, y: 300, w: 270, h: 420, color: '#E39B2D', name: 'Assam Morning', note: 'Bold · malty · 100 g' })}
      ${tin({ x: 930, y: 420, w: 220, h: 340, color: '#8FA889', name: 'Nilgiri Frost', note: 'Bright · floral · 100 g' })}
      ${sampleMark('rgba(47,74,58,.55)')}</div>`),
  '01': () =>
    page(ssCss, `<div class="board ss" style="background:#2F4A3A">
      <div class="abs" style="left:0;right:0;bottom:0;height:300px;background:#26402F"></div>
      ${[['#E39B2D', 'Assam Morning', 'Bold · malty'], ['#8FA889', 'Nilgiri Frost', 'Bright · floral'], ['#C46A4A', 'Masala Chai', 'Warm · spiced'], ['#6B4E71', 'Darjeeling Dusk', 'Muscatel · light'], ['#7FA7B5', 'Kangra Green', 'Grassy · fresh']].map(([c, n, t], i) => tin({ x: 150 + i * 270, y: 300 + (i % 2) * 40, w: 220, h: 340, color: c, name: n, note: t + ' · 100 g' })).join('')}
      <div class="abs" style="left:150px;top:110px;color:#F1E6D3"><div style="font:700 56px Cardo">One system, every blend.</div><div class="ss-sans" style="font:500 19px 'DM Sans';opacity:.75;margin-top:12px">Colour identifies the blend; the pattern and label stay constant.</div></div>
      ${sampleMark()}</div>`),
  '02': () =>
    page(ssCss, `<div class="board ss" style="background:#E7D9C1">
      <div class="abs" style="left:150px;top:90px;display:grid;grid-template-columns:repeat(3,420px);gap:30px">
        <div style="height:400px;background:#2F4A3A;color:#F1E6D3;padding:44px;display:flex;flex-direction:column;justify-content:space-between">
          <div class="ss-sans" style="font:700 13px 'DM Sans';letter-spacing:.14em;color:#E39B2D">SAFFRON &amp; SAGE</div>
          <div style="font:700 52px/1.05 Cardo">Slow mornings, single estates.</div><div class="ss-sans" style="font:500 15px 'DM Sans';opacity:.7">@saffronandsage</div></div>
        <div style="height:400px;background:#E39B2D;position:relative;overflow:hidden">${tin({ x: 120, y: 60, w: 180, h: 280, color: '#2F4A3A', name: 'Assam Morning', note: 'Bold · malty', pattern: '#E39B2D' })}</div>
        <div style="height:400px;background:#8FA889;position:relative;overflow:hidden">${leaf('#2F4A3A', 0.5)}<div style="position:absolute;left:40px;bottom:40px;right:40px;background:#F6EEDF;padding:24px"><div class="ss-sans" style="font:700 12px 'DM Sans';letter-spacing:.14em;color:#8FA889">NEW BLEND</div><div style="font:700 38px Cardo;margin-top:6px">Nilgiri Frost</div></div></div>
        <div style="height:400px;background:#F6EEDF;padding:44px;display:flex;flex-direction:column;justify-content:center;text-align:center"><div style="font:700 92px Cardo;color:#C46A4A">3 min</div><div class="ss-sans" style="font:600 18px 'DM Sans';margin-top:10px">at 90°C for the perfect cup</div></div>
        <div style="height:400px;background:#C46A4A;color:#F6EEDF;padding:44px;display:flex;flex-direction:column;justify-content:flex-end"><div style="font:700 48px/1.05 Cardo">Chai, the way it should taste.</div><div class="ss-sans" style="font:600 15px 'DM Sans';margin-top:16px">Masala Chai · now in stock</div></div>
        <div style="height:400px;background:#2F4A3A;display:flex;align-items:center;justify-content:center"><div style="width:220px;height:220px;border-radius:50%;background:#F1E6D3;display:flex;align-items:center;justify-content:center;font:700 76px Cardo;color:#2F4A3A;letter-spacing:-.04em">S<span style="font-size:44px;font-style:italic;color:#E39B2D">&amp;</span>S</div></div>
      </div>
      ${sampleMark('rgba(47,74,58,.55)')}</div>`),
};

/* ===================================================================== */
/* Brightnest Homes – real estate lead campaign                           */
/* ===================================================================== */
const bnCss = `.bn{font-family:Montserrat;color:#1F2A44} .bn-btn{background:#F2B84B;color:#1F2A44;font:700 14px Montserrat;padding:13px 20px;border-radius:6px;display:inline-block}`;
const building = (h = 420) => `<div style="position:relative;height:${h}px;background:linear-gradient(180deg,#8fb6d9 0%,#cfe0ee 60%,#e9e2d3 100%);overflow:hidden">
  <div style="position:absolute;left:12%;bottom:0;width:30%;height:78%;background:#f4f1ea;box-shadow:inset -30px 0 0 rgba(0,0,0,.06)">
    ${Array.from({ length: 9 }, (_, r) => `<div style="display:flex;gap:10%;padding:0 10%;margin-top:${r === 0 ? 16 : 10}px">${Array.from({ length: 3 }, () => `<div style="flex:1;height:18px;background:#6f8fa8;opacity:.75;border-bottom:3px solid #c9c2b1"></div>`).join('')}</div>`).join('')}</div>
  <div style="position:absolute;left:44%;bottom:0;width:26%;height:62%;background:#e8e3d8;box-shadow:inset -24px 0 0 rgba(0,0,0,.06)">
    ${Array.from({ length: 7 }, (_, r) => `<div style="display:flex;gap:10%;padding:0 10%;margin-top:${r === 0 ? 16 : 10}px">${Array.from({ length: 3 }, () => `<div style="flex:1;height:18px;background:#6f8fa8;opacity:.75;border-bottom:3px solid #c9c2b1"></div>`).join('')}</div>`).join('')}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:12%;background:#7a9a6a"></div>
  <div style="position:absolute;left:4%;bottom:6%;width:60px;height:90px;border-radius:50% 50% 8px 8px;background:#5d7f50"></div>
  <div style="position:absolute;right:8%;bottom:6%;width:80px;height:120px;border-radius:50% 50% 8px 8px;background:#4f7244"></div></div>`;

const brightnest = {
  cover: () =>
    page(bnCss, `<div class="board bn" style="background:#1F2A44">
      ${browser({ x: 90, y: 110, w: 960, h: 820, url: 'brightnesthomes.example/launch', content: `<div class="bn" style="background:#fff;height:100%">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 32px"><div style="font:800 18px Montserrat">Brightnest<span style="color:#F2B84B">.</span></div><div class="bn-btn" style="padding:10px 16px;font-size:12px">Book a site visit</div></div>
        <div style="position:relative">${building(400)}
          <div style="position:absolute;left:32px;top:40px;max-width:440px;background:rgba(255,255,255,.94);padding:26px 28px;border-radius:8px">
            <div style="font:700 12px Montserrat;color:#b07a10;letter-spacing:.08em">NEW LAUNCH · PHASE 1</div>
            <div style="font:800 34px/1.1 Montserrat;margin-top:10px">Homes with room to grow.</div>
            <div style="font:500 14px/1.5 Montserrat;color:#4a5570;margin-top:10px">2 &amp; 3 BHK residences with a central park, close to schools and the metro.</div></div></div>
        <div style="display:grid;grid-template-columns:1fr 330px;gap:28px;padding:28px 32px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">${[['2 BHK', 'From 1,050 sq ft'], ['3 BHK', 'From 1,420 sq ft'], ['Possession', 'Phase 1 · 2028'], ['Amenities', 'Clubhouse · park · pool']].map(([a, b]) => `<div style="border:1px solid #e6e8ee;border-radius:8px;padding:16px"><div style="font:700 15px Montserrat">${a}</div><div style="font:500 13px Montserrat;color:#4a5570;margin-top:4px">${b}</div></div>`).join('')}</div>
          <div style="background:#1F2A44;color:#fff;border-radius:10px;padding:22px;margin-top:-120px;position:relative;box-shadow:0 20px 40px -20px rgba(0,0,0,.5)">
            <div style="font:700 18px Montserrat">Book a site visit</div>
            ${['Full name', 'Mobile number', 'Preferred date'].map((l) => `<div style="margin-top:12px;font:600 11px Montserrat;opacity:.7">${l}</div><div style="margin-top:5px;height:38px;border-radius:6px;background:rgba(255,255,255,.1)"></div>`).join('')}
            <div class="bn-btn" style="display:block;text-align:center;margin-top:16px">Request a call back</div></div></div></div>` })}
      <div class="abs" style="left:1110px;top:150px;width:390px;height:488px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.6)">
        ${building(300)}<div style="padding:22px 24px"><div style="font:800 26px/1.15 Montserrat">Site visits open this weekend</div><div style="font:500 14px Montserrat;color:#4a5570;margin-top:8px">2 &amp; 3 BHK · Phase 1 launch</div><div class="bn-btn" style="margin-top:16px">Book your visit</div></div></div>
      <div class="abs" style="left:1180px;top:670px;width:320px;height:320px;background:#F2B84B;border-radius:12px;padding:26px;box-shadow:0 40px 80px -30px rgba(0,0,0,.6)">
        <div style="font:800 22px Montserrat">3 BHK · 1,420 sq ft</div>
        <svg width="268" height="220" viewBox="0 0 268 220" fill="none" stroke="#1F2A44" stroke-width="3" style="margin-top:12px"><rect x="4" y="4" width="260" height="200"/><path d="M130 4v120M4 110h126M190 4v80M190 84h74M130 160h134M60 110v94"/></svg></div>
      ${sampleMark()}</div>`),
  '01': () =>
    page(bnCss, `<div class="board bn" style="background:#E6E9F0">
      <div class="abs" style="left:110px;top:90px;font:800 44px Montserrat">Launch creatives</div>
      <div class="abs" style="left:110px;top:150px;font:500 18px Montserrat;color:#4a5570">Every concept produced for feed, story and display placements.</div>
      <div class="abs" style="left:110px;top:240px;display:flex;gap:28px;align-items:flex-start">
        <div style="width:340px;height:604px;background:#1F2A44;border-radius:14px;overflow:hidden;color:#fff">${building(330)}<div style="padding:24px"><div style="font:800 30px/1.1 Montserrat">Your next chapter starts at Brightnest.</div><div class="bn-btn" style="margin-top:20px">Swipe up to book</div></div></div>
        <div style="display:grid;gap:28px">
          <div style="width:340px;height:340px;background:#fff;border-radius:14px;overflow:hidden">${building(200)}<div style="padding:18px 22px;font:800 22px/1.15 Montserrat">Homes with room to grow.</div></div>
          <div style="width:340px;height:236px;background:#F2B84B;border-radius:14px;padding:26px"><div style="font:800 26px/1.1 Montserrat">Walk to the metro. Wake up to the park.</div><div style="font:600 14px Montserrat;margin-top:12px">Brightnest Homes · Phase 1</div></div></div>
        <div style="display:grid;gap:28px">
          <div style="width:500px;height:262px;background:#1F2A44;border-radius:14px;color:#fff;display:grid;grid-template-columns:1fr 1fr;overflow:hidden"><div style="padding:26px"><div style="font:800 26px/1.1 Montserrat">2 &amp; 3 BHK residences</div><div class="bn-btn" style="margin-top:18px">Book a visit</div></div>${building(262)}</div>
          <div style="width:500px;height:314px;background:#fff;border-radius:14px;padding:30px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div><div style="font:800 24px/1.15 Montserrat">Plans built around family life.</div><div style="font:500 14px Montserrat;color:#4a5570;margin-top:10px">Separate study, two balconies, storage in every room.</div></div>
            <svg width="200" height="250" viewBox="0 0 200 250" fill="none" stroke="#1F2A44" stroke-width="3"><rect x="4" y="4" width="192" height="242"/><path d="M100 4v140M4 120h96M140 4v90M140 94h56M100 180h96M50 120v126"/></svg></div></div></div>
      ${sampleMark('rgba(31,42,68,.55)')}</div>`),
  '02': () =>
    page(bnCss, `<div class="board bn" style="background:#1F2A44">
      ${browser({ x: 130, y: 90, w: 1340, h: 880, url: 'reports.example/brightnest-launch', content: `<div class="bn" style="background:#F6F7FA;height:100%;padding:30px 36px">
        <div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font:800 26px Montserrat">Launch campaign · weekly report</div><div style="font:500 14px Montserrat;color:#4a5570;margin-top:4px">Week 6 · All figures are sample data for illustration</div></div><span class="pill" style="background:#fff3d6;color:#7a5200;padding:8px 12px;font-family:Montserrat">Sample data</span></div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px">${[['Leads', '312'], ['Qualified leads', '141'], ['Site visits booked', '58'], ['Cost per lead', '₹1,140']].map(([l, v]) => `<div style="background:#fff;border-radius:10px;padding:18px 20px;border:1px solid #e6e8ee"><div style="font:600 13px Montserrat;color:#4a5570">${l}</div><div style="font:800 32px Montserrat;margin-top:8px">${v}</div></div>`).join('')}</div>
        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:14px;margin-top:14px">
          <div style="background:#fff;border-radius:10px;padding:20px;border:1px solid #e6e8ee"><div style="font:700 15px Montserrat">Leads per week</div>
            <svg width="100%" height="260" viewBox="0 0 640 260" preserveAspectRatio="none" style="margin-top:10px">${[40, 100, 160, 220].map((y) => `<line x1="0" x2="640" y1="${y}" y2="${y}" stroke="#eef0f4"/>`).join('')}
              <path d="M10 220 L120 190 L230 170 L340 140 L450 100 L560 70 L630 52 L630 250 L10 250Z" fill="#F2B84B" opacity=".18"/>
              <path d="M10 220 L120 190 L230 170 L340 140 L450 100 L560 70 L630 52" stroke="#d99a1e" stroke-width="4" fill="none"/>
              <path d="M10 236 L120 222 L230 214 L340 200 L450 182 L560 170 L630 160" stroke="#1F2A44" stroke-width="3" fill="none" stroke-dasharray="8 6"/></svg>
            <div style="display:flex;gap:20px;font:600 12px Montserrat;color:#4a5570"><span style="color:#b07a10">● All leads</span><span>– – Qualified</span></div></div>
          <div style="background:#fff;border-radius:10px;padding:20px;border:1px solid #e6e8ee"><div style="font:700 15px Montserrat">Leads by channel</div>
            ${[['Google Search', 46], ['Meta (Facebook & Instagram)', 34], ['YouTube', 12], ['Referral & direct', 8]].map(([n, p]) => `<div style="margin-top:18px"><div style="display:flex;justify-content:space-between;font:600 13px Montserrat"><span>${n}</span><span>${p}%</span></div><div style="height:10px;background:#eef0f4;border-radius:5px;margin-top:7px"><div style="width:${p * 2}%;max-width:100%;height:100%;background:#1F2A44;border-radius:5px"></div></div></div>`).join('')}</div></div>
        <div style="background:#fff;border-radius:10px;padding:16px 20px;border:1px solid #e6e8ee;margin-top:14px;font:500 14px Montserrat;color:#1F2A44"><b>Next week:</b> shift 15% of budget from YouTube to Google Search; test a new hook on the 3 BHK story ad.</div></div>` })}
      ${sampleMark()}</div>`),
};

/* ===================================================================== */
/* Loomcraft – UGC video series                                           */
/* ===================================================================== */
const lcCss = `.lc{font-family:'Fira Sans'} .frame{position:absolute;border-radius:18px;overflow:hidden;box-shadow:0 40px 70px -30px rgba(0,0,0,.7)}
.cap{display:inline;background:#fff;color:#111;font:800 18px/1.5 'Fira Sans';padding:3px 8px;box-decoration-break:clone;-webkit-box-decoration-break:clone}`;
const garment = (color, accent) => `<svg viewBox="0 0 200 300" style="position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);width:78%">
  <path d="M100 18 l-10 10 h20z" fill="#3a2c26"/><path d="M70 40 q30 -18 60 0 l40 30 -18 30 -16 -10 v190 h-92 v-190 l-16 10 -18 -30z" fill="${color}"/>
  <path d="M86 40 q14 18 28 0" fill="none" stroke="${accent}" stroke-width="4"/><path d="M100 50 v70" stroke="${accent}" stroke-width="3" stroke-dasharray="4 6"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M54 ${140 + i * 20} h92" stroke="${accent}" stroke-opacity=".35" stroke-width="3"/>`).join('')}</svg>`;
const vframe = ({ x, y, w = 240, h = 426, bg, color, accent, caption, prog = 40 }) => `
  <div class="frame lc" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${bg}">
    <div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 6px,transparent 6px 14px)"></div>
    ${garment(color, accent)}
    <div style="position:absolute;left:12px;right:12px;top:12px;height:3px;background:rgba(255,255,255,.35);border-radius:2px"><div style="width:${prog}%;height:100%;background:#fff;border-radius:2px"></div></div>
    <div style="position:absolute;right:12px;bottom:90px;display:grid;gap:14px">${Array.from({ length: 3 }, () => '<div style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.85)"></div>').join('')}</div>
    <div style="position:absolute;left:14px;right:56px;bottom:${Math.round(h * 0.28)}px;text-align:left"><span class="cap">${caption}</span></div>
    <div style="position:absolute;left:14px;bottom:18px;color:#fff;font:600 13px 'Fira Sans'">@loomcraft.studio</div></div>`;

const loomcraft = {
  cover: () =>
    page(lcCss, `<div class="board lc" style="background:#241A17">
      <div class="abs" style="left:110px;top:80px;color:#F3E2D3;font:800 30px 'Fira Sans'">Loomcraft · UGC series</div>
      ${[['#d9a37e', '#f2e6d8', '#8a4b2f', 'POV: the kurta you will actually live in', 30], ['#9fb3a1', '#f4efe6', '#3d5a45', '3 ways to style one shirt', 55], ['#e3c9a3', '#c46a4a', '#7a3a24', 'Fabric check: does it crease?', 70], ['#b8a2c2', '#efe7f3', '#5b3f66', 'Honest review after 30 washes', 20], ['#c9d6dc', '#2f4a5a', '#e6eef2', 'Office to dinner in 10 seconds', 85]].map(([bg, col, acc, cap, p], i) => vframe({ x: 95 + i * 290, y: 220 + (i % 2 === 0 ? 0 : 70), w: 265, h: 470, bg, color: col, accent: acc, caption: cap, prog: p })).join('')}
      ${sampleMark()}</div>`),
  '01': () =>
    page(lcCss, `<div class="board lc" style="background:#F6F3EF;color:#241A17">
      <div class="abs" style="left:100px;top:80px;font:800 44px 'Fira Sans'">Storyboard · “Fabric check”</div>
      <div class="abs" style="left:100px;top:140px;font:500 19px 'Fira Sans';color:#6b5a52">Every video is planned around the first three seconds.</div>
      ${[['0–3 s', 'Hook', 'Scrunches the sleeve into a fist on camera.', '“Watch what happens when I do this.”'], ['3–8 s', 'Problem', 'Shows a creased shirt from another brand.', '“Most cotton looks like this after an hour.”'], ['8–15 s', 'Demo', 'Releases the Loomcraft sleeve – no creases.', '“Same test. Zero creases.”'], ['15–22 s', 'Detail', 'Close-up of the weave and label.', '“Handloom cotton with a soft finish.”'], ['22–27 s', 'Styling', 'Quick cuts: office, café, evening.', '“Wear it everywhere.”'], ['27–30 s', 'CTA', 'Holds the shirt to camera, link sticker.', '“Link below – first order ships free.”']].map(([t, h, a, v], i) => `
        <div class="abs" style="left:${100 + (i % 3) * 470}px;top:${230 + Math.floor(i / 3) * 370}px;width:430px">
          <div style="display:flex;gap:16px">
            <div style="width:150px;height:266px;border-radius:12px;border:2px solid #241A17;background:#fff;position:relative;overflow:hidden">
              <svg viewBox="0 0 150 266" width="150" height="266" fill="none" stroke="#241A17" stroke-width="2.2" stroke-linecap="round">
                ${i === 0 ? '<circle cx="75" cy="120" r="34"/><path d="M50 120q25-20 50 0"/>' : ''}
                ${i === 1 ? '<path d="M35 70l40-20 40 20v110h-80z"/><path d="M45 90l15 10M70 95l20-8M50 130l30 6M85 140l15-10"/>' : ''}
                ${i === 2 ? '<path d="M35 70l40-20 40 20v110h-80z"/><path d="M55 100h40M55 120h40M55 140h40" stroke-opacity=".4"/>' : ''}
                ${i === 3 ? '<rect x="25" y="70" width="100" height="100"/><path d="M25 90h100M25 110h100M25 130h100M25 150h100M45 70v100M65 70v100M85 70v100M105 70v100" stroke-opacity=".35"/>' : ''}
                ${i === 4 ? '<rect x="20" y="40" width="50" height="80"/><rect x="80" y="40" width="50" height="80"/><rect x="20" y="140" width="110" height="80"/>' : ''}
                ${i === 5 ? '<path d="M35 70l40-20 40 20v110h-80z"/><rect x="40" y="200" width="70" height="26" rx="13"/>' : ''}
              </svg><div style="position:absolute;left:8px;top:8px;font:700 11px 'Fira Sans';background:#241A17;color:#fff;padding:2px 6px;border-radius:4px">${t}</div></div>
            <div style="flex:1;padding-top:6px"><div style="font:800 22px 'Fira Sans'">${h}</div><div style="font:500 15px/1.45 'Fira Sans';color:#6b5a52;margin-top:8px">${a}</div><div style="font:600 15px/1.45 'Fira Sans';margin-top:12px;font-style:italic">${v}</div></div></div></div>`).join('')}
      ${sampleMark('rgba(36,26,23,.5)')}</div>`),
  '02': () =>
    page(lcCss, `<div class="board lc" style="background:#3B2A24">
      <div class="abs" style="left:110px;top:80px;color:#F3E2D3;font:800 40px 'Fira Sans'">One concept, every placement</div>
      ${vframe({ x: 110, y: 200, w: 330, h: 586, bg: '#d9a37e', color: '#f2e6d8', accent: '#8a4b2f', caption: 'POV: the kurta you will actually live in', prog: 45 })}
      ${vframe({ x: 500, y: 300, w: 390, h: 488, bg: '#d9a37e', color: '#f2e6d8', accent: '#8a4b2f', caption: 'POV: the kurta you will actually live in', prog: 45 })}
      ${vframe({ x: 950, y: 398, w: 390, h: 390, bg: '#d9a37e', color: '#f2e6d8', accent: '#8a4b2f', caption: 'POV: the kurta you will live in', prog: 45 })}
      ${[['9:16 · Reels, Shorts, Stories', 110], ['4:5 · Feed', 500], ['1:1 · Marketplace & catalogue', 950]].map(([l, x]) => `<div class="abs" style="left:${x}px;top:820px;color:#F3E2D3;font:600 17px 'Fira Sans'">${l}</div>`).join('')}
      ${sampleMark()}</div>`),
};

/* ===================================================================== */
/* Quotient – AI-assisted quotation automation                            */
/* ===================================================================== */
const qtCss = `.qt{font-family:Inter;color:#E8ECF8} .node{position:absolute;width:250px;background:#171B30;border:1px solid #2A3052;border-radius:14px;padding:18px 18px 16px}
.node .k{font:600 11px 'DejaVu Sans Mono',monospace;color:#22C3E6;letter-spacing:.04em} .node .t{font:700 17px Inter;margin-top:8px} .node .d{font:500 13px/1.45 Inter;color:#9AA3C7;margin-top:6px}
.mono{font-family:'DejaVu Sans Mono',monospace}`;
const qNode = (x, y, k, t, d, hl = false) => `<div class="node" style="left:${x}px;top:${y}px;${hl ? 'border-color:#22C3E6;box-shadow:0 0 0 4px rgba(34,195,230,.12)' : ''}"><div class="k">${k}</div><div class="t">${t}</div><div class="d">${d}</div></div>`;

const quotient = {
  cover: () =>
    page(qtCss, `<div class="board qt" style="background:#0F1222;background-image:radial-gradient(#232845 1.2px,transparent 1.2px);background-size:26px 26px">
      <div class="abs" style="left:100px;top:80px;font:800 34px Inter">Quotient · enquiry to quotation</div>
      <div class="abs" style="left:100px;top:132px;font:500 17px Inter;color:#9AA3C7">Automated workflow with a human approval step</div>
      <svg class="abs" style="left:0;top:0" width="1600" height="1000" fill="none" stroke="#3A4373" stroke-width="2">
        <path d="M350 330 H430"/><path d="M680 330 H760"/><path d="M1010 330 H1090"/>
        <path d="M1215 410 V480 Q1215 520 1175 520 H460 Q420 520 420 560 V600" stroke="#22C3E6" stroke-dasharray="6 6"/>
        <path d="M545 680 H625"/><path d="M875 680 H955"/>
        ${[350, 680, 1010].map((x) => `<circle cx="${x + 80}" cy="330" r="4" fill="#22C3E6" stroke="none"/>`).join('')}
        ${[545, 875].map((x) => `<circle cx="${x + 80}" cy="680" r="4" fill="#22C3E6" stroke="none"/>`).join('')}</svg>
      ${qNode(100, 250, 'TRIGGER', 'Shared inbox', 'New email, PDF or Excel enquiry arrives.')}
      ${qNode(430, 250, 'AI · EXTRACT', 'Read the enquiry', 'Products, quantities, delivery and contact pulled into a form.', true)}
      ${qNode(760, 250, 'MATCH', 'Find products', 'Each line matched to the catalogue with a confidence score.')}
      ${qNode(1090, 250, 'RULES', 'Apply pricing', 'Customer price list, volume breaks and freight.')}
      ${qNode(295, 600, 'DRAFT', 'Create quotation', 'Branded PDF with line items and terms.')}
      ${qNode(625, 600, 'HUMAN', 'Staff review', 'Approve, edit or reject. Nothing is sent without it.', true)}
      ${qNode(955, 600, 'SEND', 'Email to customer', 'Logged to CRM with a follow-up reminder.')}
      <div class="abs mono" style="left:1285px;top:600px;width:220px;background:#0B0E1A;border:1px solid #2A3052;border-radius:12px;padding:14px;font-size:11px;line-height:1.8;color:#9AA3C7">
        <div style="color:#22C3E6">run #2481 · log</div>✓ email parsed 0.8s<br/>✓ 6 lines extracted<br/>✓ 6/6 matched<br/>✓ pricing applied<br/>⏸ waiting for review</div>
      ${sampleMark()}</div>`),
  '01': () =>
    page(qtCss, `<div class="board qt" style="background:#22C3E6">
      ${browser({ x: 120, y: 90, w: 1360, h: 880, url: 'quotient.example/review/ENQ-2481', content: `<div style="font-family:Inter;color:#14182b;background:#F5F7FB;height:100%;padding:26px 30px">
        <div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font:800 24px Inter">Review enquiry ENQ-2481</div><div style="font:500 14px Inter;color:#5c6485;margin-top:4px">Received 10:42 · extracted automatically · needs approval</div></div>
          <div style="display:flex;gap:10px"><span style="border:1px solid #cdd3e6;border-radius:8px;padding:10px 16px;font:600 14px Inter">Edit</span><span style="background:#14182b;color:#fff;border-radius:8px;padding:10px 16px;font:600 14px Inter">Approve &amp; create quote</span></div></div>
        <div style="display:grid;grid-template-columns:1fr 1.25fr;gap:18px;margin-top:20px">
          <div style="background:#fff;border:1px solid #e1e5f0;border-radius:12px;padding:20px"><div style="font:700 13px Inter;color:#5c6485">ORIGINAL EMAIL</div>
            <div style="font:600 15px Inter;margin-top:12px">From: purchase@northgate-fab.example</div><div style="font:500 14px Inter;color:#5c6485;margin-top:4px">Subject: RFQ – cutting discs and safety gloves</div>
            <div style="font:400 15px/1.7 Inter;margin-top:16px;color:#2b3150">Hi team,<br/><br/>Please quote for the below, delivery to our Chakan plant by 28th:<br/><br/><span style="background:#d9f6fc">– 4" cutting disc, 1mm, qty 500</span><br/><span style="background:#d9f6fc">– 7" grinding wheel x 120</span><br/><span style="background:#d9f6fc">– Nitrile gloves size L, 40 boxes</span><br/><span style="background:#d9f6fc">– Safety goggles anti-fog 60 nos</span><br/>– plus 2 more items in attached sheet<br/><br/>Regards,<br/>Meera, Purchase</div></div>
          <div style="background:#fff;border:1px solid #e1e5f0;border-radius:12px;padding:20px"><div style="font:700 13px Inter;color:#5c6485">EXTRACTED LINE ITEMS</div>
            <table style="width:100%;border-collapse:collapse;margin-top:10px;font:500 14px Inter">
              <tr style="color:#5c6485;font-size:12px;text-align:left">${['Requested', 'Matched product', 'Qty', 'Match'].map((h) => `<td style="padding:10px 6px;border-bottom:1px solid #e1e5f0">${h}</td>`).join('')}</tr>
              ${[['4" cutting disc 1mm', 'CD-100-1.0 Inox disc', '500', 'High'], ['7" grinding wheel', 'GW-180-6 Grinding wheel', '120', 'High'], ['Nitrile gloves L', 'NG-L-100 Nitrile, box of 100', '40', 'High'], ['Safety goggles anti-fog', 'SG-AF-02 Goggles', '60', 'High'], ['Flap disc 4" (sheet)', 'FD-100-60 Flap disc', '200', 'Medium'], ['Ear plugs (sheet)', 'EP-200 Corded ear plugs', '300', 'Check']].map((r) => `<tr>${r.map((c, i) => `<td style="padding:12px 6px;border-bottom:1px solid #eef1f7;${i === 1 ? 'font-weight:600' : ''}">${i === 3 ? `<span class="pill" style="background:${c === 'High' ? '#dcf5e8;color:#11744a' : c === 'Medium' ? '#fff2d6;color:#8a5a00' : '#fde2e1;color:#a5281f'}">${c}</span>` : c}</td>`).join('')}</tr>`).join('')}</table>
            <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:12px;font:500 14px Inter">${[['Delivery', 'Chakan plant · by 28th'], ['Customer', 'Northgate Fabrication · Price list B']].map(([a, b]) => `<div style="background:#F5F7FB;border-radius:8px;padding:12px"><div style="font:600 12px Inter;color:#5c6485">${a}</div><div style="margin-top:4px;font-weight:600">${b}</div></div>`).join('')}</div></div></div></div>` })}
      ${sampleMark('rgba(15,18,34,.55)')}</div>`),
  '02': () =>
    page(qtCss, `<div class="board qt" style="background:#0F1222">
      <div class="abs" style="left:470px;top:70px;width:660px;height:930px;background:#fff;color:#14182b;box-shadow:0 50px 100px -30px rgba(0,0,0,.8);padding:56px 56px;font-family:Inter">
        <div style="display:flex;justify-content:space-between"><div style="font:800 24px Inter">QUOTIENT<div style="font:500 12px Inter;color:#5c6485;margin-top:6px">Industrial supplies</div></div><div style="text-align:right"><div style="font:800 22px Inter;letter-spacing:.06em">QUOTATION</div><div style="font:500 13px Inter;color:#5c6485;margin-top:6px">Q-2026-0412 · Valid 15 days</div></div></div>
        <div style="height:3px;background:#22C3E6;margin-top:28px"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px;font:500 13px/1.6 Inter"><div><div style="color:#5c6485;font-weight:700;font-size:11px">PREPARED FOR</div>Northgate Fabrication<br/>Attn: Meera, Purchase<br/>Chakan plant</div><div><div style="color:#5c6485;font-weight:700;font-size:11px">REFERENCE</div>Your email RFQ<br/>Delivery by 28th<br/>Payment: 30 days</div></div>
        <table style="width:100%;border-collapse:collapse;margin-top:28px;font:500 13px Inter">
          <tr style="background:#14182b;color:#fff;text-align:left">${['Item', 'Qty', 'Rate', 'Amount'].map((h, i) => `<td style="padding:10px;${i ? 'text-align:right' : ''}">${h}</td>`).join('')}</tr>
          ${[['CD-100-1.0 Inox cutting disc', '500', '₹18.50', '₹9,250'], ['GW-180-6 Grinding wheel', '120', '₹142.00', '₹17,040'], ['NG-L-100 Nitrile gloves, box', '40', '₹465.00', '₹18,600'], ['SG-AF-02 Safety goggles', '60', '₹96.00', '₹5,760'], ['FD-100-60 Flap disc', '200', '₹34.00', '₹6,800'], ['EP-200 Corded ear plugs', '300', '₹6.20', '₹1,860']].map((r) => `<tr>${r.map((c, i) => `<td style="padding:11px 10px;border-bottom:1px solid #eef1f7;${i ? 'text-align:right' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table>
        <div style="margin-left:auto;width:260px;margin-top:18px;font:500 13px Inter;display:grid;gap:8px">${[['Subtotal', '₹59,310'], ['GST 18%', '₹10,676'], ['Freight', 'Included']].map(([a, b]) => `<div style="display:flex;justify-content:space-between"><span style="color:#5c6485">${a}</span><span>${b}</span></div>`).join('')}
          <div style="display:flex;justify-content:space-between;font:800 18px Inter;border-top:2px solid #14182b;padding-top:10px;margin-top:4px"><span>Total</span><span>₹69,986</span></div></div>
        <div style="margin-top:34px;font:500 11px/1.6 Inter;color:#5c6485">Prices valid for 15 days. Delivery subject to stock confirmation at order. Prepared automatically and approved by the sales team.</div></div>
      <div class="abs" style="left:1180px;top:420px;width:300px;background:#171B30;border:1px solid #22C3E6;border-radius:14px;padding:18px 20px"><div class="mono" style="font-size:11px;color:#22C3E6">APPROVED</div><div style="font:700 17px Inter;margin-top:8px">Reviewed by sales</div><div style="font:500 13px Inter;color:#9AA3C7;margin-top:6px">One line edited before sending.</div></div>
      ${sampleMark()}</div>`),
};

boardsB['saffron-and-sage-brand-identity'] = saffron;
boardsB['brightnest-homes-lead-campaign'] = brightnest;
boardsB['loomcraft-ugc-video-series'] = loomcraft;
boardsB['quotient-ai-quotation-automation'] = quotient;
