'use client';
import { useEffect } from 'react';
export default function SeenHome() {
  useEffect(() => { try { sessionStorage.setItem('wt.seenHome', '1'); } catch (e) {} }, []);
  return null;
}
