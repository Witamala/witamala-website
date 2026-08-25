'use client';
import Link from 'next/link';
import { useState } from 'react';
import { F } from '@/lib/facts';
import EvidenceStandard from './EvidenceStandard';

const chipText = (a) => (a === 'witamala' ? 'WITAMALA WORK' : 'PRIOR WORK');

export default function BlogIndex() {
  const [fD, setFD] = useState('all');
  const [fW, setFW] = useState('all');
  const list = F.posts.filter((p) => (fD === 'all' || p.domainSlug === fD) && (fW === 'all' || p.attribution === fW));
  return (
    <div className='container' style={{ paddingTop: 72, paddingBottom: 96 }}>
      <p className='mlabel'>BLOG · THE EVIDENCE ENGINE</p>
      <h1 className='h-page'>Evidence</h1>
      <p className='lead'>Witamala has no client cases yet, so writing carries the evidence. Every post exposes its provenance — date, role, method, source, uncertainty — and states plainly whether it is Witamala work or work that predates the company.</p>
      <div className='banner' style={{ marginTop: 28 }}><p>THREE STRUCTURAL PLACEHOLDERS SHIP WITH THIS VERSION. REPLACE THEM WITH REAL ACCOUNTS BEFORE LAUNCH — OR CUT THE TAB.</p></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, margin: '44px 0 0', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <div><p className='mlabel mlabel--sm' style={{ color: 'rgba(38,33,25,.6)', marginBottom: 8 }}>DOMAIN</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ k: 'all', label: 'All' }, ...F.domains.map((d) => ({ k: d.slug, label: d.name }))].map((c) => (
                <button key={c.k} type='button' className={'fchip' + (fD === c.k ? ' on' : '')} aria-pressed={fD === c.k} onClick={() => setFD(c.k)}>{c.label}</button>))}
            </div></div>
          <div><p className='mlabel mlabel--sm' style={{ color: 'rgba(38,33,25,.6)', marginBottom: 8 }}>WORK</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ k: 'all', label: 'All' }, { k: 'witamala', label: 'Witamala work' }, { k: 'prior', label: 'Prior work' }].map((c) => (
                <button key={c.k} type='button' className={'fchip' + (fW === c.k ? ' on' : '')} aria-pressed={fW === c.k} onClick={() => setFW(c.k)}>{c.label}</button>))}
            </div></div>
        </div>
        <p style={{ margin: 0, font: '500 12px/1 var(--mono)', color: 'rgba(38,33,25,.6)' }}>{list.length}{list.length === 1 ? ' ENTRY' : ' ENTRIES'} · NEWEST FIRST</p>
      </div>
      <div aria-live='polite' style={{ marginTop: 22, borderTop: '1px solid rgba(38,33,25,.2)' }}>
        {list.length === 1 && <p style={{ margin: '18px 0 0', font: '500 11.5px/1.6 var(--mono)', color: 'rgba(38,33,25,.6)' }}>ONE ENTRY UNDER THIS FILTER — SHOWN ALONE RATHER THAN PADDED.</p>}
        {list.map((p) => (
          <Link key={p.slug} href={'/blog/' + p.slug} className='brow'>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ font: '500 13px/1 var(--mono)', color: 'rgba(38,33,25,.7)' }}>{p.date}</span>
              <span className={'chip ' + (p.attribution === 'witamala' ? 'chip--wit' : 'chip--prior')}>{chipText(p.attribution)}</span>
            </span>
            <span><span style={{ display: 'block', font: '500 23px/1.3 var(--serif)' }}>{p.title}</span>
              <span style={{ display: 'block', marginTop: 8, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(38,33,25,.72)' }}>{p.challenge}</span></span>
            <span className='brow-tag'>{p.offering.toUpperCase()}<br />{p.domainName.toUpperCase()}</span>
          </Link>
        ))}
        {list.length === 0 && (
          <div style={{ padding: '64px 0', textAlign: 'center' }}>
            <div aria-hidden='true' style={{ width: 180, margin: '0 auto 22px', borderTop: '2px dashed rgba(127,97,24,.5)' }} />
            <p style={{ margin: 0, font: '500 22px/1.3 var(--serif)' }}>Nothing under this filter yet.</p>
            <p style={{ margin: '10px auto 0', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(38,33,25,.7)', maxWidth: '44ch' }}>Evidence accrues slowly on purpose — entries appear here when there is something true to show under this combination.</p>
            <button type='button' onClick={() => { setFD('all'); setFW('all'); }} style={{ marginTop: 20, background: 'none', border: '1px solid var(--mah)', color: 'var(--mah)', font: '600 13px/1 var(--sans)', padding: '10px 18px', borderRadius: 2, cursor: 'pointer' }}>Show everything</button>
          </div>
        )}
      </div>
      <EvidenceStandard />
    </div>
  );
}
