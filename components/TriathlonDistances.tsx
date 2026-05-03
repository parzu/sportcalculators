// PHASE 7: Removed MUI Grid, RadioGroup, Radio, FormControlLabel, TextField, InputAdornment.
// Also removed import of triathlon.module.css (no longer needed).
// Replaced with native radio buttons and a plain input — all styled with Tailwind.
// Logic (raceDistances lookup, useEffect, unit conversion) is unchanged.
import React, { useState, useEffect } from 'react';

interface Distances { swim: number; bike: number; run: number; }
interface RaceEntry  { swim: number; bike: number; run: number; }

const raceDistances: Record<string, Record<string, RaceEntry>> = {
  metric: {
    sprint:  { swim: 0.75, bike: 20,  run: 5      },
    olympic: { swim: 1.5,  bike: 40,  run: 10     },
    half:    { swim: 1.9,  bike: 90,  run: 21.1   },
    ironman: { swim: 3.8,  bike: 180, run: 42.195 },
  },
  imperial: {
    sprint:  { swim: 0.47, bike: 12,  run: 3.1   },
    olympic: { swim: 0.93, bike: 25,  run: 6.2   },
    half:    { swim: 1.2,  bike: 56,  run: 13.1  },
    ironman: { swim: 2.4,  bike: 112, run: 26.2  },
  },
};

const RACES = [
  { value: 'sprint',  label: 'Sprint'       },
  { value: 'olympic', label: 'Olympic'      },
  { value: 'half',    label: 'Half-Ironman' },
  { value: 'ironman', label: 'Ironman'      },
];

interface Props {
  unit: 'metric' | 'imperial';
  onChange: (distances: Distances) => void;
}

export default function TriathlonDistances({ unit, onChange }: Props) {
  const [race,         setRace        ] = useState('sprint');
  const [swimDistance, setSwimDistance] = useState(raceDistances.metric.sprint.swim);
  const [bikeDistance, setBikeDistance] = useState(raceDistances.metric.sprint.bike);
  const [runDistance,  setRunDistance ] = useState(raceDistances.metric.sprint.run);

  const distUnit = unit === 'metric' ? 'km' : 'mi';

  // Re-populate distances when unit changes
  useEffect(() => {
    if (race === 'manual') {
      setSwimDistance(unit === 'imperial' ? swimDistance * 1.6 : swimDistance / 1.6);
    } else {
      setSwimDistance(raceDistances[unit][race].swim);
      setBikeDistance(raceDistances[unit][race].bike);
      setRunDistance(raceDistances[unit][race].run);
    }
  }, [unit]);

  // Notify parent whenever distances change
  useEffect(() => {
    onChange({ swim: swimDistance, bike: bikeDistance, run: runDistance });
  }, [swimDistance, bikeDistance, runDistance]);

  function selectRace(r: string) {
    setRace(r);
    setSwimDistance(raceDistances[unit][r].swim);
    setBikeDistance(raceDistances[unit][r].bike);
    setRunDistance(raceDistances[unit][r].run);
  }

  const inputCls =
    'w-full rounded-md border border-input bg-background px-3 py-1.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

  function DistInput({ label, value, onChange: onCh }: { label: string; value: number; onChange: (v: number) => void }) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-10 text-right text-xs font-semibold uppercase text-muted-foreground">{label}</span>
        <div className="relative flex-1">
          <input
            type="number"
            value={value}
            onChange={(e) => { setRace('manual'); onCh(Number(e.target.value)); }}
            className={inputCls}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {distUnit}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-2">
      {/* Race preset radio buttons in a 2×2 grid */}
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {RACES.map((r) => (
          <label key={r.value} className="flex flex-col items-center gap-0.5 cursor-pointer text-sm py-1">
            <input
              type="radio"
              name="triRace"
              value={r.value}
              checked={race === r.value}
              onChange={() => selectRace(r.value)}
              className="accent-primary"
            />
            {r.label}
          </label>
        ))}
      </div>

      {/* Distance inputs */}
      <div className="mx-auto w-full max-w-xs space-y-2">
        <DistInput label="Swim" value={swimDistance} onChange={setSwimDistance} />
        <DistInput label="Bike" value={bikeDistance} onChange={setBikeDistance} />
        <DistInput label="Run"  value={runDistance}  onChange={setRunDistance}  />
      </div>
    </div>
  );
}
