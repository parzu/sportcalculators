import { describe, it, expect } from 'vitest';
import { distanceToMeters } from '../services/distanceService.js';
import { distanceTypes } from '../services/unitConstants.js';

describe('distanceToMeters', () => {
  it('returns meters unchanged', () => {
    expect(distanceToMeters(100, distanceTypes.METER)).toBe(100);
  });

  it('converts feet to meters', () => {
    expect(distanceToMeters(1, distanceTypes.FEET)).toBeCloseTo(0.3048, 4);
  });

  it('converts kilometers to meters', () => {
    expect(distanceToMeters(1, distanceTypes.KM)).toBe(1000);
  });

  it('converts miles to meters', () => {
    expect(distanceToMeters(1, distanceTypes.MILE)).toBeCloseTo(1609.344, 3);
  });

  it('handles zero distance', () => {
    expect(distanceToMeters(0, distanceTypes.KM)).toBe(0);
  });

  it('converts string distType (uses parseInt)', () => {
    expect(distanceToMeters(5, String(distanceTypes.KM))).toBe(5000);
  });
});
