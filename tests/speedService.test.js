import { describe, it, expect } from 'vitest';
import {
  calculateSpeed,
  paceToSpeed,
  mps,
  mpsToMph,
  mpsToKmh,
  mpsToKmPace,
  mpsToMilePace,
  mpsToFps,
} from '../services/speedService.js';
import { paceTypes } from '../services/unitConstants.js';

describe('calculateSpeed', () => {
  it('returns distance / time in m/s', () => {
    expect(calculateSpeed(10, 100)).toBe(10);
  });

  it('returns 0 when time is 0', () => {
    expect(calculateSpeed(0, 100)).toBe(0);
  });

  it('returns 0 when distance is 0', () => {
    expect(calculateSpeed(10, 0)).toBe(0);
  });
});

describe('paceToSpeed', () => {
  it('converts min/km pace to m/s', () => {
    const speed = paceToSpeed(5, paceTypes.MIN_KM); // 5 min/km
    expect(parseFloat(speed.toFixed(4))).toBeCloseTo(16.6667 / 5, 3);
  });

  it('converts km/h to m/s', () => {
    const speed = paceToSpeed(10, paceTypes.KM_H); // 10 km/h
    expect(parseFloat(speed.toFixed(4))).toBeCloseTo(10 * 0.2778, 3);
  });

  it('converts min/mi pace to m/s', () => {
    const speed = paceToSpeed(8, paceTypes.MIN_MI);
    expect(parseFloat(speed.toFixed(4))).toBeCloseTo(26.8224 / 8, 3);
  });

  it('converts mph to m/s', () => {
    const speed = paceToSpeed(10, paceTypes.MPH);
    expect(parseFloat(speed.toFixed(4))).toBeCloseTo(10 * 0.44704, 3);
  });

  it('returns 0 for unknown unit', () => {
    expect(paceToSpeed(10, 99)).toBe(0);
  });
});

describe('mps formatting', () => {
  it('formats to 2 decimal places', () => {
    expect(mps(3.14159)).toBe('3.14');
  });
});

describe('mpsToMph', () => {
  it('converts m/s to mph', () => {
    expect(mpsToMph(1)).toBe((1 * 2.23694).toFixed(2));
  });
});

describe('mpsToKmh', () => {
  it('converts m/s to km/h', () => {
    expect(mpsToKmh(1)).toBe((1 * 3.6).toFixed(2));
  });
});

describe('mpsToKmPace', () => {
  it('converts m/s to min/km', () => {
    expect(mpsToKmPace(1)).toBe((16.6667 / 1).toFixed(2));
  });
});

describe('mpsToMilePace', () => {
  it('converts m/s to min/mi', () => {
    expect(mpsToMilePace(1)).toBe((26.8224 / 1).toFixed(2));
  });
});

describe('mpsToFps', () => {
  it('converts m/s to ft/s', () => {
    expect(mpsToFps(1)).toBe((1 * 3.28084).toFixed(2));
  });
});
