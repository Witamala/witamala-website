import Link from 'next/link';
import { notFound } from 'next/navigation';
import { F } from '@/lib/facts';

const chipText = (a) => (a === 'witamala' ? 'WITAMALA WORK' : 'PRIOR WORK');

export default function PostPage({ slug }) {
  const post = F.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const prov = [
    ['DATE & LOCATION', post.date + ' · ' + post.loc], ['AUTHOR', post.author],
    ['ORGANIZATION / CONTEXT', post.org], ["AUTHOR'S ROLE", post.role], ['CHALLENGE', post.challenge],
    ['MAPS TO OFFERING', post.offering + ' — ' + post.domainName], ['METHOD', post.method],
    ['OUTPUT', post.output], ['RESULT / STATUS', post.status], ['SOURCE', post.source],
    ['MEASURED BY', post.measured], ['UNCERTAINTY / LIMITATION', post.uncertainty],
    ['ATTRIBUTION', chipText(post.attribution)], ['PERMISSION / CONFIDENTIALITY', post.permission],
    ['LAST UPDATED', post.updated]];
  return (
    <div className='container' style={{ paddingTop: 56, paddingBottom: 96, maxWidth: 960 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
        <Link href='/blog' style={{ font: '600 14px/1 var(--sans)' }}>← All posts</Link>
        <span className={'chip ' + (post.attribution === 'witamala' ? 'chip--wit' : 'chip--prior')}>{chipText(post.attribution)}</span>
      </div>
      {post.placeholder && <p className='phbanner'>STRUCTURAL PLACEHOLDER — DEMONSTRATES THE SCHEMA. REPLACE BEFORE LAUNCH.</p>}
      <p style={{ margin: '0 0 14px', font: '500 12px/1.7 var(--mono)', color: 'rgba(38,33,25,.65)' }}>{post.date} · {post.loc.toUpperCase()} · LAST UPDATED {post.updated}</p>
      <h1 style={{ margin: 0, font: '500 34px/1.18 var(--serif)', letterSpacing: '-.01em' }}>{post.title}</h1>
      <p style={{ margin: '12px 0 0', font: '600 14px/1.5 var(--sans)', color: 'rgba(38,33,25,.8)' }}>{post.author} — {post.role}</p>
      <div style={{ marginTop: 28, maxWidth: '66ch' }}>
        {post.body.map((b, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75 }}>{b.t}</p>
            {b.c && <a href='#provenance' className='claim'>CLAIM · {b.c.toUpperCase()} · VERIFY IN PROVENANCE ↓</a>}
          </div>))}
      </div>
      <div id='provenance' className='night prov' style={{ marginTop: 40, padding: '32px 34px' }}>
        <div className='gline' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingBottom: 16 }}>
          <p style={{ margin: 0, font: '600 13px/1 var(--mono)', letterSpacing: '.16em', color: 'var(--gold)' }}>PROVENANCE</p>
          <span className={'chip ' + (post.attribution === 'witamala' ? 'chip--wit-d' : 'chip--prior-d')}>{chipText(post.attribution)}</span>
        </div>
        <p style={{ margin: '16px 0 0', font: '600 15px/1.5 var(--sans)' }}>{post.attribution === 'witamala' ? 'This is Witamala work, performed as Witamala.' : 'This work predates Witamala. It was performed by the author under the organization named below, and is shown as evidence of practice — not as Witamala delivery.'}</p>
        <dl>{prov.map((f) => (<div key={f[0]} style={{ display: 'contents' }}><dt>{f[0]}</dt><dd>{f[1]}</dd></div>))}</dl>
      </div>
    </div>
  );
}
