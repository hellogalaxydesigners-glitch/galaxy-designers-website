/* Sample boards: Halden Forge, Tidepath, Ledgerline, Kindred Clinic (all fictional brands). */
import { browser, page, phone, sampleMark, tablet } from './shared.mjs';

/* ===================================================================== */
/* Halden Forge – industrial manufacturer website                         */
/* ===================================================================== */
const hfCss = `
.hf{font-family:Inter}
.hf-nav{display:flex;align-items:center;justify-content:space-between;padding:22px 48px}
.hf-logo{font:400 20px 'Archivo Black';letter-spacing:.06em}
.hf-links{display:flex;gap:30px;font:500 14px Inter;opacity:.8}
.hf-btn{background:#E8A33D;color:#14161a;font:700 14px Inter;padding:12px 20px;border-radius:4px}
.hf-ghost{border:1px solid rgba(255,255,255,.35);color:#fff;font:600 14px Inter;padding:12px 20px;border-radius:4px}
`;
const flange = (size, glow = true) => `
<svg width="${size}" height="${size}" viewBox="0 0 200 200">
  <defs>
    <radialGradient id="hot" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd38a"/><stop offset=".35" stop-color="#ff8a2a"/><stop offset=".7" stop-color="#8a2e0c"/><stop offset="1" stop-color="#2a1208"/></radialGradient>
    <radialGradient id="steel" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#6b7079"/><stop offset=".6" stop-color="#2d3037"/><stop offset="1" stop-color="#16181c"/></radialGradient>
  </defs>
  ${glow ? '<circle cx="100" cy="100" r="98" fill="url(#hot)" opacity=".35"/>' : ''}
  <circle cx="100" cy="100" r="84" fill="url(#steel)" stroke="#000" stroke-opacity=".4"/>
  <circle cx="100" cy="100" r="84" fill="none" stroke="${glow ? '#ff9a3c' : '#9aa0aa'}" stroke-width="2" opacity=".7"/>
  ${Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return `<circle cx="${100 + 62 * Math.cos(a)}" cy="${100 + 62 * Math.sin(a)}" r="8" fill="#0d0e11" stroke="#555a63"/>`; }).join('')}
  <circle cx="100" cy="100" r="40" fill="#1b1d22" stroke="#4a4f58" stroke-width="3"/>
  <circle cx="100" cy="100" r="26" fill="${glow ? 'url(#hot)' : '#0d0e11'}"/>
</svg>`;

function hfHome() {
  return `<div class="hf" style="background:#121418;color:#fff;height:100%">
    <div class="hf-nav"><div class="hf-logo">HALDEN FORGE</div>
      <div class="hf-links"><span>Capabilities</span><span>Industries</span><span>Quality</span><span>About</span></div>
      <div class="hf-btn">Request a quote</div></div>
    <div style="display:grid;grid-template-columns:1.05fr 1fr;gap:20px;padding:46px 48px 0;align-items:center">
      <div>
        <div style="font:600 13px Inter;color:#E8A33D;letter-spacing:.08em">CLOSED-DIE FORGING · CNC MACHINING · EXPORT</div>
        <div style="font:800 64px/1.02 Inter;letter-spacing:-.03em;margin-top:22px">Precision forgings for global industry.</div>
        <div style="font:400 18px/1.55 Inter;opacity:.72;margin-top:22px;max-width:520px">Flanges, gears and custom components from 0.5 kg to 250 kg, machined and tested to your drawings.</div>
        <div style="display:flex;gap:12px;margin-top:34px"><div class="hf-btn">Request a quote</div><div class="hf-ghost">View capabilities</div></div>
      </div>
      <div style="position:relative;height:440px;display:flex;align-items:center;justify-content:center">
        <div style="position:absolute;inset:20px;background:radial-gradient(circle at 50% 55%,rgba(255,120,40,.35),transparent 60%)"></div>
        ${flange(380)}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.08);margin:40px 48px 0;border-top:1px solid rgba(255,255,255,.08)">
      ${['Closed-die forging', 'CNC machining', 'Heat treatment', 'Testing & inspection'].map((t, i) => `<div style="background:#121418;padding:24px 22px 30px">
        <div style="font:700 13px Inter;color:#E8A33D">0${i + 1}</div><div style="font:600 18px Inter;margin-top:10px">${t}</div>
        <div class="line" style="width:80%;margin-top:14px;color:#fff"></div><div class="line" style="width:60%;margin-top:8px;color:#fff"></div></div>`).join('')}
    </div></div>`;
}

