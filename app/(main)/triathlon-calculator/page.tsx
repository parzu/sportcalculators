// PHASE 6: Removed 'use client' — now a Server Component.
// Old: MUI Table + StyledEngineProvider + @emotion/styled → required 'use client'
// New: plain <table> with Tailwind classes — renders as static HTML, no client JS

import React from 'react';
import TriathlonCalculator from '../../../calculators/TriathlonCalculator';
import AdSenseWidget from '../../../components/AdSenseWidget';

export const metadata = {
  title: 'Triathlon Calculator | SportCalculators',
  description: 'A mobile-friendly triathlon calculator with preset distances. Calculates event and total times and needed speeds for swimming, cycling and running.',
};

interface DistanceRow { event: string; swim: string; bike: string; run: string; }

const rows: DistanceRow[] = [
  { event: 'Sprint distance',               swim: '750m / 0.47mi',  bike: '20km / 12mi',    run: '5km / 3.1mi'     },
  { event: 'Standard / Olympic distance',   swim: '1.5km / 0.93mi', bike: '40km / 25mi',    run: '10km / 6.2mi'    },
  { event: 'Long Course / Half-ironman / 70.3', swim: '1.9km / 1.2mi',  bike: '90km / 56mi',    run: '21.1km / 13.1mi' },
  { event: 'Ultra distance / Ironman / 140.6',  swim: '3.8km / 2.4mi',  bike: '180.2km / 112mi', run: '42.2km / 26.2mi' },
];

export default function ThriathlonCalculatorPage() {
  return (
    <>
      <h2 className="calculator">Triathlon Calculator</h2>
      <p>
        This triathlon calculator helps you to calculate your final time or the
        speeds and paces needed to achieve your target time in a triathlon race.
        Enter all the individual race times or speed/paces and include the
        transition times to get the total time. You can use preset race
        distances or your own custom distances.
      </p>
      <AdSenseWidget />
      <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <TriathlonCalculator />
      </div>
      <AdSenseWidget />
      <h3>How to Use the Calculator?</h3>
      <p>Using the triathlon calculator is easy.</p>
      <ul>
        <li>First select the units and the distances you want to use.</li>
        <li>Then enter either the pace/speed or the target time for each individual race.</li>
        <ul>
          <li>If you enter the pace/speed the time is calculated automatically based on the currently selected distance.</li>
          <li>If you enter the target time the pace/speed is calculated automatically for the selected distance.</li>
          <li>If you change the distance the pace/speed remains the same and the time for each individual race is recalculated.</li>
        </ul>
      </ul>
      <p>The total time is automatically calculated after every input. Try it out yourself with the triathlon calculator above.</p>
      <div style={{ minHeight: '600px' }}>
        <h3>Triathlon</h3>
        <div style={{ float: 'left', paddingRight: '10px' }}>
          <img src="../static/triathlon_swim_montage.jpg" alt="Triathlon swim" />
          <p style={{ fontSize: '8px' }}>
            Image by JKrabbe, <a href="https://commons.wikimedia.org/wiki/File%3ATriathlon_swim_montage.jpg" target="_blank">Wikimedia Commons</a>.
          </p>
        </div>
        <p>A Triathlon is a multisport race combining of three different sports: swimming, cycling and running. The individual events are completed without a break between them. Triathletes compete for the best overall time of all events and the timed transitions between them.</p>
        <p>The history of triathlon goes back to 1920&rsquo;s France, where various kinds of three sport races were held. The triathlon has been in the summer Olympics since Sydney 2000. You can read more about triathlon in the summer Olympics from <a href="https://en.wikipedia.org/wiki/Triathlon_at_the_Summer_Olympics" target="_blank">Wikipedia</a>.</p>
      </div>
      <h3>Triathlon Distances</h3>
      <p>The four most common distance combinations are:</p>

      {/* PHASE 6: Plain HTML table replaces MUI Table + TableContainer + TableHead + TableBody etc.
          overflow-x-auto: horizontal scroll on small screens (same as old TableContainer)
          border-collapse: removes double borders between cells */}
      <div className="overflow-x-auto">
        <table className="min-w-[300px] max-w-2xl border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 pr-4 text-left font-semibold">Competition Name</th>
              <th className="py-2 pr-4 text-right font-semibold">Swimming</th>
              <th className="py-2 pr-4 text-right font-semibold">Cycling</th>
              <th className="py-2 text-right font-semibold">Running</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.event} className="border-b border-border/50 hover:bg-muted/50">
                <td className="py-2 pr-4 font-medium">{row.event}</td>
                <td className="py-2 pr-4 text-right">{row.swim}</td>
                <td className="py-2 pr-4 text-right">{row.bike}</td>
                <td className="py-2 text-right">{row.run}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4">
        The names 70.3 and 140.6 used for competitions equals the total miles of the competition distances.
        You can use our <a href="/marathon-calculator">marathon calculator</a> to estimate split times.
      </p>
    </>
  );
}
