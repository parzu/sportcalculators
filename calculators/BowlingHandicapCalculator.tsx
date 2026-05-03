// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper, TextField, InputAdornment and <style jsx>.
// Replaced with Tailwind card container and plain inputs.
// Logic (valuesChanged calculation) is unchanged.
import React from 'react';

interface State {
  basis: number;
  factor: number;
  average: string;
  score: string;
  handicap: number | string;
  adjustedScore: number;
}

class BowlingHandicapCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { basis: 210, factor: 90, average: '', score: '', handicap: '', adjustedScore: 0 };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.name]: event.target.value } as unknown as State, this.valuesChanged);
  }

  valuesChanged() {
    const handicap = parseInt(String((this.state.basis - Number(this.state.average)) * (this.state.factor / 100)));
    let adjusted   = parseInt(String(handicap + parseInt(this.state.score)));
    if (isNaN(adjusted)) adjusted = 0;
    this.setState({ handicap, adjustedScore: adjusted });
  }

  render() {
    const inputCls =
      'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

    const field = (id: string, name: string, label: string, value: number | string, suffix?: string) => (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-xs text-muted-foreground">{label}</label>
        <div className="relative">
          <input
            id={id} name={name} type="number" value={value}
            onChange={this.handleChange.bind(this)}
            className={inputCls + (suffix ? ' pr-8' : '')}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      </div>
    );

    return (
      // Centered card container — replaces MUI Paper + outer flex justify-center
      <div className="-mx-4 max-w-lg min-[500px]:mx-auto min-[500px]:rounded-lg border border-border bg-card p-5 min-[500px]:shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          {field('basis-score', 'basis',   'Basis Score',  this.state.basis)}
          {field('factor',      'factor',  'Factor',       this.state.factor, '%')}
          {field('average',     'average', 'Your Average', this.state.average)}
          {field('score',       'score',   'Game Score',   this.state.score)}

          {/* Result boxes — large number with label */}
          <div className="flex flex-col items-center rounded-md border border-border bg-muted/30 py-3">
            <span className="text-xs text-muted-foreground">Your Handicap</span>
            <span className="text-3xl font-bold">{this.state.handicap}</span>
          </div>
          <div className="flex flex-col items-center rounded-md border border-border bg-muted/30 py-3">
            <span className="text-xs text-muted-foreground">Adjusted Result</span>
            <span className="text-3xl font-bold">{this.state.adjustedScore}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BowlingHandicapCalculator;