const halden = {
  cover: () =>
    page(hfCss, `<div class="board" style="background:linear-gradient(160deg,#2a2f38,#0e1013)">
      <div class="abs" style="inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:64px 64px"></div>
      ${browser({ x: 130, y: 90, w: 1340, h: 900, url: 'haldenforge.example/en', content: hfHome() })}
      ${sampleMark()}</div>`),
  '01': () =>
    page(hfCss, `<div class="board" style="background:#D9DCE1">
      ${browser({ x: 150, y: 80, w: 1300, h: 900, url: 'haldenforge.example/en/capabilities', content: `
        <div class="hf" style="background:#fff;height:100%;color:#14161a">
          <div class="hf-nav" style="border-bottom:1px solid #e6e7ea"><div class="hf-logo">HALDEN FORGE</div>
            <div class="hf-links" style="opacity:1;color:#4b4f58"><span style="color:#14161a;font-weight:700">Capabilities</span><span>Industries</span><span>Quality</span><span>About</span></div><div class="hf-btn">Request a quote</div></div>
          <div style="display:grid;grid-template-columns:260px 1fr;gap:48px;padding:40px 48px">
            <div><div style="font:800 40px Inter;letter-spacing:-.02em">Capabilities</div>
              <div style="margin-top:28px;display:grid;gap:4px;font:500 15px Inter">
                ${['Closed-die forging', 'Ring rolling', 'CNC machining', 'Heat treatment', 'Testing & inspection', 'Surface finishing'].map((t, i) => `<div style="padding:12px 14px;border-radius:4px;${i === 0 ? 'background:#14161a;color:#fff' : 'color:#4b4f58'}">${t}</div>`).join('')}
              </div></div>
            <div>
              <div style="display:grid;grid-template-columns:1fr 300px;gap:32px;align-items:start">
                <div><div style="font:700 26px Inter">Closed-die forging</div>
                  <div style="font:400 16px/1.6 Inter;color:#4b4f58;margin-top:12px;max-width:520px">Carbon, alloy and stainless steel forgings produced on 1,000 to 4,000 tonne presses, with in-house die design.</div></div>
                <div style="background:#F3F4F6;border-radius:6px;height:190px;display:flex;align-items:center;justify-content:center">
                  <svg width="170" height="170" viewBox="0 0 200 200" fill="none" stroke="#14161a" stroke-width="1.5">
                    <circle cx="100" cy="100" r="80"/><circle cx="100" cy="100" r="34"/>
                    ${Array.from({ length: 24 }, (_, i) => { const a = (i * Math.PI) / 12; return `<path d="M${100 + 80 * Math.cos(a)} ${100 + 80 * Math.sin(a)} L${100 + 92 * Math.cos(a + 0.06)} ${100 + 92 * Math.sin(a + 0.06)}"/>`; }).join('')}
                    <path d="M10 100h180M100 10v180" stroke-dasharray="4 4" stroke="#E8A33D"/></svg></div>
              </div>
              <table style="width:100%;margin-top:34px;border-collapse:collapse;font:400 15px Inter">
                <tr style="text-align:left;color:#6b6f78;font-weight:600;font-size:13px">${['Specification', 'Range', 'Standard'].map((h) => `<td style="padding:12px 0;border-bottom:2px solid #14161a">${h}</td>`).join('')}</tr>
                ${[['Component weight', '0.5 – 250 kg', 'Per drawing'], ['Materials', 'Carbon, alloy, stainless steel', 'EN / ASTM / IS'], ['Machining tolerance', 'Down to ±0.01 mm', 'ISO 2768'], ['Annual capacity', 'Shown per customer brief', '—'], ['Testing', 'UT, MPI, hardness, chemical', 'ISO 17025 lab']].map((r) => `<tr>${r.map((c, i) => `<td style="padding:16px 0;border-bottom:1px solid #e6e7ea;${i === 0 ? 'font-weight:600' : 'color:#4b4f58'}">${c}</td>`).join('')}</tr>`).join('')}
              </table>
            </div></div></div>` })}
      ${sampleMark('rgba(20,22,26,.5)')}</div>`),
  '02': () =>
    page(hfCss, `<div class="board" style="background:#E8A33D">
      ${tablet({ x: 170, y: 120, w: 860, h: 760, content: `<div class="hf" style="background:#fff;height:100%;padding:40px 44px;color:#14161a">
          <div style="display:flex;justify-content:space-between;align-items:center"><div class="hf-logo">HALDEN FORGE</div><div style="font:600 14px Inter;color:#6b6f78">Step 2 of 3</div></div>
          <div style="font:800 40px Inter;letter-spacing:-.02em;margin-top:40px">Request a quote</div>
          <div style="font:400 16px Inter;color:#4b4f58;margin-top:10px">Share your drawing and volumes. Our engineers reply within two working days.</div>
          <div style="height:4px;background:#eee;border-radius:2px;margin-top:28px"><div style="width:66%;height:100%;background:#E8A33D;border-radius:2px"></div></div>
          ${[['Component type', 'Flange – weld neck'], ['Material', 'ASTM A105 carbon steel'], ['Annual volume', '2,000 – 5,000 pieces']].map(([l, v]) => `<div style="margin-top:24px"><div style="font:600 14px Inter">${l}</div><div style="margin-top:8px;border:1px solid #cfd2d8;border-radius:6px;padding:14px 16px;font:400 16px Inter">${v}</div></div>`).join('')}
          <div style="margin-top:24px;border:2px dashed #cfd2d8;border-radius:8px;padding:26px;text-align:center;font:500 15px Inter;color:#4b4f58">Drop drawings here (PDF, DWG, STEP)<div style="margin-top:8px;font:600 14px Inter;color:#14161a">WN-flange-150.pdf · uploaded</div></div>
          <div style="display:flex;justify-content:space-between;margin-top:30px"><div class="hf-ghost" style="color:#14161a;border-color:#cfd2d8">Back</div><div class="hf-btn">Continue</div></div></div>` })}
      ${phone({ x: 1120, y: 200, dark: true, content: `<div class="hf" style="padding:6px 20px 0"><div style="display:flex;justify-content:space-between;align-items:center"><div class="hf-logo" style="font-size:14px">HALDEN FORGE</div><div style="font:600 12px Inter">Menu</div></div>
          <div style="margin:26px -20px 0;height:200px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(255,120,40,.3),transparent 65%)">${flange(180)}</div>
          <div style="font:800 30px/1.05 Inter;letter-spacing:-.02em;margin-top:18px">Precision forgings for global industry.</div>
          <div style="font:400 14px/1.5 Inter;opacity:.7;margin-top:12px">Flanges, gears and custom components machined to your drawings.</div>
          <div class="hf-btn" style="margin-top:20px;text-align:center">Request a quote</div></div>` })}
      ${sampleMark('rgba(20,22,26,.55)')}</div>`),
};

/* ===================================================================== */
/* Tidepath – logistics tracking app                                      */
/* ===================================================================== */
const tpCss = `.tp{font-family:'DM Sans'} .tp-card{background:#fff;border-radius:16px;padding:14px 16px;box-shadow:0 1px 0 rgba(0,0,0,.04),0 4px 14px -6px rgba(14,59,67,.18)}
.tp-mint{color:#0d8f6f}`;
const tpShipment = (id, route, status, eta, pct, color = '#3CE0B5') => `<div class="tp-card" style="margin-top:10px">
  <div style="display:flex;justify-content:space-between;font:700 14px 'DM Sans'"><span>${id}</span><span class="pill" style="background:${color}22;color:#0b5e4b">${status}</span></div>
  <div style="font:500 13px 'DM Sans';color:#5b6770;margin-top:6px">${route}</div>
  <div style="height:5px;background:#e9efee;border-radius:3px;margin-top:12px"><div style="width:${pct}%;height:100%;border-radius:3px;background:${color}"></div></div>
  <div style="font:500 12px 'DM Sans';color:#5b6770;margin-top:8px">${eta}</div></div>`;
