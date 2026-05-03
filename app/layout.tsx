// APP ROUTER root layout — Server Component.
// PHASE 6: Removed MUI ThemeRegistry (no more Emotion/CSS-in-JS).
//           Added globals.css import (Tailwind CSS handles all styling now).
//           Fonts still loaded via next/font — unchanged.

import React from 'react';
import Script from 'next/script';
import { Roboto } from 'next/font/google';
import './globals.css';

// next/font loads Roboto at build time from the same origin — no external Google Fonts request
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: 'SportCalculators',
  description: 'Mobile-Friendly collection of sports related calculators.',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // roboto.variable injects --font-roboto CSS variable used by globals.css --font-sans
    <html lang="en" className={roboto.variable}>
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
        <meta name="theme-color" content="#3f51b5" />
      </head>
      <body>
        {/* Google Analytics — afterInteractive loads after page paint, not blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E4G47HWPM0"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E4G47HWPM0');
        `}</Script>

        {/* AdSense — afterInteractive so it doesn't block first paint */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client="ca-pub-3093798853216759"
          strategy="afterInteractive"
        />

        {/* Restore page interactivity after AdSense vignette/interstitial ads are dismissed.
            These ads can leave pointer-events or overflow locked on the body on mobile. */}
        <Script id="ad-restore" strategy="afterInteractive">{`
          function restorePage() {
            document.body.style.removeProperty('pointer-events');
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
          }
          window.addEventListener('focus', restorePage);
          document.addEventListener('visibilitychange', function() {
            if (!document.hidden) restorePage();
          });
        `}</Script>

        {children}
      </body>
    </html>
  );
}
