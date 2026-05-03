import { describe, it, expect } from 'vitest';
import { timeToSeconds, formatTime, formatTimeObject } from '../services/timeService.js';

describe('timeToSeconds', () => {
  it('converts h:m:s to total seconds', () => {
    expect(timeToSeconds(1, 30, 0)).toBe(5400);
  });

  it('handles all zeros', () => {
    expect(timeToSeconds(0, 0, 0)).toBe(0);
  });

  it('treats empty string as 0', () => {
    expect(timeToSeconds('', '', '')).toBe(0);
  });

  it('treats NaN as 0', () => {
    expect(timeToSeconds(NaN, NaN, NaN)).toBe(0);
  });

  it('handles only seconds', () => {
    expect(timeToSeconds(0, 0, 90)).toBe(90);
  });

  it('handles only minutes', () => {
    expect(timeToSeconds(0, 5, 0)).toBe(300);
  });
});

describe('formatTime', () => {
  it('formats seconds to h:mm:ss', () => {
    expect(formatTime(3661, 'h:mm:ss')).toBe('1:01:01');
  });

  it('pads minutes and seconds with leading zero', () => {
    expect(formatTime(3600, 'h:mm:ss')).toBe('1:00:00');
  });

  it('formats in mm:ss.ms format', () => {
    const result = formatTime(65.5, 'mm:ss.ms');
    expect(result).toMatch(/^01:05\./);
  });

  it('handles exact minutes', () => {
    expect(formatTime(300, 'h:mm:ss')).toBe('0:05:00');
  });
});

describe('formatTimeObject', () => {
  it('returns object with hours, minutes, seconds', () => {
    const result = formatTimeObject(3661);
    expect(result).toHaveProperty('hours', 1);
    expect(result.minutes).toBe('01');
    expect(result.seconds).toBe('01');
  });

  it('pads single-digit minutes and seconds', () => {
    const result = formatTimeObject(65);
    expect(result.minutes).toBe('01');
    expect(result.seconds).toBe('05');
  });

  it('returns 00 for zero minutes and seconds', () => {
    const result = formatTimeObject(3600);
    expect(result.minutes).toBe('00');
    expect(result.seconds).toBe('00');
  });

  it('handles 0 seconds total', () => {
    const result = formatTimeObject(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe('00');
    expect(result.seconds).toBe('00');
  });
});
