import { useEffect, useRef } from "react";

const css = `
@keyframes reel-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes film-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes dot-blink {
  0%,80%,100% { opacity: 0.2; transform: scale(0.8); }
  40%         { opacity: 1;   transform: scale(1); }
}
@keyframes projector-flicker {
  0%,100% { opacity: 1; }
  92%     { opacity: 1; }
  93%     { opacity: 0.7; }
  94%     { opacity: 1; }
  97%     { opacity: 0.85; }
  98%     { opacity: 1; }
}
@keyframes scratch-move {
  from { transform: translateY(-10%); }
  to   { transform: translateY(110%); }
}
.fl-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  background: #0a0a0f;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}
.fl-track { width: 100%; overflow: hidden; margin-bottom: 2.5rem; }
.fl-strip  { display: flex; width: max-content; animation: film-scroll 6s linear infinite; }
.fl-cell {
  width: 56px; flex-shrink: 0;
  background: #111118;
  border-right: 1.5px solid #222230;
  display: flex; flex-direction: column;
  align-items: center; padding: 4px 0; gap: 3px;
}
.fl-sprockets { display: flex; gap: 10px; justify-content: center; width: 100%; }
.fl-sprocket  { width: 7px; height: 7px; border-radius: 2px; background: #0a0a0f; border: 1px solid #333345; }
.fl-frame     { width: 44px; height: 32px; border-radius: 3px; border: 0.5px solid #333345; }
.fl-reels {
  display: flex; align-items: center; gap: 40px;
  margin-bottom: 2rem;
  animation: projector-flicker 4s ease-in-out infinite;
}
.fl-reel { width: 72px; height: 72px; position: relative; display: flex; align-items: center; justify-content: center; }
.fl-reel-outer {
  width: 72px; height: 72px; border-radius: 50%;
  border: 2.5px solid #E8B84B;
  position: absolute;
  animation: reel-spin 2s linear infinite;
}
.fl-reel-outer.fl-right { border-color: #c89a38; animation-direction: reverse; }
.fl-spoke {
  position: absolute; width: 2px; height: 28px;
  background: #E8B84B; border-radius: 1px;
  top: 50%; left: 50%; transform-origin: 50% 0%;
}
.fl-right .fl-spoke { background: #c89a38; }
.fl-hub  { width: 16px; height: 16px; border-radius: 50%; background: #E8B84B; position: absolute; z-index: 2; }
.fl-right .fl-hub { background: #c89a38; }
.fl-hole { width: 6px; height: 6px; border-radius: 50%; background: #0a0a0f; position: absolute; z-index: 3; }
.fl-filmline {
  width: 40px; height: 2px; background: #2a2a3a;
  border-radius: 1px; position: relative; overflow: hidden;
}
.fl-filmline::after {
  content: ''; position: absolute;
  left: -100%; top: 0; bottom: 0; width: 60%;
  background: #E8B84B; border-radius: 1px;
  animation: film-scroll 1s linear infinite;
}
.fl-label  { font-size: 13px; color: #555; display: flex; align-items: center; gap: 6px; letter-spacing: 0.06em; }
.fl-dots span {
  display: inline-block; width: 4px; height: 4px;
  border-radius: 50%; background: #E8B84B;
  animation: dot-blink 1.4s ease-in-out infinite;
}
.fl-dots span:nth-child(2) { animation-delay: 0.2s; }
.fl-dots span:nth-child(3) { animation-delay: 0.4s; }
.fl-scratch { position: absolute; inset: 0; pointer-events: none; border-radius: 16px; overflow: hidden; }
.fl-scratch-line {
  position: absolute; top: 0; width: 1px; height: 100%;
  background: rgba(255,255,255,0.04);
  animation: scratch-move 3s linear infinite;
}
`;

const FRAME_COLORS = ["#1a1225","#0d1a1a","#1a1108","#12121f","#1a0d0d","#0d1a10"];
const SPOKES = [0, 60, 120, 180, 240, 300];

function Reel({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="fl-reel">
      <div className={`fl-reel-outer ${reverse ? "fl-right" : ""}`}>
        <div className={reverse ? "fl-right" : ""}>
          {SPOKES.map((deg) => (
            <div
              key={deg}
              className="fl-spoke"
              style={{ transform: `translate(-50%, -100%) rotate(${deg}deg)` }}
            />
          ))}
        </div>
      </div>
      <div className="fl-hub" />
      <div className="fl-hole" />
    </div>
  );
}

export function FilmLoader() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById("fl-styles")) {
      const style = document.createElement("style");
      style.id = "fl-styles"
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || strip.children.length > 0) return;
    const cells = Array.from({ length: 28 }, (_, i) => {
      const cell = document.createElement("div");
      cell.className = "fl-cell";
      cell.innerHTML = `
        <div class="fl-sprockets">
          <div class="fl-sprocket"></div>
          <div class="fl-sprocket"></div>
          <div class="fl-sprocket"></div>
        </div>
        <div class="fl-frame" style="background:${FRAME_COLORS[i % FRAME_COLORS.length]}"></div>
        <div class="fl-sprockets">
          <div class="fl-sprocket"></div>
          <div class="fl-sprocket"></div>
          <div class="fl-sprocket"></div>
        </div>
      `;
      return cell;
    });
    cells.forEach((c) => strip.appendChild(c));
    cells.forEach((c) => strip.appendChild(c.cloneNode(true)));
  }, []);

  return (
    <div className="fl-wrap">
      <div className="fl-scratch">
        <div className="fl-scratch-line" style={{ left: "15%", animationDuration: "2.8s" }} />
        <div className="fl-scratch-line" style={{ left: "42%", animationDuration: "3.5s", animationDelay: "1.1s", opacity: 0.6 }} />
        <div className="fl-scratch-line" style={{ left: "73%", animationDuration: "2.2s", animationDelay: "0.5s" }} />
      </div>

      <div className="fl-track">
        <div className="fl-strip" ref={stripRef} />
      </div>

      <div className="fl-reels">
        <Reel />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div className="fl-filmline" />
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
            <rect x="1" y="1" width="26" height="18" rx="2" stroke="#E8B84B" strokeWidth="1.5" />
            <polygon points="10,5 10,15 20,10" fill="#E8B84B" />
          </svg>
          <div className="fl-filmline" />
        </div>

        <Reel reverse />
      </div>

      <div className="fl-label">
        <span>Đang tải</span>
        <div className="fl-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
