'use client';
import { useEffect, useRef, useState } from 'react';
import { F } from '@/lib/facts';
import Threads from './Threads';
import Mewi from './Mewi';
import { useMotion } from './MotionProvider';

const EMPTY = { name: '', org: '', email: '', offering: '', challenge: '' };
const STAGES = ['ACKNOWLEDGED', 'VALIDATING', 'WORKING', 'CONFIRMED', 'INSCRIBED', 'SETTLED'];
const IDX = { idle: -1, ack: 0, validating: 1, failed: 1, working: 2, confirmed: 3, inscribed: 4, settled: 5 };

export default function ContactForm() {
  const [motion] = useMotion();
  const [form, setForm] = useState(EMPTY);
  const [stage, setStage] = useState('idle');
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState(null);
  const [bloom, setBloom] = useState(false);
  const [shut, setShut] = useState(false);
  const [copied, setCopied] = useState(false);
  const [restored, setRestored] = useState(false);
  const [sideGate, setSideGate] = useState(false);
  const timers = useRef([]);
  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem('wt.contact.draft') || 'null'); if (d) { setForm({ ...EMPTY, ...d }); if (d.name || d.email || d.challenge) setRestored(true); } } catch (e) {}
    try { const r = JSON.parse(localStorage.getItem('wt.contact.record') || 'null'); if (r) setRecord(r); } catch (e) {}
    try { setSideGate(sessionStorage.getItem('wt.seenHome') !== '1'); } catch (e) {}
    return () => timers.current.forEach(clearTimeout);
  }, []);
  const upd = (k) => (e) => { const next = { ...form, [k]: e.target.value }; setForm(next); try { localStorage.setItem('wt.contact.draft', JSON.stringify(next)); } catch (err) {} };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const briefText = (f) => 'WITAMALA — FIRST BRIEF\nDATE: ' + new Date().toISOString().slice(0, 10) + '\nFROM: ' + f.name + (f.org ? ' (' + f.org + ')' : '') + '\nREACH: ' + f.email + '\nOFFERING CONTEXT: ' + (f.offering || 'Not sure yet') + '\n\nCHALLENGE:\n' + f.challenge;
  const submit = (e) => {
    e.preventDefault();
    if (['ack', 'validating', 'working', 'confirmed', 'inscribed'].includes(stage)) return;
    const quiet = motion === 'quiet' || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
    setStage('ack'); setMsg('Received.');
    later(() => { setStage('validating'); setMsg('Validating on this device — nothing has been sent.');
      later(() => {
        const er = {};
        if (!form.name.trim()) er.name = 'Add a name — a conversation needs someone to talk to.';
        if (!/.+@.+\..+/.test(form.email.trim())) er.email = 'This address does not look reachable — check it.';
        if (!form.challenge.trim()) er.challenge = 'Say something about the challenge — one honest sentence is enough.';
        if (Object.keys(er).length) { setStage('failed'); setErrors(er); setMsg('Validation stopped. Your words are intact.');
          requestAnimationFrame(() => { const id = er.name ? 'wt-name' : er.email ? 'wt-email' : 'wt-challenge'; const el = document.getElementById(id); if (el) el.focus(); });
          return; }
        setErrors({}); setStage('working'); setMsg('Composing your brief — device-local, nothing leaves.');
        later(() => { setStage('confirmed'); setMsg('Brief composed.');
          later(() => {
            const rec = { when: new Date().toISOString().slice(0, 10), text: briefText(form) };
            try { localStorage.setItem('wt.contact.record', JSON.stringify(rec)); } catch (err) {}
            setRecord(rec); setStage('inscribed'); setBloom(!quiet); setMsg('Inscribed — recorded on this device.');
            later(() => { setStage('settled'); setBloom(false); }, quiet ? 250 : 1900);
          }, 550);
        }, 650);
      }, 300);
    }, 110);
  };
  const idx = IDX[stage];
  const offerings = ['Not sure yet', ...F.domains.flatMap((d) => d.offerings.map((o) => o.name))];
  const fieldCls = (k) => 'field' + (errors[k] ? ' field--err' : '');
  return (<>
    <div className='artband' aria-hidden='true'><Threads w={1240} h={96} flow={stage === 'working' || stage === 'confirmed'} straight={stage === 'inscribed' || stage === 'settled'} bloom={bloom} /></div>
    <div className='container' style={{ paddingTop: 56, paddingBottom: 96 }}>
      <p className='mlabel'>CONTACT · A FIRST BRIEF, NOT A FORM</p>
      <h1 className='h-page'>Discuss a challenge</h1>
      {sideGate && <p style={{ margin: '0 0 6px', font: '500 12px/1.7 var(--mono)', color: 'var(--bronze)' }}>YOU CAME STRAIGHT THROUGH THE SIDE GATE — GOOD. THE BRIEF STARTS HERE.</p>}
      <p className='lead' style={{ maxWidth: '60ch' }}>Write it in your own words — you do not need to know which offering you need. Everything below lives on this device until you deliberately complete it.</p>
      <div className='g2' style={{ gridTemplateColumns: '1.15fr .85fr', marginTop: 48 }}>
        <form onSubmit={submit} noValidate aria-describedby='stage-status'>
          {restored && stage === 'idle' && <p style={{ margin: '0 0 20px', font: '500 11.5px/1.6 var(--mono)', letterSpacing: '.06em', color: 'var(--jade)' }}>DRAFT RESTORED FROM THIS DEVICE · RESUME WHERE YOU LEFT OFF</p>}
          <div className='g2 g2k' style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div><label htmlFor='wt-name' className='flabel'>Your name</label>
              <input id='wt-name' type='text' value={form.name} onChange={upd('name')} onFocus={() => setShut(true)} onBlur={() => setShut(false)} className={fieldCls('name')} />
              {errors.name && <p role='alert' className='ferr'>{errors.name}</p>}</div>
            <div><label htmlFor='wt-org' className='flabel'>Organization <span style={{ fontWeight: 400, color: 'rgba(38,33,25,.55)' }}>— optional</span></label>
              <input id='wt-org' type='text' value={form.org} onChange={upd('org')} onFocus={() => setShut(true)} onBlur={() => setShut(false)} className='field' /></div>
          </div>
          <div className='g2 g2k' style={{ gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
            <div><label htmlFor='wt-email' className='flabel'>Where to reach you</label>
              <input id='wt-email' type='email' value={form.email} onChange={upd('email')} onFocus={() => setShut(true)} onBlur={() => setShut(false)} placeholder='name@organization.org' className={fieldCls('email')} />
              {errors.email && <p role='alert' className='ferr'>{errors.email}</p>}</div>
            <div><label htmlFor='wt-off' className='flabel'>Offering, if you already know</label>
              <select id='wt-off' value={form.offering || 'Not sure yet'} onChange={upd('offering')} className='field'>
                {offerings.map((o) => <option key={o} value={o}>{o}</option>)}
              </select></div>
          </div>
          <div style={{ marginTop: 20 }}><label htmlFor='wt-challenge' className='flabel'>The challenge, in your own words</label>
            <textarea id='wt-challenge' rows={7} value={form.challenge} onChange={upd('challenge')} onFocus={() => setShut(true)} onBlur={() => setShut(false)} placeholder='What should become true — and what makes that difficult now?' className={fieldCls('challenge')} />
            {errors.challenge && <p role='alert' className='ferr'>{errors.challenge}</p>}</div>
          {stage === 'failed' && (
            <div style={{ marginTop: 22, border: '1px solid var(--guava)', background: 'rgba(144,77,76,.07)', padding: '16px 20px' }}>
              <p style={{ margin: 0, font: '600 13px/1.6 var(--sans)', color: 'var(--guava)' }}>The brief is intact — nothing was lost. Fix the fields marked above and complete it again.</p>
            </div>)}
          {stage !== 'settled' ? (<>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
              <button type='submit' className={'btn btn--mah' + (stage === 'ack' ? ' btn--pressed' : '')}>
                {{ idle: 'Complete the brief', ack: 'Received…', validating: 'Validating…', failed: 'Complete the brief again', working: 'Working…', confirmed: 'Confirmed', inscribed: 'Inscribed' }[stage]}
              </button>
              <ol aria-hidden='true' className='stagebar'>
                {STAGES.map((s, i2) => <li key={s} className={i2 < idx ? 'done' : i2 === idx ? (stage === 'failed' ? 'fail' : 'cur') : ''}>{s}</li>)}
              </ol>
            </div>
            <p id='stage-status' aria-live='assertive' className='status'>{msg}</p>
          </>) : (
            <div className='night' style={{ marginTop: 28, padding: '28px 32px' }}>
              <div className='gline' style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', paddingBottom: 14, flexWrap: 'wrap' }}>
                <p style={{ margin: 0, font: '600 13px/1 var(--mono)', letterSpacing: '.16em', color: 'var(--gold)' }}>INSCRIBED · {record && record.when}</p>
                <p style={{ margin: 0, font: '500 12px/1 var(--mono)', color: 'var(--jade)', background: 'var(--ivory)', padding: '6px 10px', borderRadius: 2 }}>SETTLED · KEPT ON THIS DEVICE</p>
              </div>
              <p style={{ margin: '18px 0 0', fontSize: 15, lineHeight: 1.7, color: 'rgba(245,236,220,.92)' }}>Your brief is composed and recorded on this device. Until a sending route is published, carry it to the conversation yourself — copy it below.</p>
              <pre className='briefpre'>{record && record.text}</pre>
              <div style={{ display: 'flex', gap: 14, marginTop: 20, flexWrap: 'wrap' }}>
                <button type='button' className='btn btn--gold' style={{ padding: '12px 18px', fontSize: 13.5 }} onClick={() => { try { navigator.clipboard.writeText(record ? record.text : ''); } catch (e2) {} setCopied(true); setTimeout(() => setCopied(false), 1600); }}>{copied ? 'Copied ✓' : 'Copy the brief'}</button>
                <button type='button' className='btn btn--ghostd' style={{ padding: '12px 18px', fontSize: 13.5 }} onClick={() => { const next = { ...form, offering: '', challenge: '' }; setForm(next); setStage('idle'); setMsg(''); setErrors({}); setRestored(false); try { localStorage.setItem('wt.contact.draft', JSON.stringify(next)); } catch (e2) {} }}>Start another</button>
                <button type='button' onClick={() => { if (!window.confirm('Remove the draft, the record and nothing else from this device?')) return; try { localStorage.removeItem('wt.contact.draft'); localStorage.removeItem('wt.contact.record'); } catch (e2) {} setForm(EMPTY); setRecord(null); setStage('idle'); setMsg(''); setErrors({}); setRestored(false); }} style={{ background: 'none', border: 'none', color: 'rgba(245,236,220,.65)', font: '500 13px/1 var(--sans)', padding: '12px 4px', cursor: 'pointer', textDecoration: 'underline' }}>Clear everything from this device</button>
              </div>
            </div>)}
        </form>
        <aside>
          <div className='card'>
            <p className='mlabel mlabel--sm' style={{ letterSpacing: '.14em', marginBottom: 14 }}>WHAT HAPPENS WHEN YOU COMPLETE IT</p>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: 'rgba(38,33,25,.9)' }}>The brief moves through named stages — acknowledged, validating, working, confirmed, inscribed, settled — each one visible as it happens. Nothing is silent and nothing generic loads. If a stage fails, your words stay exactly where they are.</p>
          </div>
          <div className='card' style={{ marginTop: 14 }}>
            <p style={{ margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 10 }}><Mewi shut={shut} /><span className='mlabel mlabel--sm' style={{ letterSpacing: '.14em', margin: 0 }}>MEWI · THE PRIVACY BOUNDARY</span></p>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: 'rgba(38,33,25,.9)' }}>{shut ? 'A private field has focus. Mewi is turned away — what you type is stored on this device and nowhere else.' : 'This draft is device-local. Completing it composes a brief you carry to the conversation; it does not transmit anything.'}</p>
          </div>
          <div className='card' style={{ marginTop: 14 }}>
            <p className='mlabel mlabel--sm' style={{ letterSpacing: '.14em', marginBottom: 10 }}>WHAT THIS PAGE CAN SEE</p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(38,33,25,.9)' }}>The fields you type in this browser, the offering you explicitly select, and a device-local saved draft. Nothing else — no camera, microphone or cursor tracking, no external profiles, no remote AI model. Mewi is a visual reminder, not a claim of awareness.</p>
            <p style={{ margin: '12px 0 0', fontSize: 13, lineHeight: 1.65, color: 'rgba(38,33,25,.65)' }}>Local browser storage is convenient, not a secure vault — another person using this browser profile could read the draft.</p>
          </div>
          <p style={{ margin: '18px 0 0', font: '400 12px/1.8 var(--mono)', color: 'rgba(38,33,25,.6)' }}>NO ACCOUNT · NO COOKIES BEYOND YOUR OWN PREFERENCES · NO ANALYTICS</p>
        </aside>
      </div>
    </div>
  </>);
}
