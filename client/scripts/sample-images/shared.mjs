/**
 * Shared building blocks for the generated sample portfolio images.
 * Every image is a 1600×1000 presentation board rendered from HTML.
 * These images are placeholders – replace them with real project visuals.
 */

export const baseCss = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1600px;height:1000px;overflow:hidden;-webkit-font-smoothing:antialiased}
body{font-family:Inter,sans-serif;color:#111}
.board{position:relative;width:1600px;height:1000px;overflow:hidden}
.abs{position:absolute}
.flex{display:flex}.col{display:flex;flex-direction:column}.center{align-items:center;justify-content:center}
.browser{position:absolute;background:#fff;border-radius:14px;overflow:hidden;
  box-shadow:0 50px 100px -30px rgba(0,0,0,.55),0 0 0 1px rgba(0,0,0,.08)}
.browser>.bar{height:38px;background:#ECEDF1;display:flex;align-items:center;gap:8px;padding:0 16px;flex-shrink:0}
.browser>.bar i{width:11px;height:11px;border-radius:50%;background:#CFD2DA;display:block}
.browser>.bar .url{margin-left:18px;width:380px;height:22px;border-radius:6px;background:#fff;font:500 11px Inter;color:#8a8f9c;display:flex;align-items:center;padding-left:12px}
.browser>.page{position:relative;overflow:hidden}
.phone{position:absolute;width:290px;height:600px;border-radius:46px;background:#0c0d11;padding:11px;
  box-shadow:0 50px 90px -30px rgba(0,0,0,.6),inset 0 0 0 2px #2a2c33}
.phone>.screen{position:relative;width:100%;height:100%;border-radius:36px;overflow:hidden;background:#fff;color:#111}
.phone .island{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:86px;height:25px;border-radius:14px;background:#0c0d11;z-index:9}
.status{height:46px;display:flex;justify-content:space-between;align-items:flex-end;padding:0 24px 6px;font:600 12px Inter}
.tablet{position:absolute;border-radius:30px;background:#0c0d11;padding:14px;box-shadow:0 50px 90px -30px rgba(0,0,0,.55),inset 0 0 0 2px #2a2c33}
.tablet>.screen{position:relative;width:100%;height:100%;border-radius:18px;overflow:hidden;background:#fff;color:#111}
.pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 10px;font:600 11px Inter}
.line{height:8px;border-radius:4px;background:currentColor;opacity:.14}
.caption{position:absolute;font:500 14px Inter;letter-spacing:.01em}
`;

export function page(css, body) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}${css}</style></head><body>${body}</body></html>`;
}

/** A browser window. `w`/`h` include the toolbar. */
export function browser({ x, y, w, h, url, content, extra = '' }) {
  return `<div class="browser" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${extra}">
    <div class="bar"><i></i><i></i><i></i><div class="url">${url}</div></div>
    <div class="page" style="height:${h - 38}px">${content}</div></div>`;
}

export function phone({ x, y, content, scale = 1, rotate = 0, dark = false, extra = '' }) {
  return `<div class="phone" style="left:${x}px;top:${y}px;transform:scale(${scale}) rotate(${rotate}deg);transform-origin:top left;${extra}">
    <div class="screen" style="${dark ? 'background:#0f1115;color:#fff' : ''}"><div class="island"></div>
    <div class="status"><span>9:41</span><span>●●● ▮</span></div>${content}</div></div>`;
}

export function tablet({ x, y, w, h, content, extra = '' }) {
  return `<div class="tablet" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${extra}"><div class="screen">${content}</div></div>`;
}

/** Small "Sample" watermark in the corner of every generated image. */
export function sampleMark(color = 'rgba(255,255,255,.55)') {
  return `<div class="caption" style="right:28px;bottom:22px;color:${color};font-size:12px">Sample visual · fictional brand</div>`;
}
