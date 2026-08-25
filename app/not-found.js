import Link from 'next/link';

const GATES = [
  ['Home — identity and the capability garden', '/'],
  ['AI Innovation — the core practice, four offerings', '/ai-innovation'],
  ['Partnerships — built with, not for', '/partnerships'],
  ['Public Policy — AI in the public interest', '/public-policy'],
  ['Blog — the evidence, with provenance', '/blog'],
  ['About — model, approach, leadership, careers', '/about'],
  ['Contact — discuss a challenge', '/contact']];

export default function NotFound() {
  return (
    <div className='container g2' style={{ paddingTop: 88, paddingBottom: 112 }}>
      <div>
        <p className='mlabel' style={{ color: 'var(--guava)' }}>OFF THE MAP</p>
        <h1 className='h-page' style={{ margin: 0 }}>This route doesn't exist.</h1>
        <p style={{ margin: '18px 0 0', font: '400 13px/1.8 var(--mono)', color: 'rgba(38,33,25,.65)' }}>NOTHING WAS LOST BY ARRIVING HERE.<br />IF YOU WERE DRAFTING A BRIEF, IT IS INTACT ON THIS DEVICE.</p>
        <div aria-hidden='true' style={{ marginTop: 36, width: 220, borderTop: '2px dashed rgba(127,97,24,.5)' }} />
      </div>
      <nav aria-label='Nearest valid routes'>
        <p className='mlabel mlabel--sm' style={{ letterSpacing: '.14em', marginBottom: 16 }}>THE NEAREST GATES</p>
        <div className='nlist'>
          {GATES.map((g) => (
            <Link key={g[1]} href={g[1]} className='gnode' style={{ textDecoration: 'none', padding: '11px 0' }}>
              <span className='dot' /><span>{g[0]} <span style={{ font: '400 12px/1 var(--mono)', color: 'rgba(38,33,25,.55)' }}>{g[1]}</span></span>
            </Link>))}
        </div>
      </nav>
    </div>
  );
}
