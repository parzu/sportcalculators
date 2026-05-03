// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper, Typography, Grid, Box, RadioGroup, Radio, FormControlLabel.
// Also removed triathlon.module.css import.
// Replaced with Tailwind card container, section headers, and native radio buttons.
// Logic (onTimeChange, onDistanceChange, calculateTotalTime) is unchanged.
import React from 'react';
import TriathlonSport, { TRIATHLON_GRID } from '../components/TriathlonSport';
import CombinedTotalRow from '../components/CombinedTotalRow';
import TriathlonDistances from '../components/TriathlonDistances';
import TimeInput from '../components/TimeInput';
import { formatTime } from '../services/timeService';

interface State {
  unit: string;
  swimDistance: string; bikeDistance: string; runDistance: string;
  swimTotalTime: number; bikeTotalTime: number; runTotalTime: number;
  transitTime1: number; transitTime2: number;
  totalSecs: number; totalTimeText: string;
}

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

class TriathlonCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      unit: 'metric',
      swimDistance: '', bikeDistance: '', runDistance: '',
      swimTotalTime: 0, bikeTotalTime: 0, runTotalTime: 0,
      transitTime1: 120, transitTime2: 120,
      totalSecs: 0, totalTimeText: '0:04:00',
    };
  }

  onTimeChange(id: string, totalSecs: number) {
    this.setState({ [id]: totalSecs } as unknown as Pick<State, keyof State>, this.calculateTotalTime);
  }

  onDistanceChange(distances: { swim: string; bike: string; run: string }) {
    this.setState({ swimDistance: distances.swim, bikeDistance: distances.bike, runDistance: distances.run });
  }

  calculateTotalTime() {
    const total =
      parseInt(String(this.state.swimTotalTime))  +
      parseInt(String(this.state.transitTime1))   +
      parseInt(String(this.state.bikeTotalTime))  +
      parseInt(String(this.state.transitTime2))   +
      parseInt(String(this.state.runTotalTime));
    this.setState({ totalSecs: total, totalTimeText: formatTime(total) });
  }

  render() {
    const { unit } = this.state;

    return (
      <div className="-mx-4 max-w-2xl min-[500px]:mx-auto min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
        <SectionHeader>Units</SectionHeader>
        <div className="flex flex-row justify-center gap-6 pb-4">
          {[{ value: 'metric', label: 'Metric' }, { value: 'imperial', label: 'Imperial' }].map((u) => (
            <label key={u.value} className="flex flex-col items-center gap-0.5 cursor-pointer text-sm">
              <input type="radio" name="unit" value={u.value} checked={unit === u.value}
                onChange={(e) => this.setState({ unit: e.target.value })}
                className="accent-primary" />
              {u.label}
            </label>
          ))}
        </div>

        <SectionHeader>Distances</SectionHeader>
        <TriathlonDistances unit={unit as 'metric' | 'imperial'} onChange={this.onDistanceChange.bind(this)} />

        <SectionHeader>Paces and Times</SectionHeader>
        {/* Column headers — same 7-col grid as sport rows */}
        <div className={`mb-2 ${TRIATHLON_GRID} text-xs font-semibold uppercase text-muted-foreground`}>
          <div className="col-span-1 min-[500px]:col-span-2"/>
          <div className="col-span-3 text-center">Pace / Speed</div>
          <div className="hidden min-[500px]:block" />
          <div className="col-span-3 text-center">Time</div>
        </div>

        <TriathlonSport name="swim" unit={unit as 'metric' | 'imperial'}
          distance={Number(this.state.swimDistance)} onTimeChange={this.onTimeChange.bind(this)} />

        {/* Transit 1 — col-span-3 empty covers cols 2-4 (pace+unit), then col-span-3 for time cols 5-7 */}
        <div className={`my-1 ${TRIATHLON_GRID} items-end bg-muted/5 -mx-5 px-5 py-1 min-[500px]:mx-0 min-[500px]:rounded-md min-[500px]:px-2`}>
          <span className="pb-2 text-center text-xs italic text-muted-foreground">TRANSIT</span>
          <div className="col-span-3 min-[500px]:col-span-5" />
          <div className="col-span-3">
            <TimeInput shortNames hideHours tag="transitTime1"
              defaultValues={{ minutes: 2 }} onTimeChange={this.onTimeChange.bind(this)} />
          </div>
        </div>

        <TriathlonSport name="bike" unit={unit as 'metric' | 'imperial'}
          distance={Number(this.state.bikeDistance)} onTimeChange={this.onTimeChange.bind(this)} />

        {/* Transit 2 */}
        <div className={`my-1 ${TRIATHLON_GRID} items-end bg-muted/5 -mx-5 px-5 py-1 min-[500px]:mx-0 min-[500px]:rounded-md min-[500px]:px-2`}>
          <span className="pb-2 text-center text-xs italic text-muted-foreground">TRANSIT</span>
          <div className="col-span-3 min-[500px]:col-span-5" />
          <div className="col-span-3">
            <TimeInput shortNames hideHours tag="transitTime2"
              defaultValues={{ minutes: 2 }} onTimeChange={this.onTimeChange.bind(this)} />
          </div>
        </div>

        <TriathlonSport name="run" unit={unit as 'metric' | 'imperial'}
          distance={Number(this.state.runDistance)} onTimeChange={this.onTimeChange.bind(this)} />

        <CombinedTotalRow text="Total time" points={this.state.totalTimeText} />
      </div>
    );
  }
}

export default TriathlonCalculator;
