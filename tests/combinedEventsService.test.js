import { describe, it, expect } from 'vitest';
import {
  calculateCombinedEventsPoints,
  calculateCombinedEventsResult,
  decathlonConsts,
  heptathlonConsts,
} from '../services/combinedEventsService.js';

function makeCompetition(numEvents) {
  return {
    events: Array.from({ length: numEvents }, () => ({ result: '', points: '', manual: false })),
    firstDayPoints: 0,
    secondDayPoints: 0,
    totalPoints: 0,
  };
}

describe('calculateCombinedEventsPoints — decathlon', () => {
  it('calculates 100m track points (electronic timing)', () => {
    const comp = makeCompetition(10);
    comp.events[0].result = '10.83'; // 100m time in seconds
    const result = calculateCombinedEventsPoints(comp, 0, 'decathlon');
    // a=25.4347, b=18, c=1.81 → floor(25.4347 * (18 - 10.83)^1.81)
    const expected = Math.floor(25.4347 * Math.pow(18 - 10.83, 1.81));
    expect(result.events[0].points).toBe(expected);
  });

  it('calculates long jump field points', () => {
    const comp = makeCompetition(10);
    comp.events[1].result = 798; // cm
    const result = calculateCombinedEventsPoints(comp, 1, 'decathlon');
    // a=0.14354, b=220, c=1.4 → floor(0.14354 * (798-220)^1.4)
    const expected = Math.floor(0.14354 * Math.pow(798 - 220, 1.4));
    expect(result.events[1].points).toBe(expected);
  });

  it('returns 0 points for impossible result', () => {
    const comp = makeCompetition(10);
    comp.events[0].result = '30'; // slower than b=18, negative base
    const result = calculateCombinedEventsPoints(comp, 0, 'decathlon');
    expect(result.events[0].points).toBe(0);
  });

  it('sets points to empty string when result is empty', () => {
    const comp = makeCompetition(10);
    comp.events[0].result = '';
    const result = calculateCombinedEventsPoints(comp, 0, 'decathlon');
    expect(result.events[0].points).toBe('');
  });

  it('accumulates totalPoints across multiple events', () => {
    const comp = makeCompetition(10);
    comp.events[0].result = '10.83';
    comp.events[1].result = 798;
    let result = calculateCombinedEventsPoints(comp, 0, 'decathlon');
    result = calculateCombinedEventsPoints(result, 1, 'decathlon');
    expect(result.totalPoints).toBe(
      result.events[0].points + result.events[1].points
    );
  });
});

describe('calculateCombinedEventsPoints — heptathlon', () => {
  it('calculates 100m hurdles track points', () => {
    const comp = makeCompetition(7);
    comp.events[0].result = '12.93'; // 100m hurdles
    const result = calculateCombinedEventsPoints(comp, 0, 'heptathlon');
    // a=9.23076, b=26.7, c=1.835
    const expected = Math.floor(9.23076 * Math.pow(26.7 - 12.93, 1.835));
    expect(result.events[0].points).toBe(expected);
  });

  it('calculates shot put field points', () => {
    const comp = makeCompetition(7);
    comp.events[2].result = 17.06;
    const result = calculateCombinedEventsPoints(comp, 2, 'heptathlon');
    // a=56.0211, b=1.50, c=1.05
    const expected = Math.floor(56.0211 * Math.pow(17.06 - 1.50, 1.05));
    expect(result.events[2].points).toBe(expected);
  });

  it('splits firstDayPoints and secondDayPoints correctly', () => {
    const comp = makeCompetition(7);
    comp.events[0].result = '12.93'; // first day
    comp.events[4].result = 640; // long jump, second day
    let result = calculateCombinedEventsPoints(comp, 0, 'heptathlon');
    result = calculateCombinedEventsPoints(result, 4, 'heptathlon');
    expect(result.firstDayPoints).toBeGreaterThan(0);
    expect(result.secondDayPoints).toBeGreaterThan(0);
    expect(result.totalPoints).toBe(result.firstDayPoints + result.secondDayPoints);
  });
});

describe('calculateCombinedEventsResult — bidirectional', () => {
  it('converts points back to 100m time (decathlon)', () => {
    const comp = makeCompetition(10);
    comp.events[0].points = 900;
    const result = calculateCombinedEventsResult(comp, 0, 'decathlon');
    // Result should be a numeric string (seconds)
    expect(parseFloat(result.events[0].result)).toBeGreaterThan(0);
  });

  it('round-trips result → points → result within rounding', () => {
    const comp = makeCompetition(10);
    comp.events[1].result = 798; // long jump cm
    const withPoints = calculateCombinedEventsPoints(comp, 1, 'decathlon');
    const points = withPoints.events[1].points;

    const comp2 = makeCompetition(10);
    comp2.events[1].points = points;
    const withResult = calculateCombinedEventsResult(comp2, 1, 'decathlon');
    // Should be within 1cm of original due to floor() in points calculation
    expect(parseFloat(withResult.events[1].result)).toBeCloseTo(798, -1);
  });

  it('sets result to empty when points is empty', () => {
    const comp = makeCompetition(10);
    comp.events[0].points = '';
    const result = calculateCombinedEventsResult(comp, 0, 'decathlon');
    expect(result.events[0].result).toBe('');
  });

  it('formats 1500m result as m:ss.ms string', () => {
    const comp = makeCompetition(10);
    comp.events[9].points = 700; // 1500m, track event >= 60s
    const result = calculateCombinedEventsResult(comp, 9, 'decathlon');
    expect(String(result.events[9].result)).toMatch(/^\d+:\d{2}\.\d+/);
  });
});
