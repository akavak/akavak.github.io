// Generative SVG artwork used as covers for blog posts and featured projects,
// so the site needs no stock photography. Colours follow the theme tokens.

type Variant = "health" | "llm" | "wireless" | "backscatter" | "network" | "antenna";

export default function CoverArt({ variant, label }: { variant: Variant; label?: string }) {
  return (
    <div className="art" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`g-${variant}`} cx="70%" cy="30%" r="70%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <pattern id={`dots-${variant}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="var(--text-3)" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="var(--bg-2)" />
        <rect width="800" height="500" fill={`url(#dots-${variant})`} />
        <rect width="800" height="500" fill={`url(#g-${variant})`} />
        {variant === "health" && <Health />}
        {variant === "llm" && <Llm />}
        {(variant === "wireless" || variant === "antenna") && <Wireless />}
        {variant === "backscatter" && <Backscatter />}
        {variant === "network" && <NetworkArt />}
      </svg>
    </div>
  );
}

const stroke = { fill: "none", stroke: "var(--accent)", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Health() {
  return (
    <g>
      <path d="M40 300 H250 L285 220 L325 390 L370 160 L410 330 L440 300 H760" {...stroke} strokeWidth={5} />
      <circle cx="560" cy="190" r="70" fill="none" stroke="var(--text)" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="560" cy="190" r="110" fill="none" stroke="var(--text)" strokeOpacity="0.12" strokeWidth="2" />
      <path d="M560 160 c-16 -26 -58 -14 -52 18 c4 22 52 52 52 52 s48 -30 52 -52 c6 -32 -36 -44 -52 -18z" fill="var(--accent)" />
    </g>
  );
}

function Llm() {
  const nodes = [
    [120, 150], [120, 250], [120, 350],
    [330, 110], [330, 210], [330, 310], [330, 410],
    [540, 170], [540, 270], [540, 370],
    [700, 270],
  ];
  const edges: [number, number][] = [];
  for (const a of [0, 1, 2]) for (const b of [3, 4, 5, 6]) edges.push([a, b]);
  for (const a of [3, 4, 5, 6]) for (const b of [7, 8, 9]) edges.push([a, b]);
  for (const a of [7, 8, 9]) edges.push([a, 10]);
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--text)" strokeOpacity="0.14" strokeWidth="1.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 10 ? 22 : 12} fill={i === 10 || i === 4 || i === 8 ? "var(--accent)" : "var(--surface-2)"} stroke="var(--accent)" strokeWidth="2" />
      ))}
      <rect x="610" y="60" width="150" height="60" rx="18" fill="var(--surface)" stroke="var(--line-strong)" />
      <rect x="630" y="80" width="80" height="8" rx="4" fill="var(--text)" opacity="0.6" />
      <rect x="630" y="96" width="50" height="8" rx="4" fill="var(--accent)" />
    </g>
  );
}

function Wireless() {
  return (
    <g>
      <path d="M200 430 L240 250 L280 430 M218 350 H262" {...stroke} stroke="var(--text)" strokeOpacity="0.7" />
      <circle cx="240" cy="240" r="10" fill="var(--accent)" />
      {[60, 120, 180, 240, 300].map((r, i) => (
        <path key={r} d={`M${240 + r * 0.7} ${240 - r * 0.7} A ${r} ${r} 0 0 1 ${240 + r * 0.7} ${240 + r * 0.7}`} {...stroke} strokeOpacity={1 - i * 0.17} />
      ))}
      <rect x="600" y="200" width="70" height="120" rx="14" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" />
      <rect x="615" y="220" width="40" height="60" rx="6" fill="var(--accent-soft)" />
    </g>
  );
}

function Backscatter() {
  return (
    <g>
      <rect x="90" y="190" width="90" height="120" rx="14" fill="var(--surface)" stroke="var(--text)" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M180 250 C 300 120, 420 120, 520 230" {...stroke} stroke="var(--text)" strokeOpacity="0.4" strokeDasharray="10 12" />
      <rect x="500" y="230" width="70" height="70" rx="12" fill="var(--accent)" />
      <path d="M520 265 h30" stroke="var(--accent-ink)" strokeWidth="5" strokeLinecap="round" />
      <path d="M570 265 C 620 340, 680 360, 720 330" {...stroke} />
      {[30, 55, 80].map((r) => (
        <path key={r} d={`M${535 + r} ${265 - r} A ${r * 1.4} ${r * 1.4} 0 0 1 ${535 + r} ${265 + r}`} {...stroke} strokeWidth={2} strokeOpacity="0.6" />
      ))}
      <circle cx="720" cy="330" r="14" fill="var(--accent)" />
    </g>
  );
}

function NetworkArt() {
  const pts = [
    [130, 120], [260, 260], [140, 400], [400, 160], [420, 360], [580, 240], [700, 120], [690, 400],
  ];
  const links = [[0, 1], [1, 2], [1, 3], [1, 4], [3, 5], [4, 5], [5, 6], [5, 7], [3, 6], [4, 7]];
  return (
    <g>
      {links.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="2.5" />
      ))}
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 5 ? 30 : 16} fill={i === 5 ? "var(--accent)" : "var(--surface)"} stroke="var(--accent)" strokeWidth="3" />
        </g>
      ))}
    </g>
  );
}
