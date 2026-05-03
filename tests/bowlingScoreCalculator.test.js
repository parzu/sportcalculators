import { describe, it, expect } from 'vitest';

// Pure scoring logic mirrored from BowlingScoreCalculator.js (no React import).
// When Phase 4 extracts this logic to a TypeScript service, update these imports.

class BowlingScorer {
  constructor(throws) {
    this.throws = throws || Array.from({ length: 10 }, () => ['', '']);
  }

  isStrike(frameIndex) {
    return this.throws[frameIndex][0] === 'x';
  }

  isSpare(frameIndex) {
    return this.throws[frameIndex][1] === '/';
  }

  calculateOpenFrame(frame) {
    const frameThrows = this.throws[frame];
    return parseInt(frameThrows[0] || 0) + parseInt(frameThrows[1] || 0);
  }

  calculateSpare(frame) {
    const nextFrame = this.throws[frame + 1] || [];
    const bonus = nextFrame[0] === 'x' ? 10 : parseInt(nextFrame[0] || 0);
    return 10 + bonus;
  }

  calculateStrike(frameIndex) {
    const nextFrame = this.throws[frameIndex + 1] || [];
    const nextNextFrame = this.throws[frameIndex + 2] || [];
    let score = 10;
    if (nextFrame[0] === 'x') {
      score += 10;
      if (frameIndex === 8) {
        score += nextFrame[1] === 'x' ? 10 : parseInt(nextFrame[1] || 0);
      } else {
        score += nextNextFrame[0] === 'x' ? 10 : parseInt(nextNextFrame[0] || 0);
      }
    } else {
      score += parseInt(nextFrame[0] || 0) + (nextFrame[1] === '/' ? 10 - parseInt(nextFrame[0] || 0) : parseInt(nextFrame[1] || 0));
    }
    return score;
  }

  calculateFrame10() {
    const frameThrows = this.throws[9];
    const firstThrow = frameThrows[0] === 'x' ? 10 : parseInt(frameThrows[0] || 0);
    const secondThrow = frameThrows[1] === 'x' ? 10 : (frameThrows[1] === '/' ? 10 - firstThrow : parseInt(frameThrows[1] || 0));
    const thirdThrow = frameThrows[2] === 'x' ? 10 : (frameThrows[2] === '/' ? 10 - (secondThrow === 10 ? 0 : secondThrow) : parseInt(frameThrows[2] || 0));
    return firstThrow + secondThrow + thirdThrow;
  }

  calculateFinalScore() {
    const results = Array(10).fill(0);
    for (let i = 0; i < 10; i++) {
      if (this.isStrike(i) && i < 9) {
        results[i] = this.calculateStrike(i);
      } else if (this.isSpare(i)) {
        results[i] = this.calculateSpare(i);
      } else {
        results[i] = this.calculateOpenFrame(i);
      }
      if (i === 9) results[i] = 0;
      if (i > 0) results[i] += results[i - 1];
    }
    results[9] += this.calculateFrame10();
    return results[9];
  }
}

describe('isStrike / isSpare', () => {
  it('detects strike', () => {
    const s = new BowlingScorer([['x', '']]);
    expect(s.isStrike(0)).toBe(true);
  });

  it('detects spare', () => {
    const s = new BowlingScorer([['3', '/']]);
    expect(s.isSpare(0)).toBe(true);
  });

  it('detects open frame', () => {
    const s = new BowlingScorer([['3', '5']]);
    expect(s.isStrike(0)).toBe(false);
    expect(s.isSpare(0)).toBe(false);
  });
});

describe('calculateOpenFrame', () => {
  it('sums two throws', () => {
    const s = new BowlingScorer([['4', '5']]);
    expect(s.calculateOpenFrame(0)).toBe(9);
  });

  it('handles empty second throw as 0', () => {
    const s = new BowlingScorer([['7', '']]);
    expect(s.calculateOpenFrame(0)).toBe(7);
  });
});

describe('calculateSpare', () => {
  it('scores 10 + first ball of next frame', () => {
    const s = new BowlingScorer([['6', '/'], ['3', '5']]);
    expect(s.calculateSpare(0)).toBe(13);
  });

  it('scores 20 when next frame is strike', () => {
    const s = new BowlingScorer([['6', '/'], ['x', '']]);
    expect(s.calculateSpare(0)).toBe(20);
  });

  it('scores 10 when no next frame throws', () => {
    const s = new BowlingScorer([['6', '/']]);
    expect(s.calculateSpare(0)).toBe(10);
  });
});

describe('calculateStrike', () => {
  it('scores 10 + next two balls (open frame)', () => {
    const s = new BowlingScorer([['x', ''], ['3', '5']]);
    expect(s.calculateStrike(0)).toBe(18);
  });

  it('scores 30 for three consecutive strikes', () => {
    const s = new BowlingScorer([['x', ''], ['x', ''], ['x', '']]);
    expect(s.calculateStrike(0)).toBe(30);
  });

  it('scores 20 for strike + spare', () => {
    const s = new BowlingScorer([['x', ''], ['3', '/']]);
    expect(s.calculateStrike(0)).toBe(20);
  });

  it('9th frame strike uses 10th frame throws correctly', () => {
    const throws = Array.from({ length: 10 }, (_, i) => i === 9 ? ['x', 'x', 'x'] : ['', '']);
    throws[8] = ['x', ''];
    const s = new BowlingScorer(throws);
    expect(s.calculateStrike(8)).toBe(30);
  });
});

describe('calculateFrame10', () => {
  function make10th(t) {
    const throws = Array.from({ length: 10 }, () => ['', '']);
    throws[9] = t;
    return new BowlingScorer(throws);
  }

  it('sums three non-special throws', () => {
    expect(make10th(['4', '3', '2']).calculateFrame10()).toBe(9);
  });

  it('handles strike then two more', () => {
    expect(make10th(['x', '7', '2']).calculateFrame10()).toBe(19);
  });

  it('handles strike + spare', () => {
    // second=3, third='/'→10-3=7 → 10+3+7=20
    expect(make10th(['x', '3', '/']).calculateFrame10()).toBe(20);
  });

  it('handles spare + strike', () => {
    // 7 + (10-7)=3 + 10 = 20
    expect(make10th(['7', '/', 'x']).calculateFrame10()).toBe(20);
  });

  it('three strikes = 30', () => {
    expect(make10th(['x', 'x', 'x']).calculateFrame10()).toBe(30);
  });
});

describe('perfect game', () => {
  it('12 strikes = 300', () => {
    const strikes = Array.from({ length: 9 }, () => ['x', '']);
    strikes.push(['x', 'x', 'x']);
    const s = new BowlingScorer(strikes);
    expect(s.calculateFinalScore()).toBe(300);
  });
});

describe('gutter game', () => {
  it('all zeros = 0', () => {
    const zeros = Array.from({ length: 10 }, () => ['0', '0']);
    const s = new BowlingScorer(zeros);
    expect(s.calculateFinalScore()).toBe(0);
  });
});

describe('all spares', () => {
  it('all 5-spares with first ball 5 = 150', () => {
    const frames = Array.from({ length: 10 }, () => ['5', '/']);
    frames[9] = ['5', '/', '5'];
    const s = new BowlingScorer(frames);
    expect(s.calculateFinalScore()).toBe(150);
  });
});
