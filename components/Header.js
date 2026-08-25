'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { F } from '@/lib/facts';

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const isOn = (slug) => path === '/' + slug || path.startsWith('/' + slug + '/');
  return (
    <header className='hd'>
      <div className='hd-in'>
        <Link href='/' aria-label='Witamala home'><img src='/brand/logo-horizontal-light.svg' alt='Witamala' /></Link>
        <button type='button' className='burger' onClick={() => setOpen(!open)} aria-expanded={open} aria-controls='mmenu' aria-label='Menu'>
          {open ? <span aria-hidden='true' style={{ font: '600 16px/1 var(--sans)' }}>✕</span>
            : <span className='burger-bars' aria-hidden='true'><span /><span /><span /></span>}
        </button>
        <nav aria-label='Primary' className='nav'>
          {F.nav.map((it) => (
            <Link key={it.slug} href={'/' + it.slug} className={isOn(it.slug) ? 'on' : ''} aria-current={isOn(it.slug) ? 'page' : undefined}>{it.label}</Link>
          ))}
          <Link href='/contact' className='cta'>Discuss a challenge</Link>
        </nav>
      </div>
      {open && (
        <nav id='mmenu' aria-label='Primary, expanded' className='mmenu'>
          {F.nav.map((it) => (
            <Link key={it.slug} href={'/' + it.slug} className={isOn(it.slug) ? 'on' : ''} aria-current={isOn(it.slug) ? 'page' : undefined}>{it.label}</Link>
          ))}
          <div className='mmenu-cta'><Link href='/contact' className='btn btn--mah'>Discuss a challenge</Link></div>
        </nav>
      )}
    </header>
  );
}
