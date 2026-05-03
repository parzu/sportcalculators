// PHASE 7: Converted from class component to function component.
// Removed MUI TextField and <style jsx> — replaced with plain inputs and Tailwind.
// The original timeChanged() had a scoping bug: it referenced a global `event` variable for id/name.
// Fixed: now passes props.tag as the id directly.
import React, { useState } from 'react';
import * as time from '../services/timeService';

interface DefaultValues {
  hours?: string | number;
  minutes?: string | number;
  seconds?: string | number;
}

interface Props {
  tag?: string;
  shortNames?: boolean;
  hideHours?: boolean;
  defaultValues?: DefaultValues;
  onTimeChange: (id: string, seconds: number, name: string) => void;
}

// Shared style for each h/m/s number input
const inputCls =
  'w-full rounded-md border border-input bg-background px-2 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-ring';

export default function TimeInput({ tag = '', shortNames, hideHours, defaultValues, onTimeChange }: Props) {
  const [hours,   setHours  ] = useState<string | number>(defaultValues?.hours   ?? '');
  const [minutes, setMinutes] = useState<string | number>(defaultValues?.minutes ?? '');
  const [seconds, setSeconds] = useState<string | number>(defaultValues?.seconds ?? '');

  function handleChange(field: 'hours' | 'minutes' | 'seconds', value: string) {
    // Update the relevant field then recalculate
    let h = hours, m = minutes, s = seconds;
    if (field === 'hours')   { h = value; setHours(value);   }
    if (field === 'minutes') { m = value; setMinutes(value); }
    if (field === 'seconds') { s = value; setSeconds(value); }
    onTimeChange(tag, time.timeToSeconds(h, m, s), field);
  }

  // Label names: shortNames shows 'hrs/mins/secs', otherwise shows full field name
  const hLabel = shortNames ? 'hrs'  : 'hours';
  const mLabel = shortNames ? 'mins' : 'minutes';
  const sLabel = shortNames ? 'secs' : 'seconds';

  return (
    <div className="flex flex-row gap-2">
      {/* Hours input — hidden when hideHours is set (e.g. transit time in triathlon) */}
      {hideHours ? (
        <div className="flex-1" />
      ) : (
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-center text-xs text-muted-foreground">{hLabel}</label>
          <input
            type="number"
            name="hours"
            id={tag}
            value={hours}
            onChange={(e) => handleChange('hours', e.target.value)}
            className={inputCls}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1">
        <label className="text-center text-xs text-muted-foreground">{mLabel}</label>
        <input
          type="number"
          name="minutes"
          id={tag}
          value={minutes}
          onChange={(e) => handleChange('minutes', e.target.value)}
          className={inputCls}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <label className="text-center text-xs text-muted-foreground">{sLabel}</label>
        <input
          type="number"
          name="seconds"
          id={tag}
          value={seconds}
          onChange={(e) => handleChange('seconds', e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  );
}
