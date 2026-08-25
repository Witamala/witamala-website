import Link from 'next/link';
import { notFound } from 'next/navigation';
import { F } from '@/lib/facts';

export default function DomainPage({ slug }) {
  const dom = F.domains.find((d) => d.slug === slug);
  if (!dom) notFound();
  const others = F.domains.filter((d) => d !== dom);
  const counts = ['', 'ONE', 'TWO', 'THREE', 'FOUR'];
  return (
    <div>
      <section className='hero'>
        <div className='container' style={{ paddingTop: 72, paddingBottom: 56 }}>
          <p className='mlabel mlabel--gold' style={{ marginBottom: 18 }}>DOMAIN {dom.num} OF 03 · {counts[dom.offerings.length]} OFFERINGS</p>
          <h1 className='h-dom'>{dom.name}</h1>
          <p style={{ margin: '16px 0 0', font: 'italic 500 21px/1.4 var(--serif)', color: 'rgba(245,236,220,.88)' }}>{dom.bridge}</p>
        </div>
      </section>
      <div className='container' style={{ paddingTop: 64, paddingBottom: 96 }}>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, maxWidth: '62ch' }}>{dom.intro}</p>
        {dom.note && (
          <div className='focusnote' style={{ marginTop: 36 }}>
            <p className='mlabel mlabel--sm' style={{ letterSpacing: '.14em', marginBottom: 8 }}>FOCUS, STATED</p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>{dom.note}</p>
          </div>)}
        <div style={{ marginTop: 64, borderTop: '1px solid rgba(38,33,25,.2)' }}>
          {dom.offerings.map((o, i) => (
            <article key={o.name} id={'off-' + (i + 1)} className='g2' style={{ gridTemplateColumns: '.9fr 1.6fr', gap: 48, padding: '44px 0', borderBottom: '1px solid var(--hair2)' }}>
              <div>
                <p style={{ margin: '0 0 10px', font: '500 12px/1 var(--mono)', color: 'var(--bronze)' }}>OFFERING {i + 1}</p>
                <h2 style={{ margin: 0, font: '500 30px/1.2 var(--serif)', letterSpacing: '-.01em', maxWidth: '14ch' }}>{o.name}</h2>
              </div>
              <div>
                <p style={{ margin: 0, font: '600 17px/1.6 var(--sans)' }}>{o.def}</p>
                <p className='kv-label' style={{ margin: '20px 0 6px' }}>WHAT YOU RECEIVE</p>
                <p className='kv' style={{ fontSize: 15.5, lineHeight: 1.68 }}>{o.receive}</p>
                <p className='kv-label' style={{ margin: '18px 0 6px' }}>HOW IT RELATES TO THE OTHERS</p>
                <p className='kv' style={{ fontSize: 15.5, lineHeight: 1.68 }}>{o.relates}</p>
              </div>
            </article>))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, marginTop: 56, flexWrap: 'wrap' }}>
          <Link href='/contact' className='btn btn--mah'>Start a conversation about {dom.name}</Link>
          <nav aria-label='Other domains' style={{ display: 'flex', gap: 24 }}>
            {others.map((d) => <Link key={d.slug} href={'/' + d.slug} style={{ font: '600 14px/1 var(--sans)', color: 'var(--char)' }}>{d.name} →</Link>)}
          </nav>
        </div>
      </div>
    </div>
  );
}
