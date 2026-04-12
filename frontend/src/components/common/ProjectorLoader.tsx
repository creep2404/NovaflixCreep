import { useEffect, useRef, useState } from "react";

const css = `
@keyframes proj-reel-l   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
@keyframes proj-reel-r   { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
@keyframes proj-film     { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
@keyframes proj-flicker  {
  0%,100%{opacity:1} 3%{opacity:.7} 6%{opacity:1}
  40%{opacity:.95}   41%{opacity:.6} 43%{opacity:1}
  80%{opacity:.9}    82%{opacity:.5} 84%{opacity:1}
}
@keyframes proj-beam     { 0%,100%{opacity:.18} 50%{opacity:.28} }
@keyframes proj-fade-in  { from{opacity:0} to{opacity:1} }

.proj-wrap {
  background: #1a1208;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 400px;
  justify-content: center;
  animation: proj-fade-in .5s ease;
}
.proj-top {
  position: relative;
  display: flex;
  align-items: center;
  animation: proj-flicker 6s ease-in-out infinite;
}
.proj-beam-wrap {
  position: relative;
  width: 180px;
  height: 0;
  overflow: visible;
}
.proj-beam-inner {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 180px;
}
.proj-screen {
  width: 120px;
  height: 78px;
  border-radius: 3px;
  background: #0d0a05;
  border: 3px solid #3a2a12;
  position: relative;
  overflow: hidden;
  z-index: 2;
}
.proj-screen-lines {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.15) 3px,rgba(0,0,0,.15) 4px);
}
.proj-screen-vignette {
  position: absolute; inset: 0; border-radius: 2px; pointer-events: none;
  box-shadow: inset 0 0 20px rgba(0,0,0,.6);
}
.proj-bottom { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%; max-width: 320px; }
.proj-strip-wrap {
  width: 100%; overflow: hidden;
  background: #0d0a05;
  border: 1px solid #3a2a12;
  border-radius: 4px;
  padding: 6px 0;
}
.proj-strip { display: flex; width: max-content; animation: proj-film 3s linear infinite; }
.proj-cell {
  width: 40px; flex-shrink: 0;
  background: #0d0a05;
  border-right: 1px solid #2a1f0e;
  display: flex; flex-direction: column;
  align-items: center; padding: 2px 0; gap: 2px;
}
.proj-sprockets { display: flex; gap: 3px; }
.proj-sprocket  { width: 5px; height: 4px; border-radius: 1px; background: #0a0806; border: 0.5px solid #2a1f0e; }
.proj-controls  { display: flex; align-items: center; gap: 16px; width: 100%; }
.proj-reel      { flex-shrink: 0; }
.proj-reel-l    { animation: proj-reel-l 2s linear infinite; }
.proj-reel-r    { animation: proj-reel-r 2s linear infinite; }
.proj-progress  { flex: 1; }
.proj-track     { height: 3px; background: #0d0a05; border-radius: 2px; border: 1px solid #3a2a12; overflow: hidden; }
.proj-fill      { height: 100%; background: #c8a050; border-radius: 2px; transition: width .15s linear; }
.proj-label     { display: flex; justify-content: center; margin-top: 6px; }
.proj-label-text{ font-family: serif; font-size: 12px; color: #8a6a3a; letter-spacing: .06em; }
`;

const SCENE_COLORS = [
  { bg: "#1a2a3a", fg: "#0a1520", accent: "#c8a050" },
  { bg: "#3a1a0a", fg: "#1a0804", accent: "#e8a050" },
  { bg: "#1a2a1a", fg: "#0a1a0a", accent: "#60a060" },
  { bg: "#2a1a3a", fg: "#1a0a2a", accent: "#a060e0" },
  { bg: "#3a2a10", fg: "#2a1a08", accent: "#c8b050" },
];
const MSGS = ["Now loading...", "Developing film...", "Cueing the reel...", "Almost there...", "Lights, camera!"];
const SPOKE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function ReelSVG() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="#1a1208" stroke="#6b4f2a" strokeWidth="1.5"/>
      <circle cx="18" cy="18" r="5"  fill="#2a1f0e" stroke="#8a6a3a" strokeWidth="1"/>
      <circle cx="18" cy="18" r="2"  fill="#6b4f2a"/>
      {SPOKE_ANGLES.map(a => {
        const r = a * Math.PI / 180;
        return <line key={a}
          x1={18 + Math.cos(r)*5} y1={18 + Math.sin(r)*5}
          x2={18 + Math.cos(r)*14} y2={18 + Math.sin(r)*14}
          stroke="#6b4f2a" strokeWidth="1.5" strokeLinecap="round"
        />;
      })}
    </svg>
  );
}

