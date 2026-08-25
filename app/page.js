import Link from 'next/link';
import { F, IDENTITY } from '@/lib/facts';
import Threads from '@/components/Threads';
import Garden from '@/components/Garden';
import BriefBox from '@/components/BriefBox';
import SeenHome from '@/components/SeenHome';

const chipText = (a) => (a === 'witamala' ? 'WITAMALA WORK' : 'PRIOR WORK');

export default function Home() {
  return (
    <div>
      <SeenHome />
      <section aria-label='Identity' className='hero'>
        <div className='hero-in'>
          <div className='hero-copy'>
            <p className='mlabel mlabel--gold' style={{ marginBottom: 22 }}>{IDENTITY.eyebrow}</p>
            <h1 className='h-hero'>AI applied to real problems. Capability left where the work lives.</h1>
            <p className='hero-sub'>Witamala works with institutions, governments, founders and partners across Southeast Asia and Brazil — building from Bangkok and Florianópolis.</p>
            <p className='slogan'>{IDENTITY.slogan}</p>
            <div className='hero-actions'>
              <Link href='/contact' className='btn btn--ivory'>Discuss a challenge</Link>
              <a href='#garden' className='alt'>The nine offerings ↓</a>
            </div>
          </div>
          <div className='hero-art' aria-hidden='true'>
            <Threads part />
            <img src='/brand/logo-full.svg' alt='' />
          </div>
        </div>
        <nav aria-label='The three domains' className='domband'>
          <div className='domband-in'>
            {F.domains.map((d) => (
              <Link key={d.slug} href={'/' + d.slug}><span className='num'>DOMAIN {d.num}</span><span className='nm'>{d.name}</span></Link>
            ))}
          </div>
        </nav>
      </section>
      <section aria-label='Witamala in brief' className='sec'>
        <div className='container py g2'>
          <div><p className='mlabel'>WITAMALA IN BRIEF</p>
            <p className='pull' style={{ maxWidth: '18ch' }}>Global knowledge in motion, local capability in accumulation.</p></div>
          <div style={{ fontSize: 16.5, lineHeight: 1.7 }}>
            <p style={{ margin: 0 }}>Witamala is an AI innovation company. Its core practice is <strong>AI Innovation</strong> — delivered through the practical application of AI to problems, products, capabilities and organizations.</p>
            <p style={{ margin: '16px 0 0' }}>Around that core sit two further domains: <Link href='/partnerships'>Partnerships</Link>, work built with others rather than for them, and <Link href='/public-policy'>Public Policy</Link>, for the institutions deciding how AI arrives in public life.</p>
            <p style={{ margin: '16px 0 0' }}>Build from where we stand; connect to what the work needs.</p>
          </div>
        </div>
      </section>
      <section id='garden' aria-label='The capability garden' className='sec'>
        <div className='container' style={{ paddingTop: 88, paddingBottom: 96 }}>
          <p className='mlabel'>THE CAPABILITY GARDEN · NINE OFFERINGS, THREE DOMAINS</p>
          <h2 className='h-sec'>What Witamala offers</h2>
          <p className='lead' style={{ maxWidth: '56ch', marginBottom: 48 }}>Select an offering. Its explanation and its next step update in place — nothing navigates away until you choose to.</p>
          <Garden />
        </div>
      </section>
      <section aria-label='What remains' className='sec'>
        <div className='container g2' style={{ paddingTop: 72, paddingBottom: 72, alignItems: 'center' }}>
          <p style={{ margin: 0, font: '500 26px/1.4 var(--serif)', maxWidth: '22ch' }}>A mission is incomplete if the useful result leaves alone.</p>
          <div>
            {[['REMAINS 1', 'A working result', 'the problem is actually resolved.'], ['REMAINS 2', 'A reusable system', 'the way it was resolved is kept.'], ['REMAINS 3', 'Independent capability', 'the people who can do it again.']].map((r, i) => (
              <p key={r[0]} style={{ margin: 0, padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(127,97,24,.35)' : 'none', fontSize: 16 }}>
                <span style={{ font: '500 12px/1 var(--mono)', color: 'var(--bronze)', marginRight: 14 }}>{r[0]}</span><strong>{r[1]}</strong> — {r[2]}
              </p>))}
          </div>
        </div>
      </section>
      <section aria-label='Evidence' className='sec'>
        <div className='container py'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
            <div><p className='mlabel'>EVIDENCE</p>
              <h2 className='h-sec'>Recent writing, with provenance</h2>
              <p className='lead' style={{ maxWidth: '58ch' }}>There are no client cases yet, and nothing here implies otherwise. What exists is written down, dated and attributed — including work that predates Witamala.</p></div>
            <Link href='/blog' style={{ font: '700 15px/1 var(--sans)', whiteSpace: 'nowrap' }}>All posts →</Link>
          </div>
          <div className='g3'>
            {F.posts.map((p) => (
              <Link key={p.slug} href={'/blog/' + p.slug} className='card ecard'>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                  <span style={{ font: '500 12px/1 var(--mono)', color: 'rgba(38,33,25,.65)' }}>{p.date}</span>
                  <span className={'chip ' + (p.attribution === 'witamala' ? 'chip--wit' : 'chip--prior')}>{chipText(p.attribution)}</span>
                </span>
                <span style={{ font: '500 20px/1.3 var(--serif)' }}>{p.title}</span>
                <span style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(38,33,25,.75)' }}>{p.challenge}</span>
                <span style={{ marginTop: 'auto', font: '500 11px/1.5 var(--mono)', letterSpacing: '.08em', color: 'var(--bronze)' }}>MAPS TO: {p.offering.toUpperCase()}</span>
              </Link>))}
          </div>
        </div>
      </section>
      <section aria-label='Institutional and cultural model' className='model'>
        <div className='container' style={{ paddingTop: 88, paddingBottom: 92 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 32, flexWrap: 'wrap', marginBottom: 48 }}>
            <p className='mlabel mlabel--gold' style={{ margin: 0 }}>THE INSTITUTIONAL AND CULTURAL MODEL</p>
            <p style={{ margin: 0, font: 'italic 500 20px/1.4 var(--serif)', color: 'rgba(245,236,220,.9)' }}>Leaving the power to create where the work lives.</p>
          </div>
          <div className='g4'>
            {[['Brazil–Mekong formation', 'One company on two shores — Bangkok in the Mekong, Florianópolis in Brazil. Knowledge moves along the axis; capability accumulates at both ends.'],
              ['Local ownership', 'Work is structured so the people closest to the problem end up owning the result — the system, the routine and the decision.'],
              ['Generous AI', 'AI applied so the power to create accumulates where the work lives — not where the tooling was made.'],
              ['Guild & Commons', 'A guild of practitioners around a commons of methods and artifacts. What one engagement learns, the commons keeps.']].map((m) => (
              <div key={m[0]}><h3>{m[0]}</h3><p>{m[1]}</p></div>))}
          </div>
        </div>
      </section>
      <section aria-label='Start a conversation'>
        <div className='container g2' style={{ paddingTop: 88, paddingBottom: 96 }}>
          <div>
            <p className='mlabel'>START A CONVERSATION</p>
            <h2 style={{ margin: '0 0 14px', font: '500 36px/1.18 var(--serif)', letterSpacing: '-.01em' }}>Begin before you know which offering you need</h2>
            <p className='lead' style={{ maxWidth: '52ch' }}>A first brief, in your own words. It lives on this device and nothing is sent by typing here — you complete it deliberately, in <Link href='/contact'>Contact</Link>, when it says what you mean.</p>
          </div>
          <BriefBox />
        </div>
      </section>
    </div>
  );
}
