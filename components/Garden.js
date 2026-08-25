'use client';
import Link from 'next/link';
import { useState } from 'react';
import { F } from '@/lib/facts';

export default function Garden() {
  const [sel, setSel] = useState(null); // [domainIdx, offeringIdx]
  const cur = sel ? { d: F.domains[sel[0]], o: F.domains[sel[0]].offerings[sel[1]] } : null;
  return (
    <div className='g2 g2--tight'>
      <div className='ggroups'>
        {F.domains.map((d, di) => (
          <div key={d.slug}>
            <p style={{ margin: '0 0 16px' }}>
              <span style={{ display: 'block', font: '500 11px/1 var(--mono)', letterSpacing: '.14em', color: 'var(--bronze)', marginBottom: 6 }}>DOMAIN {d.num}</span>
              <Link href={'/' + d.slug} style={{ font: '700 15px/1.2 var(--sans)', color: 'var(--char)', textDecoration: 'none' }}>{d.name}</Link>
            </p>
            <div className='nlist'>
              {d.offerings.map((o, oi) => {
                const on = sel != null && sel[0] === di && sel[1] === oi;
                return (
                  <button key={o.name} type='button' className={'gnode' + (on ? ' on' : '')} aria-pressed={on}
                    onClick={() => setSel(on ? null : [di, oi])}>
                    <span className='dot' /><span>{o.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div aria-live='polite' className='gpanel'>
        {cur ? (<>
          <p className='mlabel mlabel--sm' style={{ margin: '0 0 14px', lineHeight: 1.5 }}>{(cur.d.name + ' · OFFERING ' + (sel[1] + 1) + ' OF ' + cur.d.offerings.length).toUpperCase()}</p>
          <h3 style={{ margin: 0, font: '500 28px/1.2 var(--serif)' }}>{cur.o.name}</h3>
          <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.65 }}>{cur.o.def}</p>
          <p className='kv-label'>WHAT YOU RECEIVE</p><p className='kv'>{cur.o.receive}</p>
          <p className='kv-label' style={{ marginTop: 18 }}>HOW IT RELATES</p><p className='kv'>{cur.o.relates}</p>
          <div style={{ display: 'flex', gap: 20, marginTop: 26, flexWrap: 'wrap' }}>
            <Link href={'/' + cur.d.slug} style={{ font: '700 14px/1 var(--sans)' }}>Read it in {cur.d.name} →</Link>
            <Link href='/contact' style={{ font: '600 14px/1 var(--sans)', color: 'var(--char)' }}>Start here →</Link>
          </div>
        </>) : (<>
          <p className='mlabel mlabel--sm' style={{ margin: '0 0 14px' }}>NOTHING SELECTED YET</p>
          <h3 style={{ margin: 0, font: '500 28px/1.2 var(--serif)' }}>Nine offerings, one practice</h3>
          <p style={{ margin: '14px 0 0', fontSize: 15.5, lineHeight: 1.7, color: 'rgba(38,33,25,.88)' }}><strong>AI Innovation</strong> applies AI to a problem, a product, a capability or an organization. <strong>Partnerships</strong> builds ventures, ecosystems and communities alongside others. <strong>Public Policy</strong> serves the institutions deciding how AI reaches public life.</p>
          <p style={{ margin: '16px 0 0', fontSize: 15.5, lineHeight: 1.7, color: 'rgba(38,33,25,.7)' }}>Select a node on the left to read one in place.</p>
        </>)}
      </div>
    </div>
  );
}
