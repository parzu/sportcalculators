// APP ROUTER: Replaces pages/about.tsx. File at app/about/page.tsx → route: /about
// This is a Server Component — pure static content, no interactivity needed.
// No 'use client' needed. No Layout wrapper needed (root layout.tsx handles that).

import React from 'react';
import Link from 'next/link';
import AdSenseWidget from '../../../components/AdSenseWidget';

// APP ROUTER: metadata export replaces <Head><title>About | SportCalculators</title></Head>
export const metadata = {
  title: 'About | SportCalculators',
};

export default function About() {
  return (
    <>
      <h2 className="calculator">About</h2>
      <p>
        SportCalculators.com is the place for all your sport related calculations.
        We know that you are more interested in the sport you are doing than
        calculations it requires. So are we.
      </p>
      <p>
        We are constantly looking for calculations needed in various sports so
        that we can make a calculator and ease your life. If you know any
        calculator that is missing from our site, <Link href="/contact">contact</Link> us and let us
        know.
      </p>
      <p>
        Even though we have checked all the calculators countless times, we cannot
        guarantee that they are flawless. We hope you understand. If you find any
        errors from the calculators, please <Link href="/contact">let us know</Link>.
      </p>
      <p>Thank you for visiting and welcome again!</p>
      <AdSenseWidget />
    </>
  );
}