const tpList = () => `<div class="tp" style="background:#F2F6F5;height:100%;padding:4px 18px">
  <div style="font:700 26px 'DM Sans';margin-top:8px">Shipments</div>
  <div style="margin-top:14px;background:#fff;border-radius:12px;padding:11px 14px;font:500 13px 'DM Sans';color:#8a959c">Search by AWB, city or reference</div>
  <div style="display:flex;gap:6px;margin-top:14px;font:700 12px 'DM Sans'"><span class="pill" style="background:#0E3B43;color:#fff">Active · 12</span><span class="pill" style="background:#fff;color:#0E3B43">Delivered</span><span class="pill" style="background:#fff;color:#0E3B43">Issues</span></div>
  ${tpShipment('TP-48213', 'Pune → Chennai · 14 cartons', 'In transit', 'ETA Thu, 2:00 PM', 62)}
  ${tpShipment('TP-48190', 'Nashik → Bengaluru · 3 pallets', 'Out for delivery', 'ETA today, 4:30 PM', 88)}
  ${tpShipment('TP-48177', 'Mumbai → Hyderabad · 1 pallet', 'Picked up', 'ETA Sat, 11:00 AM', 18)}
  ${tpShipment('TP-48151', 'Surat → Delhi · 22 cartons', 'Delayed', 'New ETA Fri, 6:00 PM', 47, '#F2A541')}</div>`;
const tpMap = () => `<div class="tp" style="position:absolute;inset:0;background:#E6EEEC">
  <svg width="268" height="578" viewBox="0 0 268 578" style="position:absolute;inset:0">
    <g stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"><path d="M-10 120 C80 140 120 90 280 110"/><path d="M40 -10 L70 600"/><path d="M-10 300 C100 280 160 330 280 300"/><path d="M190 -10 C170 200 230 300 200 600"/></g>
    <g stroke="#d5dfdc" stroke-width="4" fill="none"><path d="M-10 200 L280 230"/><path d="M120 -10 L140 600"/><path d="M-10 420 L280 380"/></g>
    <path d="M60 470 C70 400 130 360 140 300 S190 200 205 140" stroke="#0E3B43" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M60 470 C70 400 130 360 140 300" stroke="#3CE0B5" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="205" cy="140" r="9" fill="#0E3B43"/><circle cx="205" cy="140" r="4" fill="#fff"/>
    <circle cx="140" cy="300" r="15" fill="#3CE0B5" opacity=".3"/><circle cx="140" cy="300" r="8" fill="#0d8f6f" stroke="#fff" stroke-width="3"/>
  </svg>
  <div style="position:absolute;left:12px;right:12px;bottom:12px;background:#fff;border-radius:22px;padding:18px">
    <div style="width:40px;height:4px;border-radius:2px;background:#d6dddb;margin:0 auto 14px"></div>
    <div style="font:700 13px 'DM Sans';color:#0d8f6f">Out for delivery</div>
    <div style="font:700 22px 'DM Sans';margin-top:4px">Arriving by 4:30 PM</div>
    <div style="font:500 13px 'DM Sans';color:#5b6770;margin-top:4px">TP-48190 · 3 pallets · 2 stops before yours</div>
    <div style="display:flex;align-items:center;gap:10px;margin-top:16px;padding-top:14px;border-top:1px solid #edf1f0">
      <div style="width:36px;height:36px;border-radius:50%;background:#0E3B43;color:#fff;font:700 13px 'DM Sans';display:flex;align-items:center;justify-content:center">SK</div>
      <div style="flex:1;font:600 13px 'DM Sans'">Driver: S. Kulkarni<div style="font:500 12px 'DM Sans';color:#5b6770">MH 12 · Tata Ultra</div></div>
      <div class="pill" style="background:#0E3B43;color:#fff;padding:8px 12px">Call</div></div></div></div>`;
const tpDelivered = () => `<div class="tp" style="height:100%;padding:0 22px;background:#fff;text-align:center">
  <div style="width:110px;height:110px;border-radius:50%;background:#3CE0B5;margin:70px auto 0;display:flex;align-items:center;justify-content:center">
    <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#0E3B43" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
  <div style="font:700 28px 'DM Sans';margin-top:26px">Delivered</div>
  <div style="font:500 14px 'DM Sans';color:#5b6770;margin-top:8px">TP-48177 · Hyderabad<br/>Signed by R. Iyer at 11:06 AM</div>
  <div class="tp-card" style="margin-top:28px;text-align:left;display:grid;gap:10px;font:500 13px 'DM Sans'">
    ${[['Pieces', '1 pallet · 312 kg'], ['Received at', 'Gate 2, Warehouse B'], ['Condition', 'No damage reported']].map(([a, b]) => `<div style="display:flex;justify-content:space-between"><span style="color:#5b6770">${a}</span><span style="font-weight:700">${b}</span></div>`).join('')}</div>
  <div style="margin-top:22px;background:#0E3B43;color:#fff;border-radius:14px;padding:15px;font:700 14px 'DM Sans'">Download proof of delivery</div></div>`;

