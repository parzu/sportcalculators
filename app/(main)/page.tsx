// PHASE 6: Homepage rebuilt as a Server Component (removed 'use client').
// Old: MUI Grid + Card + CardActionArea + Typography — all client-side hydration
// New: Tailwind CSS grid + shadcn Card — static HTML, zero JS for the homepage shell

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import { calculators } from '../../src/calculators';
import type { CalculatorEntry, SportEntry } from '../../src/calculators';
import AdSenseWidget from '../../components/AdSenseWidget';

// APP ROUTER: metadata replaces <Head><title> from old Pages Router
export const metadata = {
  title: 'SportCalculators',
  description: 'Mobile-Friendly collection of sports related calculators. Calculators for bowling, cycling, running, decathlon, heptathlon and many more.',
};

// TAILWIND: Each calculator becomes a Card that links to its route.
// Old: MUI CardActionArea wrapping a CardHeader with avatar icon
// New: shadcn Card wrapping a Link — cleaner, faster, no client JS
function CalculatorCard({ calc, icon }: { calc: CalculatorEntry; icon: React.ReactNode }) {
  return (
    // group: enables group-hover utilities on children
    <Link href={`/${calc.href}`} className="group block no-underline">
      <Card className="h-full transition-shadow hover:shadow-md">
        {/* CardHeader with icon avatar + calculator title — mirrors old layout */}
        <CardHeader className="flex flex-row items-center gap-3 p-3">
          {/* Icon — colored with primary color */}
          <span className="text-primary shrink-0">{icon}</span>
          {/* Title — small on mobile, larger on desktop; matches old caption → lg sizes */}
          <span className="text-xs font-medium text-foreground sm:text-sm group-hover:text-primary transition-colors leading-tight">
            {calc.title}
          </span>
        </CardHeader>
      </Card>
    </Link>
  );
}

function SportSection({ item }: { item: SportEntry }) {
  return (
    <section>
      {/* Sport group heading — was MUI Typography variant="h6" */}
      <h2 className="mb-3 text-base font-semibold text-foreground">{item.sport}</h2>
      {/* 2 columns on mobile, 3 on sm, 4 on lg — was MUI Grid xs=6 md=4 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {item.calculators.map((calc, i) => (
          <CalculatorCard key={i} calc={calc} icon={item.icon} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero section — was MUI Container + Typography with large letterSpacing */}
      <section className="py-16 text-center">
        <h1 className="text-2xl font-light tracking-[0.3rem] text-primary sm:text-4xl lg:text-6xl">
          SPORTCALCULATORS
        </h1>
        <p className="mt-4 text-base font-medium text-muted-foreground sm:text-xl lg:text-2xl">
          The best online collection of sports related calculators
        </p>
      </section>

      <AdSenseWidget />

      {/* Calculator grid grouped by sport */}
      <div className="mt-8 space-y-8">
        {calculators.map((item, i) => (
          <SportSection key={i} item={item} />
        ))}
      </div>

      <div className="mt-8">
        <AdSenseWidget />
      </div>
    </>
  );
}
