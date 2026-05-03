// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper, TextField, Typography, InputAdornment, ToggleButton,
//          ToggleButtonGroup, Grid, Table/TableHead/TableRow/TableCell and <style jsx>.
// Replaced with Tailwind card, plain inputs, custom toggle-button group, plain HTML table.
// Also removed mdi-material-ui Bike icon (unused in the actual render).
// Logic (calculateCadence, calculateSpeed) is unchanged.
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import BikeParameters from '../components/BikeParameters';

interface BikeParametersState { wheelDiameter: number; chainringTeeth: number; cogTeeth: number; }

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

const inputCls =
  'w-full rounded-md border border-input bg-background px-3 py-1.5 pr-14 text-right text-sm focus:outline-none focus:ring-2 focus:ring-ring';

export default function CadenceCalculator() {
  const [bikeParameters, setBikeParameters] = useState<BikeParametersState>({ wheelDiameter: 0, chainringTeeth: 0, cogTeeth: 0 });
  const [speed,     setSpeed    ] = useState<number | string>(0);
  const [speedUnit, setSpeedUnit] = useState('km/h');
  const [cadence,   setCadence  ] = useState<number | string>(0);

  useEffect(() => { setSpeed(calculateSpeed(cadence, speedUnit)); }, [bikeParameters]);

  function calculateCadence(spd: number | string, unit: string): string {
    const ratio = bikeParameters.chainringTeeth / bikeParameters.cogTeeth;
    const circ  = Math.PI * bikeParameters.wheelDiameter / 1000;
    const mps   = unit === 'km/h' ? Number(spd) / 3.6 : Number(spd) / 2.23694;
    return ((mps * 60) / (ratio * circ)).toFixed(2);
  }

  function calculateSpeed(cad: number | string, unit: string): string {
    const ratio = bikeParameters.chainringTeeth / bikeParameters.cogTeeth;
    const circ  = Math.PI * bikeParameters.wheelDiameter / 1000;
    const mps   = (ratio * circ * Number(cad)) / 60;
    return (unit === 'km/h' ? mps * 3.6 : mps * 2.23694).toFixed(2);
  }

  // Custom toggle button — replaces MUI ToggleButtonGroup
  const UnitToggle = () => (
    <div className="flex">
      {['km/h', 'mph'].map((u, i) => (
        <button
          key={u}
          type="button"
          onClick={() => { setSpeedUnit(u); setSpeed(calculateSpeed(cadence, u)); }}
          className={cn(
            'px-3 py-1.5 text-xs border border-input -ml-px first:ml-0',
            i === 0 ? 'rounded-l-md' : 'rounded-r-md',
            speedUnit === u ? 'bg-primary text-primary-foreground z-10' : 'bg-background hover:bg-muted'
          )}
        >
          {u}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-lg min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
      <SectionHeader>Bike Parameters</SectionHeader>
      <BikeParameters parameters={bikeParameters} handleParametersChange={setBikeParameters} />

      <SectionHeader>Speed &amp; Cadence</SectionHeader>
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-x-4 gap-y-3 py-2">
        {/* Cadence input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground text-right">Cadence</label>
          <div className="relative">
            <input type="number" value={cadence} min={0} step={1}
              onChange={(e) => { setCadence(e.target.value); setSpeed(calculateSpeed(e.target.value, speedUnit)); }}
              className={inputCls} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">RPM</span>
          </div>
        </div>
        <div />

        {/* Speed input + unit toggle */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground text-right">Speed</label>
          <div className="relative">
            <input type="number" value={speed} min={0} step={0.01}
              onChange={(e) => { setSpeed(e.target.value); setCadence(calculateCadence(e.target.value, speedUnit)); }}
              className={inputCls} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{speedUnit}</span>
          </div>
        </div>
        <div className="flex items-end pb-0.5"><UnitToggle /></div>
      </div>

      <SectionHeader>Cadence Table</SectionHeader>
      <p className="mb-3 text-center text-xs text-muted-foreground">
        Based on bike parameters set above.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-3 py-2 text-center font-semibold">Cadence (RPM)</th>
              <th className="px-3 py-2 text-center font-semibold">Speed (km/h)</th>
              <th className="px-3 py-2 text-center font-semibold">Speed (mph)</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }, (_, i) => {
              const cad = 10 + i * 10;
              return (
                <tr key={cad} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="px-3 py-2 text-center tabular-nums">{cad}</td>
                  <td className="px-3 py-2 text-center tabular-nums">{calculateSpeed(cad, 'km/h')}</td>
                  <td className="px-3 py-2 text-center tabular-nums">{calculateSpeed(cad, 'mph')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
