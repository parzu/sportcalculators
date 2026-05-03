// TS: 'as const' tells TypeScript to treat these values as exact literal types (0, 1, 2, 3)
// instead of the general 'number' type. This gives better autocomplete and type safety.
export const distanceTypes = Object.freeze({ METER: 0, FEET: 1, KM: 2, MILE: 3 } as const);
export const paceTypes = Object.freeze({ MIN_KM: 0, KM_H: 1, MIN_MI: 2, MPH: 3 } as const);

// TS: These create type aliases for the allowed values.
// 'typeof distanceTypes' gets the type of the object above,
// '[keyof typeof distanceTypes]' looks up all its value types → result is: 0 | 1 | 2 | 3
// This means any function accepting a DistanceType will only allow 0, 1, 2, or 3.
export type DistanceType = (typeof distanceTypes)[keyof typeof distanceTypes];
export type PaceType = (typeof paceTypes)[keyof typeof paceTypes];

// Conversion constants — TypeScript infers 'number' automatically from the literal values
export const minkmToMps = 16.6667;
export const kmhToMps = 0.2778;
export const minmiToMps = 26.8224;
export const mphToMps = 0.44704;

export const mpsToKmh = 3.6;
export const mpsToKmPace = 16.6667;
export const kmToMeter = 1000;

export const mpsToMph = 2.23694;
export const mpsToMilePace = 26.8224;
export const mileToMeter = 1609.344;

export const mpsToFps = 3.28084;
export const feetToMeter = 0.3048;

// TS: 'interface' defines the shape of an object — like a blueprint or contract
export interface IaafEventConsts {
  a: number;
  b: number;
  c: number;
}

export const heptathlonConsts: Record<string, IaafEventConsts> = {
  hurdles:   { a: 9.23076,  b: 26.7,  c: 1.835 },
  highjump:  { a: 1.84523,  b: 75.0,  c: 1.348 },
  shotput:   { a: 56.0211,  b: 1.50,  c: 1.05  },
  run200m:   { a: 4.99087,  b: 42.5,  c: 1.81  },
  longjump:  { a: 0.188807, b: 210,   c: 1.41  },
  javelin:   { a: 15.9803,  b: 3.80,  c: 1.04  },
  run800m:   { a: 0.11193,  b: 254,   c: 1.88  },
};
