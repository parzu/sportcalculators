import { describe, it, expect } from 'vitest';

// These functions mirror the closures in RunningPacePlanner.js (not yet exported).
// When Phase 4 extracts them to TypeScript, update these imports.

function calculatePaceForDistance(distancePoint, totalDistance, averagePace, progressionFactor) {
  const progress = distancePoint / totalDistance;
  const firstPace = averagePace * (1 + progressionFactor / 2);
  const lastPace = averagePace * (1 - progressionFactor / 2);
  return firstPace + (lastPace - firstPace) * progress;
}

function calculateSplits(distance, targetTime, settings, lockedSplits = new Set(), previousSplits = []) {
  if (!distance || !targetTime || !settings.splitDistance || targetTime < 0) return [];

  const adjustedDistance =
    settings.splitUnit === 'mi' ? parseFloat((distance / 1.60934).toFixed(2)) : distance;
  const splitCount = Math.ceil(adjustedDistance / settings.splitDistance);
  const averagePace = targetTime / adjustedDistance;

  const splitDistances = Array(splitCount).fill(0).map((_, index) =>
    Math.min(settings.splitDistance, adjustedDistance - index * settings.splitDistance)
  );

  const progressionFactor = -(settings.paceProgression / 100);
  let splits = [];
  let cumulativeDistance = 0;

  splitDistances.forEach((splitDistance, index) => {
    let pace;
    if (lockedSplits.has(index) && previousSplits[index]) {
      pace = previousSplits[index].pace;
    } else {
      const distancePoint = cumulativeDistance + splitDistance / 2;
      pace = calculatePaceForDistance(distancePoint, adjustedDistance, averagePace, progressionFactor);
    }
    const splitTime = splitDistance * pace;
    cumulativeDistance += splitDistance;
    splits.push({ distance: splitDistance.toFixed(2), pace, time: splitTime });
  });

  const currentTotal = splits.reduce((sum, s) => sum + s.time, 0);
  const timeDiscrepancy = targetTime - currentTotal;
  const unlockedSplitsTime = splits.reduce((sum, _, i) =>
    sum + (lockedSplits.has(i) ? 0 : splits[i].time), 0);
  const adjustmentFactor = unlockedSplitsTime > 0 ? 1 + timeDiscrepancy / unlockedSplitsTime : 1;

  let cumulativeTime = 0;
  splits = splits.map((split, index) => {
    const isLocked = lockedSplits.has(index);
    const adjustedTime = isLocked ? split.time : split.time * adjustmentFactor;
    const adjustedPace = adjustedTime / split.distance;
    cumulativeTime += adjustedTime;
    return { ...split, pace: isLocked ? split.pace : adjustedPace, time: adjustedTime, cumulativeTime };
  });

  return splits;
}

describe('calculatePaceForDistance', () => {
  const averagePace = 300; // 5:00/km in seconds

  it('returns averagePace at midpoint with zero progression', () => {
    expect(calculatePaceForDistance(5, 10, averagePace, 0)).toBeCloseTo(averagePace, 5);
  });

  it('progressionFactor=-0.1 starts faster than average (negative split start)', () => {
    // firstPace = avg*(1 + (-0.1)/2) = avg*0.95 → faster (lower seconds/km)
    const pace = calculatePaceForDistance(0, 10, averagePace, -0.1);
    expect(pace).toBeLessThan(averagePace);
  });

  it('progressionFactor=-0.1 ends slower than start (fades through race)', () => {
    const paceStart = calculatePaceForDistance(0, 10, averagePace, -0.1);
    const paceEnd = calculatePaceForDistance(10, 10, averagePace, -0.1);
    expect(paceEnd).toBeGreaterThan(paceStart);
  });

  it('returns exact firstPace at distance 0', () => {
    const progressionFactor = -0.2;
    const firstPace = averagePace * (1 + progressionFactor / 2);
    expect(calculatePaceForDistance(0, 10, averagePace, progressionFactor)).toBeCloseTo(firstPace, 5);
  });

  it('returns exact lastPace at full distance', () => {
    const progressionFactor = -0.2;
    const lastPace = averagePace * (1 - progressionFactor / 2);
    expect(calculatePaceForDistance(10, 10, averagePace, progressionFactor)).toBeCloseTo(lastPace, 5);
  });
});

