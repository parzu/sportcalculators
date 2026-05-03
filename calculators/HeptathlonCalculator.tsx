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
  heptathlonConsts,
  CombinedEventsCompetition,
} from '../services/combinedEventsService';

interface State { heptathlon: CombinedEventsCompetition; }

class HeptathlonCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      heptathlon: {
        events: [
          { result: '', points: '', manual: false },
          { result: '', points: '' },
          { result: '', points: '' },
          { result: '', points: '', manual: false },
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
    const h = this.state.heptathlon;
    h.events[Number(event.target.id)].result = event.target.value;
    this.setState({ heptathlon: h }, () => this.calculatePoints(event.target.id));
  }

  handleToggleChange(event: React.ChangeEvent<HTMLInputElement>, state: boolean) {
    const h = this.state.heptathlon;
    h.events[Number(event.target.id)].manual = state;
    this.setState({ heptathlon: h }, () => this.calculatePoints(event.target.id));
  }

  handlePointsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const h = this.state.heptathlon;
    h.events[Number(event.target.id)].points = event.target.value;
    this.setState({ heptathlon: h }, () => this.calculateResult(event.target.id));
  }

  calculatePoints(id: string) {
    this.setState({ heptathlon: calculateCombinedEventsPoints(this.state.heptathlon, Number(id), 'heptathlon') });
  }

  calculateResult(id: string) {
    this.setState({ heptathlon: calculateCombinedEventsResult(this.state.heptathlon, Number(id), 'heptathlon') });
  }

  render() {
    const { heptathlon: h } = this.state;
    const row = (i: number, showManual: boolean) => (
      <CombinedEventRow
        key={i} event={h.events[i]} consts={heptathlonConsts[i]} id={String(i)}
        showManual={showManual}
        onResultChange={this.handleResultChange.bind(this)}
        onPointsChange={this.handlePointsChange.bind(this)}
        onToggle={this.handleToggleChange.bind(this)}
      />
    );

    return (
      <div className="mx-auto max-w-2xl min-[500px]:rounded-lg border border-border bg-card px-5 pb-0 pt-4 min-[500px]:shadow-sm">
        {/* Day 1 events (4) */}
        {row(0, true)} {row(1, false)} {row(2, false)} {row(3, true)}
        <CombinedTotalRow text="1st day points" points={h.firstDayPoints} />
        {/* Day 2 events (3) */}
        {row(4, false)} {row(5, false)} {row(6, false)}
        <CombinedTotalRow text="2nd day points" points={h.secondDayPoints} />
        <CombinedTotalRow text="Total points"   points={h.totalPoints}    />
      </div>
    );
  }
}

export default HeptathlonCalculator;
