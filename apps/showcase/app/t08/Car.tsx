/** Self-made side-profile EV (SVG). Body colour comes from the CSS variable --car. */
export default function Car({ className = "", label = "VELOCE E1 측면 일러스트" }: { className?: string; label?: string }) {
  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy="200" r="54" fill="#0c0d0f" />
      <g className="wheel">
        <circle cx={cx} cy="200" r="46" fill="#111214" stroke="#2a2d32" strokeWidth="2" />
        <circle cx={cx} cy="200" r="33" fill="none" stroke="#c9ccd1" strokeWidth="3" />
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d={`M${cx} 200 L${cx} 169`} stroke="#c9ccd1" strokeWidth="5" strokeLinecap="round" transform={`rotate(${a} ${cx} 200)`} />
        ))}
        <circle cx={cx} cy="200" r="7" fill="#ff5a1f" />
      </g>
    </g>
  );
  return (
    <svg viewBox="0 0 820 270" className={`car ${className}`} role="img" aria-label={label}>
      <ellipse cx="410" cy="252" rx="370" ry="12" fill="#000" opacity=".55" />
      <path className="body" d="M44 192 C 64 154, 140 144, 220 136 C 292 96, 382 74, 472 76 C 562 78, 624 112, 684 134 C 736 142, 774 162, 776 188 L 776 198 C 776 206, 770 210, 762 210 L 56 210 C 46 210, 40 204, 44 192 Z" />
      <path d="M302 132 C 352 100, 420 88, 482 90 C 540 92, 584 112, 612 132 Z" fill="#0b0c0e" />
      <path d="M470 90 L462 132" stroke="#0c0d0f" strokeWidth="5" />
      <path d="M232 150 C 360 136, 560 136, 740 160" fill="none" stroke="rgb(255 255 255 / .35)" strokeWidth="2" />
      <path d="M736 166 h30" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 172 h22" stroke="#ff2a0a" strokeWidth="5" strokeLinecap="round" />
      {wheel(194)}
      {wheel(640)}
    </svg>
  );
}
