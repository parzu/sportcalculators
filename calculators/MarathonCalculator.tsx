// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper, Typography and triathlon.module.css import.
// Replaced with Tailwind card and section headers.
// Logic is unchanged.
import React, { useState } from 'react';
import TimeInput from '../components/TimeInput';
import PredictedSplitTimes from '../components/PredictedSplitTimes';

const MarathonDistance = 42195;

// Section header — consistent with other calculator sections
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

export default function MarathonCalculator() {
  const [time, setTime] = useState(0);

  return (
    <div className="-mx-4 max-w-2xl min-[500px]:mx-auto min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
      <SectionHeader>Marathon Goal Time</SectionHeader>
      <div className="mb-5">
        <TimeInput onTimeChange={(_id, totalSecs) => setTime(totalSecs)} />
      </div>

      <SectionHeader>Target Race Times</SectionHeader>
      <PredictedSplitTimes time={time} distance={MarathonDistance} />
    </div>
  );
}