const tidepath = {
  cover: () =>
    page(tpCss, `<div class="board" style="background:#0E3B43">
      <svg class="abs" style="inset:0" width="1600" height="1000">${[260, 420, 580, 740].map((r) => `<circle cx="800" cy="560" r="${r}" fill="none" stroke="#3CE0B5" stroke-opacity=".09" stroke-dasharray="6 10"/>`).join('')}</svg>
      ${phone({ x: 340, y: 230, content: tpList() })}
      ${phone({ x: 655, y: 150, content: tpMap() })}
      ${phone({ x: 970, y: 230, content: tpDelivered() })}
      <div class="abs tp" style="left:72px;top:64px;color:#fff;font:700 30px 'DM Sans'">Tidepath</div>
      ${sampleMark()}</div>`),
  '01': () =>
    page(tpCss, `<div class="board" style="background:#0E3B43;color:#fff">
      <div class="abs tp" style="left:120px;top:250px;width:620px">
        <div style="font:700 15px 'DM Sans';color:#3CE0B5">Shipment detail</div>
        <div style="font:700 62px/1.04 'DM Sans';letter-spacing:-.02em;margin-top:18px">Every shipment, one clear timeline.</div>
        <div style="font:400 20px/1.55 'DM Sans';opacity:.72;margin-top:24px;max-width:520px">Pickup, hub scans, delays and delivery are shown in plain language, the moment they happen.</div></div>
      ${phone({ x: 980, y: 160, scale: 1.12, content: `<div class="tp" style="padding:4px 20px;background:#fff;height:100%">
        <div style="font:500 13px 'DM Sans';color:#5b6770">‹ Shipments</div>
        <div style="font:700 24px 'DM Sans';margin-top:10px">TP-48213</div>
        <div style="font:500 13px 'DM Sans';color:#5b6770;margin-top:2px">Pune → Chennai · 14 cartons</div>
        <div style="margin-top:22px;position:relative;padding-left:26px">
          <div style="position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:#e3eae8"></div>
          <div style="position:absolute;left:7px;top:8px;height:58%;width:2px;background:#3CE0B5"></div>
          ${[['Picked up', 'Pune hub · Mon 6:12 PM', 1], ['Departed hub', 'Pune · Mon 11:40 PM', 1], ['Arrived at hub', 'Bengaluru · Wed 8:05 AM', 1], ['In transit', 'Towards Chennai · Wed 10:30 AM', 2], ['Out for delivery', 'Expected Thu morning', 0], ['Delivered', 'ETA Thu, 2:00 PM', 0]].map(([t, s, st]) => `<div style="position:relative;padding-bottom:20px">
            <div style="position:absolute;left:-26px;top:3px;width:16px;height:16px;border-radius:50%;${st === 1 ? 'background:#3CE0B5' : st === 2 ? 'background:#fff;border:4px solid #0d8f6f' : 'background:#fff;border:2px solid #cfd8d6'}"></div>
            <div style="font:700 14px 'DM Sans';${st === 0 ? 'color:#8a959c' : ''}">${t}</div><div style="font:500 12px 'DM Sans';color:#5b6770;margin-top:2px">${s}</div></div>`).join('')}
        </div>
        <div style="background:#F2F6F5;border-radius:14px;padding:13px 14px;font:600 13px 'DM Sans'">Need help with this shipment? <span class="tp-mint">Chat with support</span></div></div>` })}
      ${sampleMark()}</div>`),
  '02': () =>
    page(tpCss, `<div class="board" style="background:#3CE0B5">
      ${phone({ x: 280, y: 160, scale: 1.08, content: `<div class="tp" style="padding:4px 20px;background:#fff;height:100%">
        <div style="font:500 13px 'DM Sans';color:#5b6770">‹ TP-48177</div>
        <div style="font:700 24px 'DM Sans';margin-top:10px">Proof of delivery</div>
        <div style="margin-top:18px;height:150px;border-radius:14px;background:linear-gradient(135deg,#c9b79a,#8f7a5c);position:relative;overflow:hidden">
          <div style="position:absolute;left:60px;top:40px;width:120px;height:80px;background:#d9c7a6;border:2px solid #7d6a4d;transform:skewY(-6deg)"></div>
          <div style="position:absolute;left:60px;top:68px;width:120px;height:6px;background:#a08a66;transform:skewY(-6deg)"></div>
          <div style="position:absolute;right:10px;bottom:8px;font:600 10px 'DM Sans';color:#fff">Photo · 11:06 AM</div></div>
        <div style="font:700 13px 'DM Sans';margin-top:18px">Signature</div>
        <div style="margin-top:8px;height:100px;border:1px solid #dfe6e4;border-radius:12px;display:flex;align-items:center;justify-content:center">
          <svg width="190" height="70" viewBox="0 0 190 70" fill="none" stroke="#0E3B43" stroke-width="2.4" stroke-linecap="round"><path d="M8 48c14-30 22-36 26-20s-6 26 4 14 14-34 24-26-4 30 10 22 12-20 22-16 2 18 14 10 18-18 28-12 10 12 24 4"/></svg></div>
        <div style="font:500 13px 'DM Sans';color:#5b6770;margin-top:12px">Received by R. Iyer, Stores Manager</div>
        <div style="margin-top:16px;background:#0E3B43;color:#fff;border-radius:14px;padding:14px;text-align:center;font:700 14px 'DM Sans'">Share PDF</div></div>` })}
      <div class="abs tp" style="left:820px;top:330px;width:520px;background:rgba(255,255,255,.92);border-radius:24px;padding:20px 22px;box-shadow:0 30px 60px -20px rgba(14,59,67,.45);display:flex;gap:14px;align-items:flex-start">
        <div style="width:44px;height:44px;border-radius:12px;background:#0E3B43;color:#3CE0B5;font:700 18px 'DM Sans';display:flex;align-items:center;justify-content:center">T</div>
        <div style="flex:1"><div style="display:flex;justify-content:space-between;font:600 13px 'DM Sans';color:#5b6770"><span>TIDEPATH</span><span>now</span></div>
        <div style="font:700 17px 'DM Sans';margin-top:4px">Delivered: TP-48177</div><div style="font:500 15px 'DM Sans';color:#33424a;margin-top:2px">Signed by R. Iyer at Gate 2. Tap to view proof of delivery.</div></div></div>
      <div class="abs tp" style="left:820px;top:520px;width:520px;font:700 54px/1.05 'DM Sans';color:#0E3B43;letter-spacing:-.02em">Proof, the moment it is signed.</div>
      ${sampleMark('rgba(14,59,67,.6)')}</div>`),
};

