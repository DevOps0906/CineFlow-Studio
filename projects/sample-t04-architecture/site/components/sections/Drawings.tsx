/** Self-made line drawings for the Principles section (no external media). */
const box = "h-full w-full";
const line = { stroke: "#a8a196", strokeOpacity: 0.55, fill: "none" } as const;

export function Structure() {
  return (
    <svg viewBox="0 0 400 500" className={box} role="img" aria-label="구조 단면 도식">
      <g {...line}>
        <path d="M60 420H340M60 420V170M340 420V170M200 420V170M60 170H340M60 295H340" />
        <path d="M60 420l-22 22M340 420l22 22" strokeDasharray="4 6" />
      </g>
      <path d="M40 170L200 90L360 170" fill="none" stroke="#f2b872" strokeWidth="1.5" />
      <g fill="#a8a196" fontFamily="monospace" fontSize="10" opacity=".8">
        <text x="56" y="460">C1</text><text x="196" y="460">C2</text><text x="334" y="460">C3</text><text x="346" y="300">L2</text>
      </g>
    </svg>
  );
}

export function Material() {
  return (
    <svg viewBox="0 0 400 500" className={box} role="img" aria-label="재료 레이어 도식">
      <defs>
        <pattern id="mat-a" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V10" stroke="#a8a196" strokeOpacity=".45" /></pattern>
        <pattern id="mat-b" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="#a8a196" fillOpacity=".5" /></pattern>
        <pattern id="mat-c" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)"><path d="M0 0V14" stroke="#f2b872" strokeOpacity=".5" /></pattern>
      </defs>
      <rect x="80" y="110" width="240" height="90" fill="url(#mat-a)" stroke="#a8a196" strokeOpacity=".5" />
      <rect x="80" y="200" width="240" height="60" fill="url(#mat-b)" stroke="#a8a196" strokeOpacity=".5" />
      <rect x="80" y="260" width="240" height="120" fill="url(#mat-c)" stroke="#a8a196" strokeOpacity=".5" />
      <g fill="#a8a196" fontFamily="monospace" fontSize="10" opacity=".8">
        <text x="330" y="160">CONCRETE</text><text x="330" y="234">INSULATION</text><text x="330" y="324">OAK</text>
      </g>
    </svg>
  );
}

export function Light() {
  return (
    <svg viewBox="0 0 400 500" className={box} role="img" aria-label="태양 궤적과 빛 도식">
      <path d="M50 400 A 150 150 0 0 1 350 400" {...line} strokeDasharray="3 6" />
      <path d="M50 400H350" {...line} />
      <g stroke="#f2b872" strokeOpacity=".5">
        <path d="M296 290L150 400" /><path d="M296 290L175 400" /><path d="M296 290L200 400" />
      </g>
      <rect x="120" y="320" width="26" height="80" fill="#2e2c28" stroke="#a8a196" strokeOpacity=".5" />
      <circle cx="296" cy="290" r="11" fill="#f2b872" />
      <circle cx="296" cy="290" r="22" fill="none" stroke="#f2b872" strokeOpacity=".3" />
      <g fill="#a8a196" fontFamily="monospace" fontSize="10" opacity=".8"><text x="50" y="424">06:00</text><text x="318" y="424">18:00</text><text x="312" y="272">16:40</text></g>
    </svg>
  );
}
