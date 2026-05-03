// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI TextField, Paper, Radio, RadioGroup, FormControlLabel, Grid, Typography
//          and @emotion/styled Subheader/CalculatorBox.
// Replaced with Tailwind card container, plain input, and native radio buttons.
// Logic (paceToSpeed, useEffect) is unchanged.
import React, { useState, useEffect } from 'react';
import SpeedDisplay from '../components/SpeedDisplay';
import { paceToSpeed } from '../services/speedService';
import * as consts from '../services/unitConstants';

// Section header — same pattern as other calculators
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

const PACE_UNITS = [
  { value: consts.paceTypes.MIN_KM, label: 'min/km' },
  { value: consts.paceTypes.KM_H,   label: 'km/h'   },
  { value: consts.paceTypes.MIN_MI,  label: 'min/mi' },
  { value: consts.paceTypes.MPH,     label: 'mph'    },
];

export default function SpeedConverter() {
  const [paceUnit, setPaceUnit] = useState<number>(consts.paceTypes.MIN_KM);
  const [pace,     setPace    ] = useState<number | undefined>(undefined);
  const [speed,    setSpeed   ] = useState<number>(0);

  useEffect(() => {
    setSpeed(paceToSpeed(pace, paceUnit));
  }, [pace, paceUnit]);

  return (
    <div className="-mx-4 max-w-lg min-[500px]:mx-auto min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
      <SectionHeader>Pace</SectionHeader>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <input
          id="pace"
          name="pace"
          type="number"
          value={pace ?? ''}
          onChange={(e) => setPace(e.target.value ? Number(e.target.value) : undefined)}
          placeholder="pace"
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />

        {/* Pace unit radio buttons — label below each */}
        <div className="flex flex-row gap-4">
          {PACE_UNITS.map((u) => (
            <label key={u.value} className="flex flex-col items-center gap-0.5 cursor-pointer text-sm">
              <input
                type="radio"
                name="paceUnit"
                value={u.value}
                checked={paceUnit === u.value}
                onChange={() => setPaceUnit(u.value)}
                className="accent-primary"
              />
              {u.label}
            </label>
          ))}
        </div>
      </div>

      <SectionHeader>Speed &amp; pace</SectionHeader>
      <SpeedDisplay speed={speed} />
    </div>
  );
}
