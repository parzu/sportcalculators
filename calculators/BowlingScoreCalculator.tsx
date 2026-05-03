// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper and <style jsx>.
// Replaced with Tailwind card container and Tailwind layout classes.
// All bowling logic (handleClick, calculateResults, strike/spare/open frame calc) is unchanged.
import React from 'react';
import BowlingScoreButtons from '../components/BowlingScoreButtons';
import BowlingFrameDisplay from '../components/BowlingFrameDisplay';

interface State {
  frame: number; throw: number; lastThrow: number | string;
  totalResult: number; running: boolean;
  throws: string[][]; results: (number | string)[];
}

class BowlingScoreCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState(): State {
    return {
      frame: 1, throw: 1, lastThrow: -1, totalResult: 0, running: true,
      throws:  Array.from({ length: 10 }, () => ['', '']),
      results: Array(10).fill(''),
    };
  }

  handleClick = (value: string | number) => {
    if (value === 'new') { this.setState(this.getInitialState()); return; }
    const tempThrows = this.state.throws.slice();
    tempThrows[this.state.frame - 1][this.state.throw - 1] = String(value);
    this.setState({ throws: tempThrows, lastThrow: value });

    if ((this.state.frame < 10 && value === 'x') || this.state.throw === 3) {
      this.nextFrame();
    } else if (this.state.throw === 1 || (this.state.frame === 10 && (value === '/' || this.state.lastThrow === 'x'))) {
      this.setState({ throw: this.state.throw + 1 });
    } else {
      this.nextFrame();
    }
  };

  nextFrame() { this.setState({ throw: 1 }, this.calculateResults); }

  calculateResults() {
    let newResults = [...this.state.results];
    for (let i = 0; i < this.state.frame; i++) {
      if (this.isStrike(i) && i < 9) newResults[i] = this.calculateStrike(i);
      else if (this.isSpare(i))       newResults[i] = this.calculateSpare(i);
      else                            newResults[i] = this.calculateOpenFrame(i);
      if (i === 9) newResults[i] = 0;
      if (i > 0) (newResults[i] as number) += (newResults[i - 1] as number);
    }
    if (this.state.frame === 10) {
      (newResults[9] as number) += this.calculateFrame10();
    }
    this.setState({ results: newResults, totalResult: newResults[this.state.frame - 1] as number }, this.checkGameEnd);
  }

  checkGameEnd() {
    if (this.state.frame >= 10) this.setState({ running: false });
    else this.setState((s) => ({ frame: s.frame + 1 }));
  }

  calculateFrame10(): number {
    const f = this.state.throws[9];
    const t1 = f[0] === 'x' ? 10 : parseInt(f[0] || '0');
    const t2 = f[1] === 'x' ? 10 : f[1] === '/' ? 10 - t1 : parseInt(f[1] || '0');
    const t3 = f[2] === 'x' ? 10 : f[2] === '/' ? 10 - (t2 === 10 ? 0 : t2) : parseInt(f[2] || '0');
    return t1 + t2 + t3;
  }

  calculateStrike(fi: number): number {
    const nx = this.state.throws[fi + 1] || [];
    const nnx = this.state.throws[fi + 2] || [];
    let score = 10;
    if (nx[0] === 'x') {
      score += 10;
      score += fi === 8 ? (nx[1] === 'x' ? 10 : parseInt(nx[1] || '0'))
                        : (nnx[0] === 'x' ? 10 : parseInt(nnx[0] || '0'));
    } else {
      score += parseInt(nx[0] || '0') + (nx[1] === '/' ? 10 - parseInt(nx[0] || '0') : parseInt(nx[1] || '0'));
    }
    return score;
  }

  calculateSpare(fi: number): number {
    const nx = this.state.throws[fi + 1] || [];
    return 10 + (nx[0] === 'x' ? 10 : parseInt(nx[0] || '0'));
  }

  calculateOpenFrame(fi: number): number {
    const f = this.state.throws[fi];
    return parseInt(f[0] || '0') + parseInt(f[1] || '0');
  }

  isStrike(fi: number, ti = 0): boolean { return this.state.throws[fi][ti] === 'x'; }
  isSpare(fi: number, ti = 1): boolean  { return this.state.throws[fi][ti] === '/'; }

  render() {
    const { throws, results, totalResult } = this.state;
    return (
      // Centered card — replaces MUI Paper + outer flex justify-center
      <div className="mx-auto max-w-2xl min-[500px]:rounded-lg border border-border bg-card p-4 min-[500px]:shadow-sm">
        {/* Frame display row: 9 normal frames (8% each) + frame 10 (12%) + result (18%) */}
        <div className="flex w-full items-end text-xs min-[500px]:text-base leading-[35px]">
          {[...Array(9)].map((_, i) => (
            <div key={i} style={{ width: '8%' }}>
              <BowlingFrameDisplay frameNum={i + 1} throws={throws[i]} result={results[i]} />
            </div>
          ))}
          <div style={{ width: '12%' }}>
            <BowlingFrameDisplay frameNum={10} throws={throws[9]} result={results[9]} />
          </div>
          {/* Total score box */}
          <div style={{ width: '18%' }}
            className="flex h-[70px] items-center justify-center border border-border font-bold text-3xl">
            {totalResult}
          </div>
        </div>

        <BowlingScoreButtons
          running={this.state.running} throwNum={this.state.throw}
          lastThrow={this.state.lastThrow} frameNum={this.state.frame}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default BowlingScoreCalculator;
