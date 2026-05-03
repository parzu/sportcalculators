// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper, Typography and <style jsx>.
// Replaced with Tailwind card and section headers.
// Logic (onTimeChange, onDistanceChange, setSpeed) is unchanged.
import React from 'react';
import TimeInput from '../components/TimeInput';
import DistanceSelector from '../components/DistanceSelector';
import PredictedSplitTimes from '../components/PredictedSplitTimes';
import { calculateSpeed } from '../services/speedService';

interface State { time: number; distance: number; speed: number; }

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-5 mb-3 mt-1 bg-muted/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    {children}
  </div>
);

class RaceTimeCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { time: 0, distance: 5000, speed: 0 };
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
      <div className="mx-auto max-w-2xl min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
        <SectionHeader>Recent race time</SectionHeader>
        <div className="mb-5">
          <TimeInput onTimeChange={this.onTimeChange.bind(this)} />
        </div>

        <SectionHeader>Recent race distance</SectionHeader>
        <DistanceSelector
          initialDistance={this.state.distance.toString()}
          onDistanceChange={this.onDistanceChange.bind(this)}
        />

        <SectionHeader>Predicted times for races</SectionHeader>
        <PredictedSplitTimes time={this.state.time} distance={this.state.distance} />
      </div>
    );
  }
}

export default RaceTimeCalculator;
