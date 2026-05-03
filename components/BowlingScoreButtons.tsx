// PHASE 7: Removed MUI Button and Grid.
// Replaced with shadcn Button (variant="outline") and a simple flex layout.
// Logic (setDisabledButtons, gameEnd, etc.) is unchanged — only JSX and imports changed.
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  throwNum: number;
  frameNum: number;
  lastThrow: number | string;
  running: boolean;
  onClick: (value: number | string) => void;
}

interface State {
  disabled: boolean[];
  spareDisabled: boolean;
  strikeDisabled: boolean;
}

class BowlingScoreButtons extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      disabled: Array(10).fill(false),
      spareDisabled: true,
      strikeDisabled: false,
    };
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps !== this.props) this.setDisabledButtons();
  }

  setDisabledButtons(): void {
    if (!this.props.running) {
      this.gameEnd();
    } else if (this.props.throwNum === 1) {
      this.setInitialButtons();
    } else if (this.props.throwNum === 2) {
      if (this.props.frameNum === 10 && this.props.lastThrow === 'x') {
        this.setInitialButtons();
      } else {
        this.setAfterThrowButtons(this.props.lastThrow as number);
      }
    } else {
      if (this.props.lastThrow === 'x' || this.props.lastThrow === '/') {
        this.setInitialButtons();
      } else {
        this.setAfterThrowButtons(this.props.lastThrow as number);
      }
    }
  }

  gameEnd(): void {
    this.setState({ strikeDisabled: true, spareDisabled: true, disabled: Array(10).fill(true) });
  }

  setInitialButtons(): void {
    this.setState({ strikeDisabled: false, spareDisabled: true, disabled: Array(10).fill(false) });
  }

  setAfterThrowButtons(value: number): void {
    this.setState({ strikeDisabled: true, spareDisabled: false });
    const dis = Array(10).fill(true);
    for (let i = 0; i < dis.length - value; i++) dis[i] = false;
    this.setState({ disabled: dis });
  }

  render() {
    const { disabled, spareDisabled, strikeDisabled } = this.state;
    const btn = (label: number | string, isDisabled: boolean) => (
      <Button
        key={String(label)}
        variant="outline"
        disabled={isDisabled}
        onClick={() => this.props.onClick(label)}
        className="h-12 text-xl font-semibold sm:h-9 sm:text-base"
      >
        {label === 'x' ? 'X' : label}
      </Button>
    );

    return (
      <div className="py-3 space-y-2">
        <div className="grid grid-cols-6 gap-2">
          {[0,1,2,3,4,5].map((n) => btn(n, disabled[n]))}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {[6,7,8,9].map((n) => btn(n, disabled[n]))}
          {btn('/', spareDisabled)}
          {btn('x', strikeDisabled)}
        </div>
        <div className="flex justify-center pt-1">
          <Button variant="outline" className="h-10 px-6 text-base sm:h-9 sm:text-sm" onClick={() => this.props.onClick('new')}>
            New Game
          </Button>
        </div>
      </div>
    );
  }
}

export default BowlingScoreButtons;
