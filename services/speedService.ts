import * as consts from './unitConstants';

// TS: Parameter types come after the colon: (time: number, distance: number)
// Return type comes after the closing parenthesis: ): number
export function calculateSpeed(time: number, distance: number): number {
  let speed = 0;
  if (time > 0 && distance > 0) {
    speed = distance / time;
  }
  return speed;
}

// TS: PaceType is the union 0 | 1 | 2 | 3 — TypeScript will warn if you pass anything else
export function paceToSpeed(pace: number, unit: number): number {
  let speed = 0;
  switch (unit) {
    case consts.paceTypes.MIN_KM:
      speed = consts.minkmToMps / pace;
      break;
    case consts.paceTypes.KM_H:
      speed = pace * consts.kmhToMps;
      break;
    case consts.paceTypes.MIN_MI:
      speed = consts.minmiToMps / pace;
      break;
    case consts.paceTypes.MPH:
      speed = pace * consts.mphToMps;
      break;
    default:
      break;
  }
  return speed;
}

// The conversion functions return string because .toFixed() returns a string
export function mps(mpsVal: number): string {
  return mpsVal.toFixed(2);
}

export function mpsToMph(mpsVal: number): string {
  return (mpsVal * consts.mpsToMph).toFixed(2);
}

export function mpsToKmh(mpsVal: number): string {
  return (mpsVal * consts.mpsToKmh).toFixed(2);
}

export function mpsToKmPace(mpsVal: number): string {
  return (consts.mpsToKmPace / mpsVal).toFixed(2);
}

export function mpsToMilePace(mpsVal: number): string {
  return (consts.mpsToMilePace / mpsVal).toFixed(2);
}

export function mpsToFps(mpsVal: number): string {
  return (mpsVal * consts.mpsToFps).toFixed(2);
}
