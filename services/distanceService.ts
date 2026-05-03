import * as consts from './unitConstants';

export function distanceToMeters(distance: number, distType: number | string): number {
  let multiple = 1;
  switch (parseInt(String(distType))) {
    case consts.distanceTypes.FEET:  multiple = consts.feetToMeter; break;
    case consts.distanceTypes.KM:    multiple = consts.kmToMeter;   break;
    case consts.distanceTypes.MILE:  multiple = consts.mileToMeter; break;
    default: multiple = 1; break;
  }
  return distance * multiple;
}
