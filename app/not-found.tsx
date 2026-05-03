// APP ROUTER: This replaces pages/404.tsx.
// Next.js automatically uses this file when a route is not found.
// (In Pages Router it was pages/404.tsx; in App Router it's app/not-found.tsx)
// This is a Server Component — no 'use client' needed since there's no interactivity.

import React from 'react';
import Link from 'next/link';
import AdSenseWidget from '../components/AdSenseWidget';

// APP ROUTER: 'export const metadata' sets the page <title> — replaces <Head><title> from old pages
export const metadata = {
  title: '404 | SportCalculators',
};

export default function NotFound() {
  return (
    <>
      <h2 className="calculator">Page Not Found - 404</h2>
      <p>Uups.. Something went wrong. The page you are looking for cannot be found.</p>
      <p>If you typed in the address, please check the spelling.</p>
      <h3>Continue Here</h3>
      <p>You can find the page you are looking for from <Link href="/">the homepage</Link>.</p>
      <AdSenseWidget />
    </>
  );
}
