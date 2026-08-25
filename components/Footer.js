'use client';
import Link from 'next/link';
import { useState } from 'react';
import { F, IDENTITY } from '@/lib/facts';
import { useMotion } from './MotionProvider';

export default function Footer() {
  const [openIdx, setOpenIdx] = useState(null);
  const [motion, setMotion] = useMotion();
  const year = new Date().getFullYear();
  return (
    <footer className='ft'>
      <div className='container' style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap', borderBottom: '1px solid rgba(212,175,55,.35)', paddingBottom: 44 }}>
          <img src='/brand/logo-full.svg' alt='Witamala' style={{ width: 150 }} />
          <div style={{ maxWidth: 520 }}>
            <p style={{ margin: 0, font: '500 24px/1.45 var(--serif)' }}>Forge tools. Open paths. Protect people. Create worlds.</p>
            <p style={{ margin: '18px 0 0', font: '500 11px/1.9 var(--mono)', letterSpacing: '.08em', color: 'var(--gold)' }}>SOFT IN SURFACE · RIGOROUS IN STRUCTURE · ALIVE IN MOTION<br />ETHICAL IN DIRECTION · MEASURABLE IN CONSEQUENCE</p>
          </div>
        </div>
        <div className='g4' style={{ gap: 40, padding: '40px 0', borderBottom: '1px solid rgba(245,236,220,.15)' }}>
          <div><p className='ft-label'>DOMAINS</p><p style={{ margin: 0, font: '400 14px/2.1 var(--sans)' }}>{F.domains.map((d) => (<span key={d.slug}><Link href={'/' + d.slug}>{d.name}</Link><br /></span>))}</p></div>
          <div><p className='ft-label'>COMPANY</p><p style={{ margin: 0, font: '400 14px/2.1 var(--sans)' }}><Link href='/blog'>Blog — the evidence</Link><br /><Link href='/about'>About, approach &amp; careers</Link><br /><Link href='/contact'>Discuss a challenge</Link></p></div>
          <div><p className='ft-label'>WHERE</p><p style={{ margin: 0, font: '400 13px/2 var(--mono)', color: 'rgba(245,236,220,.88)' }}>BANGKOK, THAILAND<br />FLORIANÓPOLIS, BRAZIL</p></div>
          <div><p className='ft-label'>IDENTITY</p><p style={{ margin: 0, font: '400 12px/1.9 var(--mono)', color: 'rgba(245,236,220,.7)' }}>[LEGAL ENTITY · REGISTRATION]<br />[CONTACT ADDRESS]<br />PUBLISH BOTH BEFORE LAUNCH</p></div>
        </div>
        <div className='ft-trust' style={{ padding: '26px 0', borderBottom: '1px solid rgba(245,236,220,.15)' }}>
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'center' }}>
            {F.trust.map((t, i) => (
              <button key={t.label} type='button' className={openIdx === i ? 'on' : ''} aria-expanded={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)}>{t.label}</button>
            ))}
          </div>
          <div aria-live='polite'>{openIdx != null && <p className='trust-body'>{F.trust[openIdx].body}</p>}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, paddingTop: 26, flexWrap: 'wrap' }}>
          <p style={{ margin: 0, font: '400 12.5px/1.6 var(--mono)', color: 'rgba(245,236,220,.6)' }}>© {year} WITAMALA · AUDACITY TO CREATE ON OUR TERMS</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} role='group' aria-label='Experience preference'>
            <span style={{ font: '500 11px/1 var(--mono)', letterSpacing: '.1em', color: 'rgba(245,236,220,.55)' }}>EXPERIENCE</span>
            {['quiet', 'balanced', 'alive'].map((m) => (
              <button key={m} type='button' className={'seg' + (motion === m ? ' on' : '')} aria-pressed={motion === m} onClick={() => setMotion(m)}>{m[0].toUpperCase() + m.slice(1)}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
