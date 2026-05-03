// PHASE 6: Removed 'use client' — now a Server Component.
// Replaced MUI Table + @emotion/styled with plain <table> + Tailwind.

import React from 'react';
import Link from 'next/link';
import HeptathlonCalculator from '../../../calculators/HeptathlonCalculator';
import AdSenseWidget from '../../../components/AdSenseWidget';

export const metadata = {
  title: 'Heptathlon Calculator | SportCalculators',
  description: 'A heptathlon calculator which calculates points from results and results from points.',
};

interface EventRow { event: string; a: number; b: number; c: number; }

const rows: EventRow[] = [
  { event: '100 metres hurdles', a: 9.23076,  b: 26.7, c: 1.835 },
  { event: 'High jump',          a: 1.84523,  b: 75.0, c: 1.348 },
  { event: 'Shot put',           a: 56.0211,  b: 1.5,  c: 1.05  },
  { event: '200 metres',         a: 4.99087,  b: 42.5, c: 1.81  },
  { event: 'Long jump',          a: 0.188807, b: 210,  c: 1.41  },
  { event: 'Javelin throw',      a: 15.9803,  b: 3.8,  c: 1.04  },
  { event: '800 metres',         a: 0.11193,  b: 254,  c: 1.88  },
];

export default function HeptathlonCalcPage() {
  return (
    <>
      <h2 className="calculator">Heptathlon Calculator</h2>
      <p>
        With this heptathlon calculator you can calculate heptathlon points from
        results and results from points. Use the results from points calculation
        to estimate needed performance for your target. This calculator is for women&rsquo;s outdoor heptathlon.
      </p>

      <AdSenseWidget />
      <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <HeptathlonCalculator />
      </div>
      <AdSenseWidget />

      <h3>How to Use the Calculator?</h3>
      <p>Select the calculation direction and enter results or points in the text fields. Use the manual timing checkbox for running events if needed.</p>

      <h3>Heptathlon</h3>
      <p>
        Heptathlon is a combined events contest consisting of seven events. There are two types: women&rsquo;s outdoor heptathlon and men&rsquo;s indoor heptathlon.
        This calculator is for women&rsquo;s heptathlon. Outdoors men usually compete in decathlon (see <Link href="/decathlon-calculator">decathlon calculator</Link>).
      </p>
      <p>Women&rsquo;s heptathlon events (first four on day 1, rest on day 2):</p>
      <ul>
        <li>100 meters hurdles</li><li>High jump</li><li>Shot put</li><li>200 metres</li>
        <li>Long jump</li><li>Javelin throw</li><li>800 metres</li>
      </ul>

      <h3>How to Calculate Heptathlon Points</h3>
      <p>Read the full explanation on <Link href="/heptathlon-scoring">heptathlon scoring</Link>.</p>
      <ul>
        <li>Points = INT(A(B — P)^C) for track events</li>
        <li>Points = INT(A(P — B)^C) for field events</li>
      </ul>
      <p>The A, B and C constants since 1984:</p>

      {/* PHASE 6: Plain HTML table replaces MUI Table components */}
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
      <p className="mt-4">If manual timing is used: add 0.24s to 200m and 100m hurdles.</p>
    </>
  );
}