/* ===================================================================== */
/* Ledgerline – dealer ordering portal                                    */
/* ===================================================================== */
const llCss = `.ll{font-family:Inter;color:#0f1f1a} .ll-side{background:#0F2A22;color:#cfe3db} .ll-nav div{padding:10px 14px;border-radius:8px;font:500 14px Inter}
.ll-card{background:#fff;border:1px solid #e3e8e6;border-radius:12px;padding:18px 20px}
.ll-th{font:600 12px Inter;color:#6b7a75;text-align:left;padding:10px 12px;border-bottom:1px solid #e3e8e6}
.ll-td{font:500 14px Inter;padding:13px 12px;border-bottom:1px solid #eef1f0}
.ll-btn{background:#12805C;color:#fff;font:600 13px Inter;padding:9px 14px;border-radius:8px;display:inline-block}`;
const llStatus = (s) => {
  const map = { Approved: ['#dff3ea', '#0f6e4e'], Pending: ['#fff2d6', '#8a5a00'], Dispatched: ['#e3ecff', '#2a4fb5'], Invoiced: ['#eceff1', '#4b5a60'] };
  const [bg, fg] = map[s];
  return `<span class="pill" style="background:${bg};color:${fg}">${s}</span>`;
};
const llShell = (active, main) => `<div class="ll" style="display:grid;grid-template-columns:230px 1fr;height:100%;background:#F5F7F6">
  <div class="ll-side" style="padding:24px 16px">
    <div style="font:800 20px Inter;color:#fff;padding:0 14px;letter-spacing:-.01em">Ledgerline</div>
    <div class="ll-nav" style="margin-top:30px;display:grid;gap:2px">${['Dashboard', 'Orders', 'Catalogue', 'Invoices', 'Dealers', 'Reports', 'Settings'].map((n) => `<div style="${n === active ? 'background:rgba(255,255,255,.1);color:#fff' : ''}">${n}</div>`).join('')}</div></div>
  <div style="padding:26px 30px;overflow:hidden">${main}</div></div>`;

