'use client';
// The living thread material. States are driven by real interaction state, never decoration-only loops.
export default function Threads({ w = 560, h = 620, part = false, straight = false, flow = false, sel = null, bloom = false }) {
  const n = 9, paths = [], dots = [];
  for (let i = 0; i < n; i++) {
    const gap = (i >= 4 ? 16 : 0) + (i >= 7 ? 16 : 0);
    const y = h * 0.09 + i * ((h * 0.82 - 32) / (n - 1)) + gap;
    let d;
    if (straight) d = 'M -12 ' + y + ' L ' + (w + 12) + ' ' + y;
    else {
      const c = h / 2, dist = Math.abs(y - c);
      const amp = part ? Math.max(0, h * 0.42 - dist) * 0.6 : 10 + (i % 3) * 6;
      const y2 = y + (part ? (y < c ? -amp : amp) : (y < c ? -1 : 1) * amp * 0.4 * ((i % 2) ? 1 : -1));
      d = 'M -12 ' + y + ' C ' + w * 0.27 + ' ' + y + ', ' + w * 0.34 + ' ' + y2 + ', ' + w * 0.5 + ' ' + y2 + ' S ' + w * 0.74 + ' ' + y + ', ' + (w + 12) + ' ' + y;
    }
    const isSel = sel != null && i === sel;
    paths.push(<path key={i} d={d} className={'wt-th' + (flow ? ' wt-flow' : '')} fill='none'
      stroke={isSel ? '#E6B763' : '#D4AF37'} strokeLinecap='round' strokeWidth={isSel ? 2.4 : 1.15}
      style={{ opacity: sel == null ? 0.3 + (i % 3) * 0.08 : (isSel ? 0.95 : 0.13), transition: 'opacity .45s, stroke-width .45s', animationDelay: (i * 0.7) + 's' }} />);
    if (straight) dots.push(<circle key={'c' + i} cx={w * 0.5} cy={y} r={2.2} fill='#E6B763' style={{ opacity: 0.9 }} />);
  }
  return (<svg viewBox={'0 0 ' + w + ' ' + h} aria-hidden='true' preserveAspectRatio='none'
    className={'threads' + (bloom ? ' wt-bloom' : '')}>{paths}{dots}</svg>);
}
