'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const MotionCtx = createContext(['balanced', () => {}]);
export const useMotion = () => useContext(MotionCtx);

export default function MotionProvider({ children }) {
  const [motion, setMotionState] = useState('balanced');
  useEffect(() => {
    let m = null;
    try { m = localStorage.getItem('wt.pref.motion'); } catch (e) {}
    if (!m && typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) m = 'quiet';
    if (m) setMotionState(m);
  }, []);
  const setMotion = (m) => { setMotionState(m); try { localStorage.setItem('wt.pref.motion', m); } catch (e) {} };
  return (
    <MotionCtx.Provider value={[motion, setMotion]}>
      <div data-motion={motion} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>{children}</div>
    </MotionCtx.Provider>
  );
}
