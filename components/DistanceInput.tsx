// PHASE 7: Removed MUI TextField, Radio, RadioGroup, FormControlLabel, Grid.
// Replaced with a plain number input and native radio buttons styled with Tailwind.
import React from 'react';
import { distanceToMeters } from '../services/distanceService';
import * as consts from '../services/unitConstants';

interface Props {
  onDistanceChange: (meters: number) => void;
}

export default function DistanceInput({ onDistanceChange }: Props) {
  const [distanceUnit, setDistanceUnit] = React.useState<number>(consts.distanceTypes.KM);
  const [distance, setDistance]         = React.useState<number | undefined>();

  React.useEffect(() => {
    onDistanceChange(distanceToMeters(distance, distanceUnit));
  }, [distance, distanceUnit]);

  const units = [
    { value: consts.distanceTypes.METER, label: 'm'     },
    { value: consts.distanceTypes.FEET,  label: 'ft'    },
    { value: consts.distanceTypes.KM,    label: 'km'    },
    { value: consts.distanceTypes.MILE,  label: 'miles' },
  ];

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-center">
      <div className="flex flex-col gap-1">
        <label htmlFor="distance" className="text-center text-xs text-muted-foreground">distance</label>
        <input
          id="distance"
          name="distance"
          type="number"
          value={distance ?? ''}
          onChange={(e) => setDistance(e.target.value ? Number(e.target.value) : undefined)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Unit radio buttons — label below each radio to match old MUI labelPlacement="bottom" */}
      <div className="flex flex-row gap-4">
        {units.map((u) => (
          <label key={u.value} className="flex flex-col items-center gap-0.5 cursor-pointer text-sm">
            <input
              type="radio"
              name="distanceUnit"
              value={u.value}
              checked={distanceUnit === u.value}
              onChange={() => setDistanceUnit(u.value)}
              className="accent-primary"
            />
            {u.label}
          </label>
        ))}
      </div>
    </div>
  );
}