const ledgerline = {
  cover: () =>
    page(llCss, `<div class="board" style="background:#DCE5E1">
      ${browser({ x: 110, y: 80, w: 1380, h: 900, url: 'portal.ledgerline.example/dashboard', content: llShell('Dashboard', `
        <div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font:700 26px Inter">Good morning, Priya</div><div style="font:500 14px Inter;color:#6b7a75;margin-top:4px">Here is what is happening with dealer orders today.</div></div><div class="ll-btn">New order</div></div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px">
          ${[['Orders this month', '248', '+18 vs last month'], ['Awaiting approval', '12', '3 over 24 hours'], ['Order value (MTD)', '₹38.4L', 'Across 86 dealers'], ['Stock alerts', '7', 'Below reorder level']].map(([l, v, s]) => `<div class="ll-card"><div style="font:500 13px Inter;color:#6b7a75">${l}</div><div style="font:700 30px Inter;margin-top:8px;letter-spacing:-.02em">${v}</div><div style="font:500 12px Inter;color:#12805C;margin-top:6px">${s}</div></div>`).join('')}</div>
        <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:14px;margin-top:14px">
          <div class="ll-card"><div style="display:flex;justify-content:space-between"><div style="font:700 15px Inter">Orders by month</div><div style="font:500 12px Inter;color:#6b7a75">Sample data</div></div>
            <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none" style="margin-top:12px">
              ${[0, 50, 100, 150].map((y) => `<line x1="0" x2="600" y1="${y + 10}" y2="${y + 10}" stroke="#eef1f0"/>`).join('')}
              ${[96, 120, 110, 140, 132, 158, 170, 162, 188, 204, 196, 248].map((v, i) => `<rect x="${i * 50 + 10}" y="${190 - v * 0.7}" width="30" height="${v * 0.7}" rx="4" fill="${i === 11 ? '#12805C' : '#b9dccd'}"/>`).join('')}</svg></div>
          <div class="ll-card"><div style="font:700 15px Inter">Top dealers</div>
            ${[['Shree Traders', '₹6.2L', 78], ['Metro Build Mart', '₹4.9L', 62], ['Coastal Supplies', '₹3.7L', 47], ['Nova Hardware', '₹2.8L', 36]].map(([n, v, w]) => `<div style="margin-top:16px"><div style="display:flex;justify-content:space-between;font:500 13px Inter"><span>${n}</span><span style="font-weight:700">${v}</span></div><div style="height:6px;background:#eef1f0;border-radius:3px;margin-top:6px"><div style="width:${w}%;height:100%;background:#12805C;border-radius:3px"></div></div></div>`).join('')}</div></div>
        <div class="ll-card" style="margin-top:14px;padding:6px 8px"><table style="width:100%;border-collapse:collapse">
          <tr>${['Order', 'Dealer', 'Items', 'Value', 'Placed', 'Status'].map((h) => `<th class="ll-th">${h}</th>`).join('')}</tr>
          ${[['SO-10482', 'Shree Traders', '18', '₹1,24,500', 'Today, 9:12', 'Pending'], ['SO-10481', 'Metro Build Mart', '7', '₹48,900', 'Today, 8:40', 'Approved'], ['SO-10479', 'Coastal Supplies', '24', '₹2,06,300', 'Yesterday', 'Dispatched']].map((r) => `<tr>${r.map((c, i) => `<td class="ll-td" style="${i === 0 ? 'font-weight:700' : ''}">${i === 5 ? llStatus(c) : c}</td>`).join('')}</tr>`).join('')}
        </table></div>`) })}
      ${sampleMark('rgba(15,42,34,.55)')}</div>`),
  '01': () =>
    page(llCss, `<div class="board" style="background:#12805C">
      ${browser({ x: 130, y: 90, w: 1340, h: 880, url: 'portal.ledgerline.example/orders/new', content: llShell('Orders', `
        <div style="font:700 26px Inter">New order</div>
        <div style="display:grid;grid-template-columns:1fr 360px;gap:18px;margin-top:20px">
          <div class="ll-card" style="padding:0">
            <div style="padding:16px 18px;border-bottom:1px solid #e3e8e6"><div style="border:1px solid #d4dcd9;border-radius:8px;padding:11px 14px;font:500 14px Inter;color:#6b7a75">Search 1,240 products by name or code</div></div>
            ${[['Ceramic floor tile 600×600 · Matte grey', 'CT-6060-MG', '₹612 / box', 48, 'In stock'], ['Wall tile 300×450 · Gloss white', 'WT-3045-GW', '₹438 / box', 120, 'In stock'], ['Tile adhesive · 20 kg', 'TA-20', '₹520 / bag', 60, 'Low stock'], ['Epoxy grout · 1 kg · Charcoal', 'EG-1-CH', '₹890 / tub', 24, 'In stock'], ['Tile spacers 3 mm · pack of 200', 'TS-3', '₹95 / pack', 30, 'In stock']].map(([n, c, p, q, s]) => `<div style="display:flex;align-items:center;gap:16px;padding:15px 18px;border-bottom:1px solid #eef1f0">
              <div style="width:46px;height:46px;border-radius:8px;background:linear-gradient(135deg,#e6ece9,#cbd6d1)"></div>
              <div style="flex:1"><div style="font:600 14px Inter">${n}</div><div style="font:500 12px Inter;color:#6b7a75;margin-top:3px">${c} · ${p} · <span style="color:${s === 'Low stock' ? '#a86b00' : '#12805C'}">${s}</span></div></div>
              <div style="display:flex;align-items:center;border:1px solid #d4dcd9;border-radius:8px;font:600 14px Inter"><span style="padding:7px 12px;color:#6b7a75">−</span><span style="padding:7px 10px;min-width:44px;text-align:center">${q}</span><span style="padding:7px 12px;color:#6b7a75">+</span></div></div>`).join('')}
          </div>
          <div class="ll-card"><div style="font:700 16px Inter">Order summary</div><div style="font:500 13px Inter;color:#6b7a75;margin-top:4px">Shree Traders · Credit limit ₹10L</div>
            <div style="margin-top:18px;display:grid;gap:10px;font:500 14px Inter">${[['5 products · 282 units', ''], ['Subtotal', '₹1,05,532'], ['GST (18%)', '₹18,996'], ['Delivery', 'Free']].map(([a, b]) => `<div style="display:flex;justify-content:space-between"><span style="color:#6b7a75">${a}</span><span>${b}</span></div>`).join('')}</div>
            <div style="display:flex;justify-content:space-between;font:700 20px Inter;margin-top:16px;padding-top:16px;border-top:1px solid #e3e8e6"><span>Total</span><span>₹1,24,528</span></div>
            <div style="margin-top:18px;font:600 13px Inter">Delivery address</div><div style="margin-top:6px;border:1px solid #d4dcd9;border-radius:8px;padding:11px 12px;font:500 13px Inter;color:#33433e">Warehouse 2, Industrial Estate</div>
            <div class="ll-btn" style="display:block;text-align:center;margin-top:20px;padding:13px">Place order</div></div></div>`) })}
      ${sampleMark()}</div>`),
  '02': () =>
    page(llCss, `<div class="board" style="background:#0F2A22">
      ${browser({ x: 130, y: 90, w: 1340, h: 880, url: 'portal.ledgerline.example/admin/orders', content: llShell('Orders', `
        <div style="display:flex;justify-content:space-between;align-items:center"><div style="font:700 26px Inter">Order queue</div>
          <div style="display:flex;gap:8px">${['All · 64', 'Pending · 12', 'Approved · 20', 'Dispatched · 32'].map((t, i) => `<span class="pill" style="padding:8px 12px;${i === 1 ? 'background:#0F2A22;color:#fff' : 'background:#fff;border:1px solid #d4dcd9;color:#33433e'}">${t}</span>`).join('')}</div></div>
        <div class="ll-card" style="margin-top:20px;padding:6px 8px"><table style="width:100%;border-collapse:collapse">
          <tr>${['Order', 'Dealer', 'Region', 'Value', 'Credit used', 'Waiting', 'Status', ''].map((h) => `<th class="ll-th">${h}</th>`).join('')}</tr>
          ${[['SO-10482', 'Shree Traders', 'West', '₹1,24,500', '64%', '2 h', 'Pending'], ['SO-10478', 'Nova Hardware', 'South', '₹86,200', '41%', '5 h', 'Pending'], ['SO-10475', 'Coastal Supplies', 'South', '₹2,48,000', '92%', '26 h', 'Pending'], ['SO-10474', 'Metro Build Mart', 'North', '₹58,750', '38%', '—', 'Approved'], ['SO-10471', 'Vertex Interiors', 'West', '₹1,02,300', '55%', '—', 'Dispatched'], ['SO-10469', 'Prime Tiles & Bath', 'East', '₹74,900', '22%', '—', 'Invoiced'], ['SO-10466', 'Shree Traders', 'West', '₹1,88,000', '64%', '—', 'Dispatched']].map((r) => `<tr>${r.map((c, i) => `<td class="ll-td" style="${i === 0 ? 'font-weight:700' : ''}${i === 4 && parseInt(c) > 90 ? 'color:#b3261e;font-weight:700' : ''}">${i === 6 ? llStatus(c) : c}</td>`).join('')}<td class="ll-td">${r[6] === 'Pending' ? '<span class="ll-btn">Approve</span>' : '<span style="font:600 13px Inter;color:#12805C">View</span>'}</td></tr>`).join('')}
        </table></div>
        <div style="margin-top:14px;display:flex;gap:10px;align-items:center;background:#fff6e0;border:1px solid #f1d38a;border-radius:10px;padding:12px 16px;font:500 14px Inter;color:#6b4b00">SO-10475 would take Coastal Supplies to 92% of its credit limit. Review before approving.</div>`) })}
      ${sampleMark()}</div>`),
};

