'use client';
// Mewi is a privacy affordance, not mascot theatre: the eye closes while a private field has focus.
export default function Mewi({ shut }) {
  return (<span aria-hidden='true' className={'mewi' + (shut ? ' shut' : '')}><i /></span>);
}
