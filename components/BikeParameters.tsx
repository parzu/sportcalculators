// PHASE 7: Removed MUI TextField, ToggleButton, ToggleButtonGroup, Grid, InputAdornment.
// Replaced with plain inputs, a custom toggle-button group, and Tailwind layout.
// Logic (calculateWheelDiameter, useEffect deps) is unchanged.
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BikeParams {
  wheelDiameter: number;
  chainringTeeth: number;
  cogTeeth: number;
}

interface Props {
  parameters: BikeParams;
  handleParametersChange: (params: BikeParams) => void;
}

// Shared input style with right adornment padding
const inputCls =
  'w-full rounded-md border border-input bg-background px-3 py-1.5 pr-12 text-sm text-right focus:outline-none focus:ring-2 focus:ring-ring';

// Toggle button pair (mm / in)
function UnitToggle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const btn = (v: string) => (
    <button
      key={v}
      type="button"
      onClick={() => onChange(v)}
      className={cn(
        'px-3 py-1.5 text-xs border border-input -ml-px first:ml-0',
        'first:rounded-l-md last:rounded-r-md',
        value === v ? 'bg-primary text-primary-foreground z-10' : 'bg-background hover:bg-muted'
      )}
    >
      {v}
    </button>
  );
  return <div className="flex">{['mm', 'in'].map(btn)}</div>;
}

function LabeledInput({
  label, name, value, onChange, unit,
}: {
  label: string; name: string; value: number; onChange: (name: string, val: string) => void; unit?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-muted-foreground text-right">{label}</label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={value}
          min={0}
          step={0.01}
          onChange={(e) => onChange(name, e.target.value)}
          className={inputCls}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BikeParameters({ handleParametersChange }: Props) {
  const [rimSize,        setRimSize       ] = useState(622);
  const [tireSize,       setTireSize      ] = useState(28);
  const [chainringTeeth, setChainringTeeth] = useState(34);
  const [cogTeeth,       setCogTeeth      ] = useState(12);
  const [rimUnit,        setRimUnit       ] = useState('mm');
  const [tireUnit,       setTireUnit      ] = useState('mm');

  function calculateWheelDiameter(): number {
    const rim  = rimUnit  === 'in' ? rimSize  * 25.4 : rimSize;
    const tire = tireUnit === 'in' ? tireSize * 25.4 : tireSize;
    return Number(rim) + Number(tire) + Number(tire);
  }

  useEffect(() => {
    handleParametersChange({
      wheelDiameter: calculateWheelDiameter(),
      chainringTeeth,
      cogTeeth,
    });
  }, [rimSize, tireSize, rimUnit, tireUnit, chainringTeeth, cogTeeth]);

  function handleChange(name: string, value: string) {
    const num = parseFloat(value);
    if (name === 'rimSize')         setRimSize(num);
    if (name === 'tireSize')        setTireSize(num);
    if (name === 'chainringTeeth')  setChainringTeeth(num);
    if (name === 'cogTeeth')        setCogTeeth(num);
  }

  return (
    <div className="mx-auto grid max-w-sm grid-cols-2 gap-x-4 gap-y-3 py-2">
      {/* Rim Size row: input on left, unit toggle on right */}
      <LabeledInput label="Rim Size" name="rimSize" value={rimSize} onChange={handleChange} unit={rimUnit} />
      <div className="flex items-end pb-0.5">
        <UnitToggle value={rimUnit} onChange={setRimUnit} />
      </div>

      {/* Tire Size row */}
      <LabeledInput label="Tire size" name="tireSize" value={tireSize} onChange={handleChange} unit={tireUnit} />
      <div className="flex items-end pb-0.5">
        <UnitToggle value={tireUnit} onChange={setTireUnit} />
      </div>

      {/* Chainring teeth — full width (no unit toggle) */}
      <LabeledInput label="Chainring teeth" name="chainringTeeth" value={chainringTeeth} onChange={handleChange} />
      <div />

      {/* Cog teeth */}
      <LabeledInput label="Cog teeth" name="cogTeeth" value={cogTeeth} onChange={handleChange} />
      <div />
    </div>
  );
}
