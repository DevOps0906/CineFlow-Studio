/** Self-made SVG illustrations for the Anatomy section (no external media). */
const box = "h-full w-full";

export function Sapphire() {
  return (
    <svg viewBox="0 0 400 500" className={box} role="img" aria-label="사파이어 크리스털 도식">
      <defs>
        <radialGradient id="sap-g" cx="40%" cy="38%" r="70%">
          <stop offset="0" stopColor="#2c3c6e" /><stop offset="1" stopColor="#0d1326" />
        </radialGradient>
        <linearGradient id="sap-h" x1="0" x2="1">
          <stop offset="0" stopColor="#efe9dc" stopOpacity="0" /><stop offset=".5" stopColor="#efe9dc" stopOpacity=".75" /><stop offset="1" stopColor="#efe9dc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="250" r="150" fill="url(#sap-g)" stroke="#c98a5a" strokeOpacity=".5" />
      <circle cx="200" cy="250" r="128" fill="none" stroke="#efe9dc" strokeOpacity=".12" />
      <circle cx="200" cy="250" r="96" fill="none" stroke="#efe9dc" strokeOpacity=".1" strokeDasharray="2 6" />
      <path d="M92 182 A 132 132 0 0 1 252 122" fill="none" stroke="url(#sap-h)" strokeWidth="6" strokeLinecap="round" />
      <path d="M300 330 A 132 132 0 0 1 250 368" fill="none" stroke="#efe9dc" strokeOpacity=".25" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Movement() {
  return (
    <svg viewBox="0 0 400 500" className={box} role="img" aria-label="무브먼트 기어 도식">
      <g fill="none">
        <g className="spin-slow">
          <circle cx="170" cy="220" r="96" stroke="#c98a5a" strokeWidth="16" strokeDasharray="7 7" strokeOpacity=".85" />
          <circle cx="170" cy="220" r="74" stroke="#efe9dc" strokeOpacity=".2" />
          <path d="M170 146V294M96 220H244" stroke="#efe9dc" strokeOpacity=".15" />
        </g>
        <g className="spin-slow rev">
          <circle cx="282" cy="334" r="54" stroke="#efe9dc" strokeOpacity=".6" strokeWidth="12" strokeDasharray="5 5" />
          <circle cx="282" cy="334" r="38" stroke="#efe9dc" strokeOpacity=".15" />
        </g>
        <circle cx="170" cy="220" r="10" fill="#c98a5a" />
        <circle cx="282" cy="334" r="6" fill="#efe9dc" />
        <circle cx="300" cy="150" r="14" stroke="#c98a5a" strokeOpacity=".7" strokeWidth="2" />
        <circle cx="300" cy="150" r="4" fill="#c98a5a" />
      </g>
    </svg>
  );
}

export function Finishing() {
  return (
    <svg viewBox="0 0 400 500" className={box} role="img" aria-label="코트 드 제네브 마감 패턴">
      <defs>
        <linearGradient id="fin-g" x1="0" x2="1">
          <stop offset="0" stopColor="#121a30" /><stop offset=".5" stopColor="#3b4668" /><stop offset="1" stopColor="#121a30" />
        </linearGradient>
        <pattern id="fin-p" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <rect width="44" height="44" fill="url(#fin-g)" />
        </pattern>
        <clipPath id="fin-c"><circle cx="200" cy="250" r="150" /></clipPath>
      </defs>
      <g clipPath="url(#fin-c)"><rect width="400" height="500" fill="url(#fin-p)" /></g>
      <circle cx="200" cy="250" r="150" fill="none" stroke="#c98a5a" strokeOpacity=".5" />
      <circle cx="200" cy="250" r="20" fill="#0b1020" stroke="#c98a5a" strokeOpacity=".7" />
    </svg>
  );
}
