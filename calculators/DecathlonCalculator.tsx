// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper and <style jsx>.
// Replaced with Tailwind card container.
// Logic (handleResultChange, handlePointsChange, calculatePoints, calculateResult) is unchanged.
import React from 'react';
import CombinedEventRow from '../components/CombinedEventRow';
import CombinedTotalRow from '../components/CombinedTotalRow';
import {
  calculateCombinedEventsPoints,
  calculateCombinedEventsResult,
  decathlonConsts,
  CombinedEventsCompetition,
} from '../services/combinedEventsService';

interface State { decathlon: CombinedEventsCompetition; }

class DecathlonCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      decathlon: {
        events: [
          { result: '', points: '', manual: false },
          { result: '', points: '' },
          { result: '', points: '' },
          { result: '', points: '' },
          { result: '', points: '', manual: false },
          { result: '', points: '', manual: false },
          { result: '', points: '' },
          { result: '', points: '' },
          { result: '', points: '' },
          { result: '', points: '' },
        ],
        firstDayPoints: '0',
        secondDayPoints: '0',
        totalPoints: '0',
      },
    };
  }

  handleResultChange(event: React.ChangeEvent<HTMLInputElement>) {
    const d = this.state.decathlon;
    d.events[Number(event.target.id)].result = event.target.value;
    this.setState({ decathlon: d }, () => this.calculatePoints(event.target.id));
  }

  handleToggleChange(event: React.ChangeEvent<HTMLInputElement>, state: boolean) {
    const d = this.state.decathlon;
    d.events[Number(event.target.id)].manual = state;
    this.setState({ decathlon: d }, () => this.calculatePoints(event.target.id));
  }

  handlePointsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const d = this.state.decathlon;
    d.events[Number(event.target.id)].points = event.target.value;
    this.setState({ decathlon: d }, () => this.calculateResult(event.target.id));
  }

  calculatePoints(id: string) {
    this.setState({ decathlon: calculateCombinedEventsPoints(this.state.decathlon, Number(id), 'decathlon') });
  }

  calculateResult(id: string) {
    this.setState({ decathlon: calculateCombinedEventsResult(this.state.decathlon, Number(id), 'decathlon') });
  }

  render() {
    const { decathlon: d } = this.state;
    const row = (i: number, showManual: boolean) => (
      <CombinedEventRow
        key={i} event={d.events[i]} consts={decathlonConsts[i]} id={String(i)}
        showManual={showManual}
        onResultChange={this.handleResultChange.bind(this)}
        onPointsChange={this.handlePointsChange.bind(this)}
        onToggle={this.handleToggleChange.bind(this)}
      />
    );

    return (
      // Centered card — replaces MUI Paper + outer flex justify-center
      <div className="mx-auto max-w-2xl min-[500px]:rounded-lg border border-border bg-card px-5 pb-0 pt-4 min-[500px]:shadow-sm">
        {/* Day 1 events */}
        {row(0, true)} {row(1, false)} {row(2, false)} {row(3, false)} {row(4, true)}
        <CombinedTotalRow text="1st day points" points={d.firstDayPoints} />
        {/* Day 2 events */}
        {row(5, true)} {row(6, false)} {row(7, false)} {row(8, false)} {row(9, false)}
        <CombinedTotalRow text="2nd day points" points={d.secondDayPoints} />
        <CombinedTotalRow text="Total points"   points={d.totalPoints}    />
      </div>
    );
  }
}

export default DecathlonCalculator;
