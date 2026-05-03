// APP ROUTER: Calculator components use React state/hooks, so they must be Client Components
'use client';
// PHASE 7: Removed MUI Paper and <style jsx>.
// Replaced with Tailwind card container and layout classes.
// All bowling logic is unchanged.
import React from 'react';
import DuckpinBowlingScoreButtons from '../components/DuckpinBowlingScoreButtons';
import DuckpinBowlingFrameDisplay from '../components/DuckpinBowlingFrameDisplay';

interface State {
  frame: number; throw: number; lastThrow: number | string;
  frameSum: number; totalResult: number; running: boolean;
  throws: string[][]; results: (number | string)[];
}

const EMPTY_THROWS = () => Array.from({ length: 10 }, () => ['', '', '']);

class DuckpinBowlingScoreCalculator extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      frame: 1, throw: 1, lastThrow: -1, frameSum: 0, totalResult: 0, running: true,
      throws:  EMPTY_THROWS(),
      results: Array(10).fill(''),
    };
  }

  handleClick = (value: string | number) => {
    if (value === 'new') { this.newGame(); return; }
    const t = this.state.throws.slice();
    t[this.state.frame - 1][this.state.throw - 1] = String(value);
    this.setState({ throws: t });

    if (this.state.frame < 10 && value === 'x') {
      this.nextFrame();
    } else if (this.state.throw === 1) {
      this.setState({ throw: 2 });
    } else if (this.state.frame === 10 && this.state.throw === 2 && (value === '/' || this.state.lastThrow === 'x')) {
      this.setState({ throw: 3 });
    } else if (this.state.throw === 2) {
      if (value === '/') this.nextFrame();
      else {
        this.setState({ throw: 3, frameSum: Number(this.state.lastThrow) + Number(value) });
      }
    } else {
      this.nextFrame();
    }
    this.setState({ lastThrow: value });
  };

  nextFrame() { this.setState({ throw: 1 }, this.calculateResults); }

  newGame() {
    this.setState({ frame: 1, throw: 1, lastThrow: -1, totalResult: 0, running: true, throws: EMPTY_THROWS(), results: Array(10).fill('') });
  }

  calculateResults() {
    const res = this.state.results.slice();
    for (let i = 0; i <= this.state.frame - 1; i++) {
      const sum = i === 0 ? 0 : parseInt(String(res[i - 1]));
      if (i === 9)          res[i] = sum + this.calculateFrame10();
      else if (this.isStrike(i))  res[i] = sum + this.calculateStrike(i);
      else if (this.isSpare(i))   res[i] = sum + this.calculateSpare(i);
      else                        res[i] = sum + this.calculateOpenFrame(i);
    }
    this.setState({ results: res, totalResult: res[this.state.frame - 1] as number });
    this.setState({ frame: this.state.frame + 1 }, this.checkGameEnd);
  }

  checkGameEnd() { if (this.state.frame === 11) this.setState({ running: false }); }

  calculateFrame10(): number {
    let sum = 0;
    if (this.isStrike(9)) {
      if (this.isStrike(9, 1)) {
        sum = this.isStrike(9, 2) ? 30 : 20 + Number(this.state.throws[9][2]);
      } else if (this.isSpare(9, 2)) {
        sum = 20;
      } else {
        sum = 10 + parseInt(this.state.throws[9][1]) + parseInt(this.state.throws[9][2]);
      }
    } else if (this.isSpare(9, 2)) {
      sum = 20;
    } else if (this.isSpare(9)) {
      sum = this.isStrike(9, 2) ? 20 : 10 + Number(this.state.throws[9][2]);
    } else {
      sum = this.calculateOpenFrame(9);
    }
    return sum;
  }

  calculateStrike(fi: number): number {
    if (this.state.throws[fi + 1][0] === '') return 10;
    if (this.isStrike(fi + 1)) {
      if (fi === 8) return this.isStrike(fi + 1, 1) ? 30 : 20 + Number(this.state.throws[fi + 1][1]);
      if (this.isStrike(fi + 2)) return 30;
      return Number(this.state.throws[fi + 2][0]) + 20;
    }
    if (this.isSpare(fi + 1)) return 20;
    return 10 + parseInt(this.state.throws[fi + 1][0]) + parseInt(this.state.throws[fi + 1][1]);
  }

  calculateSpare(fi: number): number {
    if (this.state.throws[fi + 1][0] === '') return 10;
    if (this.isStrike(fi + 1)) return 20;
    return 10 + Number(this.state.throws[fi + 1][0]);
  }

  calculateOpenFrame(fi: number): number {
    return parseInt(this.state.throws[fi][0]) + parseInt(this.state.throws[fi][1]) + parseInt(this.state.throws[fi][2]);
  }

  isStrike(fi: number, ti = 0): boolean { return this.state.throws[fi][ti] === 'x'; }
  isSpare(fi: number, ti = 1): boolean  { return this.state.throws[fi][ti] === '/'; }

  render() {
    const { throws, results, totalResult } = this.state;
    return (
      <div className="mx-auto max-w-2xl min-[500px]:rounded-lg border border-border bg-card p-4 min-[500px]:shadow-sm">
        <div className="flex w-full items-end text-xs min-[500px]:text-base leading-[35px]">
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{ width: '8%' }}>
              <DuckpinBowlingFrameDisplay frameNum={i + 1} throws={throws[i]} result={results[i]} />
            </div>
          ))}
          <div style={{ width: '20%' }}
            className="flex h-[70px] items-center justify-center border border-border font-bold text-3xl">
            {totalResult}
          </div>
        </div>

        <DuckpinBowlingScoreButtons
          frameSum={this.state.frameSum} running={this.state.running}
          throwNum={this.state.throw} lastThrow={this.state.lastThrow}
          frameNum={this.state.frame} onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default DuckpinBowlingScoreCalculator;
