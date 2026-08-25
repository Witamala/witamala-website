'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Mewi from './Mewi';

export default function BriefBox() {
  const [val, setVal] = useState('');
  const [shut, setShut] = useState(false);
  useEffect(() => { try { const d = JSON.parse(localStorage.getItem('wt.contact.draft') || '{}'); if (d.challenge) setVal(d.challenge); } catch (e) {} }, []);
  const save = (v) => { setVal(v); try { const d = JSON.parse(localStorage.getItem('wt.contact.draft') || '{}'); d.challenge = v; localStorage.setItem('wt.contact.draft', JSON.stringify(d)); } catch (e) {} };
  return (
    <div>
      <label htmlFor='wt-brief' className='flabel' style={{ marginBottom: 10 }}>Describe the challenge in your own words</label>
      <textarea id='wt-brief' rows={5} value={val} onChange={(e) => save(e.target.value)} onFocus={() => setShut(true)} onBlur={() => setShut(false)}
        placeholder='What should become true — and what makes that difficult now?' className='field' />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mewi shut={shut} />
          <span style={{ font: '500 11px/1.5 var(--mono)', letterSpacing: '.06em', color: 'rgba(38,33,25,.65)' }}>{shut ? 'MEWI: NOT READING · THIS FIELD IS YOURS' : (val ? 'DRAFT SAVED ON THIS DEVICE · NOT SENT' : 'MEWI KEEPS THIS DEVICE-LOCAL')}</span>
        </span>
        <Link href='/contact' style={{ font: '700 14px/1 var(--sans)' }}>Continue in Contact →</Link>
      </div>
    </div>
  );
}
