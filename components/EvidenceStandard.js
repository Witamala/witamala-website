'use client';
import Link from 'next/link';
import { useState } from 'react';

const EV = [
  { name: 'Intention', q: 'What should change, for whom, and against what baseline?', fields: [['Decision owner', 'REQUIRED'], ['Baseline and date', 'TRACEABLE'], ['Known uncertainty', 'EXPLICIT']] },
  { name: 'Working result', q: 'What now exists that did not exist before?', fields: [['Artifact or operating change', 'NAMED'], ['Author and exact role', 'ATTRIBUTED'], ['Permission boundary', 'STATED']] },
  { name: 'Consequence', q: 'What changed in the real environment, and how is it measured?', fields: [['Literal result', 'EXPLICIT'], ['Measurement method', 'STATED'], ['Limitation', 'ADMITTED']] },
  { name: 'Retained capacity', q: 'Who can continue without us, and with what system?', fields: [['Capability holder', 'NAMED'], ['Reusable system', 'KEPT'], ['Last verified', 'DATED']] }
];

export default function EvidenceStandard() {
  const [i, setI] = useState(0);
  const st = EV[i];
  return (
    <section aria-label='The evidence standard' style={{ marginTop: 72, borderTop: '1px solid rgba(38,33,25,.2)', paddingTop: 44 }}>
      <p className='mlabel'>THE EVIDENCE STANDARD</p>
      <h2 className='h-sec'>Every result keeps its source attached</h2>
      <p className='lead' style={{ maxWidth: '56ch', marginBottom: 36 }}>The metaphor never replaces the record. Select a stage to inspect the literal information that must remain visible in every account published here.</p>
      <div className='g2 g2--tight'>
        <div className='nlist'>
          {EV.map((s, j) => (
            <button key={s.name} type='button' className={'gnode' + (j === i ? ' on' : '')} aria-pressed={j === i} onClick={() => setI(j)} style={{ padding: '11px 8px 11px 0' }}>
              <span className='dot' /><span><span style={{ font: '500 11px/1 var(--mono)', color: 'var(--bronze)', marginRight: 10 }}>0{j + 1}</span>{s.name}</span>
            </button>
          ))}
        </div>
        <div aria-live='polite' className='night' style={{ padding: '30px 34px' }}>
          <p className='mlabel mlabel--sm mlabel--gold' style={{ letterSpacing: '.14em', marginBottom: 8 }}>EVIDENCE QUESTION · STAGE 0{i + 1} OF 04</p>
          <h3 style={{ margin: 0, font: '500 24px/1.25 var(--serif)' }}>{st.name}</h3>
          <p style={{ margin: '12px 0 0', font: '600 15.5px/1.55 var(--sans)', color: 'rgba(245,236,220,.95)' }}>{st.q}</p>
          <dl style={{ margin: '20px 0 0' }}>
            {st.fields.map((f) => (<div key={f[0]} className='nrow'><dt>{f[0]}</dt><dd>{f[1]}</dd></div>))}
          </dl>
          <p style={{ margin: '18px 0 0', font: '400 11.5px/1.7 var(--mono)', color: 'rgba(245,236,220,.55)' }}>SOURCE: WITAMALA EVIDENCE STANDARD · UPDATED 2026-08-25 · AN OPERATING-MODEL RECORD, NOT A CLIENT OUTCOME</p>
        </div>
      </div>
      <div className='g2 g2--tight' style={{ marginTop: 64, borderTop: '1px solid var(--hair2)', paddingTop: 40 }}>
        <div>
          <h3 style={{ margin: '0 0 12px', font: '500 26px/1.25 var(--serif)' }}>Consent before theatre.</h3>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: 'rgba(38,33,25,.9)' }}>No client case result is published here without permission, provenance and enough context to interpret it. The silence will not be filled with invented percentages or anonymous transformation claims.</p>
        </div>
        <div className='card'>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <p style={{ margin: 0, font: '600 15px/1.3 var(--sans)' }}>Public case lineages</p>
            <p className='chip chip--prior' style={{ margin: 0 }}>PREPARING WITH CONSENT</p>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: 'rgba(38,33,25,.75)' }}>When a record is ready, it will state:</p>
          <p style={{ margin: '10px 0 0', font: '400 13px/2 var(--mono)', color: 'rgba(38,33,25,.85)' }}>— BASELINE AND INTENDED CHANGE<br />— WORKING ARTIFACT OR OPERATING CHANGE<br />— OBSERVED CONSEQUENCE AND LIMITATIONS<br />— CAPABILITY AND SYSTEM RETAINED</p>
        </div>
      </div>
      <div className='g3' style={{ marginTop: 56 }}>
        {[['3', 'domains', <span key='a'>AI Innovation, Partnerships, Public Policy.</span>],
          ['9', 'offerings', <span key='b'>Defined in the <Link href='/'>capability garden</Link>.</span>],
          ['4', 'approach stages', <span key='c'>Diagnosis, Direction, Build, Transfer — in <Link href='/about'>About</Link>.</span>]].map((c) => (
          <div key={c[1]} className='card' style={{ padding: '24px 28px' }}>
            <p style={{ margin: 0, font: '500 40px/1 var(--serif)', color: 'var(--mah)' }}>{c[0]}</p>
            <p style={{ margin: '8px 0 0', font: '600 14px/1.4 var(--sans)' }}>{c[1]}</p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(38,33,25,.7)' }}>{c[2]}</p>
          </div>
        ))}
      </div>
      <p className='src' style={{ margin: '14px 0 0' }}>SOURCE: THIS SITE'S PUBLISHED OPERATING MODEL · UPDATED 2026-08-25 · THESE COUNTS DESCRIBE STRUCTURE, NOT EFFICACY</p>
    </section>
  );
}
