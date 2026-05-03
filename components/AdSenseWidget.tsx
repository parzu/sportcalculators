'use client';

import { useEffect, useRef } from 'react';

export default function AdSenseWidget() {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (insRef.current?.getAttribute('data-adsbygoogle-status')) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-3093798853216759"
      data-ad-slot="6870568097"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
