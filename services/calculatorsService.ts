// This file contains legacy heptathlon coefficients used by the heptathlon-scoring page.
// The newer calculators use combinedEventsService.ts instead.

// TS: An interface describes the shape of a single IAAF scoring coefficient set
interface HeptathlonEventConsts {
  order?: number;
  name: string;
  a: number;
  b: number;
  c: number;
}

export const calculatorList: HeptathlonEventConsts[] = [
  { order: 1, name: '100m hurdles', a: 9.23076,  b: 26.7,  c: 1.835 },
  {           name: 'highjump',     a: 1.84523,  b: 75.0,  c: 1.348 },
  {           name: 'shotput',      a: 56.0211,  b: 1.50,  c: 1.05  },
  {           name: 'run200m',      a: 4.99087,  b: 42.5,  c: 1.81  },
  {           name: 'longjump',     a: 0.188807, b: 210,   c: 1.41  },
  {           name: 'javelin',      a: 15.9803,  b: 3.80,  c: 1.04  },
  {           name: 'run800m',      a: 0.11193,  b: 254,   c: 1.88  },
];

// TS: HeptathlonEntry[] means 'array of HeptathlonEntry'
interface HeptathlonEntry {
  result: string | number;
  points: string | number;
}

export function calculateHeptathlonPoints(heptathlon: HeptathlonEntry[]): HeptathlonEntry[] {
  // Note: heptathlonConsts is not available in this file — this function is a legacy stub
  return heptathlon;
}