/* ===================================================================== */
/* Kindred Clinic – booking UX                                            */
/* ===================================================================== */
const kcCss = `.kc{font-family:'DM Sans';color:#16302c} .kc h{font-family:Lora;font-weight:600}
.kc-step{font:600 12px 'DM Sans';color:#1E7A6E} .kc-tile{background:#fff;border:1px solid #dbe7e4;border-radius:14px;padding:14px;font:600 13px 'DM Sans'}
.kc-btn{background:#1E7A6E;color:#fff;border-radius:12px;padding:14px;text-align:center;font:700 14px 'DM Sans'}`;
const kcIcon = (d) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1E7A6E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const kcSpecialty = () => `<div class="kc" style="padding:6px 18px;background:#F4F8F7;height:100%">
  <div class="kc-step">Step 1 of 4</div><div class="kc"><h style="font-size:24px;display:block;margin-top:6px">What do you need help with?</h></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px">
  ${[['General medicine', '<path d="M12 4v16M4 12h16"/>'], ['Cardiology', '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'], ['Paediatrics', '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>'], ['Dermatology', '<circle cx="12" cy="12" r="8"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="14" r="1"/>'], ['Orthopaedics', '<path d="M8 3l8 18M16 3L8 21"/>'], ['ENT', '<path d="M8 14a4 4 0 1 1 8 0c0 3-4 3-4 6"/>']].map(([t, d], i) => `<div class="kc-tile" style="${i === 1 ? 'border:2px solid #1E7A6E;background:#E6F2EF' : ''}">${kcIcon(d)}<div style="margin-top:12px">${t}</div></div>`).join('')}</div>
  <div class="kc-btn" style="margin-top:18px">Continue</div></div>`;
const kcDoctors = () => `<div class="kc" style="padding:6px 18px;background:#F4F8F7;height:100%">
  <div class="kc-step">Step 2 of 4 · Cardiology</div><h style="font-size:24px;display:block;margin-top:6px">Choose a doctor</h>
  ${[['Dr. A. Menon', 'Consultant cardiologist', 'Next: Tomorrow 10:30', 'AM'], ['Dr. R. Shah', 'Cardiologist', 'Next: Today 4:15', 'RS'], ['Dr. K. Fernandes', 'Senior cardiologist', 'Next: Fri 9:00', 'KF']].map(([n, r, a, ini], i) => `<div class="kc-tile" style="display:flex;gap:12px;align-items:center;margin-top:12px;${i === 0 ? 'border:2px solid #1E7A6E' : ''}">
    <div style="width:46px;height:46px;border-radius:50%;background:#cfe4df;color:#1E7A6E;font:700 14px 'DM Sans';display:flex;align-items:center;justify-content:center">${ini}</div>
    <div style="flex:1"><div style="font:700 14px 'DM Sans'">${n}</div><div style="font:500 12px 'DM Sans';color:#5d726e">${r}</div><div style="font:600 12px 'DM Sans';color:#1E7A6E;margin-top:4px">${a}</div></div></div>`).join('')}
  <div style="margin-top:16px;font:500 12px 'DM Sans';color:#5d726e">Not sure? <span style="color:#1E7A6E;font-weight:700">Book the first available doctor</span></div></div>`;
const kcSlots = () => `<div class="kc" style="padding:6px 18px;background:#F4F8F7;height:100%">
  <div class="kc-step">Step 3 of 4 · Dr. A. Menon</div><h style="font-size:24px;display:block;margin-top:6px">Pick a time</h>
  <div style="display:flex;gap:8px;margin-top:16px">${['Tue 12', 'Wed 13', 'Thu 14', 'Fri 15'].map((d, i) => `<div style="flex:1;text-align:center;border-radius:12px;padding:10px 0;font:700 12px 'DM Sans';${i === 1 ? 'background:#1E7A6E;color:#fff' : 'background:#fff;border:1px solid #dbe7e4'}">${d.split(' ')[0]}<div style="font-size:16px;margin-top:2px">${d.split(' ')[1]}</div></div>`).join('')}</div>
  <div style="font:700 13px 'DM Sans';margin-top:18px">Morning</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">${['9:00', '9:30', '10:30', '11:00', '11:30', '12:00'].map((t, i) => `<div style="text-align:center;border-radius:10px;padding:10px 0;font:600 13px 'DM Sans';${i === 2 ? 'background:#1E7A6E;color:#fff' : i === 1 ? 'background:#eef2f1;color:#9aaaa6;text-decoration:line-through' : 'background:#fff;border:1px solid #dbe7e4'}">${t}</div>`).join('')}</div>
  <div style="font:700 13px 'DM Sans';margin-top:16px">Afternoon</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">${['2:00', '2:30', '3:30'].map((t) => `<div style="text-align:center;border-radius:10px;padding:10px 0;font:600 13px 'DM Sans';background:#fff;border:1px solid #dbe7e4">${t}</div>`).join('')}</div>
  <div class="kc-btn" style="margin-top:20px">Confirm 10:30 on Wed 13</div></div>`;

