// PHASE 7: Converted both class components (SplitRow, PredictedSplitTimes) to function components.
// Removed MUI Paper and ListSubheader and <style jsx>.
// Each split row is now a compact bordered card with Tailwind.
// Pete Riegel formula (T2 = T1 × (D2/D1)^1.06) is unchanged.
import React from 'react';
import { formatTime } from '../services/timeService';

interface SplitRowProps {
  text: string;
  newDist: string | number;
  oldDist: string | number;
  time: number;
}

function predictedTime(time: number, orgDist: string | number, newDist: string | number) {
  const secs = time * Math.pow(Number(newDist) / Number(orgDist), 1.06);
  return {
    time:   formatTime(secs),
    paceKm: formatTime(secs / (Number(newDist) / 1000)),
    paceMi: formatTime(secs / (Number(newDist) / 1609.34)),
  };
}

function SplitRow({ text, newDist, oldDist, time }: SplitRowProps) {
  const p = predictedTime(time, oldDist, newDist);
  return (
    <div className="mb-3 rounded-md border border-border bg-card p-3">
      {/* Race name — bold, left aligned */}
      <p className="mb-1 font-semibold text-muted-foreground">{text}</p>
      {/* Three values in a responsive row */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-muted-foreground">Race time</span>
          <span className="tabular-nums font-medium">{p.time}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-muted-foreground">min/km</span>
          <span className="tabular-nums font-medium">{p.paceKm}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-muted-foreground">min/mi</span>
          <span className="tabular-nums font-medium">{p.paceMi}</span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  distance: string | number;
  time: number;
}

const SPLITS = [
  { text: '1 500 m',     newDist: '1500'     },
  { text: '1 mi',        newDist: '1609.344' },
  { text: '3 mi',        newDist: '4828.03'  },
  { text: '5 km',        newDist: '5000'     },
  { text: '5 mi',        newDist: '8046.72'  },
  { text: '10 km',       newDist: '10000'    },
  { text: '15 km',       newDist: '15000'    },
  { text: '10 mi',       newDist: '16093.4'  },
  { text: '½ marathon',  newDist: '21097.5'  },
  { text: 'marathon',    newDist: '42195'    },
];

export default function PredictedSplitTimes({ distance, time }: Props) {
  return (
    <div>
      {SPLITS.map((s) => (
        <SplitRow key={s.text} text={s.text} newDist={s.newDist} oldDist={distance} time={time} />
      ))}
    </div>
  );
}