function FrameScene({ idx }: { idx: number }) {
  const pal = SCENE_COLORS[idx % SCENE_COLORS.length];
  if (idx % 4 === 0) return (
    <svg width="100" height="64" viewBox="0 0 100 64">
      <rect width="100" height="64" fill={pal.bg}/>
      <rect x="0" y="44" width="100" height="20" fill={pal.fg}/>
      <rect x="30" y="20" width="18" height="28" rx="2" fill={pal.accent} opacity=".7"/>
      <ellipse cx="38" cy="18" rx="9" ry="9" fill={pal.accent} opacity=".8"/>
      <rect x="10" y="30" width="12" height="18" rx="1" fill="#8a6030" opacity=".6"/>
    </svg>
  );
  if (idx % 4 === 1) return (
    <svg width="100" height="64" viewBox="0 0 100 64">
      <rect width="100" height="64" fill={pal.bg}/>
      <ellipse cx="50" cy="32" rx="28" ry="28" fill={pal.fg}/>
      <ellipse cx="50" cy="32" rx="14" ry="14" fill="#0d0a05"/>
      <ellipse cx="50" cy="32" rx="6"  ry="6"  fill={pal.accent} opacity=".5"/>
      <line x1="50" y1="4"  x2="50" y2="60" stroke="#3a2a12" strokeWidth="1"/>
      <line x1="22" y1="32" x2="78" y2="32" stroke="#3a2a12" strokeWidth="1"/>
    </svg>
  );
  if (idx % 4 === 2) return (
    <svg width="100" height="64" viewBox="0 0 100 64">
      <rect width="100" height="64" fill={pal.bg}/>
      <rect x="0" y="42" width="100" height="22" fill={pal.fg}/>
      <polygon points="50,8 58,28 80,28 63,40 70,60 50,48 30,60 37,40 20,28 42,28" fill={pal.accent} opacity=".55"/>
    </svg>
  );
  return (
    <svg width="100" height="64" viewBox="0 0 100 64">
      <rect width="100" height="64" fill={pal.bg}/>
      <rect x="0" y="48" width="100" height="16" fill={pal.fg}/>
      <rect x="20" y="16" width="60" height="36" rx="2" fill={pal.fg} stroke="#3a2a12" strokeWidth="1"/>
      <circle cx="50" cy="34" r="10" fill="#0d0a05"/>
      <line x1="50" y1="24" x2="50" y2="44" stroke={pal.accent} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40" y1="34" x2="60" y2="34" stroke={pal.accent} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function ProjectorLoader() {
  const stripRef  = useRef<HTMLDivElement>(null);
  const [frame,   setFrame]   = useState(0);
  const [progress, setProgress] = useState(0);
  const [msgIdx,  setMsgIdx]  = useState(0);
  const [scratch, setScratch] = useState(30);

  useEffect(() => {
    if (!document.getElementById("proj-loader-styles")) {
      const s = document.createElement("style");
      s.id = "proj-loader-styles";
      s.textContent = css;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || strip.children.length > 0) return;
    const COUNT = 24;
    const allCells = Array.from({ length: COUNT * 2 }, (_, i) => {
      const pal = SCENE_COLORS[i % SCENE_COLORS.length];
      const cell = document.createElement("div");
      cell.className = "proj-cell";
      cell.innerHTML = `
        <div class="proj-sprockets">
          <div class="proj-sprocket"></div><div class="proj-sprocket"></div><div class="proj-sprocket"></div>
        </div>
        <div style="width:32px;height:22px;border-radius:1px;background:${pal.bg};border:0.5px solid #2a1f0e;overflow:hidden;position:relative">
          <div style="position:absolute;bottom:0;left:0;right:0;height:8px;background:${pal.fg}"></div>
          <div style="position:absolute;top:4px;left:6px;width:8px;height:10px;background:${pal.accent};border-radius:1px;opacity:.5"></div>
        </div>
        <div class="proj-sprockets">
          <div class="proj-sprocket"></div><div class="proj-sprocket"></div><div class="proj-sprocket"></div>
        </div>
      `;
      return cell;
    });
    allCells.forEach(c => strip.appendChild(c));
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setFrame(f => f + 1);
      setScratch(Math.floor(Math.random() * 80 + 10));
    }, 600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.floor(Math.random() * 2.2 + 0.6));
      setProgress(p);
      setMsgIdx(Math.min(MSGS.length - 1, Math.floor(p / 100 * MSGS.length)));
      if (p >= 100) clearInterval(iv);
    }, 100);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="proj-wrap">
      <div className="proj-top">
        <svg width="110" height="90" viewBox="0 0 110 90">
          <rect x="8" y="28" width="70" height="42" rx="6" fill="#2a1f0e" stroke="#6b4f2a" strokeWidth="1.5"/>
          <rect x="14" y="34" width="58" height="30" rx="3" fill="#1a1208"/>
          <circle cx="72" cy="49" r="14" fill="#3a2a12" stroke="#6b4f2a" strokeWidth="1.5"/>
          <circle cx="72" cy="49" r="9"  fill="#2a1f0e" stroke="#8a6a3a" strokeWidth="1"/>
          <circle cx="72" cy="49" r="5"  fill="#c8a050" opacity=".9"/>
          <circle cx="72" cy="49" r="2.5" fill="#fff5d0"/>
          <rect x="78" y="46" width="20" height="6" rx="3" fill="#2a1f0e" stroke="#6b4f2a" strokeWidth="1"/>
          <rect x="20" y="22" width="8"  height="8" rx="2" fill="#3a2a12" stroke="#6b4f2a" strokeWidth="1"/>
          <rect x="50" y="22" width="8"  height="8" rx="2" fill="#3a2a12" stroke="#6b4f2a" strokeWidth="1"/>
          <rect x="35" y="70" width="6"  height="14" rx="2" fill="#3a2a12" stroke="#5a3f1e" strokeWidth="1"/>
          <rect x="20" y="82" width="36" height="4"  rx="2" fill="#2a1f0e" stroke="#5a3f1e" strokeWidth="1"/>
        </svg>

        <div className="proj-beam-wrap">
          <div className="proj-beam-inner">
            <svg width="180" height="44" viewBox="0 0 180 44">
              <defs>
                <linearGradient id="proj-beam-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#ffe89a" stopOpacity=".22"/>
                  <stop offset="100%" stopColor="#ffe89a" stopOpacity=".04"/>
                </linearGradient>
              </defs>
              <polygon points="0,16 180,0 180,44 0,28" fill="url(#proj-beam-grad)" style={{animation:"proj-beam 2s ease-in-out infinite"}}/>
            </svg>
          </div>
        </div>

        <div className="proj-screen">
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FrameScene idx={frame % 4} />
          </div>
          <div className="proj-screen-lines" />
          <div className="proj-screen-vignette" />
          <div style={{ position: "absolute", top: 0, left: `${scratch}%`, width: 1, height: "100%", background: "rgba(255,255,255,.06)" }} />
        </div>
      </div>

      <div className="proj-bottom">
        <div className="proj-strip-wrap">
          <div className="proj-strip" ref={stripRef} />
        </div>

        <div className="proj-controls">
          <div className="proj-reel proj-reel-l"><ReelSVG /></div>
          <div className="proj-progress">
            <div className="proj-track">
              <div className="proj-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="proj-label">
              <span className="proj-label-text">{MSGS[msgIdx]}</span>
            </div>
          </div>
          <div className="proj-reel proj-reel-r"><ReelSVG /></div>
        </div>
      </div>
    </div>
  );
}