describe('calculateSplits — even pace', () => {
  const distance = 10; // 10km
  const targetTime = 3000; // 50 min in seconds
  const settings = { splitDistance: 1, splitUnit: 'km', paceProgression: 0 };

  it('returns correct number of splits', () => {
    const splits = calculateSplits(distance, targetTime, settings);
    expect(splits).toHaveLength(10);
  });

  it('total time equals targetTime', () => {
    const splits = calculateSplits(distance, targetTime, settings);
    const total = splits.reduce((sum, s) => sum + s.time, 0);
    expect(total).toBeCloseTo(targetTime, 3);
  });

  it('all paces equal for even pacing', () => {
    const splits = calculateSplits(distance, targetTime, settings);
    const paces = splits.map((s) => s.pace);
    paces.forEach((p) => expect(p).toBeCloseTo(paces[0], 5));
  });

  it('cumulative time of last split equals targetTime', () => {
    const splits = calculateSplits(distance, targetTime, settings);
    expect(splits[splits.length - 1].cumulativeTime).toBeCloseTo(targetTime, 3);
  });

  it('returns empty array for zero distance', () => {
    expect(calculateSplits(0, targetTime, settings)).toEqual([]);
  });

  it('returns empty array for zero time', () => {
    expect(calculateSplits(distance, 0, settings)).toEqual([]);
  });
});

describe('calculateSplits — positive split (paceProgression=10 → progressionFactor=-0.1 → faster start)', () => {
  const distance = 10;
  const targetTime = 3000;
  // paceProgression=10 → progressionFactor=-0.1 → firstPace faster, lastPace slower
  const settings = { splitDistance: 1, splitUnit: 'km', paceProgression: 10 };

  it('total time still equals targetTime', () => {
    const splits = calculateSplits(distance, targetTime, settings);
    const total = splits.reduce((sum, s) => sum + s.time, 0);
    expect(total).toBeCloseTo(targetTime, 3);
  });

  it('first split is faster (lower pace) than last split', () => {
    const splits = calculateSplits(distance, targetTime, settings);
    expect(splits[0].pace).toBeLessThan(splits[splits.length - 1].pace);
  });
});

describe('calculateSplits — partial last split', () => {
  it('handles non-integer distance with correct split count', () => {
    const settings = { splitDistance: 1, splitUnit: 'km', paceProgression: 0 };
    const splits = calculateSplits(10.5, 3150, settings);
    expect(splits).toHaveLength(11);
    expect(parseFloat(splits[10].distance)).toBeCloseTo(0.5, 2);
  });

  it('total time equals targetTime even with partial split', () => {
    const settings = { splitDistance: 1, splitUnit: 'km', paceProgression: 0 };
    const splits = calculateSplits(10.5, 3150, settings);
    const total = splits.reduce((sum, s) => sum + s.time, 0);
    expect(total).toBeCloseTo(3150, 3);
  });
});

describe('calculateSplits — locked splits', () => {
  it('locked split retains its original pace', () => {
    const settings = { splitDistance: 1, splitUnit: 'km', paceProgression: 0 };
    const firstPass = calculateSplits(5, 1500, settings);
    const lockedPace = firstPass[2].pace;

    // Simulate re-calculating with new target time, keeping split 2 locked
    const locked = new Set([2]);
    const secondPass = calculateSplits(5, 1600, settings, locked, firstPass);
    expect(secondPass[2].pace).toBeCloseTo(lockedPace, 5);
  });

  it('total time with locked splits still equals targetTime', () => {
    const settings = { splitDistance: 1, splitUnit: 'km', paceProgression: 0 };
    const firstPass = calculateSplits(5, 1500, settings);
    const locked = new Set([1, 3]);
    const secondPass = calculateSplits(5, 1600, settings, locked, firstPass);
    const total = secondPass.reduce((sum, s) => sum + s.time, 0);
    expect(total).toBeCloseTo(1600, 3);
  });
});
