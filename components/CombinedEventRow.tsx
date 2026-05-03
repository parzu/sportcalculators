// PHASE 7: Removed MUI Grid, TextField, FormControlLabel, InputAdornment, Switch, Typography
//          and @emotion/styled GridItem/SwitchItem/Text/TextFieldItem/Label.
// Replaced with plain inputs, a checkbox toggle, and Tailwind layout.
// The row layout: event name | result input + unit | points input | manual timing toggle.
// Now uses the EventConsts type directly from combinedEventsService instead of a local interface.
import React from 'react';
import { EventConsts } from '../services/combinedEventsService';

interface EventData {
  result: string | number;
  points: string | number;
}

interface Props {
  consts: EventConsts;
  event: EventData;
  id: string;
  onResultChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPointsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>, state: boolean) => void;
  showManual: boolean;
}

const inputCls =
  'w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

export default function CombinedEventRow({ consts, event, id, onResultChange, onPointsChange, onToggle, showManual }: Props) {
  return (
    // Responsive row: stacks on mobile, four columns on sm+
    <div className="grid grid-cols-2 gap-2 py-2 sm:grid-cols-4 sm:items-end">
      {/* Event name */}
      <div className="col-span-2 sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-wide">{consts.name}</span>
      </div>

      {/* Result input with unit adornment */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">result</label>
        <div className="relative">
          <input
            type="text"
            id={id}
            name={consts.name}
            value={String(event.result)}
            onChange={onResultChange}
            className={inputCls + ' pr-10'}
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {consts.resultUnit}
          </span>
        </div>
      </div>

      {/* Points input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">points</label>
        <input
          type="number"
          id={id}
          name="points"
          value={String(event.points)}
          onChange={onPointsChange}
          className={inputCls}
        />
      </div>

      {/* Manual timing checkbox — only shown for track events (running) */}
      <div className="flex items-center justify-start sm:justify-center">
        {showManual && (
          <label className="flex cursor-pointer items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              id={id}
              onChange={(e) => onToggle(e, e.target.checked)}
              className="accent-primary"
            />
            Manual timing
          </label>
        )}
      </div>
    </div>
  );
}
