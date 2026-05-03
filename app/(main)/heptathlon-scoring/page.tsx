// PHASE 6: Removed 'use client' — now a Server Component.
// Replaced MUI Table + @emotion/styled with plain <table> + Tailwind.

import React from 'react';
import Link from 'next/link';
import AdSenseWidget from '../../../components/AdSenseWidget';

export const metadata = {
  title: 'Heptathlon Scoring | SportCalculators',
  description: 'Find out how the heptathlon scoring works for women\'s outdoor heptathlon and men\'s indoor heptathlon.',
};

interface EventRow { event: string; a: number; b: number; c: number; }

const women: EventRow[] = [
  { event: '100 metres hurdles', a: 9.23076,  b: 26.7, c: 1.835 },
  { event: 'High jump',          a: 1.84523,  b: 75.0, c: 1.348 },
  { event: 'Shot put',           a: 56.0211,  b: 1.5,  c: 1.05  },
  { event: '200 metres',         a: 4.99087,  b: 42.5, c: 1.81  },
  { event: 'Long jump',          a: 0.188807, b: 210,  c: 1.41  },
  { event: 'Javelin throw',      a: 15.9803,  b: 3.8,  c: 1.04  },
  { event: '800 metres',         a: 0.11193,  b: 254,  c: 1.88  },
];

const men: EventRow[] = [
  { event: '60 metres',          a: 58.015,  b: 11.5,  c: 1.81 },
  { event: 'Long jump',          a: 0.14354, b: 220.0, c: 1.4  },
  { event: 'Shot put',           a: 51.39,   b: 1.5,   c: 1.05 },
  { event: 'High jump',          a: 0.8465,  b: 75.0,  c: 1.42 },
  { event: '60 metres hurdles',  a: 20.5173, b: 15.5,  c: 1.92 },
  { event: 'Pole vault',         a: 0.2797,  b: 100.0, c: 1.35 },
  { event: '1000 metres',        a: 0.08713, b: 305.5, c: 1.85 },
];

// Reusable scoring table — used for both women's and men's tables below
function ScoringTable({ rows }: { rows: EventRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[300px] max-w-lg border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 pr-6 text-left font-semibold">Event</th>
            <th className="py-2 pr-4 text-right font-semibold">A</th>
            <th className="py-2 pr-4 text-right font-semibold">B</th>
            <th className="py-2 text-right font-semibold">C</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.event} className="border-b border-border/50 hover:bg-muted/50">
              <td className="py-2 pr-6 font-medium">{row.event}</td>
              <td className="py-2 pr-4 text-right tabular-nums">{row.a}</td>
              <td className="py-2 pr-4 text-right tabular-nums">{row.b}</td>
              <td className="py-2 text-right tabular-nums">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HeptathlonScoringPage() {
  return (
    <>
      <h2 className="calculator">Heptathlon Scoring</h2>
      <p>
        There are two kinds of heptathlons: women&rsquo;s outdoor heptathlon and men&rsquo;s indoor heptathlon.
        The result in each of the seven events is transformed into points and the points from all events are summed.
        The best results are around 7000 points for women and 6500 points for men.
      </p>

      <AdSenseWidget />

      <p>
        In official competitions, scoring tables issued by the{' '}
        <a href="https://www.iaaf.org/home" target="_blank">IAAF</a> are used.
        Here you can find the current{' '}
        <a href="https://worldathletics.org/about-iaaf/documents/technical-information" target="_blank">scoring tables</a>.
      </p>

      <AdSenseWidget />

      <p>Scoring formulas by event type:</p>
      <h5>Running events (200m, 800m, 100m hurdles): P = a × (b − T)^c</h5>
      <p>Where P is points, T is time in seconds.</p>
      <h5>Jumping events (high jump, long jump): P = a × (M − b)^c</h5>
      <p>Where M is height/length in centimeters.</p>
      <h5>Throwing events (shot put, javelin): P = a × (D − b)^c</h5>
      <p>Where D is distance in meters.</p>

      <h4>Women&rsquo;s heptathlon scoring table</h4>
      <ScoringTable rows={women} />

      <AdSenseWidget />

      <h4>Men&rsquo;s heptathlon scoring table</h4>
      <ScoringTable rows={men} />

      <p className="mt-4">
        Both tables are for automatic timing. For manual timing in events shorter than 400m: subtract 0.24s.
        For 400m: subtract 0.14s. No adjustment for events longer than 400m.
      </p>
      <p>
        Try it with our <Link href="/heptathlon-calculator">heptathlon calculator</Link>.
      </p>
    </>
  );
}
