// PHASE 6: Removed 'use client' — now a Server Component.
// Replaced MUI Table + @emotion/styled with plain <table> + Tailwind.

import React from 'react';
import DecathlonCalculator from '../../../calculators/DecathlonCalculator';
import AdSenseWidget from '../../../components/AdSenseWidget';

export const metadata = {
  title: 'Decathlon Calculator | SportCalculators',
  description: 'A decathlon calculator which calculates results to points and points to results.',
};

interface EventRow { event: string; a: number; b: number; c: number; }

const rows: EventRow[] = [
  { event: '100 m',         a: 25.4347,  b: 18,   c: 1.81 },
  { event: 'Long jump',     a: 0.14354,  b: 220,  c: 1.4  },
  { event: 'Shot put',      a: 51.39,    b: 1.5,  c: 1.05 },
  { event: 'High jump',     a: 0.8465,   b: 75,   c: 1.42 },
  { event: '400 m',         a: 1.53775,  b: 82,   c: 1.81 },
  { event: '110 m hurdles', a: 5.74352,  b: 28.5, c: 1.92 },
  { event: 'Discus throw',  a: 12.91,    b: 4,    c: 1.1  },
  { event: 'Pole vault',    a: 0.2797,   b: 100,  c: 1.35 },
  { event: 'Javelin throw', a: 10.14,    b: 7,    c: 1.08 },
  { event: '1500 m',        a: 0.03768,  b: 480,  c: 1.85 },
];

export default function DecathlonCalcPage() {
  return (
    <>
      <h2 className="calculator">Decathlon Calculator</h2>
      <p>
        This calculator allows you to calculate decathlon score. You can
        calculate points from results or results from points. You can use the
        results from points calculation to estimate needed results for each event.
      </p>
      <AdSenseWidget />
      <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <DecathlonCalculator />
      </div>
      <AdSenseWidget />

      <h3>How to Use the Calculator?</h3>
      <p>Select the calculation direction at the top and enter results or points in the text fields. When you move focus away from a field the score is calculated. Use the manual timing checkbox for running events if needed.</p>

      <h3>Decathlon</h3>
      <p>
        Decathlon is a combined event in athletics with ten events competed over two days. Each event is scored using a point system. Scoring over 9000 points is very rare. See the{' '}
        <a href="https://www.iaaf.org/records/all-time-toplists/combined-events/decathlon/outdoor/men/senior" target="_blank">IAAF site</a>
        {' '}for all-time top lists.
      </p>

      <h3>Events</h3>
      <h4>Day 1</h4>
      <ul><li>100 metres</li><li>Long jump</li><li>Shot put</li><li>High jump</li><li>400 metres</li></ul>
      <h4>Day 2</h4>
      <ul><li>110 metres hurdles</li><li>Discus throw</li><li>Pole vault</li><li>Javelin throw</li><li>1500 metres</li></ul>

      <h3>How to Calculate Decathlon Points</h3>
      <ul>
        <li>Points = INT(A(B — P)^C) for track events</li>
        <li>Points = INT(A(P — B)^C) for field events</li>
      </ul>
      <p>P is the result, measured in seconds for track events, meters for throwing, centimeters for jumping. Since 1984 the A, B and C constants are:</p>

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
      <p className="mt-4">If manual timing is used: add 0.24s to 100m and 110m hurdles, 0.14s to 400m.</p>
    </>
  );
}
