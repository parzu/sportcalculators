// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper, Typography and <style jsx>.
// Replaced with Tailwind card container and section headers.
// Logic (onTimeChange, onDistanceChange, setSpeed) is unchanged.
import React from 'react';
import TimeInput from '../components/TimeInput';
import DistanceInput from '../components/DistanceInput';
import SpeedDisplay from '../components/SpeedDisplay';
import { calculateSpeed } from '../services/speedService';

interface State { time: number; distance: number; speed: number; }

// Reusable section header — replaces MUI Typography variant="overline" inside a .ListSubheader div
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

class SpeedCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { time: 0, distance: 0, speed: 0 };
  }

  onTimeChange(_event: unknown, totalSecs: number) {
    this.setState({ time: totalSecs }, this.setSpeed);
  }

  onDistanceChange(dist: number) {
    this.setState({ distance: dist }, this.setSpeed);
  }

  setSpeed() {
    this.setState({ speed: calculateSpeed(this.state.time, this.state.distance) });
  }

  render() {
    return (
      // Centered card — replaces MUI Paper + outer flex justify-center
      <div className="mx-auto max-w-lg min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
        <SectionHeader>Race time</SectionHeader>
        <div className="mb-5">
          <TimeInput onTimeChange={this.onTimeChange.bind(this)} />
        </div>

        <SectionHeader>Race distance</SectionHeader>
        <div className="mb-5">
          <DistanceInput onDistanceChange={this.onDistanceChange.bind(this)} />
        </div>

        <SectionHeader>Race speed &amp; pace</SectionHeader>
        <SpeedDisplay speed={this.state.speed} />
      </div>
    );
  }
}

export default SpeedCalculator;
