import Link from 'next/link';
export const metadata = { title: 'About', description: 'What Witamala is: the Brazil–Mekong model, the approach, leadership, legal identity, locations and careers.' };

const STAGES = [['STAGE 1', 'Diagnosis', 'Name the real problem and what deciding it requires.'], ['STAGE 2', 'Direction', 'Make the consequential choices visible, then choose.'], ['STAGE 3', 'Build', 'Apply AI to the problem, product, capability or organization.'], ['STAGE 4', 'Transfer', 'Leave the system, the routine and the capability in place.']];

export default function About() {
  return (
    <div className='container' style={{ paddingTop: 72, paddingBottom: 96 }}>
      <p className='mlabel'>ABOUT</p>
      <h1 className='h-page'>About Witamala</h1>
      <div className='g2' style={{ marginTop: 32 }}>
        <div style={{ fontSize: 16.5, lineHeight: 1.72 }}>
          <p style={{ margin: 0 }}>Witamala is an AI innovation company built from the Global South, operating on a Bangkok–Florianópolis axis. Its core practice is AI Innovation — the practical application of AI to problems, products, capabilities and organizations — held together with Partnerships and Public Policy.</p>
          <p style={{ margin: '16px 0 0' }}>The company is built on a simple position: the useful result of any engagement must not leave with the people who were hired. A working result, a reusable system and independent capability stay where the work happened.</p>
          <p style={{ margin: '22px 0 0', font: 'italic 500 20px/1.5 var(--serif)', color: 'var(--mah)' }}>Audacity is not noise. It is authorship — choosing the problems worth solving, building the capability to solve them, and defining success with the people who must live with the result.</p>
        </div>
        <div style={{ borderLeft: '1px solid var(--goldline)', paddingLeft: 32 }}>
          <p style={{ margin: 0, font: '500 24px/1.45 var(--serif)' }}>AI Innovation. Partnerships. Public Policy.</p>
          <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.65, color: 'rgba(38,33,25,.75)' }}>Three domains, nine offerings. The <Link href='/#garden'>capability garden</Link> shows them in one view.</p>
        </div>
      </div>
      <section aria-label='The model' style={{ marginTop: 72, borderTop: '1px solid rgba(38,33,25,.2)', paddingTop: 40 }}>
        <h2 className='h-sub' style={{ marginBottom: 20 }}>The Brazil–Mekong model</h2>
        <div className='g2' style={{ gap: 40, fontSize: 15.5, lineHeight: 1.7, color: 'rgba(38,33,25,.9)' }}>
          <p style={{ margin: 0 }}>One company on two shores. Bangkok anchors the Mekong side; Florianópolis anchors the Brazilian side. Knowledge moves along the axis in both directions — methods, patterns, people — while capability accumulates at each end rather than being extracted from either.</p>
          <p style={{ margin: 0 }}>The cultural position is <strong>Generous AI</strong> inside a <strong>Guild-and-Commons</strong> structure: a guild of practitioners around a commons of methods and artifacts, leaving the power to create where the work lives. Culture stays concentrated and digested — it shows in how the work is structured, not in decoration.</p>
        </div>
      </section>
      <section aria-label='Approach' style={{ marginTop: 72, borderTop: '1px solid rgba(38,33,25,.2)', paddingTop: 40 }}>
        <h2 className='h-sub' style={{ marginBottom: 8 }}>The approach</h2>
        <p className='lead' style={{ maxWidth: '56ch', marginBottom: 36, fontSize: 15.5 }}>Every engagement runs the same journey from diagnosis to implementation, whatever the offering.</p>
        <div className='g4' style={{ borderTop: '1px solid rgba(127,97,24,.4)' }}>
          {STAGES.map((s) => (
            <div key={s[0]} style={{ padding: '26px 26px 0 0' }}>
              <p style={{ margin: '0 0 8px', font: '500 12px/1 var(--mono)', color: 'var(--bronze)' }}>{s[0]}</p>
              <h3 style={{ margin: '0 0 10px', font: '500 20px/1.25 var(--serif)' }}>{s[1]}</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(38,33,25,.8)' }}>{s[2]}</p>
            </div>))}
        </div>
        <p style={{ margin: '28px 0 0', font: 'italic 500 17px/1.5 var(--serif)', color: 'rgba(38,33,25,.75)' }}>The approach ends when the capability no longer needs us.</p>
      </section>
      <div className='g2' style={{ marginTop: 72, borderTop: '1px solid rgba(38,33,25,.2)', paddingTop: 40 }}>
        <section aria-label='Leadership and identity'>
          <h2 className='h-sub' style={{ marginBottom: 20 }}>Leadership and identity</h2>
          <p style={{ margin: 0, font: '600 17px/1.5 var(--sans)' }}>Rafael Torquato Cruz</p>
          <p style={{ margin: '2px 0 0', fontSize: 14.5, color: 'rgba(38,33,25,.75)' }}>Founder &amp; CEO</p>
          <div className='card' style={{ marginTop: 24, padding: '18px 22px' }}>
            <p style={{ margin: 0, font: '400 12.5px/2 var(--mono)', color: 'rgba(38,33,25,.8)' }}>LEGAL IDENTITY: [entity name · registration number — publish before launch]<br />OFFICES: BANGKOK, THAILAND | FLORIANÓPOLIS, BRAZIL<br />CONTACT: [contact address — publish before launch]</p>
          </div>
        </section>
        <section aria-label='Careers'>
          <h2 className='h-sub' style={{ marginBottom: 20 }}>Careers</h2>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: 'rgba(38,33,25,.9)' }}>Witamala is small and forming. There are no open roles listed yet — when there are, they will appear here with the same honesty as everything else: what the work is, where it happens, and what you would own.</p>
          <p style={{ margin: '14px 0 0', fontSize: 15.5, lineHeight: 1.7, color: 'rgba(38,33,25,.9)' }}>If the direction speaks to you before then, <Link href='/contact'>introduce yourself through a conversation</Link>.</p>
        </section>
      </div>
    </div>
  );
}