const kindred = {
  cover: () =>
    page(kcCss, `<div class="board" style="background:#DCEBE7">
      <div class="abs kc" style="left:80px;top:70px"><h style="font-size:30px">Kindred Clinic</h></div>
      ${phone({ x: 330, y: 210, content: kcSpecialty() })}
      ${phone({ x: 655, y: 150, content: kcDoctors() })}
      ${phone({ x: 980, y: 210, content: kcSlots() })}
      ${sampleMark('rgba(22,48,44,.55)')}</div>`),
  '01': () =>
    page(kcCss, `<div class="board kc" style="background:#fff;background-image:radial-gradient(#d7e3e0 1.2px,transparent 1.2px);background-size:24px 24px">
      <h class="abs" style="left:90px;top:70px;font-size:40px">Booking flow in four clear steps</h>
      <div class="abs" style="left:90px;top:130px;font:500 18px 'DM Sans';color:#5d726e">From nine screens to four clear steps.</div>
      ${['1  Specialty', '2  Doctor', '3  Time', '4  Your details'].map((t, i) => `
        <div class="abs" style="left:${110 + i * 360}px;top:250px;width:250px">
          <div style="font:700 16px 'DM Sans';color:#1E7A6E">${t}</div>
          <div style="margin-top:14px;height:480px;border:2px solid #16302c;border-radius:28px;padding:22px 18px;background:#fff">
            <div style="height:16px;width:60%;background:#16302c;border-radius:4px"></div>
            ${i === 0 ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:22px">${Array.from({ length: 6 }, () => '<div style="height:78px;border:2px solid #b9c7c4;border-radius:10px"></div>').join('')}</div>` : ''}
            ${i === 1 ? Array.from({ length: 3 }, () => '<div style="display:flex;gap:10px;align-items:center;margin-top:18px"><div style="width:42px;height:42px;border-radius:50%;border:2px solid #b9c7c4"></div><div style="flex:1"><div style="height:10px;background:#b9c7c4;border-radius:3px;width:80%"></div><div style="height:8px;background:#dde5e3;border-radius:3px;width:55%;margin-top:7px"></div></div></div>').join('') : ''}
            ${i === 2 ? `<div style="display:flex;gap:6px;margin-top:22px">${Array.from({ length: 4 }, (_, k) => `<div style="flex:1;height:46px;border-radius:8px;${k === 1 ? 'background:#16302c' : 'border:2px solid #b9c7c4'}"></div>`).join('')}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:16px">${Array.from({ length: 9 }, (_, k) => `<div style="height:34px;border-radius:6px;${k === 2 ? 'background:#1E7A6E' : 'border:2px solid #b9c7c4'}"></div>`).join('')}</div>` : ''}
            ${i === 3 ? Array.from({ length: 4 }, () => '<div style="margin-top:18px"><div style="height:8px;width:40%;background:#b9c7c4;border-radius:3px"></div><div style="height:38px;border:2px solid #b9c7c4;border-radius:8px;margin-top:8px"></div></div>').join('') : ''}
            <div style="position:absolute;left:18px;right:18px;bottom:22px"></div>
            <div style="margin-top:28px;height:42px;border-radius:10px;background:#1E7A6E"></div></div></div>
        ${i < 3 ? `<svg class="abs" style="left:${372 + i * 360}px;top:480px" width="90" height="24" viewBox="0 0 90 24"><path d="M2 12h80M74 4l8 8-8 8" stroke="#1E7A6E" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}`).join('')}
      <div class="abs" style="left:110px;top:840px;display:flex;gap:28px;font:600 15px 'DM Sans';color:#16302c">
        <span>Plain-language labels</span><span>One decision per screen</span><span>Progress always visible</span><span>Works with screen readers</span></div>
      ${sampleMark('rgba(22,48,44,.5)')}</div>`),
  '02': () =>
    page(kcCss, `<div class="board kc" style="background:#16302c;color:#fff">
      <h class="abs" style="left:90px;top:70px;font-size:40px">Kindred design system</h>
      <div class="abs" style="left:90px;top:160px;display:flex;gap:16px">
        ${[['#1E7A6E', 'Teal 600', 'AA · 5.3:1'], ['#16302C', 'Ink', 'AAA · 13.9:1'], ['#DCEBE7', 'Mist', 'Surface'], ['#F2B84B', 'Amber', 'Highlights'], ['#C2413A', 'Alert', 'AA · 5.1:1']].map(([c, n, r]) => `<div style="width:190px;background:#fff;color:#16302c;border-radius:16px;overflow:hidden"><div style="height:120px;background:${c}"></div><div style="padding:14px 16px"><div style="font:700 15px 'DM Sans'">${n}</div><div style="font:500 13px 'DM Sans';color:#5d726e;margin-top:4px">${c} · ${r}</div></div></div>`).join('')}</div>
      <div class="abs" style="left:90px;top:440px;width:640px;background:#fff;color:#16302c;border-radius:18px;padding:28px 30px">
        <div style="font:700 13px 'DM Sans';color:#5d726e">Type scale</div>
        <h style="display:block;font-size:44px;margin-top:10px">Heading one</h><h style="display:block;font-size:30px;margin-top:8px">Heading two</h>
        <div style="font:600 20px 'DM Sans';margin-top:12px">Body large · DM Sans</div><div style="font:400 16px/1.6 'DM Sans';margin-top:8px;color:#33504b">Body text is set at 16 px with 1.6 line height so it stays readable for every age group.</div></div>
      <div class="abs" style="left:770px;top:440px;width:740px;background:#fff;color:#16302c;border-radius:18px;padding:28px 30px">
        <div style="font:700 13px 'DM Sans';color:#5d726e">Buttons</div>
        <div style="display:flex;gap:12px;margin-top:14px">${[['Default', '#1E7A6E', '#fff', ''], ['Hover', '#165f55', '#fff', ''], ['Focus', '#1E7A6E', '#fff', 'outline:3px solid #F2B84B;outline-offset:3px'], ['Disabled', '#dfe7e5', '#93a5a1', '']].map(([l, bg, fg, ex]) => `<div style="background:${bg};color:${fg};border-radius:12px;padding:13px 18px;font:700 14px 'DM Sans';${ex}">${l}</div>`).join('')}</div>
        <div style="font:700 13px 'DM Sans';color:#5d726e;margin-top:28px">Form field – error state</div>
        <div style="font:700 15px 'DM Sans';margin-top:12px">Mobile number</div>
        <div style="margin-top:8px;border:2px solid #C2413A;border-radius:12px;padding:13px 14px;font:500 15px 'DM Sans'">98765 432</div>
        <div style="font:600 14px 'DM Sans';color:#C2413A;margin-top:8px">Enter a 10-digit mobile number</div></div>
      ${sampleMark()}</div>`),
};

export const boardsA = {
  'halden-forge-industrial-website': halden,
  'tidepath-logistics-tracking-app': tidepath,
  'ledgerline-dealer-portal': ledgerline,
  'kindred-clinic-booking-ux': kindred,
};
