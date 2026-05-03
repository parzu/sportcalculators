// PHASE 7: Removed MUI TextField, ToggleButton, ToggleButtonGroup, Grid, InputAdornment, Typography.
// Replaced with a custom toggle-button group (flex div) and plain input — all styled with Tailwind.
// The selected race button is highlighted with bg-primary/text-primary-foreground.
import React from 'react';
import { cn } from '@/lib/utils';
import { distanceToMeters } from '../services/distanceService';
import * as consts from '../services/unitConstants';

interface Props {
  onDistanceChange: (distanceKm: number) => void;
}

// Race presets — mi ones automatically switch the unit toggle to miles
const RACE_PRESETS: { label: string; value: string; dist: number; unit: number }[] = [
  { label: '5km',        value: '5km',       dist: 5,       unit: consts.distanceTypes.KM   },
  { label: '5mi',        value: '5mi',       dist: 5,       unit: consts.distanceTypes.MILE },
  { label: '10km',       value: '10km',      dist: 10,      unit: consts.distanceTypes.KM   },
  { label: '10mi',       value: '10mi',      dist: 10,      unit: consts.distanceTypes.MILE },
  { label: '½ marathon', value: '1/2 marathon', dist: 21.0975, unit: consts.distanceTypes.KM },
  { label: 'marathon',   value: 'marathon',  dist: 42.195,  unit: consts.distanceTypes.KM   },
];

// Shared style for toggle button rows
const toggleBtnCls = (active: boolean) =>
  cn(
    'px-3 py-1.5 text-sm border border-input first:rounded-l-md last:rounded-r-md -ml-px first:ml-0',
    active
      ? 'bg-primary text-primary-foreground z-10'
      : 'bg-background hover:bg-muted'
  );

export default function RunningDistanceInput({ onDistanceChange }: Props) {
  const [selectedRace,  setSelectedRace ] = React.useState('10km');
  const [distanceUnit,  setDistanceUnit ] = React.useState<number>(consts.distanceTypes.KM);
  const [distance,      setDistance     ] = React.useState<number>(10);

  React.useEffect(() => {
    onDistanceChange(distanceToMeters(distance, distanceUnit) / 1000);
  }, [distance, distanceUnit]);

  function selectPreset(preset: typeof RACE_PRESETS[0]) {
    setSelectedRace(preset.value);
    setDistanceUnit(preset.unit);
    setDistance(preset.dist);
  }

  function handleUnitToggle(newUnit: number) {
    setSelectedRace('');
    // Convert existing distance value when toggling unit
    if (distanceUnit === consts.distanceTypes.KM && newUnit === consts.distanceTypes.MILE) {
      setDistance(Number((Number(distance) * 0.621371).toFixed(3)));
    } else if (distanceUnit === consts.distanceTypes.MILE && newUnit === consts.distanceTypes.KM) {
      setDistance(Number((Number(distance) * 1.60934).toFixed(3)));
    }
    setDistanceUnit(newUnit);
  }

  const unitLabel = distanceUnit === consts.distanceTypes.MILE ? 'mi' : 'km';

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4 py-4">
      {/* Race preset buttons — split into two rows to avoid overflow on mobile */}
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Race</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex">
            {RACE_PRESETS.slice(0, 4).map((p) => (
              <button key={p.value} type="button" onClick={() => selectPreset(p)} className={toggleBtnCls(selectedRace === p.value)}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex">
            {RACE_PRESETS.slice(4).map((p) => (
              <button key={p.value} type="button" onClick={() => selectPreset(p)} className={toggleBtnCls(selectedRace === p.value)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom distance with unit toggle */}
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Custom Distance</p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="number"
              value={distance}
              onChange={(e) => { setDistance(Number(e.target.value)); setSelectedRace(''); }}
              className="w-28 rounded-md border border-input bg-background px-3 py-1.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {unitLabel}
            </span>
          </div>
          {/* km / miles unit toggle */}
          <div className="flex">
            <button
              type="button"
              onClick={() => handleUnitToggle(consts.distanceTypes.KM)}
              className={toggleBtnCls(distanceUnit === consts.distanceTypes.KM)}
            >
              km
            </button>
            <button
              type="button"
              onClick={() => handleUnitToggle(consts.distanceTypes.MILE)}
              className={toggleBtnCls(distanceUnit === consts.distanceTypes.MILE)}
            >
              miles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
